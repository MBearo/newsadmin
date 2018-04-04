<template>
  <div style="height:100%">
    <div id="particles"></div>
    <div class=" ib-vertical-align text-center" style="height:100%">
      <div class=" inline-block" style="position:relative;">
        <div class="m-biaoti">
        
          <div class=" inline-block">
            <div>新闻管理后台</div>
            <div class="xiaozi color-ccc">news backstage</div>
          </div>
        </div>
        <div class="modal-panel bg-white">
          <div class="m-head text-center">
            <div>登录</div>
          </div>
          <div class="m-form-group">
            <input class="m-form-control" type="text" name=""  value="" v-model="name" @blur="jiaodian1" :class="{focus:focus1}"
            />
            <label class="m-form-label" for="">用户名</label>
            <small class="m-prompt">这里是提示提示信息</small>
          </div>
          <div class="m-form-group">
            <input class="m-form-control" type="password" name=""  value="" v-model="password" @blur="jiaodian2" :class="{focus:focus2}"
            />
            <label class="m-form-label" for="">请输入密码</label>
            <small class="m-prompt">这里是提示提示信息</small>
          </div>
          <!-- <div class="m-buttons">
            <div class="m-button" @click="login">
              <i :class="loading"></i> 确认登录
            </div>
          </div> -->
          <el-button type="primary" style="width:100%" :loading="load" @click="login" @keyup.enter="login2($event)">{{loginText}}</el-button>
          <!-- <div class="m-link">
            没有账号？去
            <a href="">登录</a>/
            <a href="">注册</a>
          </div> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import urls from '../vuex/urls'
  import qs from 'qs'
  import particles from 'particles.js'

  export default {
    data() {
      return {
        name: '',
        password: '',
        focus1: false,
        focus2: false,
        load: false,
        loginText: '确认登录'
      }
    },
    created() {
      document.onkeydown = (e) => {
        var key = window.event.keyCode;
        if (key == 13) {
          this.login();
        }
      }
    },
    methods: {
      login() {
        this.load = true;
        this.loginText = '正在登录..'
        this.$store.dispatch('LoginAction', {
          account: this.name,
          password: this.password,
          tiaoshi: this,
        });
      },
      login2(ev) {
        if (ev.keyCode == 13) {
          this.login()
        }
      },
      yanzheng() {
        this.$store.dispatch('YanZhengAction', {
          tiaoshi: this
        })
      },
      loginSuccess() {
        this.load = false;
        this.loginText = '确认登录'
        // this.$notify({
        //   title: '成功',
        //   type: 'success',
        //   message: '登陆成功！',
        // });
        this.$message({
          showClose: true,
          message: '登录成功！',
          type: 'success'
        });
        if (this.$store.state.role != '用户') {
          this.$router.push({
            path: '/tongji'
          });
        }else{
          this.$router.push({
            path: '/commission'
          });
        }
      },
      loginError() {
        this.load = false;
        this.loginText = '确认登录'
        // this.$notify({
        //   title: '失败',
        //   type: 'error',
        //   message: '用户名或密码错误！',
        // });
        this.$message({
          showClose: true,
          message: '用户名或密码错误！',
          type: 'error'
        });
      },
      shixiao() {
        this.load = false;
        this.$message({
          showClose: true,
          message: '登录令牌失效',
          type: 'error'
        });
      },
      jiaodian1() {
        if (this.name != '') {
          this.focus1 = true;
        } else {
          this.focus1 = false
        }
      },
      jiaodian2() {
        if (this.password != '') {
          this.focus2 = true;
        } else {
          this.focus2 = false
        }
      },
    },
    mounted() {
      particlesJS.load('particles', '/static/data.js');
    }
  }

</script>

