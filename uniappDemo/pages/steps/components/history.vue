<template>
  <view style="padding: 20rpx 30rpx">
    <view v-if="historyList.length > 0">
      <view class="step-item-container" v-for="(item, index) in historyList" :key="index">
        <view class="step-item-icon-wrap">
          <!-- 拒绝 -->
          <icon v-if="item.nodeTypeStr == '操作节点' && item.actionTypeStr=='审批拒绝'" 
            type="warn" size="32" :color="item.statusStr == '已结束'?'#E51C23':'#DEDEDE'" 
          />
          <!-- 同意 -->
          <icon v-if="item.nodeTypeStr == '操作节点' && item.actionTypeStr!=='审批拒绝'" 
            type="success" size="32" :color="item.statusStr == '已结束'?'#02adf3':'#DEDEDE'" 
          />
          <image v-else-if="item.nodeTypeStr == '审批节点'" class="step-item-icon" 
            :src="item.statusStr == '已结束'?'../../../static/steps/approvalnode.svg':'../../../static/steps/approvalwaitnode.svg'" 
            mode="aspectFit"
          ></image>
          <image v-else-if="item.nodeTypeStr == '抄送节点'" class="step-item-icon" 
            :src="item.statusStr == '已结束'?'../../../static/steps/makesendnode.svg':'../../../static/steps/makesendwaitnode.svg'" 
            mode="aspectFit"
          ></image>
          <image v-else-if="item.nodeTypeStr == '结束节点'" class="step-item-icon" 
            :src="item.statusStr == '已结束'?'../../../static/steps/endnode.svg':'../../../static/steps/endwaitnode.svg'" 
            mode="aspectFit"
          ></image>
          <view v-if="index+1<historyList.length" class="step-item-tail" :class="{'step-item-tail-wait': item.statusStr !== '已结束'}"></view>
        </view>
        <view class="step-item-content-wrap">
          <view class="content-name-date-wrap" v-if="item.nodeTypeStr == '操作节点'">
            <view style="width: 288rpx; white-space: normal; word-break: break-all;">{{item.nodeTitle?item.nodeTitle:''}}</view>
            <view>{{item.nodeTime ? momentfn(item.nodeTime): ''}}</view>
          </view>
          <view class="content-name-date-wrap" v-else-if="item.nodeTypeStr !== '操作节点'">
            <view v-if="item.nodeTypeStr == '结束节点'" style="white-space: normal; word-break: break-all;">流程结束</view>
            <view v-else style="white-space: normal; word-break: break-all;">{{item.nodeTitle?item.nodeTitle:''}}</view>
          </view>
          <view class="step-row-gap" v-if="item.nodeTypeStr == '操作节点'">
            <view class="step-item-tag step-item-tag-green"
              v-if="item.actionTypeStr == '提交申请' || item.actionTypeStr == '审批同意' || item.actionTypeStr == '撤销申请'"
            >{{item.actionTypeStr}}</view>
            <view class="step-item-tag step-item-tag-red"
              v-if="item.actionTypeStr == '审批拒绝'"
            >审批拒绝</view>
          </view>
          <view class="step-row-gap" v-if="item.nodeTypeStr == '操作节点' && (item.actionTypeStr == '审批拒绝' || item.actionTypeStr == '审批同意')">
            {{item.remark ? item.remark : ''}}
          </view>
          <view class="step-row-gap" v-if="item.nodeTypeStr == '审批节点'">
            <view class="step-item-tag step-item-tag-orange">审批中</view>
          </view>
          <view class="step-row-gap" v-if="item.nodeTypeStr == '审批节点' && item.persons && item.persons.length > 1">
            {{item.approvalMethodStr == '会签' ? '会签(需要所有人审批)' : '或签(1人审批即可)'}}
          </view>
          <view class="step-row-gap" v-if="item.persons && item.persons.length > 0">
            <view class="step-item-tag" v-for="(name, index) in item.persons" :key="index" style="margin-right: 10rpx">{{name}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="step-item-container" v-else>暂无流程</view>
  </view>
</template>

<script>
import moment from "moment";
export default {
  name: 'ApprovalHistory',
  props:{
    historyList: {
      type: Array,
      default: [],
    }
  },
  data(){
    return {
      iswait: true,
    }
  },
  methods: {
    momentfn(date){
      return moment(date).format('YYYY/MM/DD HH:mm')
    }
  }
}
</script>

<style lang="less" scoped>
.step-item-container{
  display: flex;
  .step-item-icon-wrap{
    margin-right: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .step-item-icon{
      width: 32px;
      height: 32px;
    }
    .step-item-tail{
      // flex: 0.98;
      // margin: 10rpx 0;
      flex: 1;
      width: 0;
      border: 2rpx solid #02adf3;
    }
    .step-item-tail-wait{
      // border: 2rpx dashed #DEDEDE;
      border: none;
      width: 4rpx;
      background: linear-gradient(to bottom, #DEDEDE 0%, #DEDEDE 80%,transparent 20%);
      background-size: 4rpx 20rpx;
      background-repeat: repeat-y;
    }
  }
  .step-item-content-wrap{
    padding-bottom: 20rpx;
    .content-name-date-wrap{
      width: 592rpx;
      padding-top: 6rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .step-row-gap{
      margin: 10rpx 0;
    }
    .step-item-tag{
      display: inline-block;
      padding: 6rpx 10rpx;
      border: 2rpx solid #d9d9d9;
      border-radius: 10rpx;
      color: #333;
      background: #fafafa;
      line-height: 1;
    }
    .step-item-tag-green{
      color: #389e0d;
      background: #f6ffed;
      border-color: #b7eb8f;
    }
    .step-item-tag-red{
      color: #cf1322;
      background: #fff1f0;
      border-color: #ffa39e;
    }
    .step-item-tag-orange {
      color: #d46b08;
      background: #fff7e6;
      border-color: #ffd591;
    }
  }
}
</style>
