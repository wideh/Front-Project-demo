import { VirtualList } from './virtualList';
import './style.less';
const List = () => {
  const dataSource = [] as Array<any>;
  for (let index = 0; index < 10000; index++) {
    const height_list = ['100px', '80px', '60px', '40px']; //随机高度
    const height_index = Math.ceil(Math.random() * 4) - 1;
    dataSource.push({
      name: `测试${index}`,
      value: index,
      lineHeight: height_list[height_index],
    });
  }
  return (
    <>
      <div className="virtual-list">
        <VirtualList
          total={10000}
          presetItemHeight={40}
          itemRender={(i) => {
            return (
              <div
                className="data-item"
                key={i}
                onClick={() => {
                  console.log('index:', i);
                }}
              >
                <div className="data-item-left" style={{ lineHeight: dataSource[i].lineHeight }}>
                  {dataSource[i].name}
                </div>
                <div className="data-item-right">{dataSource[i].value}</div>
              </div>
            );
          }}
        />
      </div>
    </>
  );
};
export default List;