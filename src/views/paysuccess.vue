<template>
  <div class="paysuccess">
    <my-header title='支付成功'>
      <span>
        <i class="icon iconfont icon-gengduo"></i>
      </span>
    </my-header>
    <div class="paysuccess-main">
      <div class="success">
        <i class="icon iconfont icon-dui"></i>
      </div>
      <span>支付完成</span>
    </div>
    <div class="paysuccess-btn">
      <button class="paysuccess-look" @click="watchOrder">查看订单</button>
      <button class="paysuccess-gohome" @click="backhome">返回首页</button>
    </div>
  </div>
</template>
<script>
import MyHeader from '../components/myheader'
export default {
  components:{
    MyHeader
  },
  methods:{
    backhome(){
      this.$router.push('/home/storelist')
    },
    watchOrder(){
      this.$router.push('/myOrder')
    }
  }
}
</script>
<style lang="scss" scoped>
.paysuccess{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.paysuccess-main{
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .success{
    width: 80px;
    height: 80px;
    background: #5ADAD0;
    border-radius: 50%;
    text-align: center;
    line-height: 80px;
    margin-bottom: 15px;
    i.icon{
      font-size: 30px;
      color: white;
    }
  }
}
.paysuccess-btn{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  button{
    width: 130px;
    height: 100%;
    margin: 0 15px;
    border: 0;
    outline: none;
    font-size: 17px;
    color: white;
    border-radius: 5px;
  }
  .paysuccess-look{
    background: #DC852B
  }
  .paysuccess-gohome{
    background:#5ADAD0;
  }
}
</style>


