import React, { useRef, useState, useEffect } from 'react';
import { Content, Header } from 'components/Page';
import ProTable from '@ant-design/pro-table';
import { Input, Select, DatePicker, Tag, Tooltip, Tabs, Space, Dropdown, Button, Menu, Popconfirm, message, FormInstance } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ButtonPermissionSelf from '@novaFrontCommon/components/ButtonPermissionAuth/ButtonPermissionSelf';
// import buttonPermissionCode from '../../../utils/buttonPermissionCode';
import moment from 'moment';
import styles from './index.less';
import AddOrEdit from './Modal/AddOrEdit';
import WorkOrderDetailDraw from './Draw/WorkOrderDetailDraw';
// import * as commonDataService from '@novaFrontCommon/services/commonData';
import debounce from 'lodash/debounce';
import ActionModal, { ActionEnum } from '../%replaceFileName%/Modal/ActionModal';
import { operatorRender } from 'utils/renderer';

const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
let timeId:any = null;

const %replaceFileName%Index = (props) => {
  const formRef = useRef<FormInstance>();
  const {
    dispatch,
    searchParams,
    searchLoading,
  } = props;

  const regionList:any = [],
        buildingList:any = [],
        dispatchTypes:any = [],
        operatorList:any = [],
        dispatchPriorities:any = [],
        statusSummaryList:any = [],
        repairSourceTypeList:any = [],
        list:any = [],
        total = 0,
        page = 1,
        pageSize = 10,

  const [status, setStatus] = useState<string>('all');
  const [addOrEditVisible, setAddOrEditVisible] = useState<boolean>(false);
  const [columnsStateMap, setColumnsStateMap] = React.useState<any>({ operator: { fixed: "right" } });
  const [detailDrawVisible, setDetailDrawVisible] = useState<boolean>(false)
  const [record, setRecord] = useState<any>(null);
  const [exportPremissions, setExportPremissions] = useState<any>({
    export: false,
    exportdispatch: false,
    repairManageRemark: false,
    repairManagePrint: false,
    repairManagePrintdispatch: false,
    repairManageDel: false,
    repairManageEdit: false,
  })
  const [actionModalInfo, setActionModalInfo] = React.useState<{
    title: ActionEnum;
    visible: boolean;
    row: any;
  }>();

  useEffect(() => {
    // dispatch({
    //   type: modelUtil.getActionName('init'),
    // });
    // dispatch({
    //   type: modelUtil.getActionName('getStatusAndSummary'),
    //   payload: {
    //     page: 1,
    //     pageSize: 10,
    //   }
    // });
    
    getPremissions();

    return () => {
      if(timeId) {
        clearTimeout(timeId)
      }
    }
  }, [])

  const getStatusAndSummary = async (data) => {
    const res = await 
  }

  useEffect(() => {
    // dispatch({
    //   type: modelUtil.getActionName('getStatusAndSummary'),
    //   payload: {
    //     ...searchParams,
    //     page: 1,
    //     pageSize: searchParams.pageSize ?? 10,
    //     repairStatus: undefined,
    //   }
    // });
    // dispatch({
    //   type: modelUtil.getActionName('fetchList'),
    //   payload: {
    //     ...searchParams,
    //     page: 1,
    //     pageSize: searchParams.pageSize ?? 10,
    //     repairStatus: status !== 'all' ? status : undefined,
    //   }
    // });
  }, [status])

  const getPremissions = async () => {
    // const res = await commonDataService.checkPermissions([
    //   buttonPermissionCode.repairManageExport,
    //   buttonPermissionCode.repairManageExportdispatch,
    //   buttonPermissionCode.repairManageDetail,
    //   buttonPermissionCode.repairManageRemark,
    //   buttonPermissionCode.repairManagePrint,
    //   buttonPermissionCode.repairManagePrintdispatch,
    //   buttonPermissionCode.repairManageDel,
    //   buttonPermissionCode.repairManageEdit,
    // ]);
    // if (res && !res?.failed) {
      // const repairManageExport = res.find(x => x.code === buttonPermissionCode.repairManageExport)
      // const repairManageExportdispatch = res.find(x => x.code === buttonPermissionCode.repairManageExportdispatch)
      // const repairManageRemark = res.find(x => x.code === buttonPermissionCode.repairManageRemark)
      // const repairManagePrint = res.find(x => x.code === buttonPermissionCode.repairManagePrint)
      // const repairManagePrintdispatch = res.find(x => x.code === buttonPermissionCode.repairManagePrintdispatch)
      // const repairManageDel = res.find(x => x.code === buttonPermissionCode.repairManageDel)
      // const repairManageEdit = res.find(x => x.code === buttonPermissionCode.repairManageEdit)
      
      setExportPremissions({
        // export: repairManageExport.approve,
        // exportdispatch: repairManageExportdispatch.approve,
        // repairManageRemark: repairManageRemark.approve,
        // repairManagePrint: repairManagePrint.approve,
        // repairManagePrintdispatch: repairManagePrintdispatch.approve,
        // repairManageDel: repairManageDel.approve,
        // repairManageEdit: repairManageEdit.approve,
      })
    // }
  };

  const onColumnsStateChange = (map) => {
    let tempMap = {};
    if (Object.keys(map).length == 0) {
      // 重置时，保证操作列为固定在列尾
      tempMap['operator'] = { fixed: "right" }
    } else {
      // 保证全选不改变已有顺序
      for (let i = 0; i < columns.length; i++) {
        let key = columns[i].key;
        if (!map[`${key}`]) {
          map[`${key}`] = {}
        }
        if (map[`${key}`].show == undefined) {
          if (!columnsStateMap[`${key}`]) {
            columnsStateMap[`${key}`] = {}
          }
          columnsStateMap[`${key}`].show = undefined
        }
        if (map[`${key}`].fixed == undefined) {
          if (!columnsStateMap[`${key}`]) {
            columnsStateMap[`${key}`] = {}
          }
          columnsStateMap[`${key}`].fixed = undefined
        }
        tempMap[`${key}`] = { ...columnsStateMap[`${key}`], ...map[`${key}`] }
      }
    }
    setColumnsStateMap(tempMap);
  };

  const changeTab = (key: string) => {
    setStatus(key)
  }

  const onRegionChange = (value) => {
    formRef?.current?.setFieldsValue({
      buildingParkingId: undefined,
    })
    // dispatch({
    //   type: modelUtil.getActionName('onSearchRegionChange'),
    //   payload: value,
    // });
  }

  const reloadTable = () => {
    if(timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      // dispatch({
      //   type: modelUtil.getActionName('getStatusAndSummary'),
      //   payload: {
      //     ...searchParams,
      //     repairStatus: undefined,
      //     page: 1,
      //     pageSize: searchParams.pageSize ?? 10,
      //   }
      // });
      // dispatch({
      //   type: modelUtil.getActionName('fetchList'),
      //   payload: {
      //     ...searchParams,
      //     page: 1,
      //     pageSize: searchParams.pageSize ?? 10,
      //     repairStatus: status !== 'all' ? status : undefined,
      //   }
      // });
    }, 600)
  }

  const search = (values) => {
    const search = {...values}
    if(values.date && values.date.length == 2) {
      search.startTime = values.date[0];
      search.endTime = values.date[1];
    }
    delete search.date;
    // dispatch({
    //   type: modelUtil.getActionName('getStatusAndSummary'),
    //   payload: {
    //     page: 1,
    //     pageSize: 10,
    //     ...search,
    //   }
    // });
    // dispatch({
    //   type: modelUtil.getActionName('fetchList'),
    //   payload: {
    //     page: 1,
    //     pageSize: 10,
    //     repairStatus: status !== 'all' ? status : undefined,
    //     ...search,
    //   }
    // });
  };

  const reSet = () => {
    // dispatch({
    //   type: modelUtil.getActionName('getStatusAndSummary'),
    //   payload: {
    //     page: 1,
    //     pageSize: 10,
    //   }
    // });
    // dispatch({
    //   type: modelUtil.getActionName('fetchList'),
    //   payload: {
    //     page: 1,
    //     pageSize: 10,
    //     repairStatus: status !== 'all' ? status : undefined,
    //   }
    // });
  };

  const pageChangeHandler = (page, pageSize) => {
    // dispatch({
    //   type: modelUtil.getActionName('fetchList'),
    //   payload: {
    //     ...searchParams,
    //     page,
    //     pageSize,
    //     repairStatus: status !== 'all' ? status : undefined,
    //   }
    // });
  };

  const openAddOrEdit = (record?: any) => {
    if (record?.id) {
      // dispatch({
      //   type: modelUtil.getActionName('openRepairModl'),
      //   payload: {
      //     title: '编辑工单',
      //     id: record.id,
      //   },
      // })
      setRecord(record)
    } else {
      // dispatch({
      //   type: modelUtil.getActionName('openRepairModl'),
      //   payload: {
      //     title: '新建工单',
      //   },
      // })
    }
    setAddOrEditVisible(true);
  }

  const deleteRepair = (record) => {
    // dispatch({
    //   type: modelUtil.getActionName('deleteRepair'),
    //   payload: {
    //     ids: [record.id],
    //   },
    // }).then(res => {
    //   if(res?.success) {
    //     message.info({
    //       content: res.result,
    //     })
    //   }
    // })
  }

  const exportRepairsExcel = () => {
    // dispatch({
    //   type: modelUtil.getActionName('exportRepairsExcel'),
    //   payload: {
    //     searchParams: searchParams,
    //     title: '工单',
    //   },
    // })
  }

  const exportDispatchExcel = () => {
    // dispatch({
    //   type: modelUtil.getActionName('exportDispatchExcel'),
    //   payload: {
    //     searchParams: searchParams,
    //     title: '派工单',
    //   },
    // })
  }

  const renderStatus = (text) => {
    switch (text) {
      case '待分配':
        return <Tag color="orange">待分配</Tag>
      case '已分配':
        return <Tag color="geekblue">{text}</Tag>;
      case '待处理':
      case '处理中':
        return <Tag color="blue">{text}</Tag>;
      case '已处理':
        return <Tag color="greenyellow">{text}</Tag>;
			case '待确认':
				return <Tag color="green">{text}</Tag>;
			case '待回访':
				return <Tag color="magenta">{text}</Tag>;
      case '待评价':
        return <Tag color="purple">{text}</Tag>;
      case '已确认未完成':
        return <Tag color="green">{text}</Tag>;
      case '已确认已完成':
        return <Tag color="#800080">{text}</Tag>;
      case '已关闭':
        return <Tag color="default">{text}</Tag>;
      case '已撤销':
        return <Tag color="darkgray">{text}</Tag>;
      case '已作废':
        return <Tag color="lightgray">{text}</Tag>;
      case '已撤回':
        return <Tag color="red">{text}</Tag>;
      default:
        return <Tag color="indianred">{text}</Tag>;
    }
  }

  const onButtonClick = (buttonName, record) => {
    setActionModalInfo({
      title: buttonName as any,
      visible: true,
      row: record,
    });
  };

  const getFontColor = (colour) => {
    const hex = colour.replace(/#/, '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    return [
      0.299 * r,
      0.587 * g,
      0.114 * b
    ].reduce((a, b) => a + b) / 255 > 0.5 ? '#000' : '#fff';
  };

  const columns: any = [
    {
      title: '工单编号',
      dataIndex: 'code',
      key: 'code',
      width: 240,
      search: false,
      render: (text,record) => {
        return text ? (
          <span>
            <a onClick={() => {onGdnoClicked(record)}}>{text}</a>
            {
              record.overtimeInfo &&<Tooltip title={`${record.overtimeInfo.overtimeMinute >= 0 ? `超时${record.overtimeInfo.overtimeMinute}分钟` : `${record.overtimeInfo.overtimeMinute * -1}分钟后即将超时`}`}> <span
                style={{
                  display: 'inline-block',
                  color: `${getFontColor(record.overtimeInfo.color)}`,
                  background: `${record.overtimeInfo.color}`,
                  height: '20px',
                  padding: '0 7px',
                  marginLeft: '8px',
                  textAlign: 'center',
                  minWidth: '28px',
                  fontSize: '12px',
                  lineHeight: '20px',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                {
                  record.overtimeInfo.overtimeMinute >= 0 ? record.overtimeInfo.overtimeMinute : record.overtimeInfo.overtimeMinute * -1
                }
              </span>
              </Tooltip>
            }
          </span>
        ) : ''
        // return text ? exportPremissions.viewDetail ?
        //  <a onClick={() => {onGdnoClicked(record)}}>{text}</a> : text : '-'
      }
    },
    {
      title: '管理区',
      dataIndex: 'regionName',
      key: 'regionName',
      width: 120,
      ellipsis: true,
      search: false,
      render: (_, record) => {
        return <Tooltip placement="topLeft" title={record.regionName}>
          <span
            style={{
              width:'104px', 
              display: 'inline-block', 
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            {record.regionName}
          </span>
        </Tooltip>
      },
    },
    {
      title: '楼宇',
      dataIndex: 'buildingParkingName',
      key: 'buildingParkingName',
      width: 120,
      search: false,
      render: (_, record) => {
        return <Tooltip placement="topLeft" title={record.buildingParkingName}>
          <span
            style={{
              width:'104px', 
              display: 'inline-block', 
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            {record.buildingParkingName}
          </span>
        </Tooltip>
      },
    },
    {
      title: '工单详情',
      dataIndex: 'details',
      key: 'details',
      width: 150,
      search: false,
      render: (_, record) => {
        return (
          <Tooltip title={record.details} arrowPointAtCenter>
            <span
              style={{
                width:'134px', 
                display: 'inline-block', 
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
            >
              {record.details}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'repairStatusStr',
      key: 'repairStatusStr',
      width: 80,
      search: false,
      render: (_, record) => renderStatus(record.repairStatusStr),
    },
    {
      title: '报修人',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 100,
      search: false,
      render: (_, record) => {
        return <span>{record.customerName}</span>;
      },
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 106,
      search: false,
      render: (_, record) => {
        return <span>{record.phone}</span>;
      },
    },
    {
      title: '录单时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      width: 130,
      search: false,
      render: (_, record) => {
        return record.submitTime ? moment(record.submitTime).format('YYYY/MM/DD HH:mm') : null;
      },
    },
    {
      title: '报修地点',
      dataIndex: 'place',
      key: 'place',
      width: 150,
      search: false,
      render: (_, record) => {
        return <Tooltip placement="topLeft" title={record.place}>
          <span
            style={{
              width:'134px', 
              display: 'inline-block', 
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            {record.place}
          </span>
        </Tooltip>
      },
    },
    {
      title: '分配人',
      dataIndex: 'dispatchEmployName',
      key: 'dispatchEmployName',
      width: 100,
      search: false,
      render: (_, record) => {
        return <span>{record.dispatchEmployName}</span>;
      },
    },
    {
      title: '维修人',
      dataIndex: 'assignees',
      key: 'assignees',
      width: 150,
      search: false,
      render: (_, record) => {
        return <Tooltip placement="topLeft" title={record.assignees}>
          <span
            style={{
              width:'134px', 
              display: 'inline-block', 
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            {record.assignees}
          </span>
        </Tooltip>
      },
    },
    {
      title: '工单时限',
      dataIndex: 'priorityName',
      key: 'priorityName',
      width: 120,
      search: false,
      render: (_, record) => {
        return <Tooltip placement="topLeft" title={record.priorityName}>
          <span
            style={{
              width:'104px', 
              display: 'inline-block', 
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            {record.priorityName}
          </span>
        </Tooltip>
      },
    },
    {
      title: '工单大类',
      dataIndex: 'repairTypeParentName',
      key: 'repairTypeParentName',
      width: 100,
      search: false,
      render: (_, record) => {
        return <span>{record.repairTypeParentName}</span>;
      },
    },
    {
      title: '工单子类',
      dataIndex: 'repairTypeName',
      key: 'repairTypeName',
      width: 100,
      search: false,
      render: (_, record) => {
        return <span>{record.repairTypeName}</span>;
      },
    },
    {
      title: '报修来源',
      dataIndex: 'sourceTypeStr',
      key: 'sourceTypeStr',
      width: 80,
      search: false,
      render: (_, record) => {
        return <span>{record.sourceTypeStr}</span>;
      },
    },
    {
      title: '派工单号',
      dataIndex: 'dispatchCode',
      key: 'dispatchCode',
      width: 184,
      search: false,
      render: (_, record) => {
        return <span>{record.dispatchCode}</span>;
      },
    },
    {
      title: '派工时间',
      dataIndex: 'dispatchTime',
      key: 'dispatchTime',
      width: 130,
      search: false,
      render: (_, record) => {
        return <span>{record.dispatchTime}</span>;
      },
    },
    {
      title: '回单时间',
      dataIndex: 'finishTime',
      key: 'finishTime',
      width: 130,
      search: false,
      render: (_, record) => {
        return <span>{record.finishTime}</span>;
      },
    },
    {
      title: '确认人员',
      dataIndex: 'confirmEmployName',
      key: 'confirmEmployName',
      width: 100,
      search: false,
      render: (_, record) => {
        return <span>{record.confirmEmployName}</span>;
      },
    },
    {
      title: '确认时间',
      dataIndex: 'confirmTime',
      key: 'confirmTime',
      width: 130,
      search: false,
      render: (_, record) => {
        return <span>{record.confirmTime}</span>;
      },
    },
    {
      title: '回访人员',
      dataIndex: 'returnVisitPerson',
      key: 'returnVisitPerson',
      width: 100,
      search: false,
      render: (_, record) => {
        return <span>{record.returnVisitPerson}</span>;
      },
    },
    {
      title: '回访时间',
      dataIndex: 'returnVisitTime',
      key: 'returnVisitTime',
      width: 130,
      search: false,
      render: (_, record) => {
        return <span>{record.returnVisitTime}</span>;
      },
    },
    {
      title: '操作',
      dataIndex: 'operator',
      key: 'operator',
      width: 228,
      search: false,
      fixed: 'right',
      render: (_, record) => {
        const operators:any = [];
        if(record.repairStatusStr !== '已关闭' && record.repairStatusStr !== '已撤回' && exportPremissions.repairManageEdit) {
          operators.push(
            {
              key: 'edit',
              ele: (
                <ButtonPermissionSelf
                  type="text"
                  onClick={() => openAddOrEdit(record)}
                >
                  编辑
                </ButtonPermissionSelf>
              ),
              len: 2,
            },
          )
        }
        if(record.repairStatusStr !== '已撤回' && exportPremissions.repairManageDel) {
          operators.push(
            {
              key: 'del',
              ele: (
                <Popconfirm
                  title="确定要删除该工单吗？"
                  onConfirm={() => deleteRepair(record)}
                >
                  <ButtonPermissionSelf 
                    type="text"
                  >
                    删除
                  </ButtonPermissionSelf>
                </Popconfirm>
              ),
              len: 2,
            },
          )
        }
        if(record.repairStatusStr !== '已撤回' && exportPremissions.repairManageRemark) {
          operators.push(
            {
              key: 'printdispatch',
              ele: (
                <ButtonPermissionSelf
                  type="text"
                  onClick={() => onButtonClick('备注', record)}
                >
                  备注
                </ButtonPermissionSelf>
              ),
              len: 5,
            },
          )
        }
        const newOperators = operators.filter(Boolean)
        return operatorRender(newOperators, record, {
          limit: 3,
          label: '更多',
        });
      },
    },
  ]

  const searhColumns: any = [
    {
      title: '快速查询',
      dataIndex: 'search',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return (
          <Input {...rest} placeholder="工单编号/报修人/报修地点/电话/派工单号" />
        )
      },
    },
    {
      title: '工单大类',
      dataIndex: 'repairTypeId',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return (
          <Select
            {...rest}
            placeholder="请选择工单大类"
            showSearch
            filterOption={(input: any, option: any) => {
              return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
            allowClear
          >
            {dispatchTypes.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name || item.text}
              </Option>
            ))}
          </Select>
        )
      },
    },
    {
      title: '管理区',
      dataIndex: 'regionId',
      hideInTable: true,
      fieldProps: {
        onChange: onRegionChange,
      },
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return (
          <Select
            {...rest}
            placeholder="请选择管理区"
            showSearch
            filterOption={(input: any, option: any) => option?.children?.indexOf(input) >= 0}
            allowClear
          >
            {regionList.map(item => (
              <Option key={item.resourceId} value={item.resourceId}>
                {item.name || item.resourceName}
              </Option>
            ))}
          </Select>
        )
      },
    },
    {
      title: '楼宇',
      dataIndex: 'buildingParkingId',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return (
          <Select
            {...rest}
            placeholder="请选择楼宇"
            showSearch
            filterOption={(input: any, option: any) => {
              return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
            allowClear
          >
            {buildingList.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name || item.text}
              </Option>
            ))}
          </Select>
        )
      },
    },
    {
      title: '报修来源',
      dataIndex: 'sourceType',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return (
          <Select
            {...rest}
            placeholder="请选择报修来源"
            showSearch
            filterOption={(input: any, option: any) => {
              return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
            allowClear
          >
            {repairSourceTypeList.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name || item.text}
              </Option>
            ))}
          </Select>
        )
      },
    },
    {
      title: '分配人',
      dataIndex: 'dispatchEmployId',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return (
          <Select
            {...rest}
            placeholder="请选择分配人"
            showSearch
            mode='multiple'
            filterOption={(input: any, option: any) => {
              return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
            allowClear
          >
            {operatorList.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name || item.text || item.label}
              </Option>
            ))}
          </Select>
        )
      },
    },
    {
      title: '维修人',
      dataIndex: 'assignees',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return (
          <Select
            {...rest}
            placeholder="请选择维修人"
            showSearch
            mode='multiple'
            filterOption={(input: any, option: any) => {
              return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
            allowClear
          >
            {operatorList.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name || item.text || item.label}
              </Option>
            ))}
          </Select>
        )
      },
    },
    {
      title: '报修时间',
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
      title: '工单时限',
      dataIndex: 'priorityId',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return (
          <Select
            {...rest}
            placeholder="请选择工单时限"
            showSearch
            filterOption={(input: any, option: any) => {
              return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
            allowClear
          >
            {dispatchPriorities.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        )
      },
    },
  ]

  const exportMenu = (
    <Menu>
      {exportPremissions.export && <Menu.Item onClick={() => exportRepairsExcel()}>
        导出工单
      </Menu.Item>}
      {exportPremissions.exportdispatch && <Menu.Item onClick={() => exportDispatchExcel()}>
        导出派工单
      </Menu.Item>}
    </Menu>
  );

  const onGdnoClicked = record => {
    setRecord(record)
    setDetailDrawVisible(true)
  }

  const onCloseDrawerClicked = () => {
    setRecord(null)
    setDetailDrawVisible(false)
  }

  return (
    <div className={styles['cus-table-pro']}>
      <Header title="工单管理" />
      <Content>
        <ProTable
          formRef={formRef}
          loading={searchLoading || false}
          columns={columns.concat(searhColumns)}
          dataSource={list}
          rowKey={(record: any) => record.id}
          options={{
            reload: false,
            fullScreen: false,
          }}
          scroll={{ x: '100%' }}
          cardProps={{
            bordered: false,
            title: (
              <Tabs onChange={changeTab} activeKey={status + ''}>
                {statusSummaryList.map((tab) => {
                  if(tab.statusStr == '全部') {
                    tab.status = 'all'
                  }
                  return <TabPane
                    key={tab.status}
                    style={{ fontSize: '14px' }}
                    tab={`${tab.statusStr}（${tab.count || 0}）`}
                  />
                })}
              </Tabs>
            ),
          }}
          headerTitle={
            <Space>
              <ButtonPermissionSelf
                type="primary"
                // permissionList={[
                //   {
                //     code: buttonPermissionCode.repairManageCreate,
                //     type: 'button',
                //     meaning: '新建',
                //   },
                // ]}
                onClick={() => openAddOrEdit()}
              >
                新建
              </ButtonPermissionSelf>
              {(exportPremissions.export || exportPremissions.exportdispatch) && <Dropdown
                overlay={exportMenu}
              >
                <Button>
                  导出Excel<DownOutlined />
                </Button>
              </Dropdown>}
            </Space>
          }
          pagination={{
            total,
            current: page,
            pageSize,
            onChange: pageChangeHandler,
            showTotal: _total => `总计${_total || 0}条`,
            showQuickJumper: true,
            showSizeChanger: true,
            position: ['bottomRight'],
          }}
          onReset={debounce(reSet, 1000)}
          onSubmit={debounce(search, 1000)}
          columnsStateMap={columnsStateMap}
          onColumnsStateChange={onColumnsStateChange}
        />
        {addOrEditVisible && <AddOrEdit
          addOrEditVisible={addOrEditVisible}
          info={record}
          onCloce={() => {setAddOrEditVisible(false); setRecord(null)}}
          onSubmit={() => {setAddOrEditVisible(false); setRecord(null)}}
        />}
        {
          detailDrawVisible && <WorkOrderDetailDraw
            visible={detailDrawVisible}
            closeDrawer={onCloseDrawerClicked}
            info={record}
            reloadTable={reloadTable}
          />
        }
        {actionModalInfo?.visible && <ActionModal
          actionModalInfo={actionModalInfo}
          setActionModalInfo={setActionModalInfo}
          reLoad={reloadTable}
          closeWrapDrawer={onCloseDrawerClicked}
        />}
      </Content>
    </div>
  )
}

export default %replaceFileName%Index;
