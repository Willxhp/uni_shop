<template>
  <view class="settle-container">
    <label class="radio" >
      <radio style="transform: scale(0.7);" color="#c00000" :checked="isFullChecked" @click="updateAllGoodsState(!isFullChecked)"/><text>全选</text>
    </label>
    <view>合计:<text class="amount">￥{{checkedGoodsAmount}}</text></view>
    <view class="btn-settle">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      isFullChecked(state) {
        return this.checkedCount === this.total
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState'])
    }
  }
</script>

<style lang="scss">
.settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  .radio {
    display: flex;
    align-items: center;
  }
  .amount {
    color: #c00000;
    font-weight: bold;
  }
  .btn-settle {
    color: white;
    background-color: #c00000;
    height: 50px;
    line-height: 50px;
    min-width: 120px;
    text-align: center;
  }
}
</style>