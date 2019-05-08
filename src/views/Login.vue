
<template>
  <dir class="login">
      <input type="text" v-model="username" placeholder="请输入账号">
      <input type="password" v-model="password" placeholder="请输入密码">
      <div class="verify">
          <input type="text" v-model="verifyText" placeholder="请输入验证码">
          <div ref="verify"></div>
      </div>
      <button @click="login">
          登录
      </button>
      <router-link to="/register">没有账号，立即注册</router-link>
  </dir>
</template>
<script>
import {setCookie} from '../utils/cookie.js'
export default {
  name: 'login',
  components: {
  },
  data(){
    return {
        username:'',
        password:'',
        verifyText:'',
        arr:['美食','运动','逛街'],
        data:[ { 'group': '网络', 'params': [ '4G', '3G', '2G']},{ 'group': '颜色', 'params': [ '红色', '白色', '黑色']} ]
    }
  },
  mounted(){
      this.$http.get('/buyer/user/captcha').then(res=>{
          if(res.code === 1){
              this.$refs.verify.innerHTML = res.data;
          }
      })
  },
  methods:{
      login(){
          if(this.username&&this.password){
               this.loding.open()
             this.$http.post('/buyer/user/login',{
                 username:this.username,
                 password:this.password,
                 captcha:this.verifyText
             }).then(res=>{
                 if(res.code === 1){
                     this.loding.close()
                    setCookie('token',res.token)
                    this.$router.push('/')
                 }
             })
          }else{
              this.warning.open("用户名或账号不能为空")
          }
      }
  },
}
</script>
<style lang="scss" scoped>
.login{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 30px;
    button{
        margin: 15px 0;
        width: 100%;
        height: 40px;
        background: rgb(69, 100, 240);
        border: none;
        font-size: 15px;
        border-radius: 5px;
        outline: none;
        color: #fff;
    }
    input{
        width: 100%;
        height: 40px;
        margin-top: 15px;
        font-size: 15px;
        border-radius: 5px;
        border: none;
        outline: none;
        background: #eee;
        box-sizing: border-box;
        padding-left: 15px;
    }
    .verify{
        display: flex;
        height: 40px;
        margin-top: 15px;
        input{
            width: 70%;
            margin-top: 0;
        }
        div{
            flex: 1;
            height: 40px;
            background: red;
            margin-left: 10px;
            // svg{ 
            //     width: 100%!important;
            //     height: 100%!important;
            // }
        }
    }
}
</style>

