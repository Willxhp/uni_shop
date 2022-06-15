<template>
  <!-- 购物车区域 -->
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 收货地址组件 -->
    <my-address></my-address>
    <!-- 商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧的文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
      <uni-swipe-action>
        <block v-for="(good, i) in cart" :key="good.goods_id">
          <uni-swipe-action-item :right-options="options" @click="swipeClickHandler(good)" >
            <my-goods :good="good">
              <radio :checked="good.goods_state" color="#c00000" slot="radio" style="transform:scale(0.7)"
                @click="radioChangeHandler(good)"></radio>
              <uni-number-box slot="numberBox" :min="1" :value="good.goods_count"
                @change="numChangeHandler(good,$event)"></uni-number-box>
            </my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      <!-- 商品结算区域 -->
      <my-settle></my-settle>
  </view>
  <!-- 空白购物车区域 -->
  <view class="empty-cart-container" v-else>
    <image src="../../static/cart_empty@2x.png" class="empty-img"></image>
    <text class="empty-text">空空如也~</text>
  </view>
</template>

<script>
  import badgeMixin from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMixin],
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#c00000'
          }
        }]
      };
    },
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoods']),
      radioChangeHandler(good) {
        let e = {
          goods_id: good.goods_id,
          goods_state: good.goods_state
        }
        this.updateGoodsState(e)
      },
      numChangeHandler(good, $event) {
        // console.log($event);
        let e = {
          goods_id: good.goods_id,
          goods_count: $event - 0
        }
        this.updateGoodsCount(e)
      },
      swipeClickHandler(good) {
        this.removeGoods(good.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }
  .empty-cart-container {
    display: flex;
    flex-direction: column;
    padding-top: 150px;
    align-items: center;
    .empty-img {
      width: 90px;
      height: 90px;
    }
    .empty-text {
      margin-top: 15px;
      font-size: 14px;
      color: gray;
    }
  }
</style>
