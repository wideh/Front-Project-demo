import { WY_PREFIX, API_VERSION } from '@novaFrontCommon/utils/constants';
import request from 'utils/request';
import { PMS_BASE_PREFIX } from '../../../utils/constants';

export default {
  /** 获取管理区 */
  getRegionList() {
    return request<any>(`${PMS_BASE_PREFIX}/organizationItem/getTreeRegions`, {
      method: 'GET',
    });
  },

  // 列表
  fetchList(data) {
    return request(`${WY_PREFIX}/api/${API_VERSION}/shop/returnable-records/list`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 导出表格
  exportExcel(data) {
    return request(
      `${WY_PREFIX}/api/${API_VERSION}/shop/returnable-records/export`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      },
      true
    );
  },

  // 删除
  deleteById(id) {
    return request(`${WY_PREFIX}/api/${API_VERSION}/shop/returnable-records/${id}`, {
      method: 'DELETE',
    });
  },

  // 详情-基本信息
  fetchReturnableRecordsBaseInfo(id) {
    return request(`${WY_PREFIX}/api/${API_VERSION}/shop/returnable-records/${id}`, {
      method: 'GET',
    });
  },

  // 详情-营业额
  fetchReturnableRecordsTurnovers(id, params) {
    const { page, pageSize } = params;
    return request(
      `${WY_PREFIX}/api/${API_VERSION}/shop_turnover/ShopTurnover/GetByReturnable?returnableId=${id}&page=${page}&pageSize=${pageSize}`,
      {
        method: 'GET',
      }
    );
  },

  // 详情-账单
  fetchReturnableRecordsBills(id) {
    return request(`${WY_PREFIX}/api/${API_VERSION}/shop/returnable-records/${id}/bills`, {
      method: 'GET',
    });
  },

  // 详情-返款记录
  fetchReturnableRecordsReturned(id) {
    return request(
      `${WY_PREFIX}/api/${API_VERSION}/shop/refund-records/GetByReturnable?returnableId=${id}`,
      {
        method: 'GET',
      }
    );
  },

  // 返款结算-获取数据
  fetchSettlementDataByIds(ids) {
    return request(`${WY_PREFIX}/api/${API_VERSION}/shop/returnable-records/settlement-data`, {
      method: 'POST',
      body: JSON.stringify(ids),
    });
  },

  // 返款结算
  settlementReturnable(data) {
    return request(`${WY_PREFIX}/api/${API_VERSION}/shop/returnable-records/settlement`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
