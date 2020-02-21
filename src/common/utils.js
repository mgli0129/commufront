import moment from 'moment'
//时间转换方法
// function getTs(time) {
//   var arr = time.split(/[- :]/),
//     _date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]),
//     timeStr = Date.parse(_date);
//   return timeStr;
// }

export function leftTime(sourceDate, withTime) {
// 拿到当前时间戳和发布时的时间戳，然后得出时间戳差
  let curTime = new Date();
  // let timeDiff = curTime.getTime() - getTs(sourceDate);
  let timeDiff = curTime.getTime() - sourceDate;

  // 单位换算
  let min = 60 * 1000;
  let hour = min * 60;
  let day = hour * 24;
  let week = day * 7;
  let month = week * 4;
  let year = month * 12;

  // 计算发布时间距离当前时间的周、天、时、分
  let exceedyear = Math.floor(timeDiff / year);
  let exceedmonth = Math.floor(timeDiff / month);
  let exceedWeek = Math.floor(timeDiff / week);
  let exceedDay = Math.floor(timeDiff / day);
  let exceedHour = Math.floor(timeDiff / hour);
  let exceedMin = Math.floor(timeDiff / min);

  //三个月以上的输出为年月日
  let outDate = moment(sourceDate).format('YYYY-MM-DD');
  let outDateWithTime = moment(sourceDate).format('YYYY-MM-DD HH:mm:ss');

  // 最后判断时间差到底是属于哪个区间，然后return

  if (exceedmonth > 3) {
    return (withTime == 'Y') ? outDateWithTime : outDate;
  } else if (exceedmonth < 4 && exceedmonth > 0) {
    return exceedmonth + '月前';
  } else {
    if (exceedWeek < 4 && exceedWeek > 0) {
      return exceedWeek + '星期前';
    } else {
      if (exceedDay < 7 && exceedDay > 0) {
        return exceedDay + '天前';
      } else {
        if (exceedHour < 24 && exceedHour > 0) {
          return exceedHour + '小时前';
        } else {
          return exceedMin + '分钟前';
        }
      }
    }
  }
};