<style>
  .modal-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
    z-index: 1000;
    visibility: hidden;
    opacity: 0;
    -webkit-transition-duration: .4s;
    transition-duration: .4s;
  }

  .modal-overlay.in {
    visibility: visible;
    opacity: 1;
  }

  .modal-panel {
    box-sizing: border-box;
    width: 350px;
    border-radius: 4px;
    padding: 40px 40px 40px;
    border: 1px solid #e6e6e6
  }

  .modal-panel .m-form-group {
    position: relative;
    margin: 20px 0;
  }

  .modal-panel .m-form-control {
    position: relative;
    border: none;
    outline: none;
    display: block;
    width: 100%;
    height: 36px;
    line-height: 1.57;
    color: #76838F;
    background-position: center bottom, center -webkit-calc(100% - 1px);
    background-position: center bottom, center calc(100% - 1px);
    -webkit-background-size: 0 2px, 100% 1px;
    background-size: 0 2px, 100% 1px;
    background-color: rgba(0, 0, 0, 0);
    background-repeat: no-repeat;
    background-image: -webkit-gradient(linear, left top, left bottom, from(rgb(121, 195, 170)), to(rgb(121, 195, 170))), -webkit-gradient(linear, left top, left bottom, from(#e4eaec), to(#e4eaec));
    background-image: -webkit-linear-gradient(rgb(121, 195, 170), rgb(121, 195, 170)), -webkit-linear-gradient(#e4eaec, #e4eaec);
    background-image: -o-linear-gradient(rgb(121, 195, 170), rgb(121, 195, 170)), -o-linear-gradient(#e4eaec, #e4eaec);
    background-image: linear-gradient(rgb(121, 195, 170), rgb(121, 195, 170)), linear-gradient(#e4eaec, #e4eaec);
    transition: background .2s ease-out;
  }

  .modal-panel .m-form-control:focus {
    background-size: 100% 2px, 100% 1px;
  }

  .modal-panel .m-form-control.focus {
    background-size: 100% 2px, 100% 1px;
  }

  .modal-panel .m-form-label {
    top: 8px;
    color: #a3afb7;
    font-weight: 300;
    font-size: 14px;
    position: absolute;
    left: 0;
    pointer-events: none;
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    box-sizing: border-box;
    transition: .3s ease all;
  }

  .modal-panel .m-form-control:focus~.m-form-label {
    color: rgb(121, 195, 170);
    top: -25px;
    font-weight: 500;
    font-size: 11.2px;
  }

  .modal-panel .m-form-control.focus~.m-form-label {
    color: rgb(121, 195, 170);
    top: -25px;
    font-weight: 500;
    font-size: 11.2px;
  }

  .modal-panel .m-form-label.in {
    color: rgb(121, 195, 170);
    top: -25px;
    font-weight: 500;
    font-size: 11.2px;
  }

  .modal-panel .m-form-group+.m-form-group {
    margin-top: 40px;
  }

  .modal-panel .m-button {
    padding: 10px 18px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 4px;
    margin-top: 40px;
    -webkit-transition: border .2s linear, color .2s linear, width .2s linear, background-color .2s linear;
    -o-transition: border .2s linear, color .2s linear, width .2s linear, background-color .2s linear;
    transition: border .2s linear, color .2s linear, width .2s linear, background-color .2s linear;
    -webkit-font-smoothing: subpixel-antialiased;
    color: #fff;
    background-color: rgb(121, 195, 170);
    border-color: rgb(121, 195, 170);
    cursor: pointer;
  }

  .modal-panel .m-button:hover {
    background-color: #89bceb;
    border-color: #89bceb;
  }

  .modal-panel .m-link {
    cursor: default;
    margin-top: 30px;
  }

  .modal-panel .m-prompt {
    margin-top: 7px;
    display: block;
    visibility: hidden;
  }

  .modal-panel .success .m-form-control {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#46be8a), to(#46be8a)), -webkit-gradient(linear, left top, left bottom, from(#e4eaec), to(#e4eaec));
    background-image: -webkit-linear-gradient(#46be8a, #46be8a), -webkit-linear-gradient(#e4eaec, #e4eaec);
    background-image: -o-linear-gradient(#46be8a, #46be8a), -o-linear-gradient(#e4eaec, #e4eaec);
    background-image: linear-gradient(#46be8a, #46be8a), linear-gradient(#e4eaec, #e4eaec);
  }

  .modal-panel .success .m-form-control:focus+.m-form-label,
  .modal-panel .success .m-prompt {
    color: #46be8a;
  }

  .modal-panel .error .m-form-control {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#f96868), to(#f96868)), -webkit-gradient(linear, left top, left bottom, from(#e4eaec), to(#e4eaec));
    background-image: -webkit-linear-gradient(#f96868, #f96868), -webkit-linear-gradient(#e4eaec, #e4eaec);
    background-image: -o-linear-gradient(#f96868, #f96868), -o-linear-gradient(#e4eaec, #e4eaec);
    background-image: linear-gradient(#f96868, #f96868), linear-gradient(#e4eaec, #e4eaec);
  }

  .modal-panel .error .m-form-control:focus+.m-form-label,
  .modal-panel .error .m-prompt {
    color: #f96868;
  }

  .modal-panel .success .m-prompt {
    visibility: visible;
  }

  .modal-panel .error .m-prompt {
    visibility: visible;
  }

  .modal-panel .m-logo {
    width: 60px;
  }

  .m-head {
    margin-bottom: 40px;
  }

  .m-head>div {
    font-size: 18px;
  }

  .m-biaoti {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .xiaozi {
    font-size: 14px;
  }

  #particles {
    position: absolute;
    width: 100%;
    height: 99%;
    /* background-color: #b61924; */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

</style>

