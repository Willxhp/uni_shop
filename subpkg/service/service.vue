<template>
  <view class="service-container">
    <text>作者很懒，相关功能暂未开发</text>
    <image src="/static/erweima.jpg"></image>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
page, .service-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text {
    font-size: 15px;
    font-weight: bold;
  }
  image {
    width: 600rpx;
    height: 600rpx;
  }
}
</style>
