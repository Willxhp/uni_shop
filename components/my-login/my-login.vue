<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" @click="getUserInfo" class="btn-login">一键登录</button>
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_user', ['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      getUserInfo() {
        uni.getUserProfile({
          desc: '申请获得以下权限',
          success: (userInfo) => {
            // console.log(userInfo);
            this.updateUserInfo(userInfo)
            this.getToken(userInfo)
          },
          fail: (err) => {
            return uni.$showMsg('您取消了登录授权！')
          }
        })
      },
      getToken(info) {
        uni.login({
          success: async (res) => {
            const query = {
              code: res.code,
              encryptedData:info.encryptedData,
              iv: info.iv,
              rawData: info.rawData,
              signature: info.signature
            }
            /* const {data} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
            if (data.meta.status !== 200) return uni.$showMsg('登录失败！')
            this.updateToken(data.message.token) */
            // 服务器无法正常返回Token，在此处传入假Token
            this.updateToken("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
            this.navigateBack()
          },
          fail: () => {
            return uni.$showMsg('登录失败！')
          }
        })
      },
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType) {
          uni.switchTab({
            url: this.redirectInfo.from,
            success: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
.login-container {
  display: flex;
  height: 750rpx;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    width: 100%;
    height: 40px;
    background-color: white;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 100%;
    transform: translateY(50%);
  }
  .btn-login {
    margin: 15px 0;
    background-color: #c00000;
    width: 90%;
    border-radius: 100px;
  }
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>