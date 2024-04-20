<template>
  <view>
    <nav-bar-title :title="title" :isMoveTitleText="isMoveTitleText"></nav-bar-title>
    <view>
      导航标题过长时滚动
    </view>
    <custom-tab-bar></custom-tab-bar>
  </view>
</template>

<script>
import navBarTitle from './components/navBarTitle.vue';
// import customTabBar from '../../custom-tab-bar/custom-tab-bar';
export default{
  name: 'navTitleScrollIndex',
  components: {
    navBarTitle,
    // customTabBar,
  },
  data() {
    return {
      isMoveTitleText: false,
      title: '导航标题过长时滚动',
      statusBarHeight: 0,
    };
  },
  onShow(){
    // 设置页面标题，当标题过长时，标题滚动显示
    this.title = `导航标题过长时滚动(hkfhfkahgkahg ahgak gahgak )`;
    console.log(this.title)
    if(this.title.length > 16){
      this.isMoveTitleText = true;
    }
  }
}
</script>

<style>
</style>
