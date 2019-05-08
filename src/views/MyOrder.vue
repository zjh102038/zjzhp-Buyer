<template>
  <div class="box">
    <myheader :title="states">
      <span>
        <i class="icon iconfont icon-share"></i>
      </span>
    </myheader>
    <nav>
      <ul>
        <li
          v-for="(item,index) in navList"
          :key="item.id"
          @click="handleTab(index,item.cont)"
          :class="ind===index?'border':''"
        >
          <el-badge class="item" :value="item.value" type="warning">{{item.cont}}</el-badge>
        </li>
      </ul>
    </nav>
    <aside>
      <div>
        <i class="icon iconfont icon-fangdajing"></i>
        <input type="text" name id placeholder="搜索订单">
      </div>
    </aside>
    <main>
      <div ref="container">
        <section v-for="item in renderList" :key="item.id">
          <p class="count">
            <span>订单编号：{{item.orderCount}}</span>
            <i class="icon iconfont icon-chevron-thin-right"></i>
          </p>
          <dl>
            <dt>
              <img :src="item.orderLogo" alt>
            </dt>
            <dd>
              <h6>
                <span>{{item.orderTitle}}</span>
                <span>x{{item.num}}</span>
              </h6>
              <p>下单时间：{{item.time}}</p>
              <p>
                订单状态：
                <span :class="item.state=='已完成'?'':'state'">{{item.state}}</span>
              </p>
            </dd>
          </dl>
          <p class="btn">
            <button v-if="item.state==='待付款'">支付</button>
            <button v-if="item.state==='待发货'">联系客服</button>
            <button v-if="item.state==='待收货'">确认收货</button>
            <button v-if="item.state==='待收货'" style="color:black;border:1px solid #ddd">查看物流</button>
            <button v-if="item.state==='已完成'">申请退款</button>
          </p>
        </section>
      </div>
    </main>
  </div>
</template>
<script>
import myheader from "@/components/myheader";
import Vue from "vue";
export default {
  name: "myOrder",
  data: function() {
    return {
      states: "全部订单",
      ind: 0,
      navList: [
        {
          id: 0,
          cont: "全部",
          value: 2
        },
        {
          id: 1,
          cont: "待付款",
          value: 2
        },
        {
          id: 2,
          cont: "待发货"
        },
        {
          id: 3,
          cont: "待收货"
        },
        {
          id: 4,
          cont: "已完成"
        },
        {
          id: 5,
          cont: "退货售后"
        }
      ],
      orderList: [
        {
          id: 0,
          orderCount: "ZJ45446651264",
          orderLogo: "/001.jpg",
          orderTitle: "惊天桶装水套餐",
          time: "2017-02-13 21:24:30",
          state: "待付款",
          num: 1
        },
        {
          id: 1,
          orderCount: "ZJ45446651264",
          orderLogo: "/001.jpg",
          orderTitle: "惊天桶装水套餐",
          time: "2017-02-13 21:24:30",
          state: "待发货",
          num: 1
        },
        {
          id: 2,
          orderCount: "ZJ45446651264",
          orderLogo: "/001.jpg",
          orderTitle: "惊天桶装水套餐",
          time: "2017-02-13 21:24:30",
          state: "待收货",
          num: 1
        },
        {
          id: 3,
          orderCount: "ZJ45446651264",
          orderLogo: "/001.jpg",
          orderTitle: "惊天桶装水套餐",
          time: "2017-02-13 21:24:30",
          state: "已完成",
          num: 1
        },
        {
          id: 4,
          orderCount: "ZJ45446651264",
          orderLogo: "/001.jpg",
          orderTitle: "惊天桶装水套餐",
          time: "2017-02-13 21:24:30",
          state: "已完成",
          num: 1
        },
        {
          id: 5,
          orderCount: "ZJ45446651264",
          orderLogo: "/001.jpg",
          orderTitle: "惊天桶装水套餐",
          time: "2017-02-13 21:24:30",
          state: "退货",
          num: 1
        }
      ],
      renderList: []
    };
  },
  components: {
    myheader
  },
  methods: {
    handleTab(i, cont) {
      this.ind = i;
      this.tabFun(cont);
    },
    tabFun(cont) {
      this.renderList = this.orderList.filter(item => {
        switch (cont) {
          case "全部":
            return item;
          case "退货售后":
            return item.state == "退货";
          default:
            return item.state == cont;
        }
      });
    }
  },
  mounted() {
    this.renderList = this.orderList;
    let BScroll = this.BScroll;
    Vue.nextTick(() => {
      new BScroll("main", {
        click: true
      });
    });
    if (this.$route.params.cont) {
      this.tabFun(this.$route.params.cont);
      this.ind = this.$route.params.i
    } else {
      this.renderList = this.orderList;
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  nav {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #eee;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      li {
        height: 50px;
        line-height: 50px;
      }
    }
  }
  aside {
    width: 100%;
    height: 55px;
    border-bottom: 1px solid #eee;
    padding: 10px 15px;
    div {
      width: 100%;
      height: 100%;
      background: #eee;
      border-radius: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 12px;
      input {
        border: none;
        outline: none;
        background: #eee;
        padding-left: 12px;
        font-size: 14px;
        color: #999;
      }
    }
  }
  main {
    width: 100%;
    flex: 1;
    background: #f8f8f8;
    overflow: hidden;
    > div {
      width: 100%;
      section {
        width: 100%;
        height: 188px;
        margin-bottom: 10px;
        background: white;
        > p {
          width: 100%;
          height: 44px;
          line-height: 44px;
          padding: 0 15px;
        }
        .count {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
        }
        .btn {
          line-height: 44px;
          button {
            width: 80px;
            height: 27px;
            border: 1px solid orange;
            float: right;
            background: white;
            border-radius: 20px;
            outline: none;
            margin-top: 9px;
            color: orange;
            margin-left: 10px;
          }
        }
        dl {
          width: 100%;
          height: 100px;
          background: #f8f8f8;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          dt {
            padding: 0 15px;
            img {
              width: 75px;
              height: 75px;
            }
          }
          dd {
            line-height: 28px;
            padding: 15px 0;
            h6 {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 14px;
            }
            > p {
              font-size: 14px;
              &:first-child {
                color: #999;
              }
            }
          }
        }
      }
    }
  }
  .state {
    color: orange;
  }
  .border {
    border-bottom: 2px solid orange;
    color: orange;
  }
}
</style>
