import React, { useState, useEffect } from "react";
import ProTable from "@ant-design/pro-table";
import { Content, Header } from 'components/Page';
import { operatorRender } from 'utils/renderer';
import { 
  Space,
  Tooltip,
  Popconfirm,
  Select,
  Input,
  Badge,
} from 'antd';
import debounce from 'lodash/debounce';
import ButtonPermissionSelf from '@novaFrontCommon/components/ButtonPermissionAuth/ButtonPermissionSelf';
// import buttonPermissionCode from "../../../utils/buttonPremission";
import AddOrEdit from './components/addOrEdit';
import %replaceFileName%Service from '../../../../services/VoucherManagement/%replaceFileName%Service'
import SetOfbooksListService from "../../../../services/VoucherManagement/SetOfbooksListService";

const %replaceFileName%Index = (props) => {

  const searchParamsRef:any = React.useRef<any>({});

  const [bookOptions, setBookOptions] = useState<any>([]);
  const [accountTypeList, setAccountTypeList] = useState<any>([])
  const [checkTypeList, setCheckTypeList] = useState<any>([])
  const [statusList , setStatusList] = useState<any>([])

  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [voucherBookId, setVoucherBookId] = useState<any>(undefined);
  const [pageInfo, setPageInfo] = useState<any>({
    total: 0,
    page: 1,
    pageSize: 10,
  });

  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<any>(null);

  useEffect(() => {
    getInitData();
    getCommonVoucherBooks();
  }, [])

  const getCommonVoucherBooks = async() => {
    const res = await SetOfbooksListService.getCommonVoucherBooks()
    if(res && res?.success) {
      const result = res?.result ?? []
      setBookOptions(result.map(item => {
        return {value: item?.id, label: item.name}
      }))
      if(result?.length > 0) {
        onVoucherBookChange(result[0].id)
      }
    }
  }

  const getInitData = () => {
    fetchCommonAccountTypeList();
    fetchCommonCheckTypeList();
    fetchCommonStatusList();
  }

  const fetchCommonAccountTypeList = async() => {
    const res = await %replaceFileName%Service.fetchCommonAccountTypeList()
    if(res && res?.success) {
      setAccountTypeList((res?.result ?? []).map(item => {
        return {value: item?.value, label: item.key}
      }) || [])
    }
  }

  const fetchCommonCheckTypeList = async() => {
    const res = await %replaceFileName%Service.fetchCommonCheckTypeList()
    if(res && res?.success) {
      setCheckTypeList((res?.result ?? []).map(item => {
        return {value: item?.value, label: item.key}
      }) || [])
    }
  }

  const fetchCommonStatusList = async() => {
    const res = await %replaceFileName%Service.fetchCommonStatusList()
    if(res && res?.success) {
      setStatusList((res?.result ?? []).map(item => {
        return {value: item?.value, label: item.key}
      }) || [])
    }
  }

  const fetchList = async(data:any = {}) => {
    setLoading(true);
    const res = await %replaceFileName%Service.fetchList({
      page: pageInfo.page,
      pageSize: pageInfo.pageSize,
      bookId: voucherBookId,
      ...searchParamsRef.current,
      ...data,
    })
    setLoading(false);
    if(res && res?.success) {
      const result = res.result;
      setList(result.records ?? []);
      setPageInfo({
        total: result.total,
        page: data.page || pageInfo.page,
        pageSize: data.pageSize || pageInfo.pageSize,
      })
    } else {
      setList([]);
      setPageInfo({
        total: 0,
        page: 1,
        pageSize: 10,
      })
    }
  };

  const reLoadFetchList = () => {
    fetchList();
  };

  const handleDelete = async(record) => {
    const res = await %replaceFileName%Service.deleteById({id: record.id});
    if(res?.success) {
      reLoadFetchList();
    }
  }

  const enableOrDisable = async(record) => {
    const res = await %replaceFileName%Service.enableOrDisable({
      id: record.id, 
      status: record.dataStatus == 1 ? '禁用' : '启用',
    })

    if(res?.success) {
      reLoadFetchList();
    }
  }

  const doSearch = (params: any) => {
    searchParamsRef.current = params;
    fetchList({
      page: 1,
      ...params,
    });
  }

  const reset = () => {
    searchParamsRef.current = {};
    fetchList({
      page: 1,
    });
  }

  const pageChangeHandler = (page, pageSize) => {
    fetchList({ page, pageSize });
  };

  const openModal = (title, record = {}) => {
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

  const renderStatus = (text) => {
    const target = statusList.find(item => item?.value == text);
    if(target && target?.label === '启用') {
      return <Badge color='green' text="启用"></Badge>;
    }
    else if(target && target?.label === '禁用') {
      return <Badge color='red' text="禁用"></Badge>;
    }
    else {
      return '';
    }
    // switch(text) {
    //   case 1: return <Badge color='red' text="禁用"></Badge>;
    //   case 0: return <Badge color='green' text="启用"></Badge>;
    //   default: return '';
    // }
  }

  const searchColumns:any = [
    {
      title: '快速查询',
      dataIndex: 'search',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return(
          <Input placeholder="科目编号/科目名称" />
        )
      },
    },
    {
      title: '科目大类',
      dataIndex: 'accountType',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return(
          <Select placeholder="请选择科目大类" 
            options={accountTypeList}
            showSearch
            allowClear
            optionFilterProp="label"
          />
        )
      },
    },
    {
      title: '辅助核算',
      dataIndex: 'checkType',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return(
          <Select placeholder="请选择辅助核算" 
            options={checkTypeList}
            showSearch
            allowClear
            optionFilterProp="label"
          />
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'dataStatus',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return(
          <Select placeholder="请选择状态" 
            options={statusList}
            showSearch
            allowClear
            optionFilterProp="label"
          />
        )
      },
    },
  ]

  const columns:any = [
    {
      title: '科目大类',
      dataIndex: 'accountTypeStr',
      key: 'accountTypeStr',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '科目编号',
      dataIndex: 'code',
      key: 'code',
      width: 190,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '科目名称',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '辅助核算',
      dataIndex: 'checkType',
      key: 'checkType',
      width: 180,
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => {
        return record?.checkTypeList?.length > 0 ? record?.checkTypeList.map(item => item.key).join('、') : ''
      }
    },
    {
      title: '状态',
      dataIndex: 'dataStatus',
      key: 'dataStatus',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => renderStatus(record.dataStatus)
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      hideInSearch: true,
      fixed: 'right',
      render: (text, record) => {
        // 删除，需要校验：
        // 1、已在“科目配置”中被使用的科目，不让删除，提示“此科目已被使用，无法删除”。
        // 2、已生成凭证的科目，不让删除，提示“此科目已生成凭证，无法删除”。
        let canDelte = false;
        let cantDeleteTip = '此科目已被使用，无法删除';

        const editButton = {
          key: 'edit',
          ele: (
            <ButtonPermissionSelf
              type="text"
              // permissionList={[
              //   {
              //     code: `${buttonPermissionCode.Settlement%replaceFileName%}`,
              //     type: 'button',
              //     meaning: '编辑',
              //   },
              // ]}
              onClick={() => {
                openModal('编辑', record)
              }}
            >
              编辑
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
              //     code: `${buttonPermissionCode.Delete%replaceFileName%}`,
              //     type: 'button',
              //     meaning: '启用停用',
              //   },
              // ]}
            >
              <Popconfirm 
                title={record.dataStatus == 1 ? "确定启用吗?" : "确定禁用吗?"} 
                okText="确定" 
                cancelText="取消" 
                onConfirm={() => enableOrDisable(record)}
              >
                {record.dataStatus == 1 ? '启用' : '禁用'} 
              </Popconfirm>
            </ButtonPermissionSelf>
          ),
          len: 2,
        };
        const deleteButton = {
          key: 'delete',
          ele: (
            canDelte ? 
            <ButtonPermissionSelf
              type="text"
              // permissionList={[
              //   {
              //     code: `${buttonPermissionCode.Delete%replaceFileName%}`,
              //     type: 'button',
              //     meaning: '删除',
              //   },
              // ]}
            >
              <Popconfirm
                title="删除账套会一并删除账套下科目列表，科目配置，确定删除吗？"
                onConfirm={() => {
                  handleDelete(record);
                }}
                okText="确认"
                cancelText="取消"
              >
                删除
              </Popconfirm>
            </ButtonPermissionSelf>
            : 
            <ButtonPermissionSelf
              type="text"
              style={{ cursor: 'not-allowed', color: 'rgba(204, 204, 204, 0.8)' }}
              // permissionList={[
              //   {
              //     code: `${buttonPermissionCode.Delete%replaceFileName%}`,
              //     type: 'button',
              //     meaning: '删除',
              //   },
              // ]}
            >
              <Tooltip title={cantDeleteTip}>
                删除
              </Tooltip>
            </ButtonPermissionSelf>
          ),
          len: 2,
        };
    
        const operators: any = [];
    
        operators.push(editButton);
        operators.push(enableBtn);
        operators.push(deleteButton);

        return operatorRender(operators, record, {
          limit: 4,
          label: '更多',
        });
      }
    },
  ]

  const onVoucherBookChange = (val) => {
    setVoucherBookId(val)
    // 账套改变, 重新获取列表
    setList([])
    setPageInfo({
      total: 0,
      page: 1,
      pageSize: pageInfo.pageSize,
    })
    if(val){
      fetchList({
        page: 1,
        bookId: val,
      })
    }
  }

  return (
    <div className='common-wrapper'>
      <Header 
        title={
          <>
            <span>财务科目列表</span>
            <Select
              style={{minWidth: '150px', maxWidth: '500px', marginLeft: '16px'}}
              placeholder="请选择账套"
              showSearch
              optionFilterProp="label"
              value={voucherBookId}
              onChange={onVoucherBookChange}
              options={bookOptions}
            />
          </>
        } 
      />
      <Content>
        <ProTable
          columns={[...columns, ...searchColumns]}
          dataSource={list}
          loading={loading}
          rowKey={record => record.id}
          scroll={{ x: '100%' }}
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
                //     code: `${buttonPermissionCode.Settlement%replaceFileName%}`,
                //     type: 'button',
                //     meaning: '新建账套',
                //   },
                // ]}
                onClick={() => openModal('新建')}
              >
                新建科目
              </ButtonPermissionSelf>
            </Space>
          }
          onSubmit={debounce(doSearch, 1000)}
          onReset={debounce(reset, 1000)}
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
          voucherBookId={voucherBookId}
          oncancel={closeEditModal}
          reLoadFetchList={reLoadFetchList}
        />}
      </Content>
    </div>
  )
}

export default %replaceFileName%Index;