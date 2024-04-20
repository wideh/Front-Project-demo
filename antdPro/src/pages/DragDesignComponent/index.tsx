import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const CustDrag = ({ data }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { 
      type: "Field",
      ...data
     },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  console.log(opacity);
  

  return (
    <div ref={dragRef} style={{ cursor: "move" }}>
      {data?.label}
    </div>
  );
};

const CustDrop = ({ onChange }) => {
  const [value, setValue] = useState<any[]>([]);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'Field',
    drop: (item) => {
      const targetValue = [...value];
      targetValue.push(item);
      setValue(targetValue);
      onChange(targetValue);
    },
    collect: (monitor) => ({
      // 是否放置在目标上
      isOver: monitor.isOver(),
      // 是否开始拖拽
      canDrop: monitor.canDrop(),
    }),
  });

  // 展示拖动时的界面效果
  const showCanDrop = () => {
    if (canDrop && !isOver && !value.length) return <div>请拖拽到此处</div>;
  };

  const delItem = (ind: number) => {
    const newValue = [...value];
    newValue.splice(ind, 1);
    setValue(newValue);
    onChange(newValue);
  };

  // 展示值
  const showValue = () => {
    return value.map((item, index: number) => {
      return (
        <div key={item?.value}>
          {item?.label} <span onClick={() => delItem(index)}>删除</span>
        </div>
      );
    });
  };

  return (
    <div
      ref={drop}
      style={{ border: '1px solid #000', marginTop: '10px', minHeight: '200px', background: '#fff' }}
    >
      {showCanDrop()}
      {showValue()}
    </div>
  );
};


const DragDesignComponet = (props:any) => {
  const dndList = [
    { label: "标签1", value: "值1" },
    { label: "标签2", value: "值2" },
    { label: "标签3", value: "值3" },
  ]
  const [list, setList] = useState(dndList);
  const dropChange = (res: any[]) => {
    // const valList = (res || []).map((item) => item?.value);
    // const filterList = dndList.filter((item) => !valList.includes(item.value));
    setList(dndList);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = e.target.dataset.effect;
    console.log('e', e.target);
    
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDragEnter = (e) => {
    console.log('移入', e.target);
    
  }

  const handleDrop = (e) => {
    console.log('放手', e.target);
    
  }


  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div>
          <span>请拖拽：</span>
          <div style={{ border: "1px solid #000", minHeight: "200px" }}>
            {list.map((item) => {
              return <CustDrag key={item?.value} data={item} />;
            })}
          </div>
          <div style={{ marginTop: "10px" }}>请放置：</div>
          <CustDrop onChange={dropChange} />
        </div>
      </DndProvider>

      <div style={{ display: 'flex' }} 
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
      >
        <div style={{ width: '100px' }} >
          <div draggable="true">语文</div>
          <div draggable="true">数学</div>
        </div>
        <div style={{ width: '600px', height: '500px', background: '#eee' }}>
          <table>
            <tbody>
              <tr>
                <th rowSpan={4}></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default DragDesignComponet;