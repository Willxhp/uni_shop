import {
  mapGetters
} from 'vuex'

export default {
  onShow() {
    this.setBadge()
  },
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
  methods: {
    setBadge() {
      if (this.total === 0) {
        uni.removeTabBarBadge({
          index: 2
        })
      } else {
        uni.setTabBarBadge({
          index: 2,
          text: this.total + ''
        })
      }
    }
  },
  watch: {
    total() {
      this.setBadge()
    }
  }
}
