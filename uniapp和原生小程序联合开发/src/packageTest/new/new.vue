<template>
  <view>
    <text>新建页面</text>
    <input @input="onInputChange"/>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        text: '',
      }
    },
    methods: {
      onInputChange(e) {
        console.log('改变', e)
      }
    }
  }
</script>

<style>
</style>