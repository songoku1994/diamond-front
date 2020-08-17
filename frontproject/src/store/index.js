import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookies'
import router from "../router";
Vue.use(Vuex)
Vue.use(Cookie)
const store = new Vuex.Store({
  state: {
    // 从cookie内获取数据
    name: Cookie.get('name'),
    token: Cookie.get('token'),
    uid:Cookie.get('uid'),
  },
  // 存储各种方法，所有方法，第一个参数必须为state
  mutations: {
    // 登入后将值写入cookie
    login: function (state, response) {
      // 修改这两个变量的值
      state.name = response.data.name
      state.token = response.data.token
      state.uid = response.data.uid

      // 往cookie中写数据
      Cookie.set('name', response.data.name,{expires:7})
      Cookie.set('token', response.data.token,{expires:7})
      Cookie.set('uid', response.data.uid,{expires:7})

    },
    // 登出后将cookie清空
    logout: function (state) {
      // 修改这两个变量的值
      state.name = ""
      state.token = ""
      state.uid = ""
      // 往cookie中写数据
      Cookie.set('name', "")
      Cookie.set('token', "")
      Cookie.set('uid', "")
      router.push("/login")
    },
    changename:function (state,response){
      state.name = response.data.newname
      Cookie.set('name', response.data.newname,{expires:7})
    }
  },
  actions:{

  },
  getters:{

  },
  modules:{

  }
})

export default  store
