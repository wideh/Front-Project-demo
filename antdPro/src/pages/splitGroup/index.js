import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Tooltip, Popover, Tree, Button, Checkbox } from 'antd';
import difference from 'lodash/difference';
import { MenuOutlined } from '@ant-design/icons';

import CustomProTable from './CustomProTable';
import styles from './style.less';
import detailStyles from './index.less';
import { dataSource } from './data';

const { TreeNode } = Tree;

let timeId = null;

// 对比两个对象的值是否完全相等 返回值 true/false
const isObjectValueEqual = (a, b) => {   
  //取对象a和b的属性名
  // a旧，b新
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);
  
  if (aProps.length !== bProps.length) {
    if(aProps.length < bProps.length){
      // 增加了某个搜索，处理
      for (let i = 0; i < bProps.length; i++) {
        const propName = bProps[i];
        const listA = b[propName];
        const listB = a[propName];
        if(listB === undefined){
          return propName;
        }
        if (listA !== [] && !(listA.length === listB.length && listA.every(m => listB.some(n => m.value === n.value)) && listB.every(_b => listA.some(_a => _a.value === _b.value)))) {
            return propName;
        }
      }
    }else if (aProps.length > bProps.length){
      return null;
    }
  }

  //循环取出属性名，再判断属性值是否一致
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];
    const listA = a[propName];
    const listB = b[propName];

    if (listB !== [] && !(listA.length === listB.length && listA.every(m => listB.some(n => m.value === n.value)) && listB.every(_b => listA.some(_a => _a.value === _b.value)))) {
      return propName;
    }
  }
  return null;
}

export default class Index extends Component {
  constructor(props) {
    super(props);
    // 获取本地保存的分组功能的已选取选项列表
    const sortSelectStr = localStorage.getItem('sortSelectList')
    this.state = {
      sortSelectkey: sortSelectStr ? JSON.parse(sortSelectStr) : [],
      selectedRowKeys: [],
      keyArr: [],
      isFinish: false, // 控制虚拟列表刷新
    };
  }

  componentDidMount() {
    this.setState({
      isFinish: true,
    })
  }

  componentWillUnmount(){
    if(timeId){
      clearTimeout(timeId);
    }
  }

  onRowSelect =(record, selected, selectedRows, nativeEvent, selectedRowKeys) =>{
    const { data } = this.props;
    // const {dataSource,isPayBillByOrder} = data;
    const isPayBillByOrder = false;
    const { sortSelectkey } = this.state;
    const tmpRecord = {...record};
    let tmpselectedRowKeys = []

    if (sortSelectkey && sortSelectkey.length >0){
      // 有分组时
      // 如果取消选择，写法二
      if(!selected){
        const removeRowKeys = selectedRowKeys.filter(billId => billId == tmpRecord.billId)
        tmpselectedRowKeys = difference(selectedRowKeys,removeRowKeys);
      } 
      else {
        tmpselectedRowKeys.push(tmpRecord.billId, ...selectedRowKeys)
      }
    } else {
      tmpselectedRowKeys = selectedRows.map(m => m.billId)
    }
    
    if(isPayBillByOrder){
      if(selected){
        const addIds = dataSource.filter(x =>x.customerId === tmpRecord.customerId
                 &&(x.shouldChargeYear < tmpRecord.shouldChargeYear || (x.shouldChargeYear === tmpRecord.shouldChargeYear && x.shouldChargeMonth < tmpRecord.shouldChargeMonth))).map(m => m.billId);
        if(addIds && addIds.length>0){
          tmpselectedRowKeys.push(...addIds);
        }
      }else{
        const removeIds = dataSource.filter(x =>x.customerId === tmpRecord.customerId
                &&(x.shouldChargeYear > tmpRecord.shouldChargeYear || (x.shouldChargeYear === tmpRecord.shouldChargeYear && x.shouldChargeMonth > tmpRecord.shouldChargeMonth))).map(m => m.billId);
        if(removeIds && removeIds.length>0){
          tmpselectedRowKeys = difference(tmpselectedRowKeys,removeIds);
        }
      }
    }

    tmpselectedRowKeys = [...new Set(tmpselectedRowKeys)];
    const tmpselectedRows = dataSource.filter(f => tmpselectedRowKeys.indexOf(f.billId)>-1) ||[];
    // let totalActualAmountList = numeral(0);
    // let unpaidList = numeral(0);
    // let amountList = numeral(0);
    // let paidList = numeral(0);
    // let discountList = numeral(0);
    // let exemptList = numeral(0);
    // let subLateFeeList = numeral(0);
    // let totalFreeFee = 0; // 优惠总额

    // tmpselectedRows.forEach(item => {
    //   totalActualAmountList.add(item.actualAmount);
    //   unpaidList.add(item.unPaid);
    //   amountList.add(item.amount); // 应收总额
    //   if(item.paid || item.paid == 0){
    //     paidList.add(item.paid); // 已收金额
    //   }
    //   if(item.discount || item.discount == 0){
    //     discountList.add(item.discount); // 优惠金额
    //   }
    //   if(item.exempt || item.exempt == 0){
    //     exemptList.add(item.exempt); // 减免金额
    //   }
    //   if(item.subLateFee || item.subLateFee == 0){
    //     subLateFeeList.add(item.subLateFee); // 减免违约金
    //   }
    // });
    // const totalActualAmount = totalActualAmountList.value();
    // const unpaid = unpaidList.value();
    // const totalAmount = amountList.value();
    // const totalPaid = paidList.value();
    // const totalDiscount = discountList.value();
    // const totalExempt = exemptList.value();
    // const totalSubLateFee = subLateFeeList.value();
    // totalFreeFee = totalDiscount + totalExempt + totalSubLateFee;

    // dispatch({
    //   type: 'chargeCenterModel/updateSelectBills',
    //   payload: {
    //     selectBillIds: tmpselectedRowKeys,
    //     shouldCharge: totalActualAmount,
    //     // totalChargeAmount: unpaid,
    //     totalUnPaid: unpaid,
    //     totalAmount,
    //     totalPaid,
    //     totalDiscount,
    //     totalExempt,
    //     totalSubLateFee,
    //     totalFreeFee,
    //     isAllSelect: tmpselectedRowKeys.length === dataSource.length,
    //   },
    // });

    // dispatch({
    //   type: 'chargeCenterModel/updateState',
    //   payload: {
    //     selectedRowKeys:tmpselectedRowKeys,
    //   },
    // });
    this.setState({
      selectedRowKeys:tmpselectedRowKeys
    })

    // dispatch({
    //   type: 'chargeCenterModel/fetchDiscountRules',
    //   payload: {
    //     selectBillIds: tmpselectedRowKeys,
    //     totalChargeAmount: unpaid,
    //     totalFreeFee,
    //   },
    // });
  };

