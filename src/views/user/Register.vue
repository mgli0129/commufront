<template>
  <div id="register">
    <div class="container-fluid ">
      <div class="row"><br><br><br><br></div>
      <div class="row">
        <div class="col-lg-4 col-md-2 col-sm-1"></div>
        <div class="col-lg-4 col-md-8 col-sm-10 col-xs-12 login" ref="loginForm">
          <h3><p class="lead login_head text-center">用户注册</p></h3>
          <div class="form-group">
            <p></p>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="control-label">用户名<span style="color: red;">*</span></label>
            <input type="text" class="form-control" name="username" id="inputEmail3" v-model="username"
                   placeholder="请输入用户名">
          </div>
          <div class="form-group">
            <label for="inputPassword1" class="control-label">密码<span style="color: red;">*</span></label>
            <input type="password" class="form-control" name="password" id="inputPassword1"
                   placeholder="请输入密码" v-model="password" maxlength="20">
          </div>
          <div class="form-group">
            <label for="inputPassword2" class="control-label">重复密码<span style="color: red;">*</span></label>
            <input type="password" class="form-control" name="password" id="inputPassword2"
                   placeholder="请再输入一次密码" v-model="passwordRepo" maxlength="20">
          </div>
          <div class="form-group">
            <label for="inputVCode" class="control-label">验证码<span style="color: red;">*</span></label>
            <input type="text" class="form-control" name="inputVCode" id="inputVCode" v-model="vcode"
                   placeholder="请输入验证码" maxlength="4">
          </div>
          <div class="form-group">
            <valid-code :value.sync="validCode"></valid-code>
          </div>
          <div class="form-group">
            <label for="inputPhone" class="control-label">手机号码<span style="color: red;">*</span></label>
            <input type="text" class="form-control" name="username" id="inputPhone" v-model="phone"
                   placeholder="请输入手机号码" maxlength="11">
          </div>
          <div class="form-group">
            <button class="btn btn-default btn-size  pull-right" @click="register()">注册</button>
          </div>
        </div>
        <div class="col-lg-4 col-md-2 col-sm-1"></div>

      </div>
      <div class="row">
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
  import Bottom from "components/content/bottom/Bottom";
  import ValidCode from "components/common/validcode/ValidCode";
  import {mapMutations} from "vuex";
  import JSEncrypt from "jsencrypt";


  export default {
    name: "Register",
    data() {
      return {
        username: '',
        password: '',
        passwordRepo: '',
        vcode: '',
        validCode: '',
        phone: '',
      }
    },
    components: {
      Bottom,
      ValidCode,
    },
    create() {

    },
    methods: {

      //引入Vuex里的方法
      ...mapMutations(['saveAuthorization']),

      register() {

        let _this = this;
        if (this.username === '') {
          this.$toast({
            message: "用户名不能为空！",
            duration: 2000,
            forbidClick: true
          });
          return;
        }

        if (this.password === '' || this.passwordRepo === '') {
          this.$toast({
            message: "密码和重复密码不能为空！",
            duration: 2000,
            forbidClick: true
          });
          return;
        }
        if (this.password != this.passwordRepo) {
          this.$toast({
            message: "密码和重复密码不一致！",
            duration: 2000,
            forbidClick: true
          });
          this.password = '';
          this.passwordRepo = '';
          return;
        }

        if (this.vcode === '') {
          this.$toast({
            message: "验证码不能为空！",
            duration: 2000,
            forbidClick: true
          });
          return;
        }
        if (this.vcode.toLowerCase() != this.validCode.toLowerCase()) {
          this.$toast({
            message: "验证码不一致！",
            duration: 2000,
            forbidClick: true
          });
          return;
        }

        let publicKey = '';
        //rsa加密输入的密码
        this.$api.rsaService.getPublicKey().then(res => {
          _this.publicKey = res.data.publickey;
          let encrypt = new JSEncrypt();
          encrypt.setPublicKey(_this.publicKey);
          _this.password = encrypt.encrypt(_this.password);
          _this.passwordRepo = encrypt.encrypt(_this.passwordRepo);

          _this.$api.loginout.register(_this.username, _this.password, _this.phone).then(res => {
            this.$toast({
              message: "用户注册成功！",
              duration: 2000,
              forbidClick: true
            });

            //将用户token存入Vuex
            let token = res.data.common.token;
            _this.$store.commit('saveAuthorization', token);

            setTimeout(() => {
              this.$router.push("/home")
            }, 1000);
          });
        })
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
    margin: 10px 0 0 0;
    padding: 0;
  }

  .btn-size {
    width: 80px;
  }

  .btndiv-adj {
    padding-top: 10px;
  }

  .vcode-style {
    margin: 0 10px 0 0;
    padding: 0;
    text-align: end;
  }


</style>
