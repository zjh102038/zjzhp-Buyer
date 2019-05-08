<template>
  <div class="shopcar" ref="shopcar">
    <my-header title="购物车">
      <span>
        <i class="icon iconfont icon-gengduo"></i>
      </span>
    </my-header>
    <div class="shopcar-main">
      <div class="shopcar-scroll">
        <div class="shopcar-list" v-for="(v,i) in shopcarList" :key="i">
          <check-box @addcheck="addcheck" :checked="v.checked" :index="i"></check-box>
          <dl>
            <dt>
              <img :src="v.cart_image" alt>
            </dt>
            <dd>
              <h4>
                {{v.goods_name}}
                <span @click="del(v.goods_id)">
                  <i class="icon iconfont icon-shanchu-01"></i>
                </span>
              </h4>
              <p>{{v.goods_name}}x{{v.count}}</p>
              <div class="shopcar-price">
                <span>￥{{v.price}}</span>
                <count-num @reduce="reduce" @add="add" :id="v.goods_id" :index="i" :count="v.count"></count-num>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="shopcar-total">
      <div class="shopcar-checkall">
        <check-box
          @addcheck="addcheck"
          :checked="allChecked"
          :isall="true"
          @addAllCheck="addAllCheck"
        ></check-box>
        <span>全选</span>
      </div>
      <div class="shopcar-total-monry">
        <h4>总计:￥{{money}}.00</h4>
        <span>另需配送费:￥12.00</span>
      </div>
      <div class="shopcar-calculate" @click="toaffirm">去结算</div>
    </div>
  </div>
</template>
<script>
import CheckBox from "../components/checkbox";
import CountNum from "../components/countnum";
import MyHeader from "../components/myheader";
import { getCookie } from "../utils/cookie.js";
export default {
  data() {
    return {
      checked: false,
      shopcarList: [],
      allChecked: false,
      money: 0
    };
  },
  components: {
    CheckBox,
    CountNum,
    MyHeader
  },
  mounted() {
    // this.shopcarList = this.$store.state.shopcarList || [];
    if (!getCookie("token")) {
      return this.$router.push("/login");
    }
    this.getlist();
    // if(this.$store.state.shopcarList.length){
    //   this.shopcarList = this.$store.state.shopcarList;
    // }else{
    //   this.shopcarList = JSON.parse(localStorage.getItem('shopcarList')) || []
    // }
    // this.setchecked();
    // console.log(this.shopcarList)
  },
  methods: {
    getlist() {
      this.$http
        .post("/buyer/cart/list", {
          token: getCookie("token")
        })
        .then(res => {
          if (res.code === 1) {
            this.shopcarList = res.result;
            this.setchecked();
          }
        });
    },
    setchecked() {
      //给数据添加checked属性，默认为false
      this.shopcarList.forEach(item => {
        item.checked = false;
        // item.num = 1;
      });
    },
    del(id) {
      //删除商品
      this.$http
        .post("/buyer/cart/delete", {
          token: getCookie("token"),
          goods_id: id
        })
        .then(res => {
          if (res.code === 1) {
            this.$message.success("删除成功");
            this.getlist()
          }
        });
      // this.shopcarList = this.shopcarList.filter(item=>{
      //   return item.goods_id !== id;
      // })
      // this.$store.commit('addShopcar',this.shopcarList);
      // localStorage.setItem('shopcarList',JSON.stringify(this.shopcarList));
    },
    addcheck(i) {
      this.shopcarList[i].checked = !this.shopcarList[i].checked;
      this.allChecked = this.shopcarList.every(item => item.checked);
      this.$forceUpdate(); //强势更新视图
      this.calculate(); //计算总价
      // this.checked = !this.checked
    },
    addAllCheck() {
      //点击全选
      this.allChecked = !this.allChecked;
      this.shopcarList.forEach(item => {
        item.checked = this.allChecked;
      });
      this.calculate();
    },
    reduce(num, id, i) {
      //点击减
      this.$http
        .post("/buyer/cart/edit", {
          token: getCookie("token"),
          goods_id: id,
          count: num.toString()
        })
        .then(res => {
          if (res.code === 1) {
            this.shopcarList[i].count = num;
            this.calculate();
          }
        });
      this.$forceUpdate();
    },
    add(num, id, i) {
      //点击加
      this.$http
        .post("/buyer/cart/edit", {
          token: getCookie("token"),
          goods_id: id,
          count: num.toString()
        })
        .then(res => {
          if (res.code === 1) {
            this.shopcarList[i].count = num;
            this.calculate();
          }
        });
      this.$forceUpdate();
    },
    calculate() {
      //计算总价
      let money = 0;
      let arr = this.shopcarList.filter(item => {
        return item.checked;
      });
      arr.forEach(item => {
        money += item.count * 1 * item.price;
      });
      this.money = money;
      this.$store.commit("totalPrice", money);
    },
    toaffirm() {
      //去结算
      let flag = this.shopcarList.some(item => item.checked);
      if (!flag) {
        return this.$message.error("请选择商品");
      } else {
        let arr = this.shopcarList.filter(item => item.checked);
        localStorage.setItem("payList", JSON.stringify(arr));
        this.$router.push("/affirm");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.shopcar {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.shopcar-main {
  flex: 1;
  overflow: hidden;
  .shopcar-list {
    display: flex;
    // justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    dl {
      display: flex;
      align-items: center;
      width: 100%;
      margin-top: 10px;
      margin-left: 10px;
      padding-bottom: 10px;
      dt {
        width: 70px;
        height: 70px;
        background: palegreen;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd {
        flex: 1;
        h4 {
          display: flex;
          justify-content: space-between;
        }
        p {
          font-size: 14px;
          color: #a4a4a4;
          margin-top: 10px;
        }
        .shopcar-price {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
.shopcar-total {
  width: 100%;
  height: 60px;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  .shopcar-checkall {
    flex: 2;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 10px;
    span {
      margin-left: 10px;
    }
  }
  .shopcar-total-monry {
    flex: 5;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 15px;
    span {
      font-size: 14px;
      margin-top: 5px;
      color: #999999;
    }
  }
  .shopcar-calculate {
    flex: 3;
    height: 100%;
    background: #f2922f;
    font-size: 20px;
    color: white;
    text-align: center;
    line-height: 60px;
  }
}
</style>


