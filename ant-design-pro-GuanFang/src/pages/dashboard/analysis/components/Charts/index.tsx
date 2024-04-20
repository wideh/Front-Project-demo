// import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field';

// const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0.')}`;
function numberFormart(n:any) {
  if(n == null || n == undefined) {
    return ''
  }
  const tempArr = n.toString().split('.');
  let integer,
      mantissa;
  if(tempArr && tempArr.length > 0) {
    if(tempArr[0]) {
      integer = tempArr[0].replace(/\d+/, function (m:any) {
        return m.replace(/(?=(\B)(\d{3})+$)/g, ',')
      })
    }
    if(tempArr[1]) {
      mantissa = tempArr[1].replace(/\d+/, function (m:any) {
        return m.replace(/(\d{3})(?=(\d+)$)/g, function (y:any) {
          return y + ","
        })
      })
    }
  }
  return (integer ? integer : '') + (mantissa ? '.' + mantissa : '');
}

// function number(s:any, n:any) {
//   n = n >= 0 && n <= 20 ? n : 2;
//   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
//   var l = s
//     .split(".")[0]
//     .split("")
//     .reverse(),
//     r = s.split(".")[1];
//   r = r == null ? "" : "." + r;
//   var t = "";
//   console.log(l)
//   if (l[l.length - 1] === '-') {//负数不需要分隔号,

//     for (var i = 0; i < l.length; i++) {
//       if (l[i]==='-') {
//         t += l[i]+""
//         continue
//       }
//       //不是数组的倒数第二个元素才加"," ["0", "4", "5", "-"]
//       t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length-1 ? "," : "");

//       //i + 1 != l.length会变成-,540.00,因为在5时元素位置2+1为3非数组长度
//       //t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
//     }
//   }
//   else {
//     for (var i = 0; i < l.length; i++) {
//       t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
//     }
//   }
//   return (
//     t
//       .split("")
//       .reverse()
//       .join("") + r
//   );
// }

const yuan = (val?: number | string | null | undefined) => `¥ ${numberFormart(val)}`;

const Charts = {
  yuan,
  ChartCard,
  Field,
};

export { Charts as default, yuan, ChartCard, Field };
