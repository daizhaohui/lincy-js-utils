

declare interface IdCardInfo {
  /**
   *性别：M或F
   */
  gender:string;
  /**
   *出生日期：yyyy-mm-dd
   */
  birthday:string;
}

declare interface PasswordOption {
  /**
   * 包含大写字母,默认为true
   */
  hasUpperLetter:boolean; 
  /**
   * 包含小写字母,默认为true
   */
  hasLowerLetter:boolean;
   /**
   * 包含特殊字符,默认为true
   */
  hasSpecialLetter:boolean;
  /**
   * 包含数字,默认为true
   */
  hasNumber:boolean;
   /**
   * 密码最小长度，默认为6
   */
  minLength:6,
  /**
   * 密码最大长度，默认为18
   */
  maxLength:18
}

  /**
   * 是否是email
   * @param email
   */
  export declare function isEmail(email:string):boolean;
   /**
   * 是否是手机号码
   */
  export declare function isPhone(phone:string):boolean;
  /**
   * 是否只是中文
   */
  export declare function isChinese(chinese:string):boolean;
  /**
   * 是否是固定电话
   */
  export declare function isTelephone(telephone:string):boolean;
   /**
   * 是否是固定电话
   */
  export declare function isTelephone(telephone:string):boolean;
  /**
   * 是否是身份证号
   */
  export declare function isIdentifyNo(no:string):boolean;
  /**
   * 获取身份信息
   * @param no 身份证号码
   * @returns {gender:"",birthday:""}
   */
  export declare function getIdentifyInfo(no:string):IdCardInfo;
   /**
   * 是否只是26个字母
   * @param letter 字符串
   * @param [isUpper] 是否区分大小写,默认为不区分
   */
  export declare function isLetter(letter:string,isUpper?:boolean):boolean;
  /**
   * 是否只是数字、26个英文字母
   */
  export declare function isIntLetter(val:string):boolean;
  /**
   * 是否只是数字、26个英文字母、下划线组成的字符串
   */
  export declare function isIntLetterUnderline(val:string):boolean;
  /**
   * 是否是邮政编码
   */
  export declare function isPostcode(code:string):boolean;
  /**
   * 去掉字符串两端的空格
   */
  export declare function trim(val:string):string;
  /**
   * 密码验证
   * @param val 密码
   * @param options 密码验证强度配置
   */
  export declare function validPassword(val:string,options?:PasswordOption):boolean;
/**
 * 左补齐
 * @param str 要补齐的字符串
 * @param length 补起长度
 * @param pad 补起字符
 * @returns 
 */
 export declare function padStart(str:string, length:number,pad:string):string;
 /**
 * 右补齐
 * @param str 要补齐的字符串
 * @param length 补起长度
 * @param pad 补起字符
 * @returns 
 */
export function padEnd(str:string, length:number,pad:string):string;