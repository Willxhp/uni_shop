export default {
  namespaced: true,
  state: {
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  },
  mutations: {
    addCart(state, goods) {
      let findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // console.log(findResult)
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
      // console.log(state.cart)
    },
    updateGoodsState(state, good) {
      let findResult = state.cart.find(x => x.goods_id === good.goods_id)
      if (findResult) {
        findResult.goods_state = !good.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    updateGoodsCount(state, good) {
      let findResult = state.cart.find(x => x.goods_id === good.goods_id)
      if (findResult) {
        findResult.goods_count = good.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    removeGoods(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updateAllGoodsState(state, newState) {
      state.cart.forEach(item => item.goods_state = newState)
    }
  },
  getters: {
    // 购物车中的总数量
    total(state) {
      return state.cart.reduce((total, item) => total += item.goods_count, 0)
    },
    // 购物车中已选中的商品总数量
    checkedCount(state) {
      return state.cart.filter(item => item.goods_state).reduce((total, item)=> total += item.goods_count, 0)
    },
    checkedGoodsAmount(state) {
      return state.cart.filter(item => item.goods_state).reduce((total, item) => total += item.goods_price * item.goods_count,0).toFixed(2)
    }
  }
}