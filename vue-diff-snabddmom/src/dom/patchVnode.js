import createElement from "./createElement";
import updateChildren from "./updateChildren";

// 处理相同节点，复杂情况
export default function patchVnode(oldVnode, newVnode) {
  // 判断新节点有没有children
  if( newVnode.children === undefined ) {
    // 新旧内容不一样，才修改
    if( newVnode.text !== oldVnode.text ) {
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 新的和旧的都有children
    if(oldVnode.children && oldVnode.children.length > 0) {
      // 最复杂情况，diff核心了
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children) 
    } else {
      // 新的有，旧的没有children
      // 把旧节点的内容清空
      oldVnode.elm.innerHTML = '';
      newVnode.elm = oldVnode.elm;
      // 遍历新的子节点，创建dom，添加到页面中
      for(let child of newVnode.children) {
        let childDom = createElement(child);
        oldVnode.elm.appendChild(childDom);
      }
    }
  }
}