import React, { useEffect, useState } from 'react';
import { Form, Col, Modal, Input, Select, Row, DatePicker } from 'antd';
// import moment from 'moment';
import %replaceFileName%Service from '../../../../services/%replaceFileName%Service';

const { TextArea } = Input;
const FormItem = Form.Item;
// const { Option } = Select;
const { RangePicker } = DatePicker;

const rowFormItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

// 运送频率, 必填, 单选, 默认每日. 选项: 每日, 每周, 每月.
const frequencyList = [
  { value: 0, label: "每日" }, 
  { value: 1, label: "每周" }, 
  { value: 2, label: "每月" }, 
// { value: 3, label: "每年" }
];
let timeId:any = null;

const AddOrEdit = (props) => {

  const [form] = Form.useForm();

  const {
    showVisible,
    title,
    info,
    oncancel,
  } = props;

  const [regionList, setRegionList] = useState<any>([]);
  const [frequency, setFrequency] = useState<string|number>(0); // 运送频率
  const [taskList, setTaskList] = useState<any>([]);

  useEffect(() => {
    getRegionList();
  }, [showVisible])

  const getRegionList = async() => {
    const res:any = await %replaceFileName%Service.getRegionList();
    if(res?.success) {
      setRegionList(res.result.map(item => {
        return {
          value: item.resourceId,
          label: item.resourceName
        }
      }))
      if(title == '新建') {
        form.setFieldsValue({
          regionId: res.result?.[0]?.resourceId,
          transporteType: 0,
          frequency: 0,
          times: 1,
        })
        setFrequency(0)
        const taskList = generateTaskList(1);
        setTaskList(taskList);
      }
    }
  }

  // 获取管理区下对应科室
  const getDepartment = async (id) => {

  }

  const handleCancel = () => {
    oncancel && oncancel();
  }

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log('保存', values);
  }

  // 生成计划表
  const generateTaskList = (times) => {
    const taskList:any = [];
    for (let i = 0; i < times; i += 1) {
      const task = {
        order: i + 1,
        key: new Date(),
        startDay: undefined,
        endDay: undefined,
        startWeek: undefined,
        endWeek: undefined,
        startTime: undefined,
        endTime: undefined,
        month: undefined,
      }
      taskList.push(task);
    }
    return taskList;
  }

  const onFrequencyChange = frequency => {
    setFrequency(frequency);
    const times = form.getFieldValue('times');
    if(times < 32 && times > 0) {
      const taskList = generateTaskList(times);
      setTaskList(taskList);
    } else {
      setTaskList([]);
    }
  };

  const onTimesChange = (e) => {
    let inputValue = e.target.value;
    setTaskList([]);
    if(timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      if(inputValue < 32 && inputValue > 0) {
        const taskList = generateTaskList(inputValue);
        setTaskList(taskList);
      } else {
        setTaskList([]);
      }
    }, 300)
  };

  const onRegionChanged = id => {
    // 管理区改变重置运送起始点
    form.setFieldsValue({
      transporteStartPoint: undefined,
      transporteEndPoint: undefined,
    })
    // 获取该管理区下的科室
    getDepartment(id);
  };

  return (
    <Modal
      visible={showVisible}
      title={title+'运送计划'}
      okText="保存"
      onCancel={handleCancel}
      onOk={handleOk}
      width={1000}
      maskClosable={false}
    >
      <Form form={form}>
        <Row>
          <Col span={12}>
            <FormItem 
              {...formItemLayout} 
              label="计划名称"
              name="name"
              rules={[
                {
                  required: true,
                  type: 'string',
                  max: 50,
                  message: '请正确输入名称，最大长度为50',
                },
              ]}
            >
              <Input
                placeholder="请输入名称"
                style={{ width: '100%' }}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="计划有效期" name="planningCycle">
              <RangePicker style={{ width: '100%' }}/>
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ borderBottom: '2px solid #eee', marginBottom: '10px' }}>
          <Col span={12}>
            <FormItem 
              {...formItemLayout} 
              label="运送频率" 
              name='frequency'
              rules={[
                {
                  required: true,
                  message: '请选择运送频率',
                },
              ]}
            >
              <Select
                placeholder="请选择运送频率"
                style={{ width: '100%' }}
                onChange={onFrequencyChange}
                options={frequencyList}
                optionFilterProp="label"
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem 
              {...formItemLayout} 
              label="运送次数"
              name='times'
              rules={[
                {
                  required: true,
                  message: "请输入运送次数",
                },
                {
                  type: 'string',
                  pattern: /(^([12][0-9]|30|31|[1-9])$)/,
                  message: '请输入次数1-31',
                },
              ]}
            >
              <Input
                style={{ width: '100%' }}
                placeholder="请输入运送次数"
                onChange={onTimesChange}
                addonAfter='次'
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem 
              {...formItemLayout} 
              label="管理区"
              name="regionId"
              rules={[
                {
                  required: true,
                  message: '请选择管理区',
                },
              ]}
            >
              <Select
                placeholder="请选择管理区"
                style={{ width: '100%' }}
                onChange={onRegionChanged}
                showSearch
                optionFilterProp="label"
                options={regionList}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem 
              {...formItemLayout} 
              label="运送类型"
              name="transporteType"
              rules={[
                {
                  required: true,
                  message: '请选择运送类型',
                },
              ]}
            >
              <Select
                disabled={true}
                placeholder="请选择运送类型"
                style={{ width: '100%' }}
                optionFilterProp="label"
                options={[
                  {label: '常规', value: 0}
                ]}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem 
              {...formItemLayout} 
              label="运送起点"
              name="transporteStartPoint"
              rules={[
                {
                  required: true,
                  message: '请选择起点科室',
                },
              ]}
            >
              <Select
                placeholder="请选择起点科室"
                style={{ width: '100%' }}
                optionFilterProp="label"
                options={[]}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem 
              {...formItemLayout} 
              label="运送终点"
              name="transporteEndPoint"
              rules={[
                {
                  required: true,
                  message: '请选择终点科室',
                },
              ]}
            >
              <Select
                placeholder="请选择终点科室"
                style={{ width: '100%' }}
                optionFilterProp="label"
                options={[]}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem 
              {...rowFormItemLayout} 
              label="物品说明" 
              name="describes"
              rules={[
                {
                  required: true,
                  message: '请填写物品说明'
                },
                {
                  type: 'string',
                  max: 255,
                  message: '请正确输入物品说明，最大长度为255',
                },
              ]}
            >
              <TextArea
                rows={1}
                maxLength={255}
                placeholder="请填写物品说明"
                style={{ width: '100%' }}
              />
            </FormItem>
          </Col>
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col span={24}>
            <FormItem 
              {...rowFormItemLayout} 
              label="备注" 
              name="remark"
              rules={[
                {
                  type: 'string',
                  max: 255,
                  message: '请正确输入备注，最大长度为255',
                },
              ]}
            >
              <TextArea
                rows={4}
                maxLength={255}
                placeholder="请输入备注"
                style={{ width: '100%' }}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddOrEdit;