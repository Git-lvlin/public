/*
  * 判断obj是否为一个整数
  */
const isInteger = (obj) => Math.floor(obj) === obj;

/*
  * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
  * @param floatNum {number} 小数
  * @return {object}
  *   {times:100, num: 314}
  */
const toInteger = (floatNum) => {
  const ret = { times: 1, num: 0 };
  if (isInteger(floatNum)) {
    ret.num = floatNum;
    return ret;
  }
  const strfi = floatNum.toString();
  const dotPos = strfi.indexOf('.');
  const len = strfi.substr(dotPos + 1).length;
  const times = 10 ** len;
  const intNum = parseInt(floatNum * times + 0.5, 10);
  ret.times = times;
  ret.num = intNum;
  return ret;
};

/*
  * 核心方法，实现加减乘除运算，确保不丢失精度
  * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
  *
  * @param a {number} 运算数1
  * @param b {number} 运算数2
  * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
  *
  */
const operation = (a, b, op) => {
  const o1 = toInteger(+a);
  const o2 = toInteger(+b);
  const n1 = o1.num;
  const n2 = o2.num;
  const t1 = o1.times;
  const t2 = o2.times;
  const max = t1 > t2 ? t1 : t2;
  let result = null;
  switch (op) {
    case 'add':
      if (t1 === t2) { // 两个小数位数相同
        result = n1 + n2;
      } else if (t1 > t2) { // o1 小数位 大于 o2
        result = n1 + n2 * (t1 / t2);
      } else { // o1 小数位 小于 o2
        result = n1 * (t2 / t1) + n2;
      }
      return result / max;
    case 'reduce':
      if (t1 === t2) {
        result = n1 - n2;
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2);
      } else {
        result = n1 * (t2 / t1) - n2;
      }
      return result / max;
    case 'multiply':
      result = (n1 * n2) / (t1 * t2);
      return result;
    case 'divide':
      result = (n1 / n2) * (t2 / t1);
      return result;
    default:
      return 0;
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


//将阿拉伯数字转换成中文数字
function numberToChinese(num) {
  const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const chineseUnits = ['', '十', '百', '千'];
 
  if (num === 0) {
    return chineseNums[0];
  }
 
  let chineseStr = '';
  let unitIndex = 0;
 
  while (num > 0) {
    const digit = num % 10;
    if (digit !== 0) {
      // 处理非零数字
      chineseStr = chineseNums[digit] + chineseUnits[unitIndex] + chineseStr;
    } else if (chineseStr.charAt(0) !== chineseNums[0]) {
      // 处理连续的零，只保留一个零
      chineseStr = chineseNums[0] + chineseStr;
    }
 
    num = Math.floor(num / 10);
    unitIndex++;
  }
 
  return chineseStr;
}

export default {
  // 加
  add(a, b) {
    return operation(a, b, 'add');
  },
  // 减
  reduce(a, b) {
    return operation(a, b, 'reduce');
  },
  // 乘
  multiply(a, b) {
    return operation(a, b, 'multiply');
  },
  // 除
  divide(a, b) {
    return operation(a, b, 'divide');
  },
  sleep,
  numberToChinese
};