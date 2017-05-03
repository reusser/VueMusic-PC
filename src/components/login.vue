<template>
  <transition name="fade">
    <div class="login-container" v-if="showLogin">
      <div class="choose">
        <header>
          <span @click="close"><i class="fa fa-window-close-o"></i></span>
        </header>
        <div class="btn-box">
          <div>
            <p><span class="login-btn">手机号登录</span></p>
            <p><span class="login-btn">邮箱登录</span></p>
          </div>
        </div>
      </div>
      <div class="loign" v-if="showPhoneLogin">
        <div class="login-area">
          <h3>Sign&nbsp;&nbsp;in</h3>
          <div></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * A module that define login component
 * @exports login
 * @author oyh(Reusjs)
 */
export default {
  name: 'login',
  data() {
    return {
      showPhoneLogin: false,
      showEmailLogin: false
    }
  },
  computed: {
    showLogin() {
      return this.$store.state.showLogin
    }
  },
  methods: {
    close() {
      this.$store.commit('setShowLogin', false)
      this.showPhoneLogin = false
      this.showEmailLogin = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/login";
</style>