import React, { useEffect, useState } from 'react';
import { Modal, Button, Spin, Form, notification, Select, Input, message, DatePicker, Upload, Radio, Row, Col } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import uuid from 'uuid';
import { getEmployees } from '../../../../../../../node_modules/nova-flow-front/src/components/FlowBuilder/service';
import styles from './index.less';
import { CommonService } from '../../../../services/CustomerServiceManagement/TenantCheckIn/TenantCheckInService.js';
import * as WorkOrderManagementService from '../../../../services/WorkOrderManagement/WorkOrderManagementService';
import moment from 'moment';
import { closeTab, openTab } from 'utils/menuTab';

let timeId: any = null;

// eslint-disable-next-line no-shadow
export enum ActionEnum {
  关闭 = '关闭',
  保存 = '保存',
  回退 = '回退',
  评价 = '评价',

  转交 = '转交',
  派工 = '派工',
  回单 = '回单',
  确认 = '确认',
  回访 = '回访',
  备注 = '备注',
  添加费用 = '添加费用',
  延时申请 = '延时申请',
  领料申请 = '领料申请',
  退回 = '退回',
  编辑工单类型 = '编辑工单类型',
}

export enum BtnIdEnum {
  退回 = 0,
  转交,
  关闭,
  派工 = 4,
  回单,
  评价,
  确认,
  回访,
  备注 = 91,
  领料,
  退料,
  添加费用,
  删除费用,
  延时申请,
  编辑工单类型,
  开始处理,
  接收 = 102,
  拒绝 = 101,
  继续处理 = 100,
  现场签到 = 99
}

interface IActionModalProps {
  actionModalInfo:
  | {
    title: ActionEnum;
    visible: boolean;
    row: any;
  }
  | undefined;
  setActionModalInfo: React.Dispatch<
    React.SetStateAction<
      | {
        title: ActionEnum;
        visible: boolean;
        row: any;
      }
      | undefined
    >
  >;
  setEditDrawerInfo?: React.Dispatch<
    React.SetStateAction<
      | {
        visible: boolean;
        row?: any;
        edit?: boolean;
      }
      | undefined
    >
  >;
  reLoad?: () => void;
  closeWrapDrawer?: () => void;
}

