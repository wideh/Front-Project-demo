import h from './dom/h';
import patch from './dom/patch';

// 获取到的真实dom
const container = document.getElementById("container");
const btn = document.getElementById("btn");
// 虚拟节点

const vnode1 = h('div', {}, [
  h('span', { key: 'a' }, 'a'),
  h('span', { key: 'b' }, 'b'),
  h('span', { key: 'c' }, 'c'),
  h('span', { key: 'd' }, 'd'),
]);

const vnode2 = h('div', {}, [
  h('span', { key: 'b' }, 'b'),
  h('span', { key: 'a' }, 'a'),
  h('span', { key: 'd' }, 'd'),
  h('span', { key: 'c' }, 'c'),
]);

patch(container, vnode1);

btn.onclick = function() {
  patch(vnode1, vnode2);
}
