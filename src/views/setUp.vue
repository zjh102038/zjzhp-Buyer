<template>
  <div class="box">
    <myheader title="设置">
      <span>
        <i class="icon iconfont icon-share"></i>
      </span>
    </myheader>
    <main>
      <section class="logo">
        <img src="/logo.png" alt>
      </section>
      <section class="msg">
        <ul>
          <li>
            <span>
              <i class="icon iconfont icon-yonghu"></i>
              孟梅梅
            </span>
            <span></span>
          </li>
          <li>
            <span>语音开关</span>
            <span>
              <el-switch v-model="value2" active-color="#5ADAD0" inactive-color="#ccc"></el-switch>
            </span>
          </li>
        </ul>
      </section>
      <section class="btn">
        <button @click="returnBack">确认修改</button>
      </section>
    </main>
  </div>
</template>
<script>
import myheader from "../components/myheader";
export default {
  name: "setUp",
  components: {
    myheader
  },
  data() {
    return {
      value1: true,
      value2: true
    };
  },
  methods:{
    returnBack(){
      this.$router.push('/home/mine')
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  main {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .logo {
      width: 100%;
      height: 160px;
      img {
        display: block;
        margin: 20px auto;
        width: 90px;
        height: 90px;
      }
    }
    .msg {
      width: 100%;
      height: 110px;
      ul {
        width: 100%;
        height: 100%;
        li {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #eee;
          align-items: center;
          padding: 0 15px;
          &:first-child {
            width: 100%;
            height: 60px;
            
          }
        }
      }
    }
    .btn {
      width: 100%;
      flex: 1;
      button{
          width: 345px;
          height: 44px;
          background: #F2922F;
          color:white;
          border: none;
          font-size: 16px;
          margin: 50px auto;
          display: block;
          border-radius: 5px;
          outline: none;
      }
    }
  }
}
</style>

