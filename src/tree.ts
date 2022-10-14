class TreeNode {
    id: string|number;
    text: string;
    parent: TreeNode;
    children: TreeNode[];
    data:any;

    constructor(id: string|number, text: string,data:any) {
        this.id = id;
        this.text = text;
        this.parent = null;
        this.children = [];
        this.data = data;
    }

    // 节点所在id路径
    get path(): TreeNode[] {
        let _this: TreeNode = this;
        const nodePathArray: any = [];
        while (_this.parent) {
            nodePathArray.push(_this);
            _this = _this.parent;
        }
        nodePathArray.push(_this);
        return nodePathArray.reverse();
    }

    // 节点所在text路径
    get textPath(): string[] {
        let _this: TreeNode = this;
        const nodePathArray: any = [];
        while (_this.parent) {
            nodePathArray.push(_this.text);
            _this = _this.parent;
        }
        nodePathArray.push(_this.text);
        return nodePathArray.reverse();
    }

    //  节点所属层级
    get level(): number {
        let level: number = 1;
        let _this: TreeNode = this;
        while (_this.parent) {
            level++;
            _this = _this.parent;
        }
        return level;
    } 

}

/**
 * 将线性结构数据转成树形结构数据
 * @param list
 * @param cache
 */
function toTree(list: any[], cache: any,options?:any): TreeNode {
    let rootNode: TreeNode = null;
    let parentNode: TreeNode = null;
    // 根节点id是多少
    const rootId = options && options.rootId !== undefined ? options.rootId : '';
    // 数据是否是属性结构，数据children不为空
    const dataIsTree = options && options.children !== undefined ? true: false;

    list.forEach((item: any) => {
        cache[item.id] = new TreeNode(item.id, item.text,item.data);
    });

    // 非树形结构数据，根节点处理。数据中无根节点数据，创建一个根节点
    if(dataIsTree===false && rootId && cache[rootId]===undefined){
       cache[rootId] = new TreeNode(rootId,'', null);
       cache[rootId].parent = null;
       rootNode = cache[rootId];
    }

    list.forEach((item: any) => {
        const node = cache[item.id];
        // 分两种情况：树形数据，判断parentId为rootId的即为根节点; 扁平数据，判断id为rootId的为根结点
        if ( (dataIsTree===false && !rootNode && item.id===rootId) || (dataIsTree===true && item.parentId === rootId)) {
            rootNode = node;
        } else {
            if (cache[item.parentId]) {
                parentNode = cache[item.parentId];
                node.parent = parentNode;
                parentNode.children.push(node);
            }
        }
    });
    return rootNode;
}

function toFlatData(data:any[],options:any,flatData:any[]) {
   data.forEach(item=>{
       flatData.push(item);
       if(item[options.children] && item[options.children].length){
           toFlatData(item[options.children],options,flatData);
       }
   })
}

type TreeNodeFunc = (treeNode: TreeNode) => boolean;
interface ITreeNodeData {
    id: string;
    parentId: string;
    text: string;
    data?:any;
}
// tslint:disable-next-line: max-classes-per-file
export default class Tree {
    #cache: any = {};
    rootNode: TreeNode = null;
    #options: any = null;

    constructor(data: any[], options?: any) {
        this.#options = options;
        let newList: any[] = [];
        if (options) {
            let flatData:any = [];
            // data是树形结构,转换成扁平的数据
            if(options.children){
                toFlatData(data,options,flatData);
            }
            // 无children结构
            else {
                flatData = data;
            }
            flatData.forEach((item: any) => {
                newList.push({
                    id: item[options.id||'id'],
                    text: item[options.text||'text'],
                    parentId: item[options.parentId||'parentId'],
                    // 原始数据
                    data:item
                })
            });
        } else {
            newList = data;
        }
        this.rootNode = toTree(newList, this.#cache,options);
    }

    /**
     * 新增子节点
     * @param treeNodeData 树节点数据
     */
    add(treeNodeData: ITreeNodeData): Tree {
        const cache = this.#cache;
        if (treeNodeData.parentId) {
					const pnode: TreeNode = cache[treeNodeData.parentId];
					const node = new TreeNode(treeNodeData.id, treeNodeData.text,treeNodeData.data);
					cache[treeNodeData.id] = node;
					node.parent = pnode;
            pnode.children.push(node);
        }
        return this;
    }

    /**
     * 根据id删除节点
     * @param id 要删除的节点的ID
     */
    remove(id: string | number): Tree;
    remove(id: any) {
        const cache = this.#cache;
        const node = cache[id];
        if (node) {
            const children = node.parent.children;
            for (let i = 0; i < children.length; i++) {
                // tslint:disable-next-line: triple-equals
                if (children[i].id == id) {
                    children.splice(i, 1);
                }
            }
            delete cache[id];
        }
        return this;
    }

    /**
     * 通过id查找对应的节点
     * @param id
     */
    getNode(id: string | number): TreeNode;
    getNode(id: any): TreeNode {
        return this.#cache[id] || null;
    }

    /**
     * 查询符合条件的节点
     * @param fuc
     */
    find(fuc: TreeNodeFunc): any[] {
        const cache = this.#cache;
        const newArray: any[] = [];
        for (const i in cache) {
            if (cache[i] && fuc(cache[i])) {
                newArray.push(cache[i]);
            }
        }
        return newArray;
    }

    /**
     * 根据条件对树形结构进行过滤 返回新的树形结构
     * @param fuc
     */
    filter(fuc: TreeNodeFunc): TreeNode | null {
        const cache = this.#cache;
        const newArray: any[] = [];

        for (const i in cache) {
            if (cache[i] && fuc(cache[i])) {
                newArray.push({
                    id: cache[i].id,
                    text: cache[i].text,
                    parentId: cache[i].parent ? cache[i].parent.id : ''
                });
                let newItem = cache[i];
                let ifAdd = true;
                while (newItem.parent) {
                    newItem = newItem.parent;
                    newArray.forEach((item: any) => {
                        if (item.id === newItem.id) ifAdd = false;
                    });
                    if (ifAdd) {
                        newArray.push({
                            id: newItem.id,
                            text: newItem.text,
                            parentId: newItem.parent ? newItem.parent.id : ''
                        });
                    }
                }
            }
        }
        if (newArray.length > 0) {
            const rootId = this.#options && this.#options.rootId !== undefined ? this.#options.rootId : '';
            return toTree(newArray, {},rootId);
        } else {
            return null;
        }
    }

    /**
     * 将树形结构转成线性数据
     */
    toArray(): any[] {
        const cache = this.#cache;
        const newArray: any[] = [];
        // tslint:disable-next-line: forin
        for (const i in cache) {
            newArray.push({
							id: cache[i].id,
							text: cache[i].text,
							parentId: cache[i].parent ? cache[i].parent.id : ''
            });
        }
        return newArray;
    }
}