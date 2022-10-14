import IdentifyNoUtil from './internal/identifyNo';
type PasswordOption = {
  hasUpperLetter?:boolean,
  hasLowerLetter?:boolean,
  hasSpecialLetter?:boolean,
  hasNumber?:boolean,
  minLength?:number,
  maxLength?:number
};


/**
 * 左补齐
 * @param str 要补齐的字符串
 * @param length 补起后字符串长度
 * @param pad 补起字符
 * @returns 
 */
export function   padStart(str:string, length:number,pad:string):string{
  if (!str || str.length >= length) return str
  return `${Array((length + 1) - str.length).join(pad)}${str}`
};


/**
 * 右补齐
 * @param str 要补齐的字符串
 * @param length 补起后字符串长度
 * @param pad 补起字符
 * @returns 
 */
export function padEnd(str:string, length:number,pad:string):string{
  if (!str || str.length >= length) return str
  return `${str}${Array((length + 1) - str.length).join(pad)}`
};
/**
 * 是否是email
 * @param email
 */
export function isEmail(email:string):boolean{
  return email && new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$").test(email) ? true:false;
}

export function isPhone(phone:string):boolean{
  return phone && new RegExp("^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$").test(phone) ? true:false;
}

export function isChinese(chinese:string):boolean{
  return chinese && new RegExp("^[\u4e00-\u9fa5]+$").test(chinese) ? true:false;
}

export function isTelephone(telephone:string):boolean{
  return telephone && new RegExp("^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$").test(telephone) ? true:false;
}

export function isIdentifyNo(no:string):boolean{
  return no ? (IdentifyNoUtil.check15no(no) || IdentifyNoUtil.check18no(no)):false;
}

export function getIdentifyInfo(no:string):any{
  if(isIdentifyNo(no)){
    return IdentifyNoUtil.getIdCardInfo(no);
  }
  return null;
}

// 只能输入26个英文字母
export function isLetter(letter:string,isUpper?:boolean):boolean{
  if(isUpper===undefined){
    return letter && new RegExp("^[A-Za-z]+$").test(letter) ? true:false;
  } else if(isUpper===true){
    return letter && new RegExp("^[A-Z]+$").test(letter) ? true:false;
  } else if(isUpper===false){
    return letter && new RegExp("^[a-z]+$").test(letter) ? true:false;
  }
  return letter && new RegExp("^[A-Za-z]+$").test(letter) ? true:false;
}

// 只能输入由数字、26个英文字母
export function isIntLetter(val:string):boolean{
  return val && new RegExp("^[A-Za-z0-9]+$").test(val) ? true:false;
}

// 只能输入由数字、26个英文字母或者下划线组成的字符串
export function isIntLetterUnderline(val:string):boolean{
  return val && new RegExp("^[A-Za-z0-9_]+$").test(val) ? true:false;
}


export function isPostcode(code:string):boolean{
  return code && new RegExp("^[1-9][0-9]{5}$").test(code) ? true:false;
}

export function trim(val:string):string{
  return  val.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

export function validPassword(val:string,option?:PasswordOption):boolean{
  const op = {
    hasUpperLetter:true,
    hasLowerLetter:true,
    hasSpecialLetter:true,
    hasNumber:true,
    minLength:6,
    maxLength:18
  };
  if(option){
    Object.assign(op,option);
  }
  const regExps = [];
  if(op.hasUpperLetter) regExps.push("[A-Z]");
  if(op.hasLowerLetter) regExps.push("[a-z]");
  if(op.hasSpecialLetter) regExps.push("[^A-Za-z0-9_]");
  if(op.hasNumber) regExps.push("[0-9]");
  regExps.push(`^.{${op.minLength},${op.maxLength}}$`);
  let i;
  let len;
  let reg;
  len = regExps.length;
  for(i=0;i<len;i++){
    reg = new RegExp(regExps[i]);
    if(!val.match(reg)){
      return false;
    }
  }
  return true;
}