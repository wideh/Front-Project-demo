import React from "react";
import './index.less';
/**
 * 列表假数据 长度1000
 * */
 const data:any = [];
 for (let i = 0;i< 1000000; i++ ){
   data.push({
     key: i.toString(),
     val: 'Item' + i,
   })
 }
 /*
  * 假设每项数据的dom元素高度为30px
  * 实际项目可能每项高度不一样
  * */
const itemH = 30;

class SimpleSirtualList extends React.Component<{state:any}>{
  
  virtualList:any;

  constructor(props:any) {
    super(props);

    // 可视区域dom结构
    this.virtualList = React.createRef();

    // 计算总高度
    const totalH = data.length * itemH + 'px';

    this.state = {
      data: [], // 可视区域数据
      totalHeight: totalH, // 长列表总高度 列表中每一项数据高度总和
      transform:'',
    }


  }

  componentDidMount(){
    this.updateViewContent();
  }

  handleScroll = (e:any) => {
    /*
     * 获取scrollTop
     * 此属性可以获取或者设置对象的最顶部到对象在当前窗口显示的范围内的顶边的距离
     * 也就是元素滚动条被向下拉动的距离
     * */
    requestAnimationFrame(() => {
      this.updateViewContent(e.target.scrollTop);
    });
  };

  updateViewContent = (scrollTop = 0) => {
    // 计算可视区域里能放几个元素
    const viewCount = Math.ceil(this.virtualList.current.clientHeight/itemH);
    // 计算可视区域开始的索引
    const start = Math.floor(scrollTop/itemH);
    // 计算可视区域结束索引
    const end = start + viewCount;
    // 截取可视区域数据
    const viewData = data.slice(start,end);

    this.setState({
      data: viewData,

      // 把可见区域的 top 设置为起始元素在整个列表中的位置
      transform:`translate3d(0, ${ start * itemH }px, 0)`
    })
  };

  render(){
    const { totalHeight, transform, data } = this.state as any;

    return (
      <div className="virtual-list" onScroll={this.handleScroll} ref={this.virtualList}>
        <div className="virtual-list-height" style={{height: totalHeight}} />
        <div className="view-content" style={{transform: transform}}>
          {
            data.map((item:any) => (
              <div className="view-item" key={item.key}>{item.val}</div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default SimpleSirtualList;