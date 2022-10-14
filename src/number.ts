  /**
   * 数字指定范围判断
   * @param  val 要判断的数字
   * @param start 大于等于的数字
   * @param [end] 小于等于的数字, 可选。
   */
  export function isRange(val:number,start:number,end?:number):boolean{
    const ret = val >= start ? true : false;
    if(!ret) return false;
    if(end!==undefined){
      return val<= end ? true : false;
    }
    return ret;
  }

  /**
   * 生成指定范围内的随机数
   * @param  min 最小值
   * @param  max 最大值
   */
  export function random(min:number, max:number):number {
    if (arguments.length === 2) {
        return Math.floor(min + Math.random() * ( (max+1) - min ))
    }else{
        return null;
    }
  }

  /*将数字转换为大写金额*/
  export function numberToChinese(n:number):string{
    const fraction = ['角', '分'];
    const digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    const unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    const head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
      if (i === fraction.length-1) {
      // 末位小数进行四舍五入解决2.01等浮点数精度导致的小数丢失问题
        s += (digit[Math.round(n * 10 * Math.pow(10, i)) % 10] +fraction[i]).replace(/零./,'');
      } else {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./,'');
      }
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
  }

  /**
   * 数字格式化成金额
   * @param numberValue 要转换的数值
   * @param {places}  保留的小位数,默认为0 (四舍五入)
   * @param {symbol} 货币符号，默认为$
   * @param {thousand}  千分位字符,默认为,
   * @param {decimal} 小位数符合,默认为.
   * @returns 
   */
  export function formatMoney(numberValue:number, places:number=0, symbol:string='$', thousand:string=',', decimal:string='.'):string{
    let value:any = numberValue || 0;
    let negative = value < 0 ? "-" : "";
    let i: any = parseInt(value = Math.abs(+value || 0).toFixed(places), 10) + "";
    let j = i.length;
    j = j > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(value - i).toFixed(places).slice(2) : "");
  }

  /**
   * 小数格式化成百分比
   * @param numberValue 要转换的数值
   * @param {places} 保留的小位数,默认为0 (四舍五入)
   */
  export function formatPercent(numberValue:number,places:number=0):string{
    return `${(numberValue*100).toFixed(places)}%`;
  }
