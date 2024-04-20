/**新老节点替换规则
 * 1.如果新老节点不是同一个节点名称（如h1变为div），那么就暴力删除旧的节点，创建插入新的节点。
 * 2.只能同级比较，不能跨层。如果跨层那么就暴力删除旧的节点，创建插入新的节点。
 * 3.在加入key时，同层比较，才不会暴力删除创建。调换顺序、添加新的节点，删除节点，都不会重新创建已有的节点。
 */
import vnode from "./vnode";
import createElement from "./createElement";
import patchVnode from './patchVnode';

export default function(oldVnode, newVnode) {

  // 如果oldVnode没有sel, 就证明是非虚拟节点，就让他变成虚拟节点
  if(oldVnode.sel === undefined) {
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode,
    )
  }

  // 判断是否是同一个节点
  if(oldVnode.sel === newVnode.sel) {
    patchVnode(oldVnode, newVnode);
  } else {
    // 不是同一节点，暴力删除，重新创建
    // 创建新的虚拟节点为dom节点。
    const newVnodeElm = createElement(newVnode);
    // 获取旧的节点
    const oldVnodeElm = oldVnode.elm;
    // 创建新的节点
    if(newVnodeElm) {
      oldVnodeElm.parentNode.appendChild(newVnodeElm)
    }
    // 删除旧的节点
    oldVnodeElm.parentNode.removeChild(oldVnodeElm);
  }
}