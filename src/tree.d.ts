/**
 * 数据映射配置对象（业务数据到统一的数结点对象）
 */
declare interface IDataMapOptions {
  /**
   * 唯一标识的属性名称
   */
  id?: string | number;
  /**
   * 父唯一标识的属性名称
   */
  parentId?: string | number;
  /**
   * 显示名的属性名称
   */
  text?: string;
  /**
   * 子的属性名称
   */
  children?:string;
  /**
   * 树根节点id值（默认为'',可能定义为‘-1’或者其他值）
   */
  rootId?:string;
}

declare interface ITreeNodeData {
  /**
   * 树节点唯一标识
   */
  id: string | number;
  /**
   * 树父节点唯一标识
   */
  parentId: string | number;
   /**
    * 树节点显示名称
    */
  text: string;
   /**
    * 附加数据（业务数据）
    */
  data?:any;
}

/**
 * 数节点对象
 */
declare class  TreeNode{
   /**
    * 树节点唯一标识
    */
  id: string | number;
  /**
   * 树节点显示名称
   */
  text: string;
  /**
   * 树父节点
   */
  parent: TreeNode;
  /**
   * 子节点
   */
  children: TreeNode[];
  /**
   * 数组中依次存放从根节点到子节点路径上的所有节点
   */
  readonly path:TreeNode[];
  /**
   * 节点所在text路径,数组中依次存放从根节点到子节点路径上的节点text
   */
  readonly textPath:string[];
  /**
   * 节点所属层级,根节点level=0
   */
   readonly level:number;
}

declare type TreeNodeFunc = (treeNode: TreeNode) => boolean;


/**
 * 树对象
 */
declare class Tree{
  /**
    * 创建数实例
    * @param data 要转换的数据
  * @param [options] 数据字段映射选项配置{id,parentId,text,children}
  */
  constructor(data: [], options?: IDataMapOptions);
  /**
   * 新增子节点
   * @param treeNodeData 树节点数据
   */
  add(treeNodeData: ITreeNodeData): Tree;
  /**
   * 根据id删除节点
   * @param id 要删除的节点的ID
   */
  remove(id: string|number): Tree;
   /**
   * 通过id查找对应的节点
   * @param id 节点唯一标识
   */
  getNode(id: string|number): TreeNode;
  /**
   * 查询符合条件的节点集合
   * @param fuc 条件判断函数
   * @returns 返回TreeNode节点集合
   */
   find(fuc: TreeNodeFunc): TreeNode[];
  /**
   * 根据条件对树形结构进行过滤 返回新的树的根节点
   * @param fuc 条件判断函数
   * @returns 返回TreeNode=
   */
  filter(fuc: TreeNodeFunc): TreeNode | null;

}

export default Tree;