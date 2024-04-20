<template>
	<view class="suda-popup" :class="showPopup ? 'fadeIn' : 'fadeOut'" v-show="showPopup">
		<view class="mask" @tap="onTap"></view>
		<view class="popup-container">
			<view class="imagecontent">
        <movable-area scale-area class="movable-area">
          <movable-view
              class="movable-view"
              direction="all"
              @scale="onScale"
              scale="true"
              scale-min="0.5"
              scale-max="10"
              :scale-value="scale"
          >
            <image
              class="lookimg"
              :src="imgUrl"
              mode="aspectFit"
            ></image>
          </movable-view>
        </movable-area>
      </view>
		</view>
		<view class="popclose-btn">
			<uni-icons type="clear" color="#fff" size="30" @click="close" />
		</view>
	</view>
</template>

<script>
export default {
	name: 'imageScalePopup',
	props: {
		maskClick: {
			type: Boolean,
			default: true
		},
		imgUrl: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			showPopup: false,
			scale: 1,
      x: 0,
      y: 0,
      old: {
        scale: 1,
        x: 0,
        y: 0,
      }
		};
	},
	methods: {
		open() {
			this.showPopup = true;
		},
		close() {
			this.showPopup = false;
		},
		onTap() {
			if (!this.maskClick) return;
			this.close();
		},
		onScale(e) {
      this.old.scale = e.detail.scale;
    },
	}
};
</script>

<style scoped>
@import url('./animate.css');

.suda-popup {
	z-index: 10;
	animation-duration: 0.4s;
	height: 100vh;
	top: 0;
	left: 0;
	position: fixed;
}

.mask {
	background-color: rgba(0, 0, 0, 0.4);
	height: 100vh;
	width: 100vw;
}

.popup-container {
	width: 690rpx;
	padding: 0 30rpx;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 11;
}


.popclose-btn {
  position: fixed;
  right: 3px;
  top: 3px;
}

.movable-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
}

.movable-area {
  height:100%;
  width: 750rpx;
  overflow: hidden;
}

.movable-view image {
  width: 100%;
}

.lookimg {
  display: block;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.imagecontent {
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
