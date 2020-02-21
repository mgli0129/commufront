<template>
  <div id="login">
    <div class="container-fluid ">
      <div class="row"><br><br><br><br></div>
      <div class="row">
        <div class="col-lg-4 col-md-2 col-sm-1"></div>
        <div class="col-lg-4 col-md-8 col-sm-10 col-xs-12 login">
          <h3><p class="lead login_head text-center">用户登录</p></h3>
          <div class="form-group">
            <p></p>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="control-label">用户名</label>
            <input type="text" class="form-control" name="username" id="inputEmail3" v-model="username"
                   placeholder="请输入用户名">
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="control-label">密码</label>
            <input type="password" class="form-control" name="password" id="inputPassword3"
                   placeholder="请输入密码" v-model="password" maxlength="20">
          </div>

          <div class="form-group">
            <div class="btndiv-adj"></div>
            <input type="checkbox" value="1" name="auto_login" v-model="autoLogin">
            记住我
            <a href="#">&nbsp;&nbsp;忘记密码</a>
            <button class="btn btn-default btn-size login_head pull-right" @click="login()">登录</button>
          </div>
        </div>
        <div class="col-lg-4 col-md-2 col-sm-1"></div>
      </div>
      <div class="row"></div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
  import Bottom from "components/content/bottom/Bottom";
  import {mapMutations} from "vuex";
  import JSEncrypt from "jsencrypt";

  export default {
    name: "Login",
    data() {
      return {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        autoLogin: false,
      }
    },
    components: {
      Bottom,
    },
    create() {
      this.initData();
    },
    methods: {

      //引入Vuex里的方法
      ...mapMutations(['saveAuthorization']),

      initData() {
        if (localStorage.getItem("username")) {
          this.username = localStorage.getItem("username");
        }
        if (localStorage.getItem("password")) {
          this.password = localStorage.getItem("password");
        }
      },
      login() {
        let _this = this;
        if (this.username === '' || this.password === '') {
          this.$toast({
            message: "用户名或密码不能为空！",
            duration: 2000,
            forbidClick: true
          });
          return;
        }

        let publicKey = '';

        //使用记住密码方式登录，不加密密码，直接登录；
        if (this.password.length > 20) {
          this.doLogin();
        } else {
          //rsa加密输入的密码
          this.$api.rsaService.getPublicKey().then(res => {
            _this.publicKey = res.data.publickey;
            let encrypt = new JSEncrypt();
            encrypt.setPublicKey(_this.publicKey);
            _this.password = encrypt.encrypt(_this.password);
            this.doLogin();
          })
        }
      },

      doLogin(){
        let _this = this;
        this.$api.loginout.loginLocal(_this.username, _this.password).then(res => {

          this.$toast({
            message: "用户登录成功！",
            duration: 2000,
            forbidClick: true
          });

          //将用户token存入Vuex
          let token = res.data.common.token;
          _this.$store.commit('saveAuthorization', token);

          //记住密码
          if (_this.autoLogin) {
            localStorage.setItem("username", _this.username);
            localStorage.setItem("password", _this.password);
          }

          setTimeout(() => {
            this.$router.push("/home")
          }, 1000);
        }).catch(rej => {
        });
      }
    }

  }
</script>

<style scoped>
  .login {
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    padding: 30px;
    margin-bottom: 50px;
  }

  .login_head {
    text-align: center;
  }

  .btn-size {
    width: 80px;
  }

  .btndiv-adj {
    padding-top: 10px;
  }


</style>
