<template>
  <view>
    <view v-if="isIphoneX" style="height: 1px;width:100%;"/> <!-- 解决遮挡内容 -->
    <view class="tab-bar-wrapper" :class="{'isIphoneX': isIphoneX}">
      <view class="tab-bar-item" :class="{'tab-bar-item-active': active == item.text}" 
        v-for="(item, index) in tabBarList"
        :key="item.text"
        @click="onActiveChange(item.text)"
      >
        <image class="tabbar-icon" src="../static/steps/approvalnode.svg"></image>
        {{ item.text }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'custom-tabbar',
  data() {
    return {
      active: uni.getStorageSync('tabBarKey') || '首页',
      isIphoneX: false,
      showselected: false,
      tabBarList: [
        {
          "pagePath": "/pages/index/index",
          "text": "首页"
        },
        {
          "pagePath": "/pages/navTitleScroll/navTitleScroll",
          "text": "标题"
        },
        {
            "pagePath": "/pages/steps/steps",
            "text": "步骤"
          },
        {
          "pagePath": "/pages/titleBackground/titleBackground1",
          "text": "滚动"
        }
      ]
    }
  },
  created(){
    let that = this;
    uni.getSystemInfo({
    	success: function (res) {
    		// iPhone机型有横杆的导航栏高度大于40
    		if (res.safeArea.top > 40) {
    			that.isIphoneX = true;
    		}
    	}
    });
    wx.onAppRoute((res) => {
      that.active = uni.getStorageSync('tabBarKey') || '首页'
    })
  },
  methods: {
    onActiveChange(key){
      this.active = key;
      const target = this.tabBarList.find(x => x.text == key);
      uni.setStorageSync('tabBarKey', key);
      uni.switchTab({
        url: target.pagePath,
      });
    },
  }
}
</script>

<style scoped lang="less">
  .tab-bar-wrapper{
    width: 750rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    border-top: 2rpx solid #eee;
  }
  .tab-bar-item {
    padding: 20rpx 0 10rpx 0;
    font-size: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #7C7C7C;
    width: 200px;
  }
  .tab-bar-item-active {
    color: #02ADF4;
  }
  .tabbar-icon{
    width: 22px;
    height: 22px;
    margin-bottom: 4rpx;
  }
  .isIphoneX{
  	padding-bottom: 50rpx;
  }
</style>
