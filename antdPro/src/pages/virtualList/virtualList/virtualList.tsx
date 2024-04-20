/**参考 https://www.jb51.net/article/212446.htm */

import React, { useState } from 'react';
// import { VirtualList } from 'biz-web-library';

// 循环缓存列表的总体初始化高度
export const initPositinoCache = (
  estimatedItemSize: number = 32,
  length: number = 0,
) => {
  let index = 0,
  positions = Array(length);
  while (index < length) {
    positions[index] = {
      index,
      height: estimatedItemSize,
      top: index * estimatedItemSize,
      bottom: (index++ + 1) * estimatedItemSize,
    };
  }
  return positions;
};

// 工具函数，放入工具文件
export const binarySearch = (list: Array<any>, value: number = 0) => {
  let start: number = 0;
  let end: number = list.length - 1;
  let tempIndex = null;
  while (start <= end) {
    let midIndex = Math.floor((start + end) / 2);
    let midValue = list[midIndex].bottom;
 
    // 值相等，则直接返回 查找到的节点（因为是bottom, 因此startIndex应该是下一个节点）
    if (midValue === value) {
      return midIndex + 1;
    }
    // 中间值 小于 传入值，则说明 value对应的节点 大于 start, start往后移动一位
    else if (midValue < value) {
      start = midIndex + 1;
    }
    // 中间值 大于 传入值，则说明 value 在 中间值之前，end 节点移动到 mid - 1
    else if (midValue > value) {
      // tempIndex存放最靠近值为value的所有
      if (tempIndex === null || tempIndex > midIndex) {
        tempIndex = midIndex;
      }
      end = midIndex - 1;
    }
  }
  return tempIndex;
};

// 下面是工具函数，放在其他文件中的
export const getListHeight = (positions: Array<any>) => {
  let index = positions.length - 1;
  return index < 0 ? 0 : positions[index].bottom;
};

export const getEndIndex = (
  resources: Array<any>,
  startIndex: number,
  visibleCount: number,
  ) => {
  let resourcesLength = resources.length;
  let endIndex = startIndex + visibleCount;
  return resourcesLength > 0 ? Math.min(resourcesLength, endIndex) : endIndex;
}

// 下面是工具函数，放在其他文件中的
export const updateItemSize = (
  positions: Array<any>,
  items: HTMLCollection,
) => {
  Array.from(items).forEach(item => {
    let index = Number(item.getAttribute('data-index'));
    let { height } = item.getBoundingClientRect();
    let oldHeight = positions[index].height;
    //存在差值, 更新该节点以后所有的节点
    let dValue = oldHeight - height;
    if (dValue) {
      positions[index].bottom = positions[index].bottom - dValue;
      positions[index].height = height;
      for (let k = index + 1; k < positions.length; k++) {
        positions[k].top = positions[k - 1].bottom;
        positions[k].bottom = positions[k].bottom - dValue;
      }
    }
  });
};
 
//获取当前的偏移量
export const getStartOffset = (
  startIndex: number,
  positions: Array<any> = [],
) => {
  return startIndex >= 1 ? positions[startIndex - 1]?.bottom : 0;
};

// 缓存所有item的位置
let positions: Array<any>;
 
class VirtualList extends React.Component<any, any>{

  static getDerivedStateFromProps(
    nextProps: any,
    prevState: any,
  ) {
    const { resources, estimatedItemSize } = nextProps;
    if (resources !== prevState.resources) {
      positions = initPositinoCache(estimatedItemSize, resources.length);
      // 更新高度
      let listHeight = getListHeight(positions);
      // 更新总偏移量
      let startOffset = getStartOffset(prevState.startIndex, positions);
      let endIndex = getEndIndex(resources, prevState.startIndex, prevState.visibleCount);
      return {
        resources,
        listHeight,
        startOffset,
        endIndex,
      };
    }
    return null;
  }
  
  constructor(props:any) {
    super(props);
    const { resources } = this.props;
 
    // 初始化缓存
    positions = initPositinoCache(props.estimatedItemSize, resources.length);
    this.state = {
      resources,
      startOffset: 0,
      listHeight: getListHeight(positions),  // positions最后一条数据的bottom属性
 
      scrollRef: React.createRef(),  // 虚拟列表容器ref
      items: React.createRef(), // 虚拟列表显示区域ref
      visibleCount: 10, // 一页可视区域条数
      startIndex: 0, // 可视区域开始索引
      endIndex: 10, // // 可视区域结束索引
    };
  }

