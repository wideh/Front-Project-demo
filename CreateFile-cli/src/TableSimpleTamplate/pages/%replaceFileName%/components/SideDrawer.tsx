import React, { useEffect, useState, CSSProperties } from "react";
import { CloseOutlined } from '@ant-design/icons';
import styles from './detail.less';
import { Drawer, Row, Col, Anchor, Tabs, Card, Space, Descriptions, Divider, Table, Tooltip, Tag, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ButtonPermissionSelf from '@novaFrontCommon/components/ButtonPermissionAuth/ButtonPermissionSelf';
import buttonPermissionCode from "../../../../utils/buttonPremission";
import moment from "moment";
import %replaceFileName%Service from '../../../../services/%replaceFileName%Service'
import './detail.less';
import '../index.less';

const { Link } = Anchor;
const { Item } = Descriptions;

const labelStyle: CSSProperties = {
	width: '100px',
	textAlign: 'right',
	display: 'inline-block',
};

const SideDrawer = (props) => {
  const {
    title,
    info,
    drawerVisible,
    onCancel,
    reLoad,
  } = props;

  const [activeKey, setActiveKey] = useState<any>('#base-info');
  const [baseInfo, setBaseInfo] = useState<any>({});
  const [turnoverList, setTurnoverList] = useState<any>([]);
  const [turnoverPageInfo, setTurnoverPageInfo] = useState<any>({
    page: 1,
    pageSize: 10,
    total: 0,
  })
  const [billsList, setBillsList] = useState<any>([]);
  const [returnedList, setReturnedList] = useState<any>([]);

  const closeDrawer = () => {
    onCancel();
  }

  const onTabKeyChanged = (key) => {
		setActiveKey(key)
	}
  const onAnchorChanged = (key) => {
		setActiveKey(key)
	}

  useEffect(() => {
    // console.log('params', params);
    if(info?.id) {
      getDetail(info?.id);
    }
  }, []);

  const getDetail = async (id) => {
    getBaseInfo(id);
    getTurnovers({
      page: 1,
      pageSize: 10,
    })
    getBills();
    getReturned();
  }

  const getBaseInfo = async (id) => {
    if(!info?.id) return;
    const res = await %replaceFileName%Service.fetchReturnableRecordsBaseInfo(id);
    if(res?.success) {
      setBaseInfo(res?.result ?? {})
    }
  }

  const getTurnovers = async (data) => {
    if(!info?.id) return;
    const res = await %replaceFileName%Service.fetchReturnableRecordsTurnovers(info?.id, {
      page: data.page,
      pageSize: data.pageSize,
    })
    if(res?.success) {
      const result = res.result;
      setTurnoverList(result?.data ?? []);
      setTurnoverPageInfo({
        page: data.page,
        pageSize: data.pageSize,
        total: result.total,
      })
    }
  }

  const getBills = async () => {
    if(!info?.id) return;
    const res = await %replaceFileName%Service.fetchReturnableRecordsBills(info?.id)
    if(res?.success) {
      setBillsList(res.result ?? []);
    }
  }

  const getReturned = async () => {
    if(!info?.id) return;
    const res = await %replaceFileName%Service.fetchReturnableRecordsReturned(info?.id)
    if(res?.success) {
      setReturnedList(res.result ?? []);
    }
  }

  const pageChangeHandler = (page, pageSize) => {
    getTurnovers({
      page,
      pageSize,
    })
  };

  const handleDelete = async(record) => {
    const res = await %replaceFileName%Service.deleteById(record.id);
    if(res?.success) {
      onCancel && onCancel();
      reLoad && reLoad();
    }
  }

  const generateTitle = (title:any, tooltip:any) => {
    return (
      <span>
        {title}
        <Tooltip title={tooltip} >
          <QuestionCircleOutlined style={{ paddingLeft: 5 }} />
        </Tooltip>
      </span>
    );
  };

  const columnEllipsisRender = (text) => {
    const [toolVisible, setToolVisible] = useState<boolean>(false);
    return (
      <span
        onMouseEnter={(e:any) => {
          if (e.target.clientWidth >= e.target.scrollWidth) {
            setToolVisible(false);
          } else {
            setToolVisible(true);
          }
        }}
        onMouseLeave={() => {
          setToolVisible(false);
        }}
      >
        <Tooltip title={text} visible={toolVisible}>
          <span style={{ 
            display: 'inline-block', 
            maxWidth: '100%', 
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            verticalAlign: 'top',
          }}>
            {text}
          </span>
      </Tooltip>
      </span>
    )
  }

  const turnoverDetailsColumns:any = [
    {
      title: '管理区',
      dataIndex: 'regionName',
      key: 'regionName',
      width: 100,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: '商铺名称',
      dataIndex: 'shopName',
      key: 'shopName',
      width: 100,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: '营业额',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      align: 'right',
    },
    {
      title: '录入人',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 100,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: '记账日期',
      dataIndex: 'turnoverDate',
      key: 'turnoverDate',
      width: 80,
      render: (_, record) => {
        return record.turnoverDate ? moment(record.turnoverDate).format('YYYY-MM-DD') : ''
      }
    },
    {
      title: '状态',
      dataIndex: 'statusStr',
      key: 'statusStr',
      width: 100,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 100,
      ellipsis: true,
      render: (text) => columnEllipsisRender(text)
    },
  ]

  const relatedBillsColumns:any = [
    {
      title: '费用承担人',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 100,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: '资源代码',
      dataIndex: 'resourceCode',
      key: 'resourceCode',
      width: 100,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: '欠费月份',
      dataIndex: 'shouldChargeDate',
      key: 'shouldChargeDate',
      width: 80,
      render: (_, record) => {
        return record.shouldChargeDate ? moment(record.shouldChargeDate).format('YYYY/MM') : ''
      }
    },
    {
      title: '收费项目',
      dataIndex: 'chargeItemTypeName',
      key: 'chargeItemTypeName',
      width: 100,
      ellipsis: true,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: '收费标准',
      dataIndex: 'chargeItemName',
      key: 'chargeItemName',
      width: 100,
      ellipsis: true,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: '合同名称',
      dataIndex: 'contractName',
      key: 'contractName',
      width: 184,
      ellipsis: true,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: '实际应收金额',
      dataIndex: 'actualAmount',
      key: 'actualAmount',
      width: 100,
      align: 'right',
    },
    {
      title: '已收金额',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
      width: 100,
      align: 'right',
    },
    {
      title: '欠费金额',
      dataIndex: 'unPaid',
      key: 'unPaid',
      width: 100,
      align: 'right',
    },
    {
      title: '账单备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 100,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: '费用开始~费用结束',
      dataIndex: 'date',
      key: 'date',
      width: 174,
      render: (_, record: any) => {
        if(record.startdate && record.endDate) {
          return moment(record.startdate).format('YYYY/MM/DD') + '~' 
          + moment(record.endDate).format('YYYY/MM/DD')
        }
      }
    },
  ]

  const refundRecordsColumns:any = [
    {
      title: '返款编号',
      dataIndex: 'code',
      key: 'code',
      width: 196,
    },
    {
      title: '管理区',
      dataIndex: 'regionName',
      key: 'regionName',
      width: 100,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: '商铺名称',
      dataIndex: 'shopName',
      key: 'shopName',
      width: 100,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: '经营类别',
      dataIndex: 'businessCategoryName',
      key: 'businessCategoryName',
      width: 90,
    },
    {
      title: '经营人',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 100,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: '合同名称',
      dataIndex: 'contractName',
      key: 'contractName',
      width: 150,
      render: (text) => columnEllipsisRender(text)
    },
    {
      title: generateTitle('冲抵金额', '返款结算时此店铺冲抵金额合计'),
      dataIndex: 'offsetAmount',
      key: 'offsetAmount',
      width: 100,
      align: 'right',
    },
    {
      title: generateTitle('现金返款', '返款结算现金返还给商铺的金额'),
      dataIndex: 'returnedAmount',
      key: 'returnedAmount',
      className: 'cashrefundCol',
      width: 100,
      align: 'right',
    },
    {
      title: '返款时间',
      dataIndex: 'returnedDate',
      key: 'returnedDate',
      width: 170,
      render: (_, record) => {
        return record.returnedDate ? moment(record.returnedDate).format('YYYY/MM/DD HH:mm:ss') : ''
      }
    }
  ]

  const width = document.documentElement.clientWidth;
  const rightWidth = width * 0.6 < 900 ? 900 : width * 0.6;

  return (
    <Drawer
      title={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>{title}</span>
        <CloseOutlined style={{ cursor: 'pointer' }} onClick={() => closeDrawer()}/>
      </div>}
      className={styles.selfsideDrawer}
      width={rightWidth}
      closable={false}
      visible={drawerVisible}
      bodyStyle={{
        padding: 0
      }}
    >
      <div className='returnableDedeil-wrap'>
        <div
          style={{
            width: '100%',
            background: '#fff',
            height: '100px'
          }}
        >
          <Row style={{ padding: '16px 16px 28px' }}>
            <Col span={12}>
              <span style={{ fontFamily: 'Arial Negreta, Arial',fontWeight: 700, fontSize: '16px', marginRight: '10px' }}>
                {baseInfo?.code ?? ''}
              </span>
              {baseInfo?.hasReturned ? <Tag color="green">已返款</Tag> : <Tag>待返款</Tag>}
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              {baseInfo?.hasReturned === false &&
              <Space>
                <ButtonPermissionSelf
                  permissionList={[
                    {
                      code: buttonPermissionCode.DeleteShopReturnableRecords,
                      type: 'button',
                      meaning: '删除',
                    },
                  ]}
                >
                  <Popconfirm
                    title="确认删除吗？"
                    onConfirm={() => {
                      handleDelete(baseInfo);
                    }}
                    okText="确认"
                    cancelText="取消"
                  >
                    删除
                  </Popconfirm>
                </ButtonPermissionSelf>
                <ButtonPermissionSelf
                  type="primary"
                  permissionList={[
                    {
                      code: buttonPermissionCode.SettlementShopReturnableRecords,
                      type: 'button',
                      meaning: '返款结算',
                    },
                  ]}
                  onClick={() => {
                    onCancel();
                  }}
                >
                  返款结算
                </ButtonPermissionSelf>
              </Space>}
            </Col>
          </Row>
          <Anchor affix={false} getContainer={() => document.getElementById('detail-content')!} onChange={onAnchorChanged}>
            <Tabs activeKey={activeKey} onChange={onTabKeyChanged}>
              <Tabs.TabPane key='#base-info' tab={<Link href='#base-info' title="基本信息"></Link>}></Tabs.TabPane>
              <Tabs.TabPane key='#turnover-details' tab={<Link href='#turnover-details' title="营业额明细"></Link>}></Tabs.TabPane>
              <Tabs.TabPane key='#related-bills' tab={<Link href='#related-bills' title="关联账单"></Link>}></Tabs.TabPane>
              <Tabs.TabPane key='#refund-records' tab={<Link href='#refund-records' title="返款记录"></Link>}></Tabs.TabPane>
            </Tabs>
          </Anchor>
        </div>
        <div id="detail-content" className='returnableDedeil-content'>
          <Space direction="vertical" size="small" style={{ display: 'flex' }}>
          <div id='base-info' style={{ paddingTop: '16px' }}>
            <Card title="基本信息"  >
              <Descriptions labelStyle={labelStyle}>
                <Item label="管理区">{baseInfo?.regionName ?? ''}</Item>
                <Item label="商铺名称">{baseInfo?.regionName ?? ''}</Item>
                <Item label="经营类别">{baseInfo?.businessCategory ?? ''}</Item>
                <Item label="经营人">{baseInfo?.customerName ?? ''}</Item>
                <Item label="合同名称">{baseInfo?.contractName ?? ''}</Item>
              </Descriptions>
              <Divider style={{ margin: '0 0 10px', borderTop: '1px solid rgba(0, 0, 0, 0.2)' }}/>
              <Descriptions labelStyle={labelStyle}>
                <Item label="营业额">{baseInfo?.turnoverAmount ?? ''}</Item>
                <Item label="抽成金额">{baseInfo?.commissionAmount ?? ''}</Item>
                <Item label="保底金额">{baseInfo?.guaranteedAmount ?? ''}</Item>
                <Item label="应收金额">{baseInfo?.amount ?? ''}</Item>
                <Item label="应收增减金额">{baseInfo?.changeAmount ?? ''}</Item>
                <Item label="实际应收金额">{baseInfo?.actualAmount ?? ''}</Item>
                <Item label="应返金额">{baseInfo?.shouldReturnAmount ?? ''}</Item>
                <Item label="现金收费">{baseInfo?.unturnoverPaid ?? ''}</Item>
                <Item label="冲抵金额">{baseInfo?.turnoverPaid ?? ''}</Item>
                <Item label="现金返款">{baseInfo?.returnAmount ?? ''}</Item>
                <Item label="实返金额">{baseInfo?.actualReturnAmount ?? ''}</Item>
                <Item label="费用起止日期">
                  {baseInfo?.startDate && baseInfo?.endDate ? 
                    moment(baseInfo?.startDate).format('YYYY/MM/DD') + '~' +  moment(baseInfo?.endDate).format('YYYY/MM/DD')
                  :''
                  }
                </Item>
              </Descriptions>
            </Card>
          </div>
          <div id='turnover-details'>
            <Card title="营业额明细"  >
              <Table
                dataSource={turnoverList}
                rowKey='id'
                columns={turnoverDetailsColumns}
                scroll={{ x: '100%' }}
                tableLayout="fixed"
                pagination={{
                  total: turnoverPageInfo.total,
                  current: turnoverPageInfo.page,
                  pageSize: turnoverPageInfo.pageSize,
                  onChange: pageChangeHandler,
                  showTotal: _total => `总计${_total || 0}条`,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  position: ['bottomRight'],
                }}
              />
            </Card>
          </div>
          <div id='related-bills'>
            <Card title="关联账单"  >
              <Table
                dataSource={billsList}
                rowKey='id'
                columns={relatedBillsColumns}
                scroll={{ x: '100%' }}
                pagination={false}
                tableLayout="fixed"
              />
            </Card>
          </div>
          <div id='refund-records'>
            <Card title="返款记录"  >
              <Table
                dataSource={returnedList}
                rowKey='id'
                columns={refundRecordsColumns}
                scroll={{ x: '100%' }}
                pagination={false}
                tableLayout="fixed"
              />
            </Card>
          </div>
          </Space>
          {/* {refundSettlementVisible && <RefundSettlement 
            info={settlementInfo}
            refundSettlementVisible={refundSettlementVisible}
            onCancel={onRefundSettlementCancel}
            reLoad={() => {
              getDetail(info?.id);
              reLoad && reLoad()
            }}
          />} */}
        </div>
      </div>
    </Drawer>
  )
}

export default SideDrawer;