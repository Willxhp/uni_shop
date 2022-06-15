<template>
  <view>
    <!-- 顶部搜索区域 -->
    <view class="search-box">
      <my-search></my-search>
    </view>
    <!-- 轮播图的区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="item.goods_id">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    
    <!-- 分类导航的区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-image"></image>
      </view>
    </view>
    
    <!-- 楼层区域 -->
    <!-- 楼层的容器 -->
    <view class="floor-list">
      <!-- 每一个楼层的item项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层的标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层的图片区 -->
        <view class="floor-img-box">
          <!-- 左侧图片盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width +'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧图片盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(prod, i2) in item.product_list" v-if="i2 !== 0" :key="i2" :url="prod.url">
              <image :src="prod.image_src" :style="{width: prod.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import badgeMixin from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [badgeMixin],
    data() {
      return {
        // 首页轮播图数组
        swiperList: [],
        // 分类导航数据列表
        navList: [],
        // 楼层的数据
        floorList: []
      };
    },
    onLoad() {
      // 调用方法，获取轮播图的数据
      this.getSwiperList()
      // 调用方法，获取导航栏数据
      this.getNavList()
      // 调用方法，获取楼层数据
      this.getFloorList()
    },
    methods: {
      // 获取首页轮播图
      async getSwiperList() {
        const {
          data
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // console.log(data)
        if (data.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.swiperList = data.message
        // uni.$showMsg('数据请求成功')
      },
      // 获取导航数据
      async getNavList() {
        const {data} = await uni.$http.get('/api/public/v1/home/catitems')
        if (data.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.navList = data.message
      },
      // 点击分类跳转到分类页面
      navClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取楼层数据
      async getFloorList() {
        const {data} = await uni.$http.get('/api/public/v1/home/floordata')
        if (data.meta.status !== 200) {
          return uni.$showMsg()
        }
        // this.floorList = data.message
        // 对数据进行处理
        data.message.forEach(floor => {
          floor.product_list.forEach(prod =>{
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = data.message
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 99;
  }
  
swiper {
  height: 330rpx;
  .swiper-item, image {
    height: 100%;
    width: 100%;
  }
}

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15rpx 0;
  .nav-image {
    height: 140rpx;
    width: 128rpx;
  }
}

.floor-title {
  width: 100%;
  height: 60rpx;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
