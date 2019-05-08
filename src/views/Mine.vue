<template>
  <div class="box">
    <myheader title="我的">
      <span>
        <i class="icon iconfont icon-share"></i>
      </span>
    </myheader>
    <main>
      <section class="install">
        <dl>
          <dt>
            <img src="/logo.png" alt>
          </dt>
          <dd>珈珈豪</dd>
        </dl>
        <router-link to="/setup" tag="p">
          <i class="icon iconfont icon-set"></i>
        </router-link>
      </section>
      <section class="myOrder">
        <router-link tag="div" to="/myOrder" class="myorders">
          <p>我的订单</p>
          <p>
            <i class="icon iconfont icon-youjiantou-01"></i>
          </p>
        </router-link>
        <div class="orderlist">
          <dl @click="toStoreList('待付款',1)">
            <dt>
              <el-badge :value="2" class="item" type="warning">
                <span class="icon iconfont">&#xe747;</span>
              </el-badge>
            </dt>
            <dd>待付款</dd>
          </dl>
          <dl @click="toStoreList('待发货',2)">
            <dt>
              <span class="icon iconfont">&#xe622;</span>
            </dt>
            <dd>待发货</dd>
          </dl>
          <dl  @click="toStoreList('待收货',3)">
            <dt>
              <span class="icon iconfont">&#xe606;</span>
            </dt>
            <dd>待收货</dd>
          </dl>
          <dl @click="toStoreList('已完成',4)">
            <dt>
              <span class="icon iconfont">&#xe646;</span>
            </dt>
            <dd>已完成</dd>
          </dl>
          <dl @click="toStoreList('退货售后',5)">
            <dt>
              <span class="icon iconfont">&#xe69c;</span>
            </dt>
            <dd>退货/售后</dd>
          </dl>
        </div>
      </section>
      <section class="manage">
        <ul>
          <li>
            <span>地址管理</span>
            <span>
              <i class="icon iconfont icon-chevron-thin-right"></i>
            </span>
          </li>
          <li>
            <span>我的快递</span>
            <span>
              <i class="icon iconfont icon-chevron-thin-right"></i>
            </span>
          </li>
          <router-link to="/mystorelist" tag="li">
            <span>收藏店铺</span>
            <span>
              <i class="icon iconfont icon-chevron-thin-right"></i>
            </span>
          </router-link>
        </ul>
      </section>
      <section class="service">
        <ul>
          <li>
            <span>客服电话</span>
            <span>400-165-2304</span>
          </li>
          <li>
            <span>在线客服</span>
            <span>
              <i class="icon iconfont icon-kefu"></i>
            </span>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script>
import myheader from "../components/myheader";
import "../font/font_xm96kflyob/iconfont.css";
export default {
  name: "mine",
  components: {
    myheader
  },
  methods:{
    toStoreList(cont,i){
      this.$router.push({
        name:'myOrder',
        params:{
          cont,
          i
        }
      })
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
    background: #eee;
    section {
      width: 100%;
      margin-bottom: 10px;
    }
    .install {
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: white;
      dl {
        display: flex;
        justify-content: space-between;
        align-items: center;

        dt {
          img {
            width: 40px;
            height: 40px;
          }
        }
        dd {
          margin-left: 15px;
          font-size: 14px;
        }
      }
      p {
        font-size: 18px;
      }
    }
    .myOrder {
      width: 100%;
      height: 132px;
      background: white;
      .myorders {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
      }
      .orderlist {
        width: 100%;
        height: 82px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        dl {
          dt {
            span {
              font-size: 30px;
            }
          }
          dd {
            font-size: 12px;
          }
        }
      }
    }
    .manage {
      width: 100%;
      height: 150px;
      background: white;
      ul {
        width: 100%;
        height: 100%;
        li {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
          border-bottom: 1px solid #eee;
        }
      }
    }
    .service {
      width: 100%;
      height: 100px;
      background: white;
      ul {
        width: 100%;
        height: 100%;
        li {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
}
</style>
