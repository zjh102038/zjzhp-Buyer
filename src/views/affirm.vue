<template>
  <div class="affirm">
    <my-header title="确认订单">
      <span>
        <i class="icon iconfont icon-gengduo"></i>
      </span>
    </my-header>
    <div class="affirm-main">
      <div class="affirm-scroll">
        <div class="affirm-site">
          <i class="icon iconfont icon-dingwei1"></i>
          <div>
            <h3>胡可可 15713573088</h3>
            <span>北京-北京市-海淀区世纪经贸大厦B座</span>
          </div>
        </div>
        <div class="affirm-hr"></div>
        <div class="affirm-list">
          <dl v-for="(v,i) in list" :key="i">
            <dt>
              <img :src="v.cart_image" alt>
            </dt>
            <dd>
              <h4>{{v.goods_name}}</h4>
              <span>颜色：白色 尺码：M</span>
              <div class="affirm-price">
                <span>￥{{v.price}}.00</span>
                <span>x{{v.num}}</span>
              </div>
            </dd>
          </dl>
        </div>
        <div class="affirm-remark">
          <p>买家留言</p>
          <input type="text" placeholder="选填项">
        </div>
        <div class="affirm-invoice">
          <p>是否开发票</p>
          <el-switch v-model="isinvoice" active-color="#5ADAD0" inactive-color="#ccc"></el-switch>
        </div>
        <div v-if='isinvoice'>
          <div class="affirm-remark">
            <p>公司名称</p>
            <input type="text" placeholder="请填写">
          </div>
          <div class="affirm-remark">
            <p>税号</p>
            <input type="text" placeholder="请填写">
          </div>
        </div>
        <ul class="affirm-money">
          <li>
            <span>商品总价</span>
            <span>￥{{money}}.00</span>
          </li>
          <li>
            <span>配送费</span>
            <span>￥12.00</span>
          </li>
          <li>
            <span>需付款</span>
            <span>￥{{paymoney}}.00</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="affirm-pay" @click="pay">支付</div>
  </div>
</template>
<script>
import MyHeader from "../components/myheader";
import BScroll from "better-scroll";
import { getCookie } from '../utils/cookie';
export default {
  data() {
    return {
      list: [],
      money: 0,
      paymoney: 0,
      shopcarList: [],
      isinvoice: false
    };
  },
  components: {
    MyHeader
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem("payList")) || [];
    // this.shopcarList = JSON.parse(localStorage.getItem("shopcarList")) || [];
    this.money = this.$store.state.money;
    this.paymoney = this.money + 12;
    const scroll = new BScroll(".affirm-main", {
      click: true,
      probeType: 2,
      pullUpLoad: {
        threshold: -100
      }
    });
    // scroll.on('pullingUp',()=>{  //下拉加载
    //   this.num+=3;
    //   if(this.num >= this.list.length){
    //     this.num = this.list.length;
    //   }
    //   this.addlist(this.num)
    //   console.log('加载ajax数据');
    //   scroll.finishPullUp();
    // })
  },
  methods: {
    pay() {
      this.list.forEach((item, i) => {
        this.$http.post('/buyer/cart/delete',{
          token:getCookie('token'),
          goods_id:item.goods_id
        }).then(res=>{
          if(res.code === 1){
            localStorage.setItem("payList", []);
            this.$router.push("/paysuccess");
          }
        })
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.affirm {
  flex: 1;
  display: flex;
  flex-direction: column;
  .affirm-site {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    i.icon {
      font-size: 25px;
      margin-right: 10px;
      color: #999999;
    }
    div {
      h3 {
        font-weight: normal;
      }
      span {
        font-size: 15px;
        color: #999999;
      }
    }
  }
  .affirm-hr {
    width: 100%;
    height: 5px;
    background: url("../assets/2.png");
    background-size: cover;
  }
  .affirm-main {
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background: #f8f8f8;
    .affirm-list {
      dl {
        width: 100%;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        display: flex;
        dt {
          width: 70px;
          height: 70px;
          background: paleturquoise;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        dd {
          flex: 1;
          h4 {
            margin-bottom: 5px;
          }
          span {
            font-size: 15px;
            color: #999;
          }
          .affirm-price {
            display: flex;
            margin-top: 5px;
            justify-content: space-between;
            span {
              color: black;
              font-size: 17px;
            }
          }
        }
      }
    }
    .affirm-remark {
      height: 40px;
      margin: 10px 0;
      background: white;
      display: flex;
      padding: 0 10px;
      align-items: center;
      input {
        width: 70%;
        height: 100%;
        border: 0;
        outline: none;
        margin-left: 10px;
        font-size: 17px;
        line-height: 40px;
      }
    }
    .affirm-invoice {
      width: 100%;
      height: 40px;
      background: white;
      display: flex;
      padding: 0 10px;
      align-items: center;
      justify-content: space-between;
    }
  }
  .affirm-pay {
    height: 44px;
    background: #f2922f;
    text-align: center;
    line-height: 44px;
    color: white;
    font-size: 17px;
  }
}
.affirm-money {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100px;
  li {
    flex: 1;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

