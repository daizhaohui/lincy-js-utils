declare interface HashParamObject{
  [key:string]:string
}

declare interface  HashObject{
  /**
   * 路径部分
   */
  path?:string,
  /**
   *参数对象
   */
  params?: HashParamObject;
}

declare  class  Url{
  /**
   * 创建处理url的实例
   * @param url 
   */
  constructor(url: string);
  /**
   * 获取url参数:通过key获取对应的value,不传key返回全部的查询参数对象
   * @param  [key] 可选,查询参数值
   * @returns 返回this
   */
  getSearchParamValue(key?: string): any;
  /**
   * 获取hash上的参数:通过key获取对应的value,不传key返回全部的hash上的参数对象，如：#abc?a=1&b=b,返回{a:'1',b:'b'}
   * @param  [key] 可选,查询参数值
   * @returns 返回this
   */
  getHashParamValue(key?: string): any;
  /**
   * url添加单个查询参数
   * @param key
   * @param value  
   * @returns 返回this
   */
  addSearchParam(key: string, value: any): any;
  /**
   * url添加多个查询参数 
   * @param param {a:1,b:b}
   * @returns 返回this
   */
  addHashParam(param: {}): any;
  /**
   *Url实例转换成字符串: 标准的url字符串
   */
  toString():string;
  /**
   *协议
   */
  protocol: string;
   /**
   * 主机名
   */
  hostName: string;
  /**
   * 端口
   */
  port: string;
   /**
   * 路径部分
   */
  path: string;
   /**
   * 从问号 (?) 开始的 URL（查询部分
   */
  search: string;
  /**
   * hash对象表示,路径和参数
   */
  hash: HashObject
  /**
   * hash字符串
   */ 
  hashString: string; 
}

export default Url;