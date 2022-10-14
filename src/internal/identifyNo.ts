/*省,直辖市代码表*/
const ProvinceAndCitys:any  = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",
45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",
65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
/*每位加权因子*/
const Powers:string[] = ["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"];
/*第18位校检码*/
const ParityBit:string[] = ["1","0","X","9","8","7","6","5","4","3","2"];
/*性别*/
const Genders:any =  {male:"M",female:"F"};

const identifyNoUtil = {
  /*校验地址码*/
  checkAddressCode(addressCode: string){
      const check = /^[1-9]\d{5}$/.test(addressCode);
      if(!check) return false;
      // tslint:disable-next-line:radix
      if(ProvinceAndCitys[parseInt(addressCode.substring(0,2))]){
          return true;
      }else{
          return false;
      }
  },

  /*校验日期码*/
  checkBirthDayCode(birDayCode: string){
      const check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
      if(!check) return false;
      const yyyy = parseInt(birDayCode.substring(0,4),10);
      const mm = parseInt(birDayCode.substring(4,6),10);
      const dd = parseInt(birDayCode.substring(6),10);
      const xdata = new Date(yyyy,mm-1,dd);
      if(xdata > new Date()){
          return false;// 生日不能大于当前日期
      }else if ( ( xdata.getFullYear() === yyyy ) && ( xdata.getMonth () === mm - 1 ) && ( xdata.getDate() === dd ) ){
          return true;
      }else{
          return false;
      }
  },

  /*计算校检码*/
  getParityBit(no: string):any{
      const id17 = no.substring(0,17);
      /*加权 */
      let power = 0;
      for(let i=0;i<17;i++){
          // tslint:disable-next-line:radix
          power += parseInt(id17.charAt(i),10) * parseInt(Powers[i]);
      }
      /*取模*/
      const mod = power % 11;
      return ParityBit[mod];
  },

  /*验证校检码*/
  checkParityBit(no: string){
      const parityBit = no.charAt(17).toUpperCase();
      if(identifyNoUtil.getParityBit(no) === parityBit){
          return true;
      }else{
          return false;
      }
  },

  /*校验15位或18位的身份证号码*/
  checkno(no: string){
      // 15位和18位身份证号码的基本校验
      const check = /^\d{15}|(\d{17}(\d|x|X))$/.test(no);
      if(!check) return false;
      // 判断长度为15位或18位
      if(no.length===15){
          return identifyNoUtil.check15no(no);
      }else if(no.length===18){
          return identifyNoUtil.check18no(no);
      }else{
          return false;
      }
  },

  // 校验15位的身份证号码
  check15no(no: string){
      // 15位身份证号码的基本校验
      let check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(no);
      if(!check) return false;
      // 校验地址码
      const addressCode = no.substring(0,6);
      check = identifyNoUtil.checkAddressCode(addressCode);
      if(!check) return false;
      const birDayCode = '19' + no.substring(6,12);
      // 校验日期码
      check = identifyNoUtil.checkBirthDayCode(birDayCode);
      if(!check) return false;
      // 验证校检码
      return identifyNoUtil.checkParityBit(no);
  },

  // 校验18位的身份证号码
  check18no(no: string){
      // 18位身份证号码的基本格式校验
      let check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(no);
      if(!check) return false;
      // 校验地址码
      const addressCode = no.substring(0,6);
      check = identifyNoUtil.checkAddressCode(addressCode);
      if(!check) return false;
      // 校验日期码
      const birDayCode = no.substring(6,14);
      check = identifyNoUtil.checkBirthDayCode(birDayCode);
      if(!check) return false;
      // 验证校检码
      return identifyNoUtil.checkParityBit(no);
  },

  formateDateCN(day: string){
      const yyyy =day.substring(0,4);
      const mm = day.substring(4,6);
      const dd = day.substring(6);
      return yyyy + '-' + mm +'-' + dd;
  },

  // 获取信息
  getIdCardInfo(no: string){
      const idCardInfo = {
          gender:"",  // 性别
          birthday:"" // 出生日期(yyyy-mm-dd)
      };
      if(no.length===15){
          const aday = '19' + no.substring(6,12);
          idCardInfo.birthday=identifyNoUtil.formateDateCN(aday);
          // tslint:disable-next-line:radix
          if(parseInt(no.charAt(14))%2===0){
              idCardInfo.gender=Genders.female;
          }else{
              idCardInfo.gender=Genders.male;
          }
      }else if(no.length===18){
          const aday = no.substring(6,14);
          idCardInfo.birthday=identifyNoUtil.formateDateCN(aday);
          // tslint:disable-next-line:radix
          if(parseInt(no.charAt(16))%2===0){
              idCardInfo.gender=Genders.female;
          }else{
              idCardInfo.gender=Genders.male;
          }

      }
      return idCardInfo;
  },

  /*18位转15位*/
  getId15(no: string){
      if(no.length===15){
          return no;
      }else if(no.length===18){
          return no.substring(0,6) + no.substring(8,17);
      }else{
          return null;
      }
  },

  /*15位转18位*/
  getId18(no: string){
      if(no.length===15){
          const id17 = no.substring(0,6) + '19' + no.substring(6);
          const parityBit = identifyNoUtil.getParityBit(id17);
          return id17 + parityBit;
      }else if(no.length===18){
          return no;
      }else{
          return null;
      }
  }
};

export default identifyNoUtil;