  onSelectAll =(selected, selectedRows, changeRows, selectedRowKeys)=>{
    const { data } = this.props;
    // const { dataSource } = data;
    const oldSelectedRows = dataSource.filter(f => selectedRowKeys.indexOf(f.billId)>-1) ||[];
    const tmpselectedRowKeys = [];
    let selectedRowList = []
    if(selected){
      selectedRowList.push(...oldSelectedRows, ...changeRows)
    } else {
      selectedRowList = oldSelectedRows.filter(item => changeRows.findIndex(f => f.billId == item.billId) == -1)
    }

    // let totalActualAmountList = numeral(0);
    // let unpaidList = numeral(0);
    // let amountList = numeral(0);
    // let paidList = numeral(0);
    // let discountList = numeral(0);
    // let exemptList = numeral(0);
    // let subLateFeeList = numeral(0);
    // let totalFreeFee = 0; // 优惠总额
    if( selectedRowList.length > 0 ){
      selectedRowList.forEach(item => {
        // totalActualAmountList.add(item.actualAmount);
        // unpaidList.add(item.unPaid);
        tmpselectedRowKeys.push(item.billId);
        // amountList.add(item.amount); // 应收总额
        // if(item.paid || item.paid == 0){
        //   paidList.add(item.paid); // 已收金额
        // }
        // if(item.discount || item.discount == 0){
        //   discountList.add(item.discount); // 优惠金额
        // }
        // if(item.exempt || item.exempt == 0){
        //   exemptList.add(item.exempt); // 减免金额
        // }
        // if(item.subLateFee || item.subLateFee == 0){
        //   subLateFeeList.add(item.subLateFee); // 减免违约金
        // }
      });
    }
    
    // const totalActualAmount = totalActualAmountList.value();
    // const unpaid = unpaidList.value();
    // const totalAmount = amountList.value();
    // const totalPaid = paidList.value();
    // const totalDiscount = discountList.value();
    // const totalExempt = exemptList.value();
    // const totalSubLateFee = subLateFeeList.value();
    // totalFreeFee = totalDiscount + totalExempt + totalSubLateFee;

    // dispatch({
    //   type: 'chargeCenterModel/updateSelectBills',
    //   payload: {
    //     selectBillIds: tmpselectedRowKeys,
    //     shouldCharge: totalActualAmount,
    //     // totalChargeAmount: unpaid,
    //     totalUnPaid: unpaid,
    //     totalAmount,
    //     totalPaid,
    //     totalDiscount,
    //     totalExempt,
    //     totalSubLateFee,
    //     totalFreeFee,
    //     isAllSelect: tmpselectedRowKeys.length === dataSource.length,
    //   },
    // });

    // dispatch({
    //   type: 'chargeCenterModel/updateState',
    //   payload: {
    //     selectedRowKeys:tmpselectedRowKeys,
    //   },
    // });
    this.setState({
      selectedRowKeys:tmpselectedRowKeys
    })

    // dispatch({
    //   type: 'chargeCenterModel/fetchDiscountRules',
    //   payload: {
    //     selectBillIds: tmpselectedRowKeys,
    //     totalChargeAmount: unpaid,
    //     totalFreeFee,
    //   },
    // });
  }
  // 分组选项选择, 以及本地保存
  onSortSelect = (selectedKeysValue) => {
    // const { dispatch } = this.props;
    // 更新分组选中项
    this.setState({ sortSelectkey: selectedKeysValue });
    localStorage.setItem('sortSelectList', JSON.stringify(selectedKeysValue));
    // console.log(selectedKeysValue);
    // dispatch({
    //   type: 'chargeCenterModel/updateState',
    //   payload: {
    //     selectedRowKeys: [],
    //     selectBills: {}, // 分组后，清空已选账单
    //     discountRules: [], // 分组后，清空规则提示
    //     keyArr: ['0'], // 筛选后，默认只展开第一个折叠面板
    //   },
    // });
    this.setState({
      selectedRowKeys: [],
      keyArr: ['0'], // 筛选后，默认只展开第一个折叠面板
      isFinish: false,
    })
    timeId = setTimeout(() => {
      this.setState({
        isFinish: true,
      })
    }, 0);
    // location.reload()
  }

