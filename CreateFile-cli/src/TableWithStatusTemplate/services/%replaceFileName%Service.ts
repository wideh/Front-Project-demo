import request from 'utils/request';
import { NOVA_FLOW_PREFIX, CUSTOMER_SERVICE_PREFIX, pmsBaseURL } from '../../utils/constants';

/** 获取报修设置 */
export function getRepairSetting() {
  return request(`${NOVA_FLOW_PREFIX}/repair_flow_type/repair_setting`, {
    method: 'GET',
  });
}

/** 获取当前员工信息 */
export function getCurrentEmployee() {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/getCurrentEmployee`, {
    method: 'GET',
  });
}

/** 获取派工候选人列表 */
export function getDispatchStaffs(id:any, data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/dispatchStaffs?repairId=${id}`, {
    method: 'POST',
    body: data,
  });
}

/** 获取派工单服务类型 */
export function getChargeTypeEnums() {
  return request(`${CUSTOMER_SERVICE_PREFIX}/enum/charge-type`, {
    method: 'GET',
  });
}

/** 获取工单管理状态和汇总 */
export function getStatusAndSummary(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/records/summary`, {
    method: 'POST',
    body: data,
  });
}

/** 获取我的工单管理状态和汇总 */
export function getMyStatusAndSummary(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/records/mine_summary`, {
    method: 'POST',
    body: data,
  });
}

/** 获取列表 */
export function fetchList(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/records/list?isMiniProgram=false`, {
    method: 'POST',
    body: data,
  });
}

/** 获取报修来源 */
export function fetchRepairSourceType() {
  return request(`${CUSTOMER_SERVICE_PREFIX}/enum/repair-source-type`, {
    method: 'GET',
  });
}

/** 新建工单 */
export function addRepair(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/records`, {
    method: 'POST',
    body: data,
  });
}

/** 编辑工单 */
export function editRepair(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/records`, {
    method: 'PUT',
    body: data,
  });
}

/** 获取工单详情 */
export function fetchDetail(id:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/records/${id}`, {
    method: 'GET',
  });
}

/** 删除工单 */
export function deleteRepair(ids:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/records`, {
    method: 'DELETE',
    body: ids,
  });
}

/** 导出报修单 */
export function exportRepairsExcel(params: any, postData: any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/records/excel/repairs`, {
    method: 'POST',
    body: postData,
    query: {
      ...params,
    },
    responseType: 'blob',
  });
}

/** 导出派工单 */
export function exportDispatchExcel(params: any, postData: any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/records/excel/dispatch`, {
    method: 'POST',
    body: postData,
    query: {
      ...params,
    },
    responseType: 'blob',
  });
}

/** 派工详情 */
export function fetchDispatchDetail(id:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/dispatch-records/byrepair/${id}`, {
    method: 'GET',
  });
}

/** 维修材料详情 */
export function fetchMaterialsDetail(id:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/materials/byrepair/${id}`, {
    method: 'GET',
  });
}

/** 服务费详情 */
export function fetchDispatchChargesDetail(id:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/dispatch-charges/byrepair/${id}`, {
    method: 'GET',
  });
}

/** 详情-客户回访 */
export function fetchReturnVisitDetail(id:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/histories/return-visit/byrepair/${id}`, {
    method: 'GET',
  });
}

/** 详情-处理记录 */
export function fetchHistoriesDetail(id:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/histories/byrepair/${id}`, {
    method: 'GET',
  });
}

/** 获取权限 */
export function getPermissions(id:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/getPermissions?repairId=${id}&isMiniProgram=false`, {
    method: 'GET',
  });
}

/** 派工保存 */
export function dispatchingSubmit(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/dispatch`, {
    method: 'POST',
    body: data,
  });
}

/** 转交保存 */
export function handOverSubmit(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/handOver`, {
    method: 'POST',
    body: data,
  });
}

/** 退回保存 */
export function flowBackSubmit(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/back`, {
    method: 'POST',
    body: data,
  });
}

