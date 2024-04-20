import { useState } from 'react';
// import { connect } from 'dva';
import { Row, Button, Table, Input, Select, Form, Popconfirm, Badge, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type originDataType = [{
  id: string | number,
  orderNum: string | number,
  nickName: string,
  staffName: string,
  role: string | number,
  status: string | number,
  phone: string | number,
}]

type tableRecordType = {
  id: string | number,
  orderNum: string | number,
  nickName: string,
  staffName: string,
  role: string | number,
  status: string | number,
  phone: string | number,
}

type defaultOptionsType = {
  required: boolean,
  message: string,
  pattern?: boolean,
  patmessage: string,
  initialValue: (value:any) => any,
  render: (record?:any) => any,
}

const originData: originDataType = [{
  id: '1',
  orderNum: '1',
  nickName: 'nickName',
  staffName: 'staffName',
  role: 1,
  status: 1,
  phone: '12348912323',
}]

const defaultOptions:defaultOptionsType = {
  required: false,
  message: '',
  patmessage: '',
  initialValue: (value:any) => value,
  render: () => <Input style={{ width: '100%' }} />,
};

const EditableCell = (props:any) => {
  //渲染可编辑单元格
  const renderCell = () => {
    const { 
      // rowKey, 
      dataIndex, record, 
      // needToolTip, toolTipProp, editing 
    } = props;
    const { component } = props;

    const { required, message, pattern,  patmessage, 
      // initialValue, 
      render } = {
      ...defaultOptions,
      ...(component as defaultOptionsType),
    };
    
    // if(editing && needToolTip){
    //   setTimeout(() => {
    //     const tooltips = document.getElementsByClassName("ant-tooltip-inner");
    //     for (let i = 0; i < tooltips.length; i++) {
    //       const item = tooltips[i];
    //       if(item.id === `${rowKey(record)}_${dataIndex}`){
    //         item.parentElement.style.display = "none";
    //       }
    //     }
    //   }, 1000);
    // }

    const rules:any = [
      {
        required,
        message,
      },
    ];
    if(pattern) {
      rules.push({
        pattern,
        message: patmessage,
      })
    }

    return (
      <Form.Item style={{ margin: 0 }} 
        name={dataIndex}
        rules={rules}
      >
        {render(record)}
        {/* {needToolTip && (<Tooltip {...toolTipProp} visible={editing}>&nbsp;</Tooltip>)} */}
      </Form.Item>
    );
  };

  const { editing, children, component } = props;
  const fixedRight = component && component.fixedRight;

  return (
    fixedRight?
    <td className='ant-table-cell ant-table-cell-fix-right ant-table-cell-fix-right-first' style={{right:0}}>
      {children}
    </td>
    :
    <td className='drag-visible'>{editing ? renderCell() : children}</td>
  )
}

const EditableTable = (props:any) => {

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number | string>('');
  const [data, setData] = useState(originData);
  const [ disabledOther, setDisabledOther ] = useState(false);

  const isEditing = (record:tableRecordType) => record.id === editingKey;

  const {
    // dispatch,
    // list,
    // customerStaffSettingVisible,
    page,
    pageSize,
    total,
    // showAddCustomerStaff,
  } = props;

  // 表格行编辑
  const edit = (record:tableRecordType) => {
    form.setFieldsValue({ staffName: '', role: '', phone: '' });
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
    setDisabledOther(true);
  }

  // 表格行取消
  const cancel = () => {
    setEditingKey('');
    setDisabledOther(false);
  };

  // 表格行保存
  const save = async (id:number|string) => {
    // const { customerStaffSetting } = props;
    // const { customerId } = customerStaffSetting;
    try {
      const row = await form.validateFields();
      const newData:originDataType = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
      } else {
        newData.push(row);
      }
      setData(newData);
      setEditingKey('');
      setDisabledOther(false);
      // const postData = {
      //   ...row,
      //   id,
      //   customerId: '3',
      // }
      // dispatch && dispatch({
      //   type: 'customerStaffSetting/updateById',
      //   payload: {
      //     customerId,
      //     postData,
      //   }
      // }).then(() => {
      //   setEditingKey('');
      //   setDisabledOther(false);
      // })
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // 表格行绑定
  const bind = async(record: tableRecordType) => {
    const { id } = record
    let newData:originDataType = [...data];
    const index = newData.findIndex(item => id == item.id);
    if (index > -1) {
      const item = newData[index];
      item.status = 1;
      setData([...newData]);
      setEditingKey('');
    } 
    setDisabledOther(false);
    // const { customerStaffSetting } = props;
    // const { customerId } = customerStaffSetting;
    // dispatch && dispatch({
    //   type: 'customerStaffSetting/bindById',
    //   payload: {
    //     id,
    //     customerId,
    //   }
    // }).then(() => {
    //   setEditingKey('');
    //   setDisabledOther(false);
    // })
  }

  // 表格行删除
  const deleteRow = async(id:number|string) => {
    let newData:tableRecordType[]= [...data];
    const index = newData.findIndex(item => id == item.id);
    newData.splice(index, 1);
    newData = newData.map((item,index) => {
      item.orderNum = index + 1
      return item
    })
    setData(newData.map(item => ({ ...item })) as originDataType)
    setEditingKey('');
    setDisabledOther(false);
    // const { customerStaffSetting } = props;
    // const { customerId } = customerStaffSetting;
    // dispatch && dispatch({
    //   type: 'customerStaffSetting/deleteById',
    //   payload: {
    //     id,
    //     customerId,
    //   }
    // }).then(() => {
    //   setEditingKey('');
    //   setDisabledOther(false);
    // })
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'orderNum',
      key: 'orderNum',
      width: 60,
    },
    {
      title: '微信昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      width: 100,
      render: (text:string|number) => {
        return (<Tooltip placement="top" title={text} overlayStyle={{maxWidth: '200px'}}>
          <span style={{
            maxWidth:'84px',
            display: 'inline-block', 
            verticalAlign: 'middle',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}>
            {text}
          </span>
        </Tooltip>)
      }
    },
    {
      title: '姓名',
      dataIndex: 'staffName',
      key: 'staffName',
      width: 160,
      component: {
        required: true,
        message: '请输入员工姓名',
        render: () => {
          return <Input style={{ width: '100%' }} placeholder='请输入员工姓名(必填)' />;
        },
      },
      editable: true,
      render: (text:string|number) => {
        return (<Tooltip placement="top" title={text} overlayStyle={{maxWidth: '200px'}}>
          <span style={{
            maxWidth:'144px',
            display: 'inline-block', 
            verticalAlign: 'middle',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}>
            {text}
          </span>
        </Tooltip>)
      }
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      component: {
        required: true,
        message: '请选择角色',
        render: () => {
          return (
            <Select style={{ width: '100%' }} placeholder="请选择(必填)">
              <Select.Option value={0}>员工</Select.Option>
              <Select.Option value={1}>管理员</Select.Option>
            </Select>
          );
        },
      },
      render: (_:string | number, record:tableRecordType) => {
        switch (record.role) {
          case 0:
            return <span>员工</span>;
          case 1:
            return <span>管理员</span>;
          default:
            return '';
        }
      },
      editable: true,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: 150,
      component: {
        pattern: /^(((0\d{2,3}-)?\d{7,8})|(1\d{10}))$/,
        patmessage: '请输入固定电话或 11 位手机号！',
        render: () => {
          return <Input style={{ width: '100%' }} placeholder="请输入(选填)"/>;
        },
      },
      editable: true,
      render: (text:string) => {
        return (<Tooltip placement="top" title={text} overlayStyle={{maxWidth: '200px'}}>
          <span style={{
            maxWidth:'134px',
            display: 'inline-block', 
            verticalAlign: 'middle',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}>
            {text}
          </span>
        </Tooltip>)
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_:any, record:any) => renderStatus(record.status)
    },
    {
      title: '操作',
      key: 'operation',
      align: 'center',
      width: 150,
      render: (_:any, record:any) => {
        const editable = isEditing(record)
        let operators:any = [];
        if(editable) {
          operators = [
            <>
              <Button
                key="save"
                type="link"
                style={{}}
                disabled={disabledOther && !editable} 
                onClick={() => save(record.id)}
              >
                保存
              </Button>
              <Popconfirm title="确定要取消?" onConfirm={() => cancel()}>
                <Button
                  type="link"
                  disabled={disabledOther && !editable} 
                >
                  取消
                </Button>
            </Popconfirm>
            </>
          ]
        } else {
          operators = [
            <>
              <Button
                type="link"
                disabled={disabledOther && !editable}
                onClick={() => edit(record)}
              >
                编辑
              </Button>
              {record.status == '0' ?
              <Popconfirm title="确定绑定吗?" onConfirm={() => bind(record)}>
                <Button
                  type="link"
                  disabled={disabledOther && !editable}
                >
                  绑定
                </Button>
              </Popconfirm>
              :
              null}
              <Popconfirm title="确定要删除?" onConfirm={() => deleteRow(record.id)}>
                <Button
                  type="link"
                  disabled={disabledOther && !editable}
                >
                  删除
                </Button  >
              </Popconfirm>
            </>
          ]
        }
        return operators;
      },
    }
  ];

  const renderStatus = (text:number|string) => {
    switch(text) {
      case 0: return <Badge status="default" text="待绑定"></Badge>;
      case 1: return <Badge status="success" text="已绑定"></Badge>;
      default: return '';
    }
  }

  const newComponents = {
    body: {
      cell: EditableCell,
    },
  };

  const newColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record:any) => ({
        record,
        rowKey: (record:any) => record.id,
        editing: isEditing(record),
        dataIndex: col.dataIndex,
        title: col.title,
        component: col.component,
        // needToolTip: col.needToolTip,
        // toolTipProp: col.toolTipProp,
      }),
    };
  });

  const handleAddSModelRow = () => {
    const oldDataLength = data.length;
    const newAddItem = {
      id: oldDataLength + 1,
      orderNum: oldDataLength + 1,
      nickName: 'nickName1',
      staffName: 'staffName1',
      role: 0,
      status: 0,
      phone: '12348912323',
    }
    const newData:originDataType = [...data]
    newData.push(newAddItem)
    setData([...newData])
    // dispatch({
    //   type: 'customerStaffSetting/updateState',
    //   payload: {
    //     showAddCustomerStaff: true,
    //   },
    // });
  }

  const pageChangeHandler = (page:any, pageSize:any) => {
    console.log(page, pageSize);
    // const { customerStaffSetting } = props;
    // const { customerId } = customerStaffSetting;
    // dispatch({
    //   type: 'customerStaffSetting/fetchList',
    //   payload: { 
    //     page, 
    //     pageSize,
    //     customerId,
    //   },
    // });
  };

  return (
      <div style={{minHeight: '100%', background: '#fff', overflow: 'auto'}} className='custom-div'>
        <Row style={{justifyContent: 'flex-end', margin: '10px 50px'}}>
          <Button onClick={handleAddSModelRow}>
            <PlusOutlined />添加员工
          </Button>
        </Row>
        <Row style={{margin: '0 50px'}}>
          <Form form={form} component={false}>
            <Table
              style={{width: '100%'}}
              scroll={{ x: '100%' }}
              bordered={true}
              components={data && data.length > 0 ? newComponents : undefined}
              rowKey={record => record.id}
              dataSource={data}
              columns={newColumns as any}
              pagination={{
                total,
                current: page,
                pageSize,
                onChange: pageChangeHandler,
                showTotal: _total => `总计${_total || 0}条`,
                showSizeChanger: true,
                // position: ['bottomCenter'],
              }}
            />
          </Form>
        </Row>
      </div>
  )
};

export default EditableTable;
