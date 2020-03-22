import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home');
const Login = () => import('views/user/Login');
const Register = () => import('views/user/Register');
const Logout = () => import('views/user/Logout');
const Detail = () => import('views/questiondetail/Detail');
const Publish = () => import('views/publishquestion/Publish');
const Profile = () => import('views/profile/Profile');
const NewReply = () => import('views/newreply/NewReply');
const MyQuestions = () => import('views/myquestions/MyQuestions');
const HotTopics = () => import('views/hottopics/HotTopics');
const GithubOauth = () => import('views/user/GithubOauth');


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/logout',
    name: 'logout',
    meta:{
      requireAuth: true,   // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Logout
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/publish',
    name: 'publish',
    meta:{
      requireAuth: true,   // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Publish
  },
  {
    path: '/profile',
    name: 'profile',
    meta:{
      requireAuth: true,   // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Profile
  },
  {
    path: '/newreply',
    name: 'newreply',
    meta:{
      requireAuth: true,   // 添加该字段，表示进入这个路由是需要登录的
    },
    component: NewReply
  },
  {
    path: '/myquestions',
    name: 'myquestions',
    meta:{
      requireAuth: true,   // 添加该字段，表示进入这个路由是需要登录的
    },
    component: MyQuestions
  },
  {
    path: '/hottopics',
    name: 'hottopics',
    component: HotTopics
  },
  {
    path: '/callback',
    name: 'callback',
    component: GithubOauth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
