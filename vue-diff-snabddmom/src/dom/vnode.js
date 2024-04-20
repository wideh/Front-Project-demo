/**
 * @param {元素标签} sel 
 * @param {key等数据} data 
 * @param {子节点} children 
 * @param {标签内容} text 
 * @param {真实节点} elm 
 */
export default function (sel, data, children, text, elm) {
  let key = data.key;
  return {
    sel,
    data,
    children,
    text,
    elm,
    key,
  }
}