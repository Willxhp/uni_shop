import Vue from 'vue'
import Vuex from 'vuex'
import cartModule from '@/store/cart.js'
import userModule from '@/store/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {'m_cart': cartModule, 'm_user': userModule}
})