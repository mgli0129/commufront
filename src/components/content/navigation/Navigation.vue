<template>
  <div id="navigation">
    <nav class="navbar navbar-default center-block">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">MGCommunity</span>
          </button>
          <a class="navbar-brand" href="/">MGCommunity</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <div class="navbar-form navbar-left ">
            <div class="form-group">
              <input type="text" class="form-control" name="search" placeholder="搜索" v-model="searchValue">
            </div>
            <button @click="goSearch(searchValue)" class="btn btn-default">提交</button>
          </div>
          <ul class="nav navbar-nav navbar-right ">
            <li v-if="userIsNotNull()">
              <a @click="goToPublish()">提问</a>
            </li>
            <li role="presentation">
              <a @click="goToReply()" v-if="userIsNotNull()">
                <span class="glyphicon glyphicon-bell notify-bell-icon"></span>
                <span>通知</span>
                <span class="badge notify-badge"
                      :class="[common.countUnread  === 0 ? 'badge':'badge notify-badge']">{{common.countUnread}}
                </span>
              </a>
            </li>
            <li v-if="!userIsNotNull()">
              <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                 aria-expanded="false">
                <span>登录</span>
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a @click="githubLogin()">GitHub用户登录
                  </a>
                </li>
                <li role="separator" class="divider"></li>
                <!--<li><a link="/login">本地用户登录</a></li>-->
                <li>
                  <router-link to="/login">本地用户登录</router-link>
                </li>
                <li role="separator" class="divider"></li>
                <!--<li><a link="/login">本地用户登录</a></li>-->
                <li>
                  <router-link to="/register">注册用户</router-link>
                </li>
              </ul>

            </li>
            <li class="dropdown" v-else>
              <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                 aria-expanded="false">
                <span>{{common.userName}}</span>
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a @click="goToMyQuestions()">我的问题</a>
                </li>
                <li role="separator" class="divider"></li>
                <li>
                  <a href="#">个人资料</a>
                </li>
                <li role="separator" class="divider"></li>
                <li>
                  <a @click="logout()">退出登录</a>
                </li>
                <!--<li><a link="/logout">退出登录</a></li>-->
                <!--<li><router-link to="/logout">退出登录</router-link></li>-->
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "navigation",
    data() {
      return {
        searchValue: this.search
      }
    },
    props: {
      common: {
        type: Object,
        default: {}
      },
      search: ''
    },
    watch: {
      common: function (newValue) {
        this.common = newValue;
      },
      search: function (newValue) {
        this.search = newValue;
      }
    },
    methods: {
      goSearch(s) {
        return this.$emit("toSearch", s);
      },
      goToPublish() {
        if (this.$route.name === 'publish') {
          return;
        }
        this.$router.push({
          path: '/publish',
          query: {
            params: {
              common: this.common
            }
          }
        })
      },
      goToMyQuestions() {
        if (this.$route.name === 'myquestions') {
          return;
        }
        this.$router.push({
          path: '/myquestions',
          query: {
            common: this.common
          }
        })
      },
      goToReply() {
        if (this.$route.name === 'newreply') {
          return;
        }
        this.$router.push({
          path: '/newreply',
          query: {
            common: this.common
          }
        })
      },
      userIsNotNull() {
        return this.common
      },
      githubLogin: function () {
        //github账户oAuth调用地址
        const githubUrl = "https://github.com/login/oauth/authorize?client_id=1063111966ccae7aa3e8&redirect_uri=http://localhost:8887/callback&scope=user&state=1";
        //在新窗口调起github链接
        let gitWin = window.open(githubUrl);
        //最大计数器，60秒后跳出停止登录
        let maxTime = 1;
        //定时器：每秒检查一次
        let val = setInterval(() => {
          //查看后台是否已经获取token
          // console.log("等待生成cookie...[" + maxTime + "s] token=[" + this.$cookies.get("token") + "]");
          if (this.$cookies.get("token") != null) {
            // console.log("新token=[" + this.$cookies.get("token") + "]");
            //当前页面为首页，通知父组件重新load数据
            if (this.$route.name === 'home') {
              this.$emit("forceReflesh");
            } else {
              //当前页面不为首页，路由至首页，并刷新
              this.common = null;
              this.$router.push("/home");
            }
            //关闭github回调的新窗口
            gitWin.close();
            //退出定时器
            clearInterval(val);
          }
          //计算器超过60秒，自动退出定时器，以免死循环
          if (maxTime > 60) {
            clearInterval(val);
          }
          //计算器自增
          maxTime++;
        }, 1000)
      },
      logout() {
        this.$api.loginout.logout().then(res => {
          this.$toast({
            message: "用户已退出登录！",
            duration: 2000,
            forbidClick: true
          });
          setTimeout(() => {
            //删除cookie里的token
            if (this.$cookies.get("token") != null) {
              this.$cookies.remove("token");
            }
            if (this.$route.name === 'home') {
              this.$emit("logout");
            } else {
              // this.common = null;
              this.$router.push("/home");
            }
          }, 1000);

        });
      }
    }
  }
</script>

<style scoped>

</style>
