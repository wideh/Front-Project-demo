import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";

const debounce: Function = (fn: Function, time: number) => {
  let timeId:any = null;
  return function(){
    if(timeId){
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      fn()
    }, time);
  }
}
let timeId:any = null;

const debounceFrame = (fn: Function, time: number) => {
  let animationId:any = null;

  return function() {
    if(animationId) {
      // console.log('取消防抖执行', animationId);
      cancelAnimationFrame(animationId)
    }
    let num = 0;
    const step = async() => {
      // console.log('防抖执行', animationId);
      num++;
      if(num * 16 >= time) {
        fn();
        num = 0;
        if(animationId) {
          // console.log('取消防抖执行1', animationId);
          cancelAnimationFrame(animationId)
        }
      } else {
        if(animationId) {
          // console.log('取消防抖执行2', animationId);
          cancelAnimationFrame(animationId)
        }
        animationId = requestAnimationFrame(step);
      }
    }
    animationId = requestAnimationFrame(step);
  }
}

const Debounce = () => {

  const [count, setCount ] = useState<number>(0)

  const handleDebounceClick = () => {
    console.log('防抖函数触发');
    if(timeId){
      clearInterval(timeId)
    }
  }

  // 直接用setInterval()，实现延时1秒加一，有问题，会出现后面多个计时器一并执行，
  // 会看到count一直在连续抖动
  // 用useEffect监听，然后清楚计时器，重新执行的方法就可以了。
  useEffect(() => {
    if(timeId){
      clearInterval(timeId)
    }
    timeId = setInterval(() => {
      let num = count;
      num++
      setCount(num);
    }, 1000);
  }, [count])

  return(
    <>
      <Button onClick={debounceFrame(handleDebounceClick,1000)}>防抖函数点击, 关闭计数</Button>
      <h1>延时1秒加一</h1>
      <div style={{color: 'green', fontSize: '20px'}}>{count}</div>
      <h1>父组件获取子组件里的Dom, 用onRef传递useRef, onRef可以为除ref外任意名称</h1>
      <FatherCom1 />
      <h1>父组件获取子组件里的Dom, 用ref,forwardRef，父组件触发子组件方法</h1>
      <FatherCom />
    </>
  )
}
export default Debounce;

// 父组件用onRef传递useRef, onRef可以为除ref外任意名称
const ChildCom1 = (props:any) => {
  const { onRef } = props;

  return (<input ref={onRef}></input>
  )
}

const FatherCom1 = () => {
  const ref = useRef<any>();
  const onClick = () => {
    console.log(ref.current)
    ref?.current?.focus()
  }
  return(
    <>
      <ChildCom1 onRef={ref} />
      <Button onClick={onClick}>聚焦</Button>
    </>
  )
}

const ChildCom = React.forwardRef((props:any, ref:any) => {
  const inputRef = useRef<any>()
  React.useImperativeHandle(ref, () => {
    return {
      create: click,
    };
  })
  const click = () => {
    inputRef.current.focus()
    alert('新建');
  }
  return (
    <>
      <input ref={inputRef}></input>
    </>
  )
})


const FatherCom = () => {
  const ref = useRef<any>();
  const onClick = () => {
    console.log(ref.current)
    ref?.current?.create()
  }
  return(
    <>
      <ChildCom ref={ref} />
      <Button onClick={onClick}>新建</Button>
    </>
  )
}