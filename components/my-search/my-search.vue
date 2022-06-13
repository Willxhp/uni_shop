<template>
 <view>
    <view class="search-container" @click="searchBoxHandler" :style="{'background-color': bgc}">
      <view class="my-search-box" :style="{'border-radius': borderRadius}">
        <uni-icons type="search" size="17"></uni-icons>
        <text class="placeholder">搜索</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    props: {
      bgc: {
        type: String,
        default: '#c00000'
      },
      borderRadius: {
        type: String,
        default: '18px'
      }
    },
    methods: {
      searchBoxHandler() {
        // console.log('ok')
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.search-container {
  height: 50px;
  background: #c00000;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .my-search-box {
    width: 100%;
    height: 36px;
    border-radius: 18px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .placeholder {
    font-size: 15px;
    margin-left: 5px;
  }
}
</style>