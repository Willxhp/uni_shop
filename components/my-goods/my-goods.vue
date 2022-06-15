<template>
    <view class="goods-item">
      <!-- 左侧图片区域 -->
      <view class="goods-item-left">
        <slot name="radio"></slot>
        <image :src="good.goods_small_logo || defaultImgSrc"></image>
      </view>
      <!-- 右侧商品描述 -->
      <view class="goods-item-right">
        <view class="goods-name">
          {{good.goods_name}}
        </view>
        <view class="goods-info-box">
          <view class="goods-price">￥{{good.goods_price | tofixed}}</view>
          <!-- numbarBox区域 -->
          <slot name="numberBox"></slot>
        </view>
      </view>
    </view>
</template>

<script>
  export default {
    name:"my-goods",
    props: {
      good: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        defaultImgSrc: 'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000602669097_1_200x200.jpg',
      };
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.goods-item {
      display: flex;
      padding: 10px 5px;
      border-bottom: 1px solid #f0f0f0;

      .goods-item-left {
        margin-right: 5px;
        display: flex;
        align-items: center;
        image {
          width: 100px;
          height: 100px;
          display: block;
        }
      }

      .goods-item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        .goods-name {
          font-size: 14px
        }

        .goods-info-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .goods-price {
            font-size: 16px;
            color: #c00000;
          }
        }
      }
    }
</style>