<template>
  <view>
    <view class="status_bar" 
      :style="{ 
        height: height + 45 +'px',
        background: opacity == 0 ? '#fff' : '',
        opacity: opacity == 0 ? 1 : opacity,
      }" 
    >
      <!-- 这里是状态栏 -->
      <view class="nav-bar" :style="{ top: height+'px' }">头部滚动一定距离变背景颜色</view>
    </view>
    <view class="content" :style="{ paddingTop: height + 45 +'px' }">111</view>
  </view>
</template>

<script>
  export default{
    data(){
      return{
        height: '',
        timeId: null,
        opacity: 1,
      }
    },
    created() {
      this.height = uni.getSystemInfoSync().statusBarHeight;
    },
    onPageScroll : function(e) {
    	console.log("滚动距离为：" + e.scrollTop);
      // if(this.timeId){
      //   clearTimeout(this.timeId)
      // }
      // this.timeId = setTimeout(() => {
        if(e.scrollTop > 0 && e.scrollTop < 60){
          this.opacity =  (60 - e.scrollTop) / 60
        } else if(e.scrollTop > 60) {
          this.opacity = 0
        } else {
          this.opacity = 1
        }
      // }, 50)
    },
  }
</script>

<style scoped lang="less">
.status_bar {
  width: 100%;
  background-color: red;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
.nav-bar{
  height: 90rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
}
.navTitleBack{
  background-color: #fff;
}
.content{
  height: 1800rpx;
  width: 750rpx;
}
::-webkit-scrollbar { 
  display: none;
  width: 0; 
  height: 0;
  color: transparent;
}
</style>
