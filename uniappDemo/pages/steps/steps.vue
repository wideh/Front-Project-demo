<template>
  <view class="footerBottom">
    <history :historyList="historyList"></history>
    <custom-tab-bar></custom-tab-bar>
  </view>
</template>

<script>
import history from './components/history.vue';
// import customTabBar from '../../custom-tab-bar/custom-tab-bar';
export default{
  components:{history},
  data(){
    return{
      historyList: []
    }
  },
  onLoad(){
    this.historyList.push(
      {
        actionType: 0,
        actionTypeStr: "提交申请",
        approvalMethod: null,
        approvalMethodStr: null,
        nodeTime: "2022-09-14 10:47:33",
        nodeTitle: "admin",
        nodeType: 0,
        nodeTypeStr: "操作节点",
        persons: null,
        remark: null,
        status: 0,
        statusStr: "已结束",
        taskHistoryId: 4430,
      },
      {
        actionType: null,
        actionTypeStr: null,
        approvalMethod: 1,
        approvalMethodStr: "会签",
        nodeTime: null,
        nodeTitle: "审批人",
        nodeType: 1,
        nodeTypeStr: "审批节点",
        persons: ["admin", "admin","admin","admin"],
        remark: null,
        status: 1,
        statusStr: "已结束",
        taskHistoryId: null,
      },
      {
        actionType: 0,
        actionTypeStr: "提交申请",
        approvalMethod: null,
        approvalMethodStr: null,
        nodeTime: "2022-09-14 10:48:36",
        nodeTitle: "admin",
        nodeType: 0,
        nodeTypeStr: "操作节点",
        persons: null,
        remark: null,
        status: 0,
        statusStr: "已结束",
        taskHistoryId: 4450,
      },
      {
        actionType: 1,
        actionTypeStr: "审批同意",
        approvalMethod: null,
        approvalMethodStr: null,
        nodeTime: "2022-09-14 13:40:51",
        nodeTitle: "admin",
        nodeType: 0,
        nodeTypeStr: "操作节点",
        persons: null,
        remark: "同意了吗要得嘛要得嘛要得",
        status: 0,
        statusStr: "已结束",
        taskHistoryId: 4453,
      },
      {
        actionType: 1,
        actionTypeStr: "审批拒绝",
        approvalMethod: null,
        approvalMethodStr: null,
        nodeTime: "2022-09-14 13:40:51",
        nodeTitle: "admin",
        nodeType: 0,
        nodeTypeStr: "操作节点",
        persons: null,
        remark: "同意了吗要得嘛要得嘛要得同意了吗要得嘛要得嘛要得同意了吗要得嘛要得嘛要得同意了吗要得嘛要得嘛要得同意了吗要得嘛要得嘛要得同意了吗要得嘛要得嘛要得同意了吗要得嘛要得嘛要得同意了吗要得111111111111111嘛要得嘛要得同意了吗要得嘛要得嘛要得同意了吗要得嘛要得嘛要得同意了吗要得嘛要得嘛要得111111111111111111111111",
        status: 0,
        statusStr: "已结束",
        taskHistoryId: 4453,
      },
      {
        actionType: null,
        actionTypeStr: null,
        approvalMethod: null,
        approvalMethodStr: null,
        nodeTime: "2022-09-14 13:40:52",
        nodeTitle: "抄送人",
        nodeType: 2,
        nodeTypeStr: "抄送节点",
        persons: ["admin","admadminadminadmin11111in1111","admin","admin","admin","admin"],
        remark: null,
        status: 0,
        statusStr: "已结束",
        taskHistoryId: 4456,
      },
      {
        actionType: null,
        actionTypeStr: null,
        approvalMethod: null,
        approvalMethodStr: null,
        nodeTime: "2022-09-14 13:40:52",
        nodeTitle: "流程结束",
        nodeType: 3,
        nodeTypeStr: "结束节点",
        persons: null,
        remark: null,
        status: 0,
        statusStr: "已结束",
        taskHistoryId: 4458,
      }
    )
  }
}
</script>

<style>
  .footerBottom{
    height: 100%;
    margin-bottom: 130rpx;
  }
</style>
