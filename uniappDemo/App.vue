<script>
	export default {
    onLaunch: function() {
    	console.log('App Launch')
    	uni.hideTabBar()
      uni.removeStorageSync('tabBarKey'); // 清除缓存
    },
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
  /* .footerBottom{
    margin-bottom: 130rpx;
  } */
</style>