const ActionModal: React.FunctionComponent<IActionModalProps> = ({
  actionModalInfo,
  setActionModalInfo,
  // setEditDrawerInfo,
  reLoad,
  closeWrapDrawer
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<any>('');
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [imgList, setImgList] = useState<any>([]);
  const [attachments, setAttachments] = useState<any>([]);
  const [category, setCategory] = useState<any>(false);

  const [employeeList, setEmployeeList] = useState([]);

  const [shouldApproval, setShouldApproval] = useState<boolean>(false);
  const [evaluateTypes, setEvaluateTypes] = useState<any>([]);
  const [baseInfo, setBaseInfo] = useState<any>({});
  const [dispatchDetail, setDispatchDetail] = useState<any>([]);
  const [delayType, setDelayType] = useState<any>(0)

  // 获取表单需要的数据
  useEffect(() => {
    if ([ActionEnum.转交].includes(actionModalInfo?.title as any)) {
      fetchEmployeeList();
    }
    if ([ActionEnum.编辑工单类型, ActionEnum.延时申请, ActionEnum.回访].includes(actionModalInfo?.title as any)) {
      const detailInfo = actionModalInfo?.row;
      fetchBaseInfo(detailInfo.id);
    }
    if ([ActionEnum.延时申请, ActionEnum.领料申请].includes(actionModalInfo?.title as any)) {
      fetchIsShouldApproval();
    }
    if ([ActionEnum.回访].includes(actionModalInfo?.title as any)) {
      fetchEvaluateTypeEnableList();
    }
    return () => {
      if (timeId) clearTimeout(timeId);
    }
  }, [actionModalInfo]);

  const fetchBaseInfo = async (id) => {
    setLoading(true);
    const res = await WorkOrderManagementService.fetchDetail(id);
    setLoading(false);
    if (res?.success) {
      setBaseInfo(res?.result);
      if ([ActionEnum.编辑工单类型].includes(actionModalInfo?.title as any)) {
        fetchDispatchDetail(id);
      }
    }
  }

  const fetchDispatchDetail = async (id) => {
    setLoading(true);
    const res = await WorkOrderManagementService.fetchDispatchDetail(id);
    setLoading(false);
    if (res?.success) {
      setDispatchDetail(res.result || []);
    }
  }

  const fetchEvaluateTypeEnableList = async () => {
    setLoading(true);
    const res = await WorkOrderManagementService.fetchEvaluateTypeEnableList();
    setLoading(false);
    if (res?.success) {
      setEvaluateTypes(res.result || []);
    }
  }

  // 获取员工列表
  const fetchEmployeeList = async () => {
    setLoading(true);
    if ([ActionEnum.转交].includes(actionModalInfo?.title as any)) {
      const res = await getEmployees({
        page: 0,
        pageSize: 1000,
        employeeName: '',
        employeeNum: '',
        current: 1,
      });
      setLoading(false);
      if (res && res.success) {
        setEmployeeList(
          res.content?.map(item => {
            return {
              value: item.employeeNum,
              label: item.employeeName,
            };
          }) || []
        );
      } else {
        message.error(res?.error?.message);
      }
    }
  };

  const fetchIsShouldApproval = async () => {
    setLoading(true);
    const getServices = async () => {
      if ([ActionEnum.延时申请].includes(actionModalInfo?.title as any)) {
        return WorkOrderManagementService.shouldPostponeApproval(actionModalInfo?.row.id)
      }
      if ([ActionEnum.领料申请].includes(actionModalInfo?.title as any)) {
        return WorkOrderManagementService.shouldMaterialApproval(actionModalInfo?.row.id)
      }
    }
    const res = await getServices();
    setLoading(false);
    if (res && res.success) {
      setShouldApproval(res.result || false)
    }
  }

  // 重置表单
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      isUrgent: false,
      date: moment(),
    })
    setCategory(0);
    if ([ActionEnum.编辑工单类型].includes(actionModalInfo?.title as any)) {
      form.setFieldsValue({
        repairPriorityId: baseInfo?.repairPriorityId,
        repairParentTypeId: baseInfo?.repairParentTypeId,
        repairTypeId: baseInfo?.repairTypeId,
        chargeType: dispatchDetail && dispatchDetail.length > 0 ? dispatchDetail[0].chargeType === '有偿服务' ? 1 : 0 : undefined,
      })
    }
    if ([ActionEnum.延时申请].includes(actionModalInfo?.title as any)) {
      form.setFieldsValue({
        originalHours: baseInfo?.priorityHours || 0,
        postponeType: 0
      })

    }
    if ([ActionEnum.回访].includes(actionModalInfo?.title as any)) {
      const selfDefine = evaluateTypes.map(x => {
        return {
          evaluateTypeId: x.id,
          commentStar: 4,
        }
      })
      form.setFieldsValue({
        person: baseInfo?.customerName,
        phone: baseInfo?.phone,
        commentGrade: {
          commentStar: 4,
          evaluates: selfDefine,
        }
      })
    }
  }, [actionModalInfo, evaluateTypes, baseInfo, dispatchDetail]);

  const fileImageType = ['img', 'jpg', 'png', 'gif', 'jpeg', 'BMP', 'svg', 'TIFF', 'bmp', 'JPG', 'JPEG', 'GIF', 'PNG', 'IMG', 'SVG'];
  const reg = /[@#!！]+/;
  const onUploadChange = async (file: any) => {

    if (fileImageType.indexOf(file.file.name.split('.')[file.file.name.split('.').length - 1]) === -1) {
      setImgList([...imgList]);
      const description = `只能上传${fileImageType.map((item: any) => `.${item}`).join(',')}类型图片!`;
      notification.warning({
        message: '提示',
        description,
      });
    } else if (reg.test(file.file.name)) {
      notification.warning({
        message: '提示',
        description: '图片文件名称不能含有@、#、！特殊符号',
      });
    } else if (file && (file.file.size <= 10 * 1024 * 1024) || !file.file.size) {
      let newFileList = file.fileList.map((item: any) => {
        // eslint-disable-next-line no-prototype-builtins
        if (item.hasOwnProperty("lastModified")) {
          item.id = `${uuid()}.${item.name.split('.')[item.name.split('.')?.length - 1]}`;
          item.fileName = item.name;
          // return item;
        }
        return item;
      });
      if (newFileList?.length > 10) {
        newFileList = newFileList.slice(10);
      };
      if (newFileList.length > 0 && file.file.size) {
        // console.log("新图片文件", newFileList);
        const res = await CommonService.uploadFile(file.file);
        newFileList[newFileList.length - 1].url = res;
        setImgList([...newFileList]);
      } else {
        setImgList([...newFileList]);
      }
    } else {
      setImgList([...imgList]);
      notification.warning({
        message: '提示',
        description: '上传文件大小不得超过10M！',
      });
    };
  };

  const beforeUpload = (file: any) => {
    if (fileImageType.indexOf(file.name.split('.')[file.name.split('.')?.length - 1]) === -1) {
      const description = `只能上传${fileImageType
        .map((item: any) => `.${item}`)
        .join(',')}类型图片!`;
      notification.warning({
        message: '提示',
        description,
      });
      return Upload.LIST_IGNORE;
    } else if (file && file.size > 2 * 1024 * 1024) {
      notification.warning({
        message: '提示',
        description: '上传文件大小不得超过2M！',
      });
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const fileType = ['img', 'jpg', 'png', 'gif', 'jpeg', 'BMP', 'svg', 'TIFF', 'bmp', 'JPG', 'JPEG', 'GIF', 'PNG', 'IMG', 'SVG'];
  const handleAttachments = async (file: any) => {
    if (fileType.indexOf(file.file.name.split('.')[file.file.name.split('.').length - 1]) === -1) {
      setAttachments([...attachments]);

      const description = `只能上传${fileType.map((item: any) => `.${item}`).join(',')}类型文件!`;
      notification.warning({
        message: '提示',
        description,
      });
    } else if (reg.test(file.file.name)) {
      notification.warning({
        message: '提示',
        description: '文件名称不能含有@、#、！、%特殊符号',
      });
    } else if (file && (file.file.size <= 10 * 1024 * 1024) || !file.file.size) {
      let newFileList = file.fileList.map((item: any) => {
        if (item.hasOwnProperty("lastModified")) {
          item.id = `${uuid()}.${item.name.split('.')[item.name.split('.').length - 1]}`;
          item.fileName = item.name;
          return item;
        }
        return item;
      });
      if (newFileList.length > 10) {
        newFileList = newFileList.slice(-10);
      };
      if (newFileList.length > 0 && file.file.size) {
        const res = await CommonService.uploadFile(file.file);
        if (typeof res === 'string') {
          newFileList[newFileList.length - 1].url = res;
          setAttachments([...newFileList]);
          // console.log('文件上传后', [...newFileList]);
        };
      } else {
        setAttachments([...newFileList]);
      }
    } else {
      setAttachments([...attachments]);
      notification.warning({
        message: '提示',
        description: '上传文件大小不得超过10M！',
      });
    };
  };

  const handlePreview = (file: any) => {
    setPreviewImage(file.url || file.thumbUrl || file.fileUrl);
    setPreviewVisible(true);
  };

  const categoryChange = e => {
    setCategory(e.target.value)
  };

  const goToApprovalManage = () => {
    closeTab(`/flow/approvalManage`);
    const param = {
      key: `/flow/approvalManage`,
      path: `/flow/approvalManage`,
      title: '审批管理',
      icon: null,
      closable: true,
      type: 'menu',
    };
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      openTab(param);
      closeWrapDrawer && closeWrapDrawer();
    }, 0);
  }

  const handleSubmit = async (resetFlow?: boolean) => {
    const saveAccordingType = async (postData: any) => {
      switch (actionModalInfo?.title) {
        case ActionEnum.转交:
          return WorkOrderManagementService.handOverSubmit(postData);
        case ActionEnum.关闭:
          return WorkOrderManagementService.flowCloseSubmit(postData);
        case ActionEnum.备注:
          return WorkOrderManagementService.remarkSubmit(postData);
        case ActionEnum.退回:
          return WorkOrderManagementService.flowBackSubmit(postData);
        case ActionEnum.回单:
          return WorkOrderManagementService.dealSubmit(postData);
        case ActionEnum.确认:
          return WorkOrderManagementService.confirmSubmit(postData);
        case ActionEnum.回访:
          return WorkOrderManagementService.returnVisitSubmit(postData);
        case ActionEnum.编辑工单类型:
          return WorkOrderManagementService.editTypeSubmit(postData);
        case ActionEnum.领料申请:
          return WorkOrderManagementService.addMaterial(postData);
        case ActionEnum.延时申请:
          return WorkOrderManagementService.addPostpone(postData);
        default:
          return null;
      }
    };
    let formValues: any;
    formValues = await form.validateFields();
    if (!formValues) {
      return;
    }

    let postData: any = {};

    if (['备注'].includes(actionModalInfo?.title as any)) {
      let attachments: any = [];
      if (imgList?.length > 0) {
        attachments = imgList.map(item => {
          return {
            fileName: item.name,
            filePath: item.url,
          }
        })
      }
      postData = {
        id: actionModalInfo?.row?.id,
        ...formValues,
        attachments,
      }
      delete postData.files;
    } else if (['回单'].includes(actionModalInfo?.title as any)) {
      let attachments: any = [];
      if (imgList?.length > 0) {
        attachments = imgList.map(item => {
          return {
            fileName: item.name,
            filePath: item.url,
          }
        })
      }
      postData = {
        repairId: actionModalInfo?.row?.id,
        ...formValues,
        attachments,
      }
      if (postData.date) {
        postData.dealTime = moment(postData.date).format('YYYY/MM/DD HH:mm:ss')
      }
      delete postData.files;
      delete postData.date;
    } else if (['回访'].includes(actionModalInfo?.title as any)) {
      postData = {
        repairId: actionModalInfo?.row?.id,
        ...formValues,
        resetFlow: resetFlow ?? false,
        ...formValues.commentGrade,
      }
      delete postData?.commentGrade;
    } else if (['确认'].includes(actionModalInfo?.title as any)) {
      postData = {
        repairId: actionModalInfo?.row?.id,
        ...formValues,
        resetFlow: resetFlow ?? false,
      }
    } else if (['领料申请'].includes(actionModalInfo?.title as any)) {
      let newFiles: any = [];
      if (attachments?.length > 0) {
        newFiles = attachments.map(item => {
          return {
            fileName: item.name,
            filePath: item.url,
          }
        })
      }
      postData = {
        repairId: actionModalInfo?.row?.id,
        ...formValues,
        shouldApproval: true,
        attachments: newFiles,
        materials: actionModalInfo?.row?.materials
      }
      delete postData.files;
    } else if (['延时申请'].includes(actionModalInfo?.title as any)) {
      let newFiles: any = [];
      if (attachments?.length > 0) {
        newFiles = attachments.map(item => {
          return {
            fileName: item.name,
            filePath: item.url,
          }
        })
      }
      postData = {
        repairId: actionModalInfo?.row?.id,
        ...formValues,
        shouldApproval: shouldApproval,
        attachments: newFiles,
        stopTime: formValues.stopTime ? moment(formValues.stopTime).format('YYYY-MM-DD HH:mm:00') : undefined,
        planRestartTime: formValues.planRestartTime ? moment(formValues.planRestartTime).format('YYYY-MM-DD HH:mm:00') : undefined
      }
      delete postData.files;
    } else {
      postData = {
        repairId: actionModalInfo?.row?.id,
        ...formValues,
      }
    }
    // console.log('postData', postData);
    // console.log(saveAccordingType);
    setSaving(true);
    const res: any = await saveAccordingType(postData);
    setSaving(false);
    if (res.success) {
      const pathname = location.pathname;
      if (shouldApproval && ['领料申请', '延时申请'].includes(actionModalInfo?.title as any) && (pathname == '/repair/mine' || pathname == '/pms/CustomerServiceManagement/repair/repairManagement')) {
        message.warning({
          content: (
            <span>
              <span style={{ marginRight: '15px' }}>{actionModalInfo?.title}已提交，可以在“审批管理”查看申请进度</span>
              <a onClick={() => goToApprovalManage()}>
                <span>前往审批管理</span>
              </a>
            </span>
          ),
          duration: 3,
          width: 600,
        });
      } else {
        message.info({
          content: '操作成功',
        });
      }
      setActionModalInfo(undefined);
      reLoad && reLoad();
    } else {
      // API调用失败
      message.error(res.error?.message);
    }
  };

  // const handleReset = async () => {
  //   let postData: any = {};

  //   postData = {
  //     repairId: actionModalInfo?.row?.id,
  //     remark: "没有修好"
  //   }

  //   setSaving(true);
  //   const res: any = await WorkOrderManagementService.reSetSubmit(postData);
  //   setSaving(false);
  //   if (res.success) {
  //     message.info({
  //       content: '操作成功',
  //     });
  //     setActionModalInfo(undefined);
  //     reLoad && reLoad();
  //   } else {
  //     // API调用失败
  //     message.error(res.error?.message);
  //   }
  // };

  const onTypeParentChange = value => {
    form.setFieldsValue({
      repairTypeId: null
    })
  }

  const onRadioChange = (value) => {
    setDelayType(value.target.value)
  }

  return (
    <Modal
      width={actionModalInfo?.title == ActionEnum.回访 || actionModalInfo?.title == ActionEnum.延时申请 ? 660 : 520}
      destroyOnClose
      maskClosable={false}
      wrapClassName="vertical-center-modal"
      visible={actionModalInfo?.visible}
      title={actionModalInfo?.title}
      footer={
        [ActionEnum.确认, ActionEnum.回访].includes(
          actionModalInfo?.title as ActionEnum
        ) ? [
          <Button
            key="cancel"
            onClick={() => {
              setActionModalInfo(undefined);
            }}
          >
            取消
          </Button>,
          <Button
            key="reset"
            onClick={() => {
              handleSubmit(true)
            }}
            loading={saving}
          >
            返修
          </Button>,
          <Button type="primary" key="ok" onClick={() => handleSubmit()} loading={saving}>
            确认完成
          </Button>
        ]
          :
          [
            <Button
              key="cancel"
              onClick={() => {
                setActionModalInfo(undefined);
              }}
            >
              取消
            </Button>,
            <Button type="primary" key="ok" onClick={() => handleSubmit()} loading={saving}>
              保存
            </Button>
          ]
      }
      // centered
      onCancel={() => {
        setActionModalInfo(undefined);
      }}
    >
      <Spin spinning={loading || saving}>
        <Form form={form} layout="horizontal" className={styles.wrap}>
          {[ActionEnum.转交].includes(actionModalInfo?.title as ActionEnum) && (
            <Form.Item
              label="转交给"
              name="employee"
              labelCol={{ span: 6 }}
              rules={[{ required: true }]}
            >
              <Select
                placeholder="请选择员工"
                options={employeeList}
                showSearch
                filterOption={(input, option: any) => option!.label!.toString().indexOf(input) >= 0}
              />
            </Form.Item>
          )}

          {[ActionEnum.确认].includes(
            actionModalInfo?.title as ActionEnum
          ) && (
              <Form.Item
                label="完成情况说明"
                name="remark"
                labelCol={{ span: 6 }}
                rules={[
                  {
                    required: true,
                    message: '请输入完成情况说明'
                  },
                  {
                    min: 5,
                    message: '请至少输入5个字符'
                  }
                ]}
              >
                <Input.TextArea placeholder="请至少输入5个字符" maxLength={255} rows={3} />
              </Form.Item>
            )}

          {[ActionEnum.关闭, ActionEnum.退回].includes(
            actionModalInfo?.title as ActionEnum
          ) && (
              <Form.Item
                label="操作说明"
                name="remark"
                labelCol={{ span: 6 }}
                rules={[
                  {
                    required: true,
                    message: '请输入操作说明'
                  }
                ]}
              >
                <Input.TextArea placeholder="请输入" maxLength={255} rows={3} />
              </Form.Item>
            )}

          {[ActionEnum.备注].includes(
            actionModalInfo?.title as ActionEnum
          ) && (<>
            <Form.Item
              label="备注"
              name="remark"
              labelCol={{ span: 6 }}
              style={{ marginBottom: '24px' }}
              rules={[
                {
                  required: true,
                  message: '请输入备注'
                }
              ]}
            >
              <Input.TextArea placeholder="请输入" maxLength={255} rows={3} />
            </Form.Item>
            <Form.Item
              label="图片"
              name="files"
              labelCol={{ span: 6 }}
            >
              <Upload
                listType="picture-card"
                multiple={false}
                beforeUpload={beforeUpload}
                showUploadList
                maxCount={3}
                onChange={onUploadChange}
                onPreview={handlePreview}
                fileList={imgList}
              >
                {imgList?.length >= 3 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </>)}

          {[ActionEnum.回单].includes(
            actionModalInfo?.title as ActionEnum
          ) && (<>
            <Form.Item
              label="回单时间"
              name="date"
              labelCol={{ span: 6 }}
              rules={[
                {
                  required: true,
                  message: '请选择回单时间'
                }
              ]}
              style={{ marginBottom: '24px' }}
            >
              <DatePicker showTime={{ format: 'HH:mm' }} style={{ width: '100%' }} format="YYYY/MM/DD HH:mm" />
            </Form.Item>
            <Form.Item
              label="回单说明"
              name="remark"
              labelCol={{ span: 6 }}
              style={{ marginBottom: '24px' }}
            >
              <Input.TextArea placeholder="请输入" maxLength={255} rows={3} />
            </Form.Item>
            <Form.Item
              label="上传图片"
              name="files"
              labelCol={{ span: 6 }}
            >
              <Upload
                listType="picture-card"
                multiple={false}
                beforeUpload={beforeUpload}
                showUploadList
                maxCount={3}
                onChange={onUploadChange}
                onPreview={handlePreview}
                fileList={imgList}
              >
                {imgList?.length >= 3 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </>)}

          {[ActionEnum.延时申请, ActionEnum.领料申请].includes(
            actionModalInfo?.title as ActionEnum
          ) && (<>
            {[ActionEnum.延时申请].includes(
              actionModalInfo?.title as ActionEnum
            ) && <>
                <Form.Item
                  label="延时类型"
                  labelCol={{ span: 6 }}
                  style={{ marginBottom: '24px' }}
                  name="postponeType"
                >
                  <Radio.Group onChange={onRadioChange}>
                    <Radio value={0}>延长维修用时</Radio>
                    <Radio value={1}>暂停一段时间后继续维修</Radio>
                  </Radio.Group>
                </Form.Item>
                {
                  delayType === 0 && (
                    <>
                      <Form.Item
                        label="原定工单时限"
                        name="originalHours"
                        labelCol={{ span: 6 }}
                        rules={[
                          { pattern: /^\d+$/, message: '请输入整数！' },
                        ]}
                        style={{ marginBottom: '24px' }}
                      >
                        <Input disabled min={0} type='number' suffix='小时' />
                      </Form.Item>
                      <Form.Item
                        label="新的工单时限"
                        name="applyHours"
                        labelCol={{ span: 6 }}
                        rules={[
                          {
                            required: true,
                            message: '请输入工单时限',
                          },
                          { pattern: /^\d+$/, message: '请输入整数！' },
                        ]}
                        style={{ marginBottom: '24px' }}
                      >
                        <Input placeholder='请输入' min={0} type='number' suffix='小时' />
                      </Form.Item>
                    </>
                  )
                }
                {
                  delayType === 1 && (
                    <>
                      <Form.Item label="暂停时间" name="stopTime" labelCol={{ span: 6 }} rules={[{ required: true, message: '请选择暂停时间' }]} style={{ marginBottom: '24px' }}>
                        <DatePicker placeholder='请选择暂停时间' style={{ width: '100%' }} showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
                      </Form.Item>
                      <Form.Item label="预计继续处理时间" name="planRestartTime" labelCol={{ span: 6 }} rules={[{ required: true, message: '请选择预计继续处理时间' }]} style={{ marginBottom: '24px' }}>
                        <DatePicker placeholder='请选择预计继续处理时间' style={{ width: '100%' }} showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
                      </Form.Item>
                    </>
                  )
                }
                <Form.Item
                  label="申请原因"
                  name="applyContent"
                  labelCol={{ span: 6 }}
                  rules={[
                    {
                      required: true,
                      message: '请输入申请原因',
                    },
                  ]}
                  style={{ marginBottom: '24px' }}
                >
                  <Input.TextArea placeholder="请输入" maxLength={255} rows={3} />
                </Form.Item>
              </>}
            {shouldApproval && <Form.Item
              label="审批加急"
              name="isUrgent"
              labelCol={{ span: 6 }}
              rules={[
                {
                  required: true,
                  message: '请选择加急类型',
                },
              ]}
              style={{ marginBottom: '24px' }}
            >
              <Radio.Group onChange={categoryChange}>
                <Radio value={false}>不加急</Radio>
                <Radio value={true}>加急</Radio>
              </Radio.Group>
            </Form.Item>}
            {!!category && (
              <Form.Item
                label="加急说明"
                name="urgentRemark"
                labelCol={{ span: 6 }}
                rules={[
                  {
                    required: true,
                    message: '请输入加急说明',
                  },
                  {
                    max: 255,
                    message: '最大长度为255',
                  },
                ]}
              >
                <Input.TextArea placeholder="请输入加急说明" maxLength={255} />
              </Form.Item>
            )}
            <Form.Item
              label="上传"
              name="files"
              labelCol={{ span: 6 }}
            >
              <Upload
                // showUploadList
                showUploadList={{
                  showDownloadIcon: true,
                  showRemoveIcon: true,
                }}
                maxCount={1}
                onChange={handleAttachments}
                fileList={attachments}
                multiple={false}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>上传</Button>
              </Upload>
            </Form.Item>
          </>)}
        </Form>
      </Spin>
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => {
          setPreviewVisible(false);
        }}
        getContainer={() => {
          return document.getElementById('modal_zindex') || document.body;
        }}
      >
        <img alt="example" style={{ width: '100%', marginTop: '30px' }} src={previewImage} />
      </Modal>
    </Modal>
  );
};

export default ActionModal;
