// vnode为新节点，就是要创建的节点
export default function createElement ( vnode ) {
  // 创建dom节点
  let domNode = document.createElement( vnode.sel );
  // 判断有没有子节点
  if( vnode.children === undefined ) {
    // 没有子节点，就是文本节点
    domNode.innerText = vnode.text;
  } else if( Array.isArray(vnode.children) ) {
    // 有子节点，就递归
    for(let child of vnode.children) {
      let childDom = createElement(child);
      domNode.appendChild(childDom);
    }
  } 
  // 补充elm(真实节点)属性
  vnode.elm = domNode;
  return domNode;
}