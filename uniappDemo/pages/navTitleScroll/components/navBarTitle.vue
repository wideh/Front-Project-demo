<template>
  <view>
    <view class="status_bar" :style="{ height: height }">
        <!-- 这里是状态栏 -->
    </view>
    <view class="nav-bar">
      <view class="backIcon" @click="onClickBack"><uni-icons type="back" size="28"></uni-icons></view>
      <view class="nav-bar-right">
        <view class="navigationBarTitleText" :class="{titleTextIsmove: isMoveTitleText}">
          {{title}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default{
  name: 'navBarTitle',
  components: {
    // uniIcons,
  },
  props:{
    title:{
      type: String,
      default: '',
    },
    isMoveTitleText:{
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      height: '',
    };
  },
  // mounted(){
  //   const that = this;
  //   const query = uni.createSelectorQuery()
  //   query.select('.navigationBarTitleText').boundingClientRect();
  //   query.exec(function (res) {
  //     console.log('宽度', res);
  //     // if(res[0].width > 243){
  //     //   that.isMoveTitleText = true;
  //     // }
  //   });
  // },
  created() {
  	this.height = uni.getSystemInfoSync().statusBarHeight + 'px';
  },
  methods:{
    onClickBack() {
      uni.navigateBack()
    },
  }
}
</script>

<style lang="scss" scoped>
  .status_bar {
    // height: var(--status-bar-height);
    width: 100%;
    background-color: #fff;
  }
  .nav-bar{
    height: 90rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    .backIcon{
      height: 90rpx;
      line-height: 90rpx;
      cursor: pointer;
      display: inline-block;
      position: relative;
      z-index: 10;
      background: #fff;
    }
    .nav-bar-right{
      width: 488rpx;
      overflow: hidden;
      .navigationBarTitleText{
        font-size: 30rpx;
        white-space: nowrap;
        display: inline;
      }
      .titleTextIsmove{
        display: inline-block;
        animation: 10s loop linear infinite normal;
      }
    }
  }
  @keyframes loop {
    0% {
      transform: translateX(200px);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