/** 关闭保存 */
export function flowCloseSubmit(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/close`, {
    method: 'POST',
    body: data,
  });
}

/** 开始处理 */
export function startDealSubmit(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/startDeal`, {
    method: 'POST',
    body: data,
  });
}

/** 回单 */
export function dealSubmit(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/deal`, {
    method: 'POST',
    body: data,
  });
}

/** 确认 */
export function confirmSubmit(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/confirm`, {
    method: 'POST',
    body: data,
  });
}

/** 返修 */
export function reSetSubmit(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/reset`, {
    method: 'POST',
    body: data,
  });
}

/** 回访 */
export function returnVisitSubmit(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/returnVisit`, {
    method: 'POST',
    body: data,
  });
}

/** 备注 */
export function remarkSubmit(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/records/remark`, {
    method: 'POST',
    body: data,
  });
}

/** 编辑工单类型 */
export function editTypeSubmit(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/editType`, {
    method: 'POST',
    body: data,
  });
}

/** 是否需要领料审批 */
export function shouldMaterialApproval(repairId:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/shouldMaterialApproval?repairId=${repairId}`, {
    method: 'POST',
  });
}

/** 是否需要延时审批 */
export function shouldPostponeApproval(repairId:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/shouldPostponeApproval?repairId=${repairId}`, {
    method: 'POST',
  });
}

/** 是否需要采购审批 */
export function shouldPurchasesApproval(repairId:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/shouldPurchasesApproval?repairId=${repairId}`, {
    method: 'POST',
  });
}

/** 领料 */
export function addMaterial(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/addMaterial`, {
    method: 'POST',
    body: data,
  });
}

/** 退料 */
export function refundMaterial(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/refundMaterial`, {
    method: 'POST',
    body: data,
  });
}

/** 延时申请 */
export function addPostpone(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/addPostpone`, {
    method: 'POST',
    body: data,
  });
}

/** 添加费用 */
export function addCharge(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/addCharge`, {
    method: 'POST',
    body: data,
  });
}

/** 删除费用 */
export function deleteCharge(data:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/deleteCharge`, {
    method: 'POST',
    body: data,
  });
}

/** 生成派工账单 */
export function generateRepairBill(id:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/dispatch-records/generate-bill/${id}`, {
    method: 'GET',
  });
}

/** 查询派工账单 */
export function fectchRepairBill(id:any) {
  return request(`${CUSTOMER_SERVICE_PREFIX}/repair/dispatch-records/bills/${id}`, {
    method: 'GET',
  });
}

/** 获取评价维度-启用-列表 */
export function fetchEvaluateTypeEnableList() {
  return request<any>(`${CUSTOMER_SERVICE_PREFIX}/repair/evaluate-types/enable-list`, {
    method: 'GET',
  });
}

/** 是否有流程挂起 */
export function isPendingFlow(id:any) {
  return request<any>(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/isPendingFlow?repairId=${id}`, {
    method: 'POST',
  });
}

export function getRegionList() {
  return request<any>(`${pmsBaseURL}/organizationItem/getTreeRegions`, {
    method: 'GET',
  });
}

/** 转交接收 */ 
export function handoverAgree(params){
  return request<any>(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/handoverAgree`,{
    method: 'POST',
    body: params
  })
}

/** 转交拒绝 */ 
export function handoverReject(params){
  return request<any>(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/handoverReject`,{
    method: 'POST',
    body: params
  })
}

/** 继续处理 */ 
export function fetchContinueDeal(params){
  return request<any>(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/continueDeal`,{
    method: 'POST',
    body: params
  })
}

/** 现场签到 */ 
export function fetchOnSiteCheckIn(params){
  return request<any>(`${CUSTOMER_SERVICE_PREFIX}/repair_mine/signDeal`,{
    method: 'POST',
    body: params
  })
}