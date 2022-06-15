<template>
  <view class="goods">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goodsInfo.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="goods-pirce">
        ￥{{goodsInfo.goods_price}}
      </view>
      <!-- 商品信息主体区域 -->
      <view class="goods-info">
        <!-- 商品名 -->
        <view class="goods-name">
          {{goodsInfo.goods_name}}
        </view>
        <!-- 收藏图标 -->
        <view class="favi">
          <uni-icons type="star" size="20" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>

    <!-- 商品图文介绍 -->
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>

    <!-- 商品导航区域 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        goodsInfo: {},
        options: [{
          icon: 'shop',
          text: '店铺',
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      }
    },
    computed: {
      ...mapState('m_cart', []),
      ...mapGetters('m_cart', ['total'])
    },
    watch: {
      total: {
        handler(newVal) {
          let findResult = this.options.find(x => x.text === '购物车')
          // console.log(findResult);
          findResult.info = newVal
        },
        immediate: true
      }
    },
    onLoad(options) {
      this.getGoodsInfo(options.goods_id)
    },
    methods: {
      ...mapMutations('m_cart', ['addCart']),
      async getGoodsInfo(goodsId) {
        const {
          data
        } = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + goodsId)
        if (data.meta.status !== 200) return uni.$showMsg()
        // 解决图片下方小空白和价格闪烁问题
        data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')

        this.goodsInfo = data.message
      },
      preview(i) {
        uni.previewImage({
          current: i,
          urls: this.goodsInfo.pics.map(item => item.pics_big)
        })
      },
      onClick(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(e) {
        if (e.content.text === '加入购物车') {
          // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
          const goods = {
            goods_id: this.goodsInfo.goods_id,
            goods_name: this.goodsInfo.goods_name,
            goods_price: this.goodsInfo.goods_price,
            goods_count: 1,
            goods_small_logo: this.goodsInfo.goods_small_logo,
            goods_state: true
          }
          this.addCart(goods)
        }
      }
    }
  }
</script>

<style lang="scss">
  .goods {
    padding-bottom: 50px;
  }
  swiper {
    height: 750rpx;

    image {
      height: 100%;
      width: 100%;
    }
  }

  .goods-info-box {
    display: flex;
    flex-direction: column;
    padding: 5px;
    padding-right: 0;

    .goods-pirce {
      margin: 10px 0;
      color: #c00000;
      font-size: 18px;
    }

    .goods-info {
      display: flex;
      justify-content: space-between;

      .goods-name {
        margin-right: 10px;
        font-size: 13px;
      }

      .favi {
        min-width: 140rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        font-size: 13px;
        color: gray;
        border-left: 1px solid #efefef;
      }
    }

    .yf {
      color: gray;
      font-size: 12px;
      margin: 10px 0;
    }
  }

  .goods-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
