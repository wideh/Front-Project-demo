import { FINANCE_PREFIX } from '../../utils/constants'
import request from 'utils/request';

export default {
  // 列表
  fetchList(data) {
    return request(`${FINANCE_PREFIX}/finance_voucher_account/list`, {
      method: 'PUT',
      body: data,
    })
  },

  // 科目大类
  fetchCommonAccountTypeList() {
    return request(`${FINANCE_PREFIX}/common/voucherAccountTypeList`, {
      method: 'GET',
    })
  },

  // 辅助核算
  fetchCommonCheckTypeList() {
    return request(`${FINANCE_PREFIX}/common/voucherCheckTypeList`, {
      method: 'GET',
    })
  },

  // 数据状态
  fetchCommonStatusList() {
    return request(`${FINANCE_PREFIX}/common/voucherDataStatusList`, {
      method: 'GET',
    })
  },

  // 批量删除
  deleteById(params) {
    return request(`${FINANCE_PREFIX}/finance_voucher_account/delete`, {
      method: 'DELETE',
      query: params,
    })
  },

  // 保存
  savevoucherAccount(data) {
    return request(`${FINANCE_PREFIX}/finance_voucher_account/save`, {
      method: 'POST',
      body: data,
    })
  },

  // 启用、禁用
  enableOrDisable(params) {
    return request(`${FINANCE_PREFIX}/finance_voucher_account/changeStatus`, {
      method: 'PUT',
      query: params,
    })
  }
};
