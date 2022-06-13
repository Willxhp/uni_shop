<template>
  <view>
    <!-- 使用自定义的搜索组件 -->
    <my-search @click="gotoSearch"></my-search>
    <!-- 滑动区域 -->
    <view class="scroll-view-container">
      <!-- 左侧滑动栏 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
        <view :class="['left-scroll-view-item', i === active ? 'active' : '']" v-for="(item, i) in cateList" :key="i" @click="activeChange(i)">{{item.cat_name}}</view>
      </scroll-view>
      <!-- 右侧滑动栏 -->
      <scroll-view scroll-y="true" class="right-scroll-view" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <!-- 二级分类 -->
        <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
          <!-- 分类标题 -->
          <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
          <!-- 三级分类 -->
          <view class="cate-lv3">
            <navigator class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" :url="'/subpkg/goods_list/goods_list?cid=' + item3.cat_id">
              <image :src="item3.cat_icon.replace(/dev/, 'web')"></image>
              <text>{{item3.cat_name}}</text>
            </navigator>
          </view>
        </view>
        
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 设备可用屏幕的高度
        wh: 0,
        // 当前选中的一级分类
        active: 0,
        // 右侧滑动栏初始顶部位置
        scrollTop: 0,
        // 一级分类列表
        cateList: [],
        cateLevel2: []
      };
    },
    async onLoad() {
      const systemInfo = uni.getSystemInfoSync()
      // console.log(systemInfo)
      // 获取手机屏幕可用范围高度
      this.wh = systemInfo.windowHeight - 50
      // 获取一级分类列表
      const {data} = await uni.$http.get('/api/public/v1/categories')
      // console.log(data)
      if (data.meta.status !== 200) {
        return uni.$showMsg()
      }
      this.cateList = data.message
      this.cateLevel2 = data.message[0].children
    },
    methods: {
      activeChange(index) {
        this.active = index
        this.cateLevel2 = this.cateList[index].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
    .left-scroll-view-item {
      background-color: #f5f5f5;
      line-height: 60px;
      text-align: center;
      font-size: 15px;
      &.active {
        background-color: #fff;
        position: relative;
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: #c00000;
        }
      }
    }
  }
  .cate-lv2-title {
    font-size: 12px;
    text-align: center;
    font-weight: bold;
    padding: 15px 0;
  }
  .cate-lv3 {
    display: flex;
    flex-wrap: wrap;
    display: flex;
      .cate-lv3-item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        image {
          width: 60px;
          height: 60px;
        }
        text {
          font-size: 12px
        }
      }
  }
}
</style>
