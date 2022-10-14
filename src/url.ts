
export default class Url {
    private url: string;
    protocol: string;
    hostName: string;
    port: string;
    path: string;
    search: string;
    hash: { path?: string, params?: {} }; // hash对象：路径和参数
    hashString: string; // hash串

    constructor(url: string) {
        this.url = url;
        // href: matches[0] hrefNoHash: matches[1] hrefNoSearch: matches[2] domain: matches[3] protocol: matches[4]
        // doubleSlash: matches[5]  authority: matches[6] username: matches[8] password: matches[9] host: matches[10]
        // hostname: matches[11] port: matches[12] pathname: matches[13] directory: matches[14] filename: matches[15]
        // search: matches[16] hash: matches[17]
        let urlParseRE = /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;
        let matches: any = urlParseRE.exec(this.url || "") || [];
        this.protocol = matches[4] || "";
        this.hostName = matches[11] || "";
        this.port = matches[12] || "";
        this.path = matches[13] || "";
        this.search = matches[16] || "";
        this.hashString = matches[17] || "";
        let hashStr = matches[17] || ""; // 解析hash串获得hash对象
        if (hashStr) {
            let ret: any = {};
            ret['path'] = hashStr.substring(1).split('?')[0];
            const paramsStr = hashStr.split('?')[1];
            if (paramsStr) {
                const items = paramsStr.split('&');
                let len = items.length;
                let paramsObj: any = {};
                if (items.length > 0) {
                    for (let i = 0; i < len; i++) {
                        let item = items[i].split("=");
                        let name = decodeURIComponent(item[0]);
                        let value = decodeURIComponent(item[1]);
                        if (name.length) {
                            paramsObj[name] = value;
                        }
                    }
                    ret['params'] = paramsObj;
                } else {
                    ret['params'] = null;
                }
            } else {
                ret['params'] = null;
            }
            this.hash = ret;
        } else {
            this.hash = null;
        }
    }

    // 获取url参数:通过key获取对应的value,不传key返回全部的查询参数
    getSearchParamValue(key?: string): any {
        if (this.search) {
            const searchParams = this.search.substring(1).split('&');
            let ret: any = {};
            let len = searchParams.length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    let item = searchParams[i].split("=");
                    let name = decodeURIComponent(item[0]);
                    let value = decodeURIComponent(item[1]);
                    if (name.length) {
                        ret[name] = value;
                    }
                }
                return key ? ret[key] || '' : ret;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    // 获取hash参数:通过key获取对应的value,不传key返回全部的hash参数
    getHashParamValue(key?: string): any {
        if (this.hash) {
            if (key) {
                if (this.hash.params) {
                    // return this.hash.params[key] || '';
                    let ret: any = {};
                    ret = this.hash.params;
                    return ret[key] || '';
                }

            } else {
                return this.hash.params || null;
            }
        } else {
            return null;
        }

    }

    //  url添加查询参数，可以是key,value的形式，也可以是对象的形式
    addSearchParam(key: string, value: any): any;
    addSearchParam(param: {}): any;

    addSearchParam(key: string, value?: any) {
        if (typeof key == 'string') {
            if (value) {
                if (this.getSearchParamValue()) {
                    this.search += '&' + key + '=' + value;
                } else {
                    this.search += '?' + key + '=' + value;
                }
                return this;
            } else {
                return "please check your value";
            }
        }
        if (typeof key == 'object') {
            let jsonObj: any = key;
            if (this.getSearchParamValue()) {
                for (let jsonKey in jsonObj) {
                    this.search += '&' + jsonKey + '=' + jsonObj[jsonKey];
                }
            } else {
                let jsonKeys = Object.keys(jsonObj);
                if (jsonKeys.length > 1) {
                    this.search += '?' + jsonKeys[0] + '=' + jsonObj[jsonKeys[0]];
                    for (let i = 1; i < jsonKeys.length; i++) {
                        this.search += '&' + jsonKeys[i] + '=' + jsonObj[jsonKeys[i]];
                    }
                } else {
                    this.search += '?' + jsonKeys[0] + '=' + jsonObj[jsonKeys[0]];
                }
            }
            return this;
        }
    }

    // url添加hash的查询参数，可以是key,value的形式，也可以是对象的形式
    addHashParam(key: string, value: any): any;
    addHashParam(param: {}): any;

    addHashParam(key: string, value?: any) {
        if (typeof key == 'string') {
            if (value) {
                if (this.hashString) {
                    this.hashString += '&' + key + '=' + value;
                } else {
                    this.hashString += '#?' + key + '=' + value;
                }
                return this;
            } else {
                return "please check your value";
            }
        }
        if (typeof key == 'object') {
            let jsonObj: any = key;
            if (this.hashString) {
                for (let jsonKey in jsonObj) {
                    this.hashString += '&' + jsonKey + '=' + jsonObj[jsonKey];
                }
            } else {
                let jsonKeys = Object.keys(jsonObj);
                if (jsonKeys.length > 1) {
                    this.hashString += '#?' + jsonKeys[0] + '=' + jsonObj[jsonKeys[0]];
                    for (let i = 1; i < jsonKeys.length; i++) {
                        this.hashString += '&' + jsonKeys[i] + '=' + jsonObj[jsonKeys[i]];
                    }
                } else {
                    this.hashString += '#?' + jsonKeys[0] + '=' + jsonObj[jsonKeys[0]];
                }
            }
            return this;
        }
    }

    // url对象转成string
    toString(): string {
        let urlString = this.protocol + '//' + this.hostName;
        if (this.port) {
            urlString += ':' + this.port;
        }
        if (this.path) {
            urlString += '/' + this.path;
        }
        if (this.search) {
            urlString += this.search;
        }
        if (this.hashString) {
            urlString += this.hashString;
        }
        return urlString;
    }

}
