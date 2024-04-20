import createElement from "./createElement";
import patchVnode from "./patchVnode";

/**
 * 判断两个节点是否一样
 */
function sameVnode( vNode1, vNode2) {
  return vNode1.key === vNode2.key;
}

/**
 * @param {真实dom节点} parentElm 
 * @param {旧的虚拟节点} oldCh 
 * @param {新的虚拟节点} newCh 
 */
export default ( parentElm, oldCh, newCh ) => {
  let oldStartIndex = 0, // 旧前的指针
      oldEndIndex = oldCh.length - 1,
      newStartIndex = 0, // 新前的指针
      newEndIndex = newCh.length - 1;

  let oldStartVnode = oldCh[0], // 旧前的虚拟节点
      oldEndVnode = oldCh[oldEndIndex], // 旧后的虚拟节点
      newStartVnode = newCh[0],
      newEndVnode = newCh[newEndIndex];
  
  while( oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if( oldStartVnode === undefined) {

      // 由于第五种情况，将旧的虚拟节点设置为了undefined，
      // 读取到为undefined时，直接++;
      oldStartVnode = oldCh[++oldStartIndex];

    } if( oldEndVnode === undefined) {

      // 由于第五种情况，将旧的虚拟节点设置为了undefined，
      oldEndVnode = oldCh[--oldEndIndex];

    } else if(sameVnode(oldStartVnode, newStartVnode)) {

      patchVnode(oldStartVnode, newStartVnode);
      if(newStartVnode) newStartVnode.elm = oldStartVnode?.elm;
      oldStartVnode = oldCh[++oldStartIndex];
      newStartVnode = newCh[++newStartIndex];

    } else if(sameVnode(oldEndVnode, newEndVnode)) {

      patchVnode(oldEndVnode, newEndVnode);
      if(newEndVnode) newEndVnode.elm = oldEndVnode?.elm;
      oldEndVnode = oldCh[--oldEndIndex];
      newEndVnode = newCh[--newEndIndex];

    } else if(sameVnode(oldStartVnode, newEndVnode)) {

      patchVnode(oldStartVnode, newEndVnode);
      if(newEndVnode) newEndVnode.elm = oldStartVnode?.elm;

      // 此时就要调整页面位置了，把旧前节点移动到旧后节点的后面
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)

      oldStartVnode = oldCh[++oldStartIndex];
      newEndVnode = newCh[--newEndIndex];

    } else if(sameVnode(oldEndVnode, newStartVnode)) {
      
      patchVnode(oldEndVnode, newStartVnode);
      if(newStartVnode) newStartVnode.elm = oldEndVnode?.elm;

      // 此时就要调整页面位置了，把旧后节点移动到旧前节点的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)

      oldEndVnode = oldCh[--oldEndIndex];
      newStartVnode = newCh[++newStartIndex];

    } else {
      // 创建一个对象，存储虚拟节点的（判断新旧有没有相同节点）
      const keyMap = {};
      for (let i = oldStartIndex; i < oldEndIndex; i++) {
        const key = oldCh[i]?.key;
        if(key) keyMap[key] = i;
      }
      // 在旧节点中寻找新前指向的节点
      let idxInOld = keyMap[newStartVnode.key];
      if(idxInOld) {
        // 说明在新旧虚拟节点都存在
        const elmMove = oldCh[idxInOld];
        patchVnode(elmMove, newStartVnode);
        // 处理过的节点，在旧虚拟节点的数组中，设置为undefined
        oldCh[idxInOld] = undefined;
        parentElm.insertBefore(elmMove.elm, oldStartVnode.elm)
      } else {
        // 如果没有找到，说明是一个新节点[创建]
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      }
      // 新数据指针+1
      newStartVnode = newCh[++newStartIndex];
    }
  }

  // 结束while 只有两种情况 (新增和删除)
  // 1.oldStartIndex > oldEndIndex，说明新节点增加了
  // 2.newStartIndex > newEndIndex，说明新节点减少了
  if(oldStartIndex > oldEndIndex) {
    const before = newCh[newEndIndex+1] ? newCh[newEndIndex+1].elm : null;
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parentElm.insertBefore(createElement(newCh[i]), before)
    }
  } else {
    // 进入删除操作
    for(let i = oldStartIndex; i <= oldEndIndex; i++) {
      parentElm.removeChild(oldCh[i].elm);
    }
  }
}