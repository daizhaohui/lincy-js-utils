
  /**
 * 数字指定范围判断
 * @param  val 要判断的数字
 * @param start 大于等于的数字
 * @param end 小于等于的数字, 可选。
 */
export declare function isRange(val:number,start:number,end?:number):boolean;
/**
 * 生成指定范围内的随机数
 * @param  min 最小值
 * @param  max 最大值
 */
 export declare function random(min:number, max:number):number;
/**
 * 将数字转换为大写金额
 * @param n 要转换的数字
 */
 export declare function numberToChinese(n:number):string;
 /**
   * 数字格式化成金额
   * @param numberValue 要转换的数值
   * @param places 保留的小位数,默认为0 (四舍五入)
   * @param symbol 货币符号，默认为$
   * @param thousand  千分位字符,默认为,
   * @param decimal 小位数符合,默认为.
   * @returns 
   */
  export function formatMoney(numberValue:number, places?:number, symbol?:string, thousand?:string, decimal?:string):string;
 /**
   * 数字格式化成百分比
   * @param numberValue 要转换的数值
   * @param places 保留的小位数,默认为0 (四舍五入)
   */
  export function formatPercent(numberValue:number,places?:number):string;