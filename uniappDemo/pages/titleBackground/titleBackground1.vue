<template>
  <view class="page">
    <!--头部导航-->
    <view class="page-hd">
      <view class="hd-background"
        :style="{
          opacity: opacity == 0 ? 1 : opacity, 
          background: opacity == 0 ? '#fff' : ''
        }"
      >
      </view>
      <view class="hd-text"
        :style="{
          opacity: 1-opacity, 
          top: statusNavHeight + 'px',
          height: nMenuButtonHeight + 'px',
          lineHeight: nMenuButtonHeight + 'px'
        }"
      >
        高会答案早知晓
      </view>
    </view>
    <!--界面主体-->
    <view class="page-bd">
      <scroll-view scroll-y style="height: 90vh;" enhanced :show-scrollbar="false" @scroll="fnScrollEvent" @scrolltoupper="fnScrollToupper">
        <view class="me-container">
          <view class="me-hd">
            <view class="box-cont">
              <view class="box-white-cont">
                <view class="box-title">讲解介绍</view>
              </view>
            </view>
          </view>
          <view class="me-bd">
          </view>
        </view>
      </scroll-view>
    </view>
    <custom-tab-bar></custom-tab-bar>
  </view>
</template>

<script>
  export default {
    data() {
      return{
        statusNavHeight: 20,
        nMenuButtonHeight: 40,
        opacity: 1,
      }
    },
    onLoad() {
      // 获取状态栏和胶囊位置
      const {top, height} = wx.getMenuButtonBoundingClientRect()
      this.statusNavHeight = top;
      this.nMenuButtonHeight = height;
    },
    methods:{
      // 滚动时触发
      fnScrollEvent(e) {
        let scrolltop = e.detail.scrollTop;
        console.log(e.detail.scrollTop)
        if (scrolltop > 150) {
          this.opacity = 0
          return;
        }
        this.opacity =  (150 - scrolltop) / 150
      },
      // 滚动到顶部
      fnScrollToupper() {
        this.opacity = 1;
      },
    },
  }
</script>

<style scoped lang="less">
  .page{
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    background: #ffffff;
  }
    /* 界面头部 */
  .page-hd{
    height: 10vh;
    width: 100%;
  }
  .hd-background{
    width: 100%;
    height: 100%;
    background: red;
    background-repeat: no-repeat;
    background-size: 100vw;
  }
  .hd-text{
    position: fixed;
    width: 100%;
    text-align: center;
    top: 20px;
    font-size: 28rpx;
    color: #333;
  }
  .page-bd{
    flex:1;
  }
  .me-container{
    height: 100%;
    width: 100%;
  }
  .me-hd{
    width: 100vw;
    height: 40vh;
    background: red;
    // background-repeat: no-repeat;
    // background-size: contain;
    // background-position: 0 -10vh;
  }
  .me-bd{
    height: 100vh;
  }
  .main-image{
    width: 100%;
    height: 100%;
  }
  .box-cont{
    padding-top: 200rpx;
    height: 100%;
    box-sizing: border-box;
  }
  .box-white-cont{
    height: 100%;
    background-color: #fff;
    border-radius: 40rpx 40rpx 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .box-title{
    margin-top: 20rpx;
    font-size: 28rpx;
  }
</style>
