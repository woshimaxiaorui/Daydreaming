import _ from 'lodash';

/**
 * 时间加减计算
 * @param string part
 * @param number n
 * @param date date
 * @constructor
 */
export const dateAdd = (part: string, n: number, date: string) => {
  if(_.isEmpty(date)){
    return '';
  }
  let formatDate = 0;
  let tempDate = new Date(date);

  // return tempDate;
  n *= 1;
  if(isNaN(n)){
    n = 0;
  }
  switch (part) {
    case 'y':
      formatDate = tempDate.setFullYear(tempDate.getFullYear() + n);
      break;
    case 'm':
      formatDate = tempDate.setMonth(tempDate.getMonth() + n);
      break;
    case 'w':
      formatDate = tempDate.setDate(tempDate.getDate() + n * 7);
      break;
    case 'd':
      formatDate = tempDate.setDate(tempDate.getDate() + n);
      break;
    case 'h':
      formatDate = tempDate.setHours(tempDate.getHours() + n);
      break;
    case 'n':
      formatDate = tempDate.setMinutes(tempDate.getMinutes() + n);
      break;
    case 's':
      formatDate = tempDate.setSeconds(tempDate.getSeconds() + n);
      break;
  }

  return formatTime(new Date(formatDate).getTime(),'Y-m-d H:i:s');
}

// 格式化日期，如月、日、时、分、秒保证为2位数

/**
 * 格式化日期单位，如月、日、时、分、秒保证为2位数
 * @param n
 */
export const formatNumber = (n: any) => {
  n = n.toString()
  return n[1] ? n : '0' + n;
}

// 参数number为毫秒时间戳，format为需要转换成的日期格式
/**
 * 格式化日期
 * @param number
 *    毫秒时间戳
 * @param format
 *    需要转换成的日期格式
 */
export const formatTime = (number: any, format: any) => {
  let time = new Date(number)
  let newArr = []
  let formatArr = ['Y', 'm', 'd', 'H', 'i', 's']
  newArr.push(time.getFullYear())
  newArr.push(formatNumber(time.getMonth() + 1))
  newArr.push(formatNumber(time.getDate()))

  newArr.push(formatNumber(time.getHours()))
  newArr.push(formatNumber(time.getMinutes()))
  newArr.push(formatNumber(time.getSeconds()))

  for (let i in newArr) {
    format = format.replace(formatArr[i], newArr[i])
  }
  return format;
}
