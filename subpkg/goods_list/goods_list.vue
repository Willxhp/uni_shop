<template>
  <view>
    <!-- 商品列表 -->
    <view class="goods-list">
      <!-- 商品项 -->
      <view v-for="(good, i) in goodsList" :key="i" @click="gotoDetail(good)">
        <my-goods :good="good"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isLoading: false,
        defaultGoodsList: [{
          "goods_id": 769,
          "cat_id": 776,
          "goods_name": "子初电热蚊香液（无味型）5瓶液送1加热器 宝宝儿童驱蚊液套装 婴儿防蚊液",
          "goods_price": 39,
          "goods_number": 100,
          "goods_weight": 100,
          "goods_big_logo": "",
          "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000602669097_1_200x200.jpg",
          "add_time": 1514258769,
          "upd_time": 1514258769,
          "hot_mumber": 0,
          "is_promote": false,
          "cat_one_id": 710,
          "cat_two_id": 760,
          "cat_three_id": 776
        }, ]
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pagesize > this.total) return uni.$showMsg('数据加载完毕！')
      if (this.isLoading) {
        return
      }
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    onPullDownRefresh() {
      // 重置关键数据
      this.queryObj.pagenum = 1
      this.goodsList = []
      this.total = 0
      this.isLoading = false
      // 重新发起数据请求
      this.getGoodsList(() => {uni.stopPullDownRefresh()})
    },
    methods: {
      async getGoodsList(cb) {
        // 开启节流阀
        this.isLoading = true
        const {
          data
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 关闭节流阀
        this.isLoading = false
        cb && cb()
        if (data.meta.status !== 200) return uni.$showMsg()
        if (data.message.goods.length === 0 ) {
          this.goodsList = this.defaultGoodsList
          this.total = 1
        }
        else {
          this.goodsList = [...this.goodsList, ...data.message.goods]
          this.total = data.message.total
        }
      },
      gotoDetail(good) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + good.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
