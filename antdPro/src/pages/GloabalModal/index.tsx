import React, { useState } from "react";
import { Button, Space } from "antd";
import { normalModal } from './components/NormalModal';
import SideDrawer from "./components/SideDrawer";

const GlobalModal = () => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)

  const openModal = () => {
    normalModal({
      title: <span style={{fontWeight: '700', color: 'rgba(0, 0, 0, 0.75)'}}>迁移数据到新版本</span>,
      content: <>
        <div>如果已经确定要使用新版本的工单管理，请将所有历史数据都处理完，
          使其状态变为“已关闭”才能进行数据迁移。迁移后，
          历史数据就会出现在新版的工单管理的“已关闭”状态的数据</div>
      </>,
      okText: '确认迁移',
      cancelText: '取消',
      onOk: async() => {
        const res = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(333)
          }, 200);
        })
        if(res) {
          return true;
        } else {
          return false;
        }
      }
    })
  }

  const openDrawerModal = () => {
    setDrawerVisible(true);
  }

  const closeDrawerModal = () => {
    setDrawerVisible(false);
  }

  return (
    <Space>
      <Button onClick={() => openModal()}>打开弹框</Button>
      <Button onClick={() => openDrawerModal()}>多层右侧抽屉</Button>
      {drawerVisible && <SideDrawer
        title='应返详情'
        info={{id: 123}}
        drawerVisible={drawerVisible}
        onCancel={closeDrawerModal}
      ></SideDrawer>}
    </Space>
  )
}

export default GlobalModal;