  componentDidMount() {
    this.getEl().addEventListener('scroll', this.onScroll, false);
    // events.on(this.getEl(), 'mousewheel', NOOP, false);
    const { estimatedItemSize } = this.props;
    // 根据渲染，计算最新的节点
    let visibleCount = Math.ceil(this.getEl().offsetHeight / estimatedItemSize);
    if (visibleCount === this.state.visibleCount || visibleCount === 0) {
      return;
    }
    // 因为 visibleCount变更， 更新endIndex, listHeight/ 偏移量
    this.updateState({ visibleCount, startIndex: this.state.startIndex });
  }

  // componentDidUpdate() {
  //   this.updateHeight();
  // }
   
  getEl = () => {
    let el = this.state.scrollRef || this.state.items;
    let parentEl: any = el.current?.parentElement;
    switch (window.getComputedStyle(parentEl)?.overflowY) {
      case 'auto':
      case 'scroll':
      case 'overlay':
      case 'visible':
        return parentEl;
    }
    return document.body;
  };
   
  onScroll = () => {
    requestAnimationFrame(() => {
      let { scrollTop } = this.getEl();
      let startIndex = binarySearch(positions, scrollTop);
  
      // 因为 startIndex变更， 更新endIndex, listHeight/ 偏移量
      this.updateState({ visibleCount: this.state.visibleCount, startIndex});
    });
  };

  updateState = (data:any) => {
    // 根据新计算的节点，更新data数据
    const {visibleCount, startIndex} = data
    this.setState({
      startOffset: startIndex >= 1 ? positions[startIndex - 1]?.bottom : 0,
      listHeight: getListHeight(positions),
      startIndex,
      visibleCount,
      endIndex: getEndIndex(this.state.resources, startIndex, visibleCount)
    });
  };

  updateHeight = () => {
    let items: HTMLCollection = this.state.items.current?.children;
    if (!items.length) return;
   
    // 更新缓存
    updateItemSize(positions, items);
   
    // 更新总高度
    let listHeight = getListHeight(positions);
   
    // 更新总偏移量
    let startOffset = getStartOffset(this.state.startIndex, positions);
   
    this.setState({
      listHeight,
      startOffset,
    });
  };
 
 
  // 布局
  render() {
    const { ItemRender, extrea } = this.props;
    const { listHeight, startOffset, resources, startIndex, endIndex, items, scrollRef  } = this.state;
    let visibleData = resources.slice(startIndex, endIndex);
  
    return (
      <div ref={scrollRef} style={{ height: `${listHeight}px` }}>
        <ul
          ref={items}
          style={{
            transform: `translate3d(0,${startOffset}px,0)`,
          }}
        >
          {visibleData.map((data:any, index:number) => {
            return (
              <li key={data.id || data.key || index} data-index={`${startIndex + index}`}>
                <ItemRender data={data} {...extrea}/>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}



// 初始化列表数据
const getDatas = () => {
  const datas = [];
  for (let i = 0; i < 100000; i++) {
    datas.push(`${i} Item`);
  }
  return datas;
};

// 定义每一条数据显示的组件
const ItemRender = (props:any) => {
  let dindex = parseInt(props.data);
  let lineHeight = dindex % 2 ? '40px' : '80px';
  return (
    <div style={{ lineHeight, background: dindex % 2 ? '#f5f5f5' : '#fff' }}>
      <h3>#{dindex} title name</h3>
      <p>尽情地书写你想编写的内容，不局限于页面高度</p>
    </div>
  );
};
const ItemRenderMemo = React.memo(ItemRender);

// 使用虚拟列表
export default () => {
  let [resources, setResources] = useState<any>([]);
  const changeResources = () => {
    setResources(getDatas());
  };
 
  return (
    <div>
      <button onClick={changeResources}>click me </button>
 
      <div
        style={{
          height: '400px',
          overflow: 'auto',
          border: '1px solid #f5f5f5',
          padding: '0 10px',
        }}
      >
        <VirtualList
          ItemRender={ItemRenderMemo}
          resources={resources}
          estimatedItemSize={60}
        />
      </div>
    </div>
  );
};