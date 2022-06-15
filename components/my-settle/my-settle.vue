<template>
  <view class="settle-container">
    <label class="radio" @click="updateAllGoodsState(!isFullChecked)">
      <radio style="transform: scale(0.7);" color="#c00000" :checked="isFullChecked"/><text>全选</text>
    </label>
    <view>合计:<text class="amount">￥{{checkedGoodsAmount}}</text></view>
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {mapGetters, mapMutations, mapState} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        seconds: 3,
        timer: null
      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      ...mapGetters('m_user', ['addstr']),
      ...mapState('m_user', ['token', 'redirectInfo']),
      isFullChecked(state) {
        return this.checkedCount === this.total
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      ...mapMutations('m_user', ['updateRedirectInfo']),
      settlement() {
        if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
        if (!this.addstr) return uni.$showMsg('请选择收货地址!')
        // if (!this.token) return uni.$showMsg('请先登录！')
        if (!this.token) return this.delayNavigate()
        uni.navigateTo({
          url: '/subpkg/service/service'
        })
      },
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: `请登录后再结算！${n}秒后自动跳转到登录页`,
          mask: true,
          duration: 1500
        })
      },
      delayNavigate() {
        this.seconds = 3
        this.showTips(this.seconds)
        this.timer = setInterval(() =>{
          this.seconds--
          if (this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                const redirectInfo = {
                  openType: 'switchTab',
                  from: '/pages/cart/cart'
                }
                this.updateRedirectInfo(redirectInfo)
              }
            })
            return
          }
          this.showTips(this.seconds)
        }, 1000)
      }
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