import React, { useEffect, useState } from "react";
import { Drawer } from 'antd';
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';

const SideDrawer = (props) => {
  const {
    drawerVisible,
    onCancel,
  } = props;
  const [drawerTitle, setDrawerTitle] = useState<any>('');
  const [historyTitleOrParams, setHistoryTitleOrParams] = useState<any>([]);
  const [drawerParams, setDrawerParams] = useState<any>({});

  useEffect(() => {
    const {
      title,
      info,
    } = props;
    const titleOrParams = {
      title: title,
      params: info,
    }
    // window['historyTitleOrParams'] = [];
    // window['historyTitleOrParams'].push(titleOrParams);
    // setDrawerTitle(window['historyTitleOrParams'][window['historyTitleOrParams'].length - 1].title)
    const newParams = [...historyTitleOrParams];
    newParams.push(titleOrParams)
    setHistoryTitleOrParams(newParams)
    setDrawerTitle(newParams[newParams.length - 1].title)
    setDrawerParams(newParams[newParams.length - 1].params)
  }, [])

  const closeDrawer = () => {
    // window['historyTitleOrParams'] = [];
    setHistoryTitleOrParams([])
    onCancel();
  }

  const historyPush = (title:any, info:any) => {
    if(title == drawerTitle) return;
    const titleOrParams = {
      title: title,
      params: info,
    }
    // window['historyTitleOrParams'].push(titleOrParams);
    // setDrawerTitle(window['historyTitleOrParams'][window['historyTitleOrParams'].length - 1].title)
    const newParams = [...historyTitleOrParams];
    newParams.push(titleOrParams)
    setHistoryTitleOrParams(newParams)
    setDrawerTitle(newParams[newParams.length - 1].title)
    setDrawerParams(newParams[newParams.length - 1].params)
  }

  const goBack = () => {
    // window['historyTitleOrParams'].pop();
    // setDrawerTitle(window['historyTitleOrParams'][window['historyTitleOrParams'].length - 1].title)
    const newParams = [...historyTitleOrParams];
    newParams.pop();
    setHistoryTitleOrParams(newParams)
    setDrawerTitle(newParams[newParams.length - 1].title)
    setDrawerParams(newParams[newParams.length - 1].params)
  }

  const width = document.documentElement.clientWidth;
  const rightWidth = width * 0.6 < 900 ? 900 : width * 0.6;

  return (
    <Drawer
      title={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>
          {historyTitleOrParams.length > 1 && 
          <ArrowLeftOutlined 
            style={{ cursor: 'pointer', marginRight: '10px' }}
            onClick={() => goBack()}
          />}
          {drawerTitle}
        </span>
        <CloseOutlined style={{ cursor: 'pointer' }} onClick={() => closeDrawer()}/>
      </div>}
      width={rightWidth}
      closable={false}
      visible={drawerVisible}
      bodyStyle={{
        padding: 0
      }}
    >
      {drawerTitle === '应返详情' && <>
        应返详情内容
        <a onClick={() => {
          historyPush(
            '其他详情',
            {id: 2}
          )
        }}>其他详情</a>
      </>}
    </Drawer>
  )
}

export default SideDrawer;