  // 控制分组气泡卡片是否可见
  handleVisibleChange = (visible) => {
    this.setState({
      showSortSelect: visible
    })
  }

  // 折叠面板变化, 改变key数组，放在父元素是为了和筛选分组功能联动
  onCollapseChange = (e) => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'chargeCenterModel/updateState',
    //   payload: {
    //     keyArr: e,
    //   },
    // });
    this.setState({
      keyArr: e,
    })
  }

  render() {
    const { selectedRowKeys, keyArr, isFinish } = this.state;

    const auxData = {
      chargeItemTypes:[
        {text: '物业服务费'},
        {text: '电费'},
        {text: '水费'},
        {text: '电梯费'},
        {text: '清洁费'},
      ],
      resources: [
        {id: 0, text: 'GLQ1-A10-102'},
        {id: 0, text: 'GLQ1-A10-301'},
        {id: 0, text: 'GLQ1-A10-302'},
        {id: 0, text: 'GLQ1-A1-101'},
        {id: 0, text: 'GLQ1-A11-101'},
        {id: 0, text: 'GLQ1-A11-302'},
        {id: 0, text: 'GLQ1-A1-302'},
        {id: 0, text: 'GLQ1-A2-302'},
        {id: 0, text: 'GLQ1-A3-101'},
        {id: 0, text: 'GLQ1-A3-102'},
        {id: 0, text: 'GLQ1-A3-302'},
        {id: 0, text: 'GLQ1-A5-101'},
        {id: 0, text: 'GLQ1-A5-102'},
        {id: 0, text: 'GLQ1-A5-302'},
        {id: 0, text: 'GLQ1-A6-101'},
        {id: 0, text: 'GLQ1-A6-102'},
        {id: 0, text: 'GLQ1-A6-301'},
        {id: 0, text: 'GLQ1-A6-302'},
        {id: 0, text: 'GLQ1-A7-302'},
        {id: 0, text: 'GLQ1-A9-102'},
        {id: 0, text: 'GLQ1-A栋'},
        {id: 0, text: 'GLQ1-B1-101'},
        {id: 0, text: 'GLQ1-B1-102'},
        {id: 0, text: 'GLQ1-B11-102'},
        {id: 0, text: 'GLQ1-B12-101'},
        {id: 0, text: 'GLQ1-B12-102'},
        {id: 0, text: 'GLQ1-B1-301'},
        {id: 0, text: 'GLQ1-B2-102'},
        {id: 0, text: 'GLQ1-B3-101'},
        {id: 0, text: 'GLQ1-B3-301'},
        {id: 0, text: 'GLQ1-B6-101'},
        {id: 0, text: 'GLQ1-B7-101'},
        {id: 0, text: 'GLQ1-B7-102'},
        {id: 0, text: 'GLQ1-B7-302'},
        {id: 0, text: 'GLQ1-B8-101'},
        {id: 0, text: 'GLQ1-B8-102'},
        {id: 0, text: 'GLQ1-B9-102'},
        {id: 0, text: 'GLQ1-B栋'},
        {id: 0, text: 'GLQ1-SP-118'}
      ],
      yearMonths: [
        {id: '2022|8', text: '2022年8月'},
        {id: '2022|7', text: '2022年7月'},
        {id: '2022|6', text: '2022年6月'},
        {id: '2022|5', text: '2022年5月'},
        {id: '2022|4', text: '2022年4月'},
        {id: '2022|3', text: '2022年3月'},
        {id: '2022|2', text: '2022年2月'},
        {id: '2022|1', text: '2022年1月'},
        {id: '2021|12', text: '2021年12月'},
        {id: '2021|11', text: '2021年11月'},
        {id: '2021|10', text: '2021年10月'},
        {id: '2021|9', text: '2021年9月'},
        {id: '2021|8', text: '2021年8月'},
        {id: '2021|7', text: '2021年7月'},
        {id: '2021|6', text: '2021年6月'},
        {id: '2021|5', text: '2021年5月'},
        {id: '2021|4', text: '2021年4月'}
      ]
    }

    const {
      sortSelectkey,
    } = this.state;

    const columns = [
      {
        dataIndex: 'customerName',
        key: 'customerName',
        title: '费用承担人',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        dataIndex: 'resourceCode',
        key: 'resourceCode',
        title: '资源代码',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        dataIndex: 'shouldChargeDate',
        key: 'shouldChargeDate',
        title: '欠费月份',
        width: 90,
        ellipsis: true,
        hideInSearch: true,
        render: (text, row) => {
          return row.shouldChargeDate ? moment(row.shouldChargeDate).format('YYYY/MM') : null;
        },
      },
    ];

    const rowSelection = {
      columnWidth:"60px",
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div style={{ height: '100%' }} className={`${styles.detailStyles} ${styles.fullHeigth}`}>
        <h2>分组后数据超过一万条，用虚拟列表解决页面渲染卡顿</h2>
        <Row className={detailStyles.billListContent}>
          <Col span={24} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              id="chargeCenterBills"
              className={`${detailStyles.billListTable} ${styles.blocks}`}
            >
              <div>
                <div className='ant-pro-table-list-toolbar-container'>
                  <div className='ant-pro-table-list-toolbar-left' style={{width:'64px'}}>
                    <div className='ant-space-item'>
                      <div className='ant-pro-table-list-toolbar-title'>欠费账单</div>
                    </div>
                  </div>
                  <div className='ant-pro-table-list-toolbar-right'>
                    <div className='ant-space-item' style={{display: 'flex', alignItems: 'center'}}>
                      <div className='ant-space ant-space-align-center' >
                        <Popover
                          placement="bottom"
                          content={
                            <div style={{padding: '8px'}}>
                              <Tree
                                checkable
                                selectable={false}
                                onCheck={this.onSortSelect.bind(this)}
                                checkedKeys={sortSelectkey}
                              >
                                <TreeNode key='shouldChargeDate' title='欠费月份' />
                                <TreeNode key='resourceCode' title='资源代码' />
                                <TreeNode key='chargeItemType' title='收费项目' />
                              </Tree>
                            </div>
                          }
                          trigger="click"
                          visible={this.state.showSortSelect}
                          onVisibleChange={this.handleVisibleChange}
                          forceRender
                          overlayClassName={detailStyles.splitGroupPopover}
                        >
                          <Tooltip title="分组">
                            <a style={{cursor:'pointer', textDecoration:'none'}} data-tut="sortSelect">
                              <MenuOutlined style={{marginRight: '2px'}} />分组
                            </a>
                          </Tooltip>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ maxHeight: '300px', height: '300px',overflow: 'auto', marginBottom: '68px', position: 'relative'}}>
              {/* <div style={{position:'fixed', left: '282px', right: '48px', top: (treeNode.nodeType === 1 || treeNode.nodeType === 3)? '352px' : '398px', bottom:'56px', overflow: 'scroll'}}> */}
                {isFinish && <CustomProTable
                  _this={this}
                  // loading={loading}
                  options={{ reload: false, fullScreen: false, setting: true }}
                  search={false}
                  selectedRowKeys={selectedRowKeys}
                  rowKey="billId"
                  bordered={false}
                  scroll={{ x: '100vw', y: 300 }}
                  proTableScroll={{ x: '100%', y: '100%' }}
                  pagination={false}
                  onRowSelect={this.onRowSelect}
                  onSelectAll={this.onSelectAll}
                  columns={columns}
                  dataSource={dataSource}
                  auxData={auxData}
                  // tmpAuxData={tmp}
                  sortSelectList={sortSelectkey}
                  collapseKeys={keyArr}
                  onCollapseChange={this.onCollapseChange}
                />}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
