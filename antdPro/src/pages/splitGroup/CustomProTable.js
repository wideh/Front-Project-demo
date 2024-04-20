import React from 'react';
import { VList } from 'virtuallist-antd';
import { Collapse, Checkbox } from 'antd';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import styles from './style.less';
import { VirtualList } from './virtualList';

const CustomProTable = ({
  // loading,
  headerTitle,
  options,
  search,
  toolbar,
  rowKey,
  tableAlertRender,
  bordered,
  scroll,
  pagination,
  columns,
  dataSource,
  // hasDiscount,
  onRowSelect,
  onSelectAll,
  selectedRowKeys,
  auxData,
  tmpAuxData, // 筛选选取之后的年月日，收费类型，资源代码
  sortSelectList, // 分组按钮选中的数组
  collapseKeys,
  onCollapseChange,
}) => {

  const { Panel } = Collapse;

  // 获取本列表的年月日，收费类型，资源代码
  let { chargeItemTypes, resources, yearMonths } = auxData;

  // 如果没有分组且有数据，渲染为单表
  if(sortSelectList.length == 0 && dataSource && dataSource.length > 0) {
    return (
      <div style={{maxHeight: `${scroll.y+46}px`, overflow: 'auto'}}>
        <ProTable
          className={styles.virtualTable}
          columns={columns}
          components={VList({
            height: scroll.y - 20,
          })}
          rowSelection={{
            // onChange: (keys, rows) => {
            //   onRowSelect(keys, rows);
            // },
            onSelect:(record, selected, selectedRows, nativeEvent)=>{
              onRowSelect(record, selected, selectedRows, nativeEvent, selectedRowKeys);
            },
            onSelectAll:(selected, selectedRows, changeRows)=>{
              onSelectAll(selected, selectedRows, changeRows, selectedRowKeys);
            },
            selectedRowKeys,
          }}
          dataSource={dataSource}
          headerTitle={headerTitle}
          rowKey={rowKey}
          bordered={bordered}
          options={options}
          toolBarRender={false}
          defaultSize='small'
          // tableAlertRender={tableAlertRender}
          tableAlertRender={false}
          tableAlertOptionRender={false}
          // loading={loading}
          pagination={pagination}
          search={search}
          toolbar={toolbar}
          scroll={{
            // scroll.y和div高度相差55px
            y: scroll.y - 20,
            x: '100%'
          }}
        />
      </div>
    )
  }

  const expandedRowRender = (dataSource) => {
    return (
      <div style={{maxHeight: `${scroll.y+41}px`, overflow: 'auto'}}>
        <ProTable
          className={styles.panelVirtualTable}
          columns={columns}
          components={VList({
            height: scroll.y - 20,
          })}
          rowSelection={{
            // onChange: (keys, rows) => {
            //   onRowSelect(keys, rows);
            // },
            onSelect:(record, selected, selectedRows, nativeEvent)=>{
              onRowSelect(record, selected, selectedRows, nativeEvent, selectedRowKeys);
            },
            onSelectAll:(selected, selectedRows, changeRows)=>{
              onSelectAll(selected, selectedRows, changeRows, selectedRowKeys);
            },
            selectedRowKeys,
          }}
          dataSource={dataSource}
          headerTitle={headerTitle}
          rowKey={rowKey}
          bordered={bordered}
          options={options}
          toolBarRender={false}
          defaultSize='small'
          // tableAlertRender={tableAlertRender}
          tableAlertRender={false}
          tableAlertOptionRender={false}
          // loading={loading}
          pagination={pagination}
          search={search}
          toolbar={toolbar}
          scroll={{
            // scroll.y和div高度相差47px
            y: scroll.y - 20,
            x: '100%'
          }}
        />
      </div>
    )
  }

  // 折叠面板加上多选框，用于控制列表全选
  const onCheckboxChange = (e, data) => {
    const isSelect = e.target.checked
    onSelectAll(isSelect, null, data, selectedRowKeys)
  }

  const renderHeader = ({date,code, feeName}, money, data, selectRows) => {
    return (
      <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
          <Checkbox
            checked={data.length == selectRows.length}
            indeterminate={selectRows.length > 0 && selectRows.length < data.length}
            onChange={(e) => onCheckboxChange(e, data)}
            onClick={(e) => e.stopPropagation()} 
            style={{marginRight: '10px'}}
          />
          {date && <span style={{marginRight: '30px'}}>{moment(date).format('YYYY/MM')}</span>}
          {code && <span style={{marginRight: '30px' , color: '#34A853', fontWeight: '700'}}>{code}</span>}
          {feeName && <span style={{marginRight: '30px'}}>{feeName}</span>}
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          欠费总金额
          <span style={{fontFamily:'Arial', padding: '0 5px', color: '#FF0000'}}>&yen;</span>
          <span style={{color: '#FF0000'}}>{!isNaN(parseInt(money))? money.toFixed(2): ''}</span>
        </div>
      </div>
    )
  }

  let isChargeItemType = false,
      isResourceCode = false,
      isShouldChargeDate = false

  if(sortSelectList && sortSelectList.length > 0){
    sortSelectList.forEach(element => {
      if (element == 'chargeItemType') {
        isChargeItemType = true
      } else if (element == 'resourceCode') {
        isResourceCode = true
      } else if (element == 'shouldChargeDate') {
        isShouldChargeDate = true
      }
    });
  }

  // 没有数据渲染为空表
  if(dataSource && dataSource.length == 0) {
    return expandedRowRender([])
  } 

  const getData = () => {
    // 分组全选
    if (isChargeItemType && isResourceCode && isShouldChargeDate) {
      const Node = []
      chargeItemTypes.forEach((item, index) => {
        resources.forEach((code, cIndex) => {
          yearMonths.forEach((date, dIndex) => {
            // const name = item.text || item
            // const resourceCode = code.text || code
            const chargeDate = (date.id || date).split('|')
            const shouldChargeDate = `${chargeDate[0]}/${chargeDate[1]}`
            let totalUnPaid = null;
            const data = []
            const selectRowKeys = []
            dataSource.forEach((x) =>{ 
              if(
                x.shouldChargeYear == chargeDate[0] &&
                x.shouldChargeMonth == chargeDate[1] &&
                x.chargeItemType == item.text &&
                x.resourceCode == code.text
              ) {
                data.push(x)
                totalUnPaid += x.unPaid
                if(selectedRowKeys.indexOf(x.billId) > -1){
                  selectRowKeys.push(x.billId)
                }
              }
            })
            // 没有数据时不渲染
            if(data.length > 0) {
              Node.push({
                headerObj: {
                  date:shouldChargeDate,
                  code: code.text,
                  feeName: item.text,
                },
                totalUnPaid: totalUnPaid,
                selectRowKeys: selectRowKeys,
                data: data,
              })
            }
          })
        })
      })
      return Node
    } 
    // 选取资源代码和收费类型
    else if (isChargeItemType && isResourceCode) {
      const Node = [] 
      chargeItemTypes.forEach((item, index) => {
        resources.forEach((code, cIndex) => {
          // const name = item.text || item
          // const resourceCode = code.text || code
          let totalUnPaid = null;
          const data = []
          const selectRowKeys = []
          dataSource.forEach((x) =>{ 
            if(
              x.chargeItemType == item.text &&
              x.resourceCode == code.text
            ) {
              data.push(x)
              totalUnPaid += x.unPaid
              if(selectedRowKeys.indexOf(x.billId) > -1){
                selectRowKeys.push(x.billId)
              }
            }
          })
          // 没有数据时不渲染
          if(data.length > 0){
            Node.push({
              headerObj: {
                code: code.text,
                feeName: item.text,
              },
              totalUnPaid: totalUnPaid,
              selectRowKeys: selectRowKeys,
              data: data,
            })
          }
        })
      })
      return Node
    } 
    // 选取月份和资源代码
    else if (isResourceCode && isShouldChargeDate) {
      const Node = [] 
      resources.forEach((code, cIndex) => {
        yearMonths.forEach((date, dIndex) => {
          // const resourceCode = code.text || code
          const chargeDate = (date.id || date).split('|')
          const shouldChargeDate = `${chargeDate[0]}/${chargeDate[1]}`
          // const shouldChargeYear = (date.id || date).split('|')[0]
          // const shouldChargeMonth = (date.id || date).split('|')[1]
          let totalUnPaid = null;
          const data = []
          const selectRowKeys = []
          dataSource.forEach((x) =>{ 
            if(
              x.shouldChargeYear == chargeDate[0] &&
              x.shouldChargeMonth == chargeDate[1] &&
              x.resourceCode == code.text
            ) {
              data.push(x)
              totalUnPaid += x.unPaid
              if(selectedRowKeys.indexOf(x.billId) > -1){
                selectRowKeys.push(x.billId)
              }
            }
          })
          // 没有数据时不渲染
          if(data.length > 0){
            Node.push({
              headerObj: {
                code: code.text,
                date: shouldChargeDate
              },
              totalUnPaid: totalUnPaid,
              selectRowKeys: selectRowKeys,
              data: data,
            })
          }
        })
      })
      return Node
    }
    // 选取月份和收费项目
    else if (isChargeItemType && isShouldChargeDate) {
      const Node = []
      chargeItemTypes.forEach((item, index) => {
        yearMonths.forEach((date, dIndex) => {
          // const name = item.text || item
          const chargeDate = (date.id || date).split('|')
          const shouldChargeDate = `${chargeDate[0]}/${chargeDate[1]}`
          // const shouldChargeYear = (date.id || date).split('|')[0]
          // const shouldChargeMonth = (date.id || date).split('|')[1]
          let totalUnPaid = null;
          const data = []
          const selectRowKeys = []
          dataSource.forEach((x) =>{ 
            if(
              x.shouldChargeYear == chargeDate[0] &&
              x.shouldChargeMonth == chargeDate[1] &&
              x.chargeItemType == item.text
            ) {
              data.push(x)
              totalUnPaid += x.unPaid
              if(selectedRowKeys.indexOf(x.billId) > -1){
                selectRowKeys.push(x.billId)
              }
            }
          })
          // 没有数据时不渲染
          if(data.length > 0){
            Node.push({
              headerObj: {
                feeName: item.text,
                date: shouldChargeDate
              },
              totalUnPaid: totalUnPaid,
              selectRowKeys: selectRowKeys,
              data: data,
            })
          }
        })
      })
      return Node
    }
    // 只选欠费月份
    else if ( isShouldChargeDate ) {
      const Node = []
      yearMonths.forEach((date, dIndex) => {
        const chargeDate = (date.id || date).split('|')
        const shouldChargeDate = `${chargeDate[0]}/${chargeDate[1]}`
        // const shouldChargeYear = (date.id || date).split('|')[0]
        // const shouldChargeMonth = (date.id || date).split('|')[1]
        let totalUnPaid = null;
        const data = []
        const selectRowKeys = []
        dataSource.forEach((x) =>{ 
          if(
            x.shouldChargeYear == chargeDate[0] &&
            x.shouldChargeMonth == chargeDate[1]
          ) {
            data.push(x)
            totalUnPaid += x.unPaid
            if(selectedRowKeys.indexOf(x.billId) > -1){
              selectRowKeys.push(x.billId)
            }
          }
        })
        // 没有数据时不渲染
        if(data.length > 0){
          Node.push({
            headerObj: {
              date: shouldChargeDate
            },
            totalUnPaid: totalUnPaid,
            selectRowKeys: selectRowKeys,
            data: data,
          })
        }
      })
      return Node
    }
    // 只选收费类型
    else if ( isChargeItemType ) {
      const Node = []
      chargeItemTypes.forEach((item, index) => {
        // const name = item.text || item
        let totalUnPaid = null;
        const data = []
        const selectRowKeys = []
        dataSource.forEach((x) =>{ 
          if(
            x.chargeItemType == item.text
          ) {
            data.push(x)
            totalUnPaid += x.unPaid
            if(selectedRowKeys.indexOf(x.billId) > -1){
              selectRowKeys.push(x.billId)
            }
          }
        })
        // 没有数据时不渲染
        if(data.length > 0){
          Node.push({
            headerObj: {
              feeName: item.text,
            },
            totalUnPaid: totalUnPaid,
            selectRowKeys: selectRowKeys,
            data: data,
          })
        }
      })
      return Node
    } 
    // 只选资源代码
    else if ( isResourceCode ) {
      const Node = []
      resources.forEach((item, index) => {
        // const resourceCode = item.text || item
        let totalUnPaid = null;
        const data = []
        const selectRowKeys = []
        dataSource.forEach((x) =>{ 
          if(
            x.resourceCode == item.text
          ) {
            data.push(x)
            totalUnPaid += x.unPaid
            if(selectedRowKeys.indexOf(x.billId) > -1){
              selectRowKeys.push(x.billId)
            }
          }
        })
        // 没有数据时不渲染
        if(data.length > 0){
          Node.push({
            headerObj: {
              code: item.text,
            },
            totalUnPaid: totalUnPaid,
            selectRowKeys: selectRowKeys,
            data: data,
          })
        }
      })
      return Node
    }
  }

  let Node = getData();
  // 分组选择后，渲染
  // 改变数组长度后，没有重新渲染

  console.log('Node', Node);
  return(
    <div className={styles['virtual-list']}>
      <VirtualList
        total={Node.length}
        presetItemHeight={46}
        onCollapseChange={onCollapseChange}
        collapseKeys={collapseKeys}
        itemRender={(i) => {
          return (
            <Panel header={renderHeader(Node[i].headerObj, Node[i].totalUnPaid, Node[i].data, Node[i].selectRowKeys)} key={i} className='site-collapse-custom-panel'>
              {expandedRowRender(Node[i].data)}
            </Panel>
          )
        }}
      />
    </div>
  )
};

export default CustomProTable;
