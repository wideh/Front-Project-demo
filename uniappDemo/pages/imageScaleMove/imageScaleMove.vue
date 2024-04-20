<template>
  <view class="house-resrouce-detail">
    <image src="https://img2.baidu.com/it/u=4049022245,514596079&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690131600&t=f78597d1a4011d03e7299f35efb58376" mode="aspectFit" @click="previewImg()" />
    <ImageScalePopup ref="preImgPopup" :imgUrl="preViewImg" ></ImageScalePopup>
  </view>
</template>

<script>
import ImageScalePopup from './components/image-scale-popup/image-scale-popup.vue';
export default {
  components: {
    ImageScalePopup,
  },
  data() {
    return {
      preViewImg: '',
    };
  },

  methods: {
    previewImg(item) {
      this.preViewImg = 'https://img2.baidu.com/it/u=4049022245,514596079&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690131600&t=f78597d1a4011d03e7299f35efb58376';
      this.$refs.preImgPopup.open();
    },
  },
};
</script>

<style lang="scss" scoped>
.house-resrouce-detail {
  // height: 100%;
  image {
    width: 100%;
    height: 400rpx;
  }
}
</style>
