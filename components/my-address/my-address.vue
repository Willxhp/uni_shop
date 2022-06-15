<template>
  <view>
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
    </view>
    <!-- 收货地址的详细信息 -->
    <view class="address-info-box" @click="chooseAddress" v-else>
      <!-- 第一行 -->
      <view class="row1">
        <view class="row1-left">收货人：{{address.userName}}</view>
        <view class="row1-right">
          <view class="phone">电话：{{address.telNumber}}</view>
          <uni-icons type="right" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2" >
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addstr}}</view>
      </view>
    </view>
    <!-- 底部的边框线 -->
    <image src="/static/cart_border@2x.png" class="address-box"></image></image>
  </view>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name:"my-address",
    data() {
      return {
        // address: {}
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      async chooseAddress() {
        /* uni.chooseAddress({
          success: (res) => {
            this.address = res
          },
          fail: () =>{
            
          }
        }) */
        const [err, res] = await uni.chooseAddress()
        if (err === null) {
          // this.address = res
          // console.log(res)
          this.updateAddress(res)
        }
        
      }
    },
    computed:{
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addstr'])
    }
  }
</script>

<style lang="scss">
.address-choose-box {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.address-box {
  display: block;
  width: 100%;
  height: 5px;
}

.address-info-box {
  padding: 0 5px;
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .row1 {
    display: flex;
    justify-content: space-between;
    .row1-right {
      display: flex;
    }
  }
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>