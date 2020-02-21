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
              <input type="text" class="form-control" name="search" placeholder="搜索" v-model="searchValue" >
            </div>
            <button @click="goSearch(searchValue)" class="btn btn-default">提交</button>
          </div>
          <ul class="nav navbar-nav navbar-right ">
            <li v-if="userIsNotNull()"><a href="/publish">提问</a></li>
            <li role="presentation">
              <a href="/question/reply" v-if="userIsNotNull()">
                <span class="glyphicon glyphicon-bell notify-bell-icon"></span>
                <span>通知 </span>
                <span class="badge notify-badge"
                      :class="[common.countUnread  == 0 ? 'badge':'badge notify-badge']">{{common.countUnread}}</span>
              </a>
            </li>
            <li v-if="!userIsNotNull()">
              <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                 aria-expanded="false">
                <span>登录</span>
                <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="https://github.com/login/oauth/authorize?client_id=1063111966ccae7aa3e8&
                    redirect_uri=http://localhost:8887/callback&scope=user
                    &state=1">GitHub用户登录</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="/login">本地用户登录</a></li>
              </ul>

            </li>
            <li class="dropdown" v-else>
              <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                 aria-expanded="false">
                <span>{{common.user.name}}</span>
                <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="/question/publish">我的问题</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#">个人资料</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="/logout">退出登录</a></li>
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
    methods: {
      goSearch(s) {
        return this.$emit("toSearch", s);
      },
      userIsNotNull() {
        return this.common.user != null ? true : false;
      }
    }
  }
</script>

<style scoped>

</style>
