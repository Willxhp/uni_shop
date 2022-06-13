<template>
  <view>
    <view class="search-box" >
      <uni-search-bar @confirm="search" @input="input" cancelButton="none" focus :radius="18"></uni-search-bar>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchList.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchList" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods_name">{{item.goods_name}}</view>
        <uni-icons type="right" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="20" @click="clean"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" :inverted="true" v-for="(item, i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        searchList: [],
        kw: '',
        searchHistory: []
      };
    },
      onLoad() {
        this.searchHistory = JSON.parse(uni.getStorageSync('kw') || '[]')
      },
    computed: {
      histories() {
        return [...this.searchHistory].reverse()
      }
    },
    methods: {
      input(value) {
        // 防抖，避免多次发送无用请求
        clearTimeout(this.timer)
        // 获取搜索建议列表
        this.timer = setTimeout(() => {
          this.kw = value
          this.getSearchList()
          this.saveSearchHistory()
          // console.log(value)
        }, 500)
      },
      async getSearchList() {
        if (this.kw === '') {
          this.searchList = []
          return
        }
        const {data} = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.kw})
        if (data.meta.status !== 200) return uni.$showMsg()
        this.searchList = data.message
      },
      saveSearchHistory() {
        let set = new Set(this.searchHistory)
        set.delete(this.kw)
        set.add(this.kw)
        this.searchHistory = Array.from(set)
        uni.setStorageSync('kw', JSON.stringify(this.searchHistory))
        // this.searchHistory.push(this.kw)
      },
      // 清除历史记录
      clean() {
        this.searchHistory = []
        uni.setStorageSync('kw', '[]')
      },
      // 跳转到商品详情页面
      gotoDetail(id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + id 
        })
      },
      // 点击历史记录跳转到商品列表页面
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #c00000;
}
.sugg-list {
  padding: 0 5px;
  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #efefef;
    .goods_name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.history-box {
  padding: 0 5px;
  .history-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    font-size: 15px;
    align-items: center;
    border-bottom: 1px solid #efefef;
  }
  .history-list {
    display: flex;
    flex-wrap: wrap;
    .uni-tag {
      display: inline-block;
      margin-top: 5px;
      margin-right: 10px;
      color: black;
    }
  }
}
</style>
