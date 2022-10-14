import { formatMoney, formatPercent, numberToChinese } from '../src/number';

describe('stringUtil', () => {
  it('formatMoney',()=>{
    expect(formatMoney(54321)).toBe('$54,321');
    expect(formatMoney(54321,0,'¥')).toBe('¥54,321');
    expect(formatMoney(54321,2,'¥')).toBe('¥54,321.00');
    expect(formatMoney(54321.22,3,'¥',',','_')).toBe('¥54,321_220');
  });

  it('formatPercent',()=>{
    expect(formatPercent(0.1320)).toBe('13%');
    expect(formatPercent(0.1360)).toBe('14%');
    expect(formatPercent(0.13897,2)).toBe('13.90%');
    expect(formatPercent(1.5,2)).toBe('150.00%');
  });

  it('numberToChinese',()=>{
    expect(numberToChinese(1234.50)).toBe('壹仟贰佰叁拾肆元伍角');
  });

});