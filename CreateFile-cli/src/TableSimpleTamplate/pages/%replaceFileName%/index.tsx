import React, { useState, useEffect } from "react";
import ProTable from "@ant-design/pro-table";
import { Content, Header } from 'components/Page';
import { operatorRender } from 'utils/renderer';
import { 
  Space,
  // Tooltip,
  Input,
  Select,
  Popconfirm,
  Badge,
  DatePicker,
} from 'antd';
// import { QuestionCircleOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import moment from "moment";
import ButtonPermissionSelf from '@novaFrontCommon/components/ButtonPermissionAuth/ButtonPermissionSelf';
// import buttonPermissionCode from "../../../utils/buttonPremission";
import SideDrawer from "./components/SideDrawer";
import AddOrEdit from './components/addOrEdit';
import %replaceFileName%Service from '../../../services/%replaceFileName%Service'
import exportToExcel from '@novaFrontCommon/utils/exportToExcel';
import './index.less';

const { RangePicker } = DatePicker;

const %replaceFileName%Index = (props) => {

  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<any>({
    total: 0,
    page: 1,
    pageSize: 10,
  });
  const [searchParams, setSearchParams] = useState<any>({})
  // const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  // const [selectedRows, setSelectedRows] = useState<any>([]);
  const [regionList, setRegionList] = useState<any>([]);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [selecInfo, setSelecInfo] = useState<any>({});
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<any>(null);

  const onCancel = () => {
    setDrawerVisible(false);
    setSelecInfo({});
  }

  useEffect(() => {
    getRegionList();
  }, [])

  useEffect(() => {
    fetchList({
      page: 1,
    });
  }, [searchParams])

  const getRegionList = async() => {
    const res:any = await %replaceFileName%Service.getRegionList();
    if(res?.success) {
      setRegionList(res.result.map(item => {
        return {
          value: item.resourceId,
          label: item.resourceName
        }
      }))
    }
  }

  const fetchList = async(data:any = {}) => {
    setLoading(true);
    // const res = await %replaceFileName%Service.fetchList({
    //   page: pageInfo.page,
    //   pageSize: pageInfo.pageSize,
    //   ...searchParams,
    //   ...data,
    // })
    setLoading(false);
    // if(res?.success) {
    //   const result = res.result;
    //   setList(result.data);
    //   setPageInfo({
    //     total: result.total,
    //     page: data.page || pageInfo.page,
    //     pageSize: data.pageSize || pageInfo.pageSize,
    //   })
    // }
    setList([
      {
        id: 1,
        regionName: '管理区',
        code: '日常床单运送',
        status: '0'
      },
      {
        id: 2,
        regionName: '管理区',
        code: '日常床单运送',
        status: '1'
      },
      {
        id: 3,
        regionName: '管理区',
        code: '日常床单运送',
        status: '2'
      }
    ])
    setPageInfo({
      total: 1,
      page: data.page || pageInfo.page,
      pageSize: data.pageSize || pageInfo.pageSize,
    })
  };

  const reLoadFetchList = () => {
    // setSelectedRowKeys([]);
    // setSelectedRows([]);
    fetchList();
  };

  const exportExcel = async() => {
    const response = await %replaceFileName%Service.exportExcel({
      page: pageInfo.page,
      pageSize: pageInfo.pageSize,
      ...searchParams,
    });
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const fileName = `应返记录${date}.xls`;
    exportToExcel(response, fileName);
  }

  const handleDelete = async(record) => {
    const res = await %replaceFileName%Service.deleteById(record.id);
    if(res?.success) {
      reLoadFetchList();
    }
  }

  const doSearch = (values: any) => {
    // setSelectedRowKeys([]);
    // setSelectedRows([]);
    setSearchParams(values);
  }

  const reset = () => {
    // setSelectedRowKeys([]);
    // setSelectedRows([]);
    setSearchParams({});
  }

  const pageChangeHandler = (page, pageSize) => {
    fetchList({ page, pageSize });
  };

  const openAddOrEdit = (title, record = {}) => {
    setEditInfo({
      title: title,
      ...record,
    })
    setEditVisible(true);
  }

  const closeEditModal = () => {
    setEditInfo(null)
    setEditVisible(false);
  }

  // const generateTitle = (title, tooltip) => {
  //   return (
  //     <span>
  //       {title}
  //       <Tooltip title={tooltip} >
  //         <QuestionCircleOutlined style={{ paddingLeft: 5 }} />
  //       </Tooltip>
  //     </span>
  //   );
  // };

  const renderStatus = (text) => {
    switch(text) {
      case '0': return <Badge color='orange' text="未启用"></Badge>;
      case '1': return <Badge color='green' text="已启用"></Badge>;
      case '2': return <Badge color='purple' text="已停用"></Badge>;
      default: return '';
    }
  }

  const columns:any = [
    {
      title: '管理区',
      dataIndex: 'regionName',
      key: 'regionName',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '计划名称',
      dataIndex: 'code',
      key: 'code',
      width: 190,
      ellipsis: true,
      hideInSearch: true,
      render: (text, record) => {
        return <a onClick={() => {
          setSelecInfo(record);
          setDrawerVisible(true)
        }}>
          {record.code}
        </a>
      }
    },
    {
      title: '运送频率',
      dataIndex: 'frequency',
      key: 'frequency',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '计划有效期',
      dataIndex: 'date',
      key: 'date',
      width: 180,
      ellipsis: true,
      hideInSearch: true,
      render: (_, record: any) => {
        if(record.startDate && record.endDate) {
          return moment(record.startDate).format('YYYY/MM/DD') + '~' 
          + moment(record.endDate).format('YYYY/MM/DD')
        }
      }
    },
    {
      title: '运送次数',
      dataIndex: 'num',
      key: 'num',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
      render: (_, record: any) => {
        if(record.createDate) {
          return moment(record.createDate).format('YYYY-MM-DD')
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => renderStatus(record.status)
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 194,
      hideInSearch: true,
      fixed: 'right',
      render: (text, record) => {
        const editButton = {
          key: 'edit',
          ele: (
            <ButtonPermissionSelf
              type="text"
              // permissionList={[
              //   {
              //     code: `${buttonPermissionCode.SettlementShop%replaceFileName%}`,
              //     type: 'button',
              //     meaning: '返款结算',
              //   },
              // ]}
              onClick={() => {
                openAddOrEdit('编辑', record)
              }}
            >
              编辑
            </ButtonPermissionSelf>
          ),
          len: 2,
        };
        const deleteButton = {
          key: 'delete',
          ele: (
            <ButtonPermissionSelf
              type="text"
              // permissionList={[
              //   {
              //     code: `${buttonPermissionCode.DeleteShop%replaceFileName%}`,
              //     type: 'button',
              //     meaning: '删除',
              //   },
              // ]}
            >
              <Popconfirm
                title="确定要删除该数据吗?"
                onConfirm={() => {
                  handleDelete(record);
                }}
                okText="确认"
                cancelText="取消"
              >
                删除
              </Popconfirm>
            </ButtonPermissionSelf>
          ),
          len: 2,
        };
        const enableBtn = {
          key: 'enable',
          ele: (
            <ButtonPermissionSelf
              type="text"
              // permissionList={[
              //   {
              //     code: `${buttonPermissionCode.DeleteShop%replaceFileName%}`,
              //     type: 'button',
              //     meaning: '启用停用',
              //   },
              // ]}
            >
              <Popconfirm 
                title={record.status == '0' ? "确定启用吗?" : "确定停用吗?"} 
                okText="确定" 
                cancelText="取消" 
                onConfirm={() => {}}
              >
                {record.status == '0' ? '启用' : '停用'} 
              </Popconfirm>
            </ButtonPermissionSelf>
          ),
          len: 2,
        };
        const copyButton = {
          key: 'copy',
          ele: (
            <ButtonPermissionSelf
              type="text"
              // permissionList={[
              //   {
              //     code: `${buttonPermissionCode.SettlementShop%replaceFileName%}`,
              //     type: 'button',
              //     meaning: '返款结算',
              //   },
              // ]}
              onClick={() => {
                openAddOrEdit('复制', record)
              }}
            >
              复制
            </ButtonPermissionSelf>
          ),
          len: 2,
        };
    
        const operators: any = [];
    
        if (record.status == '0') {
          operators.push(editButton);
          operators.push(deleteButton);
          operators.push(enableBtn);
          operators.push(copyButton);
        } else if(record.status == '1') {
          operators.push(editButton);
          operators.push(enableBtn);
          operators.push(copyButton);
        } else if(record.status == '2') {
          operators.push(copyButton);
        }
    
        return operatorRender(operators, record, {
          limit: 4,
          label: '更多',
        });
      }
    },
  ]

  const searchColumns:any = [
    {
      title: '管理区',
      dataIndex: 'regionIds',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return(
          <Select 
            placeholder="请选择管理区"
            options={regionList}
            showSearch
            allowClear
            optionFilterProp='label'
            mode="multiple"
          />
        )
      },
    },
    {
      title: '计划有效期',
      dataIndex: 'date',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return (
          <RangePicker
            ranges={{
              今天: [moment().startOf('day'), moment().endOf('day')],
              本月: [moment().startOf('month'), moment().endOf('month')],
              最近三个月: [
                moment()
                  .month(moment().month() - 3)
                  .startOf('day'),
                moment().endOf('day'),
              ],
              最近半年: [
                moment()
                  .month(moment().month() - 6)
                  .startOf('day'),
                moment().endOf('day'),
              ],
              今年: [moment().startOf('year'), moment().endOf('year')],
            }}
            style={{ width: '100%' }}
          />
        )
      },
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return(
          <Input placeholder="请输入创建人" />
        )
      },
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return (
          <RangePicker
            ranges={{
              今天: [moment().startOf('day'), moment().endOf('day')],
              本月: [moment().startOf('month'), moment().endOf('month')],
              最近三个月: [
                moment()
                  .month(moment().month() - 3)
                  .startOf('day'),
                moment().endOf('day'),
              ],
              最近半年: [
                moment()
                  .month(moment().month() - 6)
                  .startOf('day'),
                moment().endOf('day'),
              ],
              今年: [moment().startOf('year'), moment().endOf('year')],
            }}
            style={{ width: '100%' }}
          />
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return(
          <Select placeholder="请选择状态" allowClear>
            <Select.Option value={0} key={0}>未启用</Select.Option>
            <Select.Option value={1} key={1}>已启用</Select.Option>
            <Select.Option value={2} key={2}>已停用</Select.Option>
          </Select>
        )
      },
    },
  ]

  // const onSelectChange = (rowKeys:any, rows:any) => {
  //   setSelectedRowKeys(rowKeys);
  //   setSelectedRows(rows);
  // };

  // const rowSelection = {
  //   columnWidth: '60px',
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  return (
    <div className='common-wrapper'>
      <Header title='运送计划' />
      <Content>
        <ProTable
          columns={[...columns, ...searchColumns]}
          dataSource={list}
          loading={loading}
          rowKey={record => record.id}
          scroll={{ x: '100%' }}
          onSubmit={debounce(doSearch, 1000)}
          onReset={debounce(reset, 1000)}
          options={{
            reload: false,
            fullScreen: false,
          }}
          headerTitle={
            <Space>
              <ButtonPermissionSelf 
                type="primary"
                // permissionList={[
                //   {
                //     code: `${buttonPermissionCode.SettlementShop%replaceFileName%}`,
                //     type: 'button',
                //     meaning: '新建',
                //   },
                // ]}
                onClick={() => openAddOrEdit('新建')}
              >
                新建
              </ButtonPermissionSelf>
              <ButtonPermissionSelf 
                // permissionList={[
                //   {
                //     code: `${buttonPermissionCode.ExportShop%replaceFileName%}`,
                //     type: 'button',
                //     meaning: '导出Excel',
                //   },
                // ]}
                onClick={() => exportExcel()}
              >
                导出Excel
              </ButtonPermissionSelf>
            </Space>
          }
          pagination={{
            total: pageInfo.total,
            current: pageInfo.page,
            pageSize: pageInfo.pageSize,
            onChange: pageChangeHandler,
            showTotal: _total => `总计${_total || 0}条`,
            showQuickJumper: true,
            showSizeChanger: true,
            position: ['bottomRight'],
          }}
          tableAlertRender={false}
          tableAlertOptionRender={false}
        />
        {editVisible && <AddOrEdit
          showVisible={editVisible}
          title={editInfo?.title}
          info={editInfo}
          oncancel={closeEditModal}
        />}
        {drawerVisible && <SideDrawer
          title='应返详情'
          info={selecInfo}
          drawerVisible={drawerVisible}
          onCancel={onCancel}
          reLoad={reLoadFetchList}
        />}
      </Content>
    </div>
  )
}

export default %replaceFileName%Index;