import {isEmail,isPhone,isChinese,isTelephone,isIdentifyNo,isLetter,isIntLetter,isIntLetterUnderline,validPassword} from '../src/string';

describe('stringUtil', () => {
  it('isEmail', () => {
    expect(isEmail('daizhaohui@sohu.com')).toBe(true);
    expect(isEmail('test1@')).toBe(false);
    expect(isEmail('test1111')).toBe(false);
  });

  it('isPhone', () => {
    expect(isPhone('18916666069')).toBe(true);
    expect(isPhone('123456789091')).toBe(false);
    expect(isPhone('test1111')).toBe(false);
    expect(isPhone('13189762345')).toBe(true);
    expect(isPhone('021-898900888')).toBe(false);
  });

  it('isChinese', () => {
    expect(isChinese('18916666069')).toBe(false);
    expect(isChinese('qeeee')).toBe(false);
    expect(isChinese('李刚')).toBe(true);
    expect(isChinese('王而忙111')).toBe(false);
    expect(isChinese(' 李刚')).toBe(false);
  });

  it('isTelephone', () => {
    expect(isTelephone('021-88490515')).toBe(true);
    expect(isTelephone('02188490515')).toBe(false);
    expect(isTelephone('021-88760976')).toBe(true);
    expect(isTelephone('02188760976111')).toBe(false);
  });


  it('isIdentifyNo', () => {
    expect(isIdentifyNo('320822197906100015')).toBe(true);
    expect(isIdentifyNo('32082219790610001x')).toBe(false);
    expect(isIdentifyNo('3q2082219790610001')).toBe(false);
    expect(isIdentifyNo('39790610001')).toBe(false);
  });

  it('isLetter', () => {
    expect(isLetter('adbcddDDD')).toBe(true);
    expect(isLetter('adbcddDDD',true)).toBe(false);
    expect(isLetter('ABC',true)).toBe(true);
    expect(isLetter('adbc',false)).toBe(true);
    expect(isLetter('ADB',false)).toBe(false);
  });

  it('isIntLetter', () => {
    expect(isIntLetter('adbcddDDD22221')).toBe(true);
    expect(isIntLetter('adbcddDDD_1')).toBe(false);
    expect(isIntLetter('12345678')).toBe(true);
    expect(isIntLetter('abcdefg')).toBe(true);
  });

  it('isIntLetteUnderline', () => {
    expect(isIntLetterUnderline('adbcddDDD_22221')).toBe(true);
    expect(isIntLetterUnderline('adbcddDDD1+')).toBe(false);
    expect(isIntLetterUnderline('adbcddDDD1-)')).toBe(false);
    expect(isIntLetterUnderline('adbcddDDD1}')).toBe(false);
    expect(isIntLetterUnderline('12345678')).toBe(true);
    expect(isIntLetterUnderline('abcdefg')).toBe(true);
  });

  it('validPassword', () => {
    expect(validPassword('adbcddDDD_22221')).toBe(false);
    expect(validPassword('adbcddDDD@22221')).toBe(true);
    expect(validPassword('adbcdd_22221')).toBe(false);
    expect(validPassword('adbcdd_~~!!')).toBe(false);
    expect(validPassword('aD_~1')).toBe(false);
    expect(validPassword('adbcddDDD@_',{hasNumber:false})).toBe(true);
  });
});

