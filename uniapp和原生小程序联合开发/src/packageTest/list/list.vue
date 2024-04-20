<template>
  <view>
    <text>列表</text>
    <button @click="goToAddPage">新建</button>
  </view>
</template>

<script>
export default {
  methods: {
    goToAddPage() {
      uni.navigateTo({
        url: '../new/new'
      });
    }
  }
}
</script>

<style>
</style>