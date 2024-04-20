import React, { useRef, useEffect, useState } from "react";
import { 
  Modal,
  Form,
  Row,
  Col,
  Button,
  Radio,
  Input,
  DatePicker,
  Select,
  // message,
} from 'antd';
import ButtonPermissionSelf from '@novaFrontCommon/components/ButtonPermissionAuth/ButtonPermissionSelf';
// import buttonPermissionCode from '../../../../utils/buttonPermissionCode';
import moment from 'moment';
import styles from '../index.less';

const AddOrEdit = (props) => {
  const [form] = Form.useForm();
  const {
    record,
    addOrEditVisible,
    onCloce,
    info,
    loading,
  } = props;

  const title = '新建工单',
        repairSourceTypeList:any = [],
        dispatchPriorities:any = [],
        dispatchTypes:any = [],
        dispatchTypeChilds:any = [],
        isIndoorRepair:any = false,
        currentEmployee:any = [];

  useEffect(() => {
    if(info?.id) {
      getDetail(info.id);
    } else {
      form.setFieldsValue({
        isPublic: true,
        submitTime: moment(),
      })
    }
  }, [title])

  // 新建工单，自动填上默认的工单时限、工单大类和工单子类
  useEffect(() => {
    if(title == '新建工单') {
      const initDispatchPriority = dispatchPriorities.find(x => x.isDefault);
      const initDispatchType = dispatchTypes.find(x => x.isDefault);
      form.setFieldsValue({
        repairPriorityId: initDispatchPriority?.id,
        repairParentTypeId: initDispatchType?.id,
      })
    }
  }, [title])

  const getDetail = (id) => {
    // dispatch({
    //   type: modelUtil.getActionName('fetchEditData'),
    //   payload: {id}
    // }).then(res => {
    //   if(res) {
    //     console.log('获取详情', res);
    //     setShowTreeSelect(true)
    //     form.setFieldsValue({
    //       isPublic: res?.isPublic,
    //       organizationItemIds: res?.organizationItemId ? [res?.organizationItemId] : undefined,
    //       place: res?.place,
    //       details: res?.details,
    //       customerName: res?.customerName,
    //       phone: res?.phone,
    //       appointmentTime: res?.appointmentTime ? moment(res.appointmentTime) : undefined,
    //       submitTime: res?.submitTime ? moment(res.submitTime) : moment(),
    //       sourceType: res?.sourceType,
    //       repairPriorityId: res?.repairPriorityId,
    //       repairParentTypeId: res?.repairParentTypeId,
    //       repairTypeId: res?.repairTypeId,
    //       createEmployName: res?.createEmployName,
    //     })
    //   }
    // })
  }

  useEffect(() => {
    form.setFieldsValue({
      createEmployName: currentEmployee?.employeeName,
    })
  }, [currentEmployee])

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const formItemLayoutTwo = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 22,
    },
  };

  
  const handleSelectChange = value => {
    
    onUpdateChange()
  };

  const onTypeParentChange = value =>{
    form.setFieldsValue({
      repairTypeId: null
    })
    
    onUpdateChange()
  }

  const onUpdateChange = () => {
    // dispatch({
    //   type: modelUtil.getActionName('updateState'),
    //   payload: { isUpdate: true },
    // });
  }

  const handelCancel = () => {
    onCloce();
  }

  // 获取报修单保存数据源
  const getPostData = (values) =>{
    //编辑时，报修位置绑定的初始值是一个数组(为了加载对应节点)，保存时，如果未修改报修位置，此时报修位置还是原来的初始值
    //新增或者编辑并修改报修位置，此时报修位置是对应节点的Id
    //故报修位置需特殊处理一下
    const organizationItemId = Array.isArray(values.organizationItemIds) ? values.organizationItemIds[values.organizationItemIds.length - 1] : values.organizationItemIds;
    const tmp:any = {
      id: record.id ? record.id : undefined,
      organizationItemId:organizationItemId, // 报修位置
      place:values.place, //报修地点
      details:values.details, //报修详情
      customerName: values.customerName, //报修人
      phone:values.phone,//联系电话
      sourceType:values.sourceType, //报修来源
      repairPriorityId:values.repairPriorityId, //工单时限
      repairParentTypeId:values.repairParentTypeId,//工单大类
      repairTypeId:values.repairTypeId,//工单子类
      createEmployId: currentEmployee.employeeId,
      createEmployName: values.createEmployName,
    };
    if(values.submitTime){
      tmp.submitTime = moment(values.submitTime).format('YYYY-MM-DD HH:mm:ss');
    }
    if(values.appointmentTime){
      tmp.appointmentTime = moment(values.appointmentTime).format('YYYY-MM-DD HH:mm:ss');
    }
    return tmp;
  };

  const handelOk = async(isCompleted) => {
    const values = await form.validateFields();
    const postData = getPostData(values);
    console.log('提交', postData);
    if(title == '编辑工单') {
      // dispatch({
      //   type: modelUtil.getActionName('submit'),
      //   payload: {
      //     ...postData,
      //     id: record.id,
      //     fromMobile: record.fromMobile || false,
      //     isCompleted: isCompleted,
      //     title: title,
      //     attachments: record.attachments || [],
      //   }
      // }).then(res => {
      //   if(res && res?.success) {
      //     // onSubmit()
      //     handelCancel()
      //   }
      //   if(res && res?.error?.message) {
      //     message.warning(res?.error?.message)
      //   }
      // })
    } else {
      // dispatch({
      //   type: modelUtil.getActionName('submit'),
      //   payload: {
      //     ...postData,
      //     fromMobile: false,
      //     isCompleted: isCompleted,
      //     title: title,
      //     attachments: []
      //   }
      // }).then(res => {
      //   if(res && res?.success) {
      //     // onSubmit()
      //     handelCancel()
      //   }
      //   if(res && res?.error?.message) {
      //     message.warning(res?.error?.message)
      //   }
      // })
    }
  }

  return (
    <Modal
      title={title || ''}
      width={1200}
      maskClosable={false}
      visible={addOrEditVisible}
      onCancel={handelCancel}
      className={styles.workOrderAddModal}
      // className="workOrderAddModal"
      footer={<>
        <Button loading={loading || false} onClick={handelCancel}>取消</Button>
        <ButtonPermissionSelf
          // permissionList={[
          //   {
          //     code: buttonPermissionCode.repairManageComplete,
          //     type: 'button',
          //     title: '完结',
          //   },
          // ]}
          onClick={() => handelOk(true)}
          loading={loading || false}
        >
          完结
        </ButtonPermissionSelf>
        <Button loading={loading || false} type="primary" onClick={() => handelOk(false)}>保存</Button>
      </>}
    >
      <Form form={form}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item 
              {...formItemLayout} 
              label="报修区域" 
              name='isPublic'
            >
              <Radio.Group 
                style={{ width: '100%' }}
              >
                <Radio value={false} key={0}>
                  户内
                </Radio>
                <Radio value={true} key={1}>
                  公区
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12} />
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item {...formItemLayout} 
              label="报修地点"
              name='place'
            >
              <Input placeholder="请输入报修地点" onChange={onUpdateChange}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item 
              {...formItemLayoutTwo} 
              label="工单详情"
              name='details'
              rules={[
                {
                  required: true,
                  message: '请输入工单详情',
                },
                {
                  max: 250,
                  message: '最大长度250',
                },
              ]}
            >
              <Input.TextArea rows={2} placeholder="请输入工单详情" onChange={onUpdateChange}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              {...formItemLayout} 
              label="报修人"
              name="customerName"
              rules={[
                {
                  required: true,
                  message: '请输入报修人',
                },
                {
                  max: 20,
                  message: '最大长度20',
                },
              ]}
            >
              <Input placeholder="请输入报修人" onChange={onUpdateChange}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              {...formItemLayout} 
              label="联系电话"
              name='phone'
              rules={[
                {
                  max: 30,
                  message: '最大长度30',
                },
                { pattern: /^(((0\d{2,3}-)?\d{7,8})|(1\d{10}))$/, message: '请输入固定电话或 11 位手机号！' },
              ]}
            >
              <Input placeholder="请输入联系电话" onChange={onUpdateChange}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              {...formItemLayout} 
              label="预约时间"
              name='appointmentTime'
            >
              <DatePicker showTime={{ format: 'HH:mm' }} style={{ width: '100%' }} format="YYYY/MM/DD HH:mm" onChange={onUpdateChange}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              {...formItemLayout} 
              label="报修来源"
              name='sourceType'
              rules={[
                {
                  required: true,
                  message: '请选择报修来源',
                },
              ]}
            >
              <Select
                placeholder="请选择报修来源" 
                style={{ width: '100%' }} 
                showSearch
                filterOption={(input:any, option:any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                optionFilterProp="children"
                onChange={onUpdateChange}
              >
                {repairSourceTypeList.map(item => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name || item.text}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              {...formItemLayout} 
              label="工单时限"
              name='repairPriorityId'
              rules={[
                {
                  required: true,
                  message: '请选择工单时限',
                },
              ]}
            >
              <Select 
                placeholder="请选择工单时限" 
                style={{ width: '100%' }} 
                showSearch
                filterOption={(input:any, option:any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                optionFilterProp="children"
                onChange={handleSelectChange}
              >
                {dispatchPriorities.map(item => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              {...formItemLayout} 
              label="工单大类"
              name='repairParentTypeId'
              rules={[
                {
                  required: true,
                  message: '请选择工单大类',
                },
              ]}
            >
              <Select
                placeholder="请选择工单大类" 
                style={{ width: '100%' }} 
                showSearch
                filterOption={(input:any, option:any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                optionFilterProp="children"
                onChange={onTypeParentChange}
              >
                {dispatchTypes.map(item => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              {...formItemLayout} 
              label="工单子类"
              name='repairTypeId'
              rules={[
                {
                  required: true,
                  message: '请选择工单子类',
                },
              ]}
            >
              <Select
                placeholder="请选择工单子类" 
                style={{ width: '100%' }} 
                showSearch
                filterOption={(input:any, option:any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                optionFilterProp="children"
                onChange={onUpdateChange}
              >
                {dispatchTypeChilds.map(item => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              {...formItemLayout} 
              label="录单人"
              name='createEmployName'
              // rules={[
              //   {
              //     required: true,
              //     message: '请选择录单人',
              //   },
              // ]}
            >
              <Input disabled placeholder="请输入录单人" onChange={onUpdateChange}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              {...formItemLayout} 
              label="录单时间"
              name='submitTime'
              rules={[
                {
                  required: true,
                  message: '请选择录单时间',
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} format="YYYY/MM/DD HH:mm" onChange={onUpdateChange}/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddOrEdit;