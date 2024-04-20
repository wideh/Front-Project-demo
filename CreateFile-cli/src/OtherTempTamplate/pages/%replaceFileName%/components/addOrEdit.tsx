import React, { useEffect, useState } from 'react';
import { Form, Col, Select, Row, Checkbox, Drawer, Button, Input } from 'antd';
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
// import moment from 'moment';
import %replaceFileName%Service from '../../../../../services/VoucherManagement/%replaceFileName%Service';
import SetOfbooksListService from "../../../../../services/VoucherManagement/SetOfbooksListService";
import styles from './index.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

let timeId:any = null;

const AddOrEdit = (props) => {

  const [form] = Form.useForm();

  const {
    showVisible,
    title,
    info,
    voucherBookId,
    oncancel,
    reLoadFetchList,
  } = props;

  const [bookOptions, setBookOptions] = useState<any>([]);
  const [accountTypeList, setAccountTypeList] = useState<any>([])
  const [checkTypeList, setCheckTypeList] = useState<any>([])

  useEffect(() => {
    getCommonVoucherBooks();
    fetchCommonAccountTypeList();
    fetchCommonCheckTypeList();

    if(title == '编辑') {
      form.setFieldsValue({
        bookId: voucherBookId,
        accountType: info?.accountType ?? undefined,
        code: info?.code ?? undefined,
        name: info?.name ?? undefined,
        checkTypes: info?.checkTypes ?? undefined,
      })
    } else {
      form.setFieldsValue({
        bookId: voucherBookId
      })
    }

    return () => {
      if(timeId) {
        clearInterval(timeId)
      }
    }
  }, [showVisible])

  const getCommonVoucherBooks = async() => {
    const res = await SetOfbooksListService.getCommonVoucherBooks()
    if(res && res?.success) {
      const result = res?.result ?? []
      setBookOptions(result.map(item => {
        return {value: item?.id, label: item.name}
      }))
    }
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

  const handleCancel = () => {
    oncancel && oncancel();
  }

  const handleOk = () => {
    if(timeId) {
      clearTimeout(timeId)
    }

    timeId = setTimeout(async() => {
      const values = await form.validateFields();
      const params = {
        id: info?.id,
        ...values,
      }
      console.log('保存', params);
      const res = await %replaceFileName%Service.savevoucherAccount(params);
      if(res && res.success){
        reLoadFetchList && reLoadFetchList()
      }
    }, 500);
  }

  return (
    <Drawer
      visible={showVisible}
      title={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>{title+'科目'}</span>
        <CloseOutlined style={{ cursor: 'pointer' }} onClick={() => handleCancel()}/>
      </div>}
      closable={false}
      width={600}
      className={styles.selfsideDrawer}
      maskClosable={false}
      footer={<>
        <Button onClick={() => handleCancel()} style={{ marginRight: '10px' }}>取消</Button>
        <Button type='primary' onClick={() => handleOk()}>确定</Button>
      </>}
    >
      <Form form={form}>
        <Row>
          <Col span={24}>
            <FormItem 
              {...formItemLayout} 
              label="所属账套"
              name="bookId"
            >
              <Select
                placeholder="请选择账套"
                disabled
                options={bookOptions}
                style={{ width: '100%' }}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem 
              {...formItemLayout} 
              label="科目大类"
              name="accountType"
              rules={[
                {
                  required: true,
                  message: '请选择科目大类',
                },
              ]}
            >
              <Select
                placeholder="请选科目大类"
                style={{ width: '100%' }}
                showSearch
                optionFilterProp="label"
                options={accountTypeList}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem 
              {...formItemLayout} 
              label="科目编号"
              name="code"
              rules={[
                {
                  required: true,
                  message: '请输入科目编号',
                },
              ]}
            >
              <Input
                placeholder="请输入科目编号"
                maxLength={50}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem 
              {...formItemLayout} 
              label="科目名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: '请输入科目名称',
                },
              ]}
            >
              <Input
                placeholder="请输入科目名称"
                maxLength={50}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem 
              {...formItemLayout} 
              label="辅助核算"
              name="checkTypes"
            >
              <Checkbox.Group options={checkTypeList}>
                  {/* <Checkbox value={1} key={1}>管理区</Checkbox> */}
                  {/* <Checkbox value={0} key={0}>客户</Checkbox> */}
              </Checkbox.Group>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default AddOrEdit;