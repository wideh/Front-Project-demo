<template>
	<view class="content">
    <view style="display: flex; flex-wrap: wrap; width: 100%;">
      <view @click="openTo(1)" class="nav-title">头部滚动一定距离变背景颜色</view>
      <view @click="openTo(2)" class="nav-title">放大移动图片</view>
    </view>
    <custom-tab-bar></custom-tab-bar>
	</view>
</template>

<script>
  // import customTabBar from '../../custom-tab-bar/custom-tab-bar';
	export default {
    // components: {
    //   customTabBar,
    // },
		data() {
			return {
			}
		},
		onLoad() {

		},
    onShow() {
      console.log('首页显示');
    },
		methods: {
      openTo(n){
        switch(n){
          case 1:
            uni.navigateTo({
              url: '/pages/titleBackground/titleBackground',
            });
            break;
          case 2:
            uni.navigateTo({
              url: '/pages/imageScaleMove/imageScaleMove',
            });
            break;
          default: 
          break;
        }
         
      }
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
  
  .nav-title{
    width: 140rpx;
    padding: 10rpx;
    margin: 10rpx;
    border: 2rpx solid #007AFF;
    border-radius: 20rpx;
    display: inline-block;
    word-break: break-all;
  }
</style>
