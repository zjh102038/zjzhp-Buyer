<template>
  <div class="myhome">
    <my-header :title="title.store_name">
      <span>
        <i class="icon iconfont icon-gengduo"></i>
      </span>
    </my-header>
    <div class="home-wrap">
      <div class="home-scroll">
        <div class="home-site">
          <i class="icon iconfont icon-dingwei1"></i>
          <p>{{address}}</p>
        </div>
        <div class="store-title">
          <dl>
            <dt></dt>
            <dd>
              <h3>
                {{title.store_name}}
                <!-- <span>(已打样)</span> -->
              </h3>
              <i>包邮</i>
              <span>满49包邮</span>
            </dd>
          </dl>
          <div class="home-collect" @click="enshrine">
            <i :class="isenshrine ? 'icon iconfont icon-shoucang1 icon-active' : 'icon iconfont icon-shoucang1'"></i>
            <p>{{enshrineText}}</p>
          </div>
        </div>
        <div class="home-swiper">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img src="/123.png" alt>
              </div>
              <div class="swiper-slide">
                <img src="/123.png" alt>
              </div>
              <div class="swiper-slide">
                <img src="/123.png" alt>
              </div>
            </div>
          </div>
        </div>
        <div class="home-main">
          <div class="commodity-nav">
            <li
              v-for="(v,i) in commoditynav"
              :key="i"
              :class="defalutIndex === i ? 'active' : null"
              @click="addnav(i)"
            >{{v}}</li>
          </div>
          <div class="commodity-list">
            <dl v-for="(item) in goodslist" @click="(e)=>toDetail(e,item.goods_id)" :key="item.goods_id">
              <dt>
                <img :src="item.cart_image" alt>
              </dt>
              <dd>
                <h4>{{item.goods_name}} | {{item.detail}}</h4>
                <span>规格:500g</span>
                <div class="commodity-btn">
                  <span>￥{{item.price}}</span>
                  <button @click="addshopcar(item)" :disabled="item.shopFalg" :class="{action:item.shopFalg}">+</button>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Swiper from "swiper";
import MyHeader from "../components/myheader";
import {getCookie} from '../utils/cookie.js';
let arr = [];
export default {
  data() {
    return {
      commoditynav: ["热卖商品", "店家推荐", "跳楼促销"],
      defalutIndex: 0,
      goodslist: [],
      shoplist: [],
      address: "",
      isenshrine:false,
      enshrineText:'关注',
      title:{}
    };
  },
  components: {
    MyHeader
  },
  methods: {
    toDetail(e,goods_id){
      if(e.target.tagName==='BUTTON'){
        return 
      }
      this.$router.push({path: '/detail', query:{goods_id}})
    },
    addnav(i) {
      //tab切换
      this.defalutIndex = i;
      this.getData(i);
    },
    enshrine(){
      this.isenshrine = !this.isenshrine;
      if(this.isenshrine){
        this.enshrineText = '已关注'
        // this.$http.post('/buyer/user/store.collect.add',{
        //   token:getCookie('token'),
        //   store_id:
        // })
      }else{
        this.enshrineText = '关注'
      }
    },
    addshopcar(item) {
      if(!getCookie('token')){
        return this.$router.push('/login');
      }
      this.$http.post('/buyer/cart/add',{
        token:getCookie('token'),
        goods_id:item.goods_id,
        price:item.price,
        count:1
      }).then(res=>{
        if(res.code === 1){
          this.$message.success("添加成功");
        }else{
          this.$message.warning("此商品已在购物车");
        }
      }) 
      // let list = this.shoplist.find(v => {
      //   return v.goods_id === item.goods_id;
      // });
      // if (list) {
      //   return this.$message.warning("此商品已在购物车");
      // } else {
      //   this.shoplist.push(item);
      //   this.$message.success("添加成功");
      // }
      // this.$store.commit("addShopcar", this.shoplist);
      // localStorage.setItem("shopcarList", JSON.stringify(this.shoplist));
    },
    handleAdd(id) {
      let token =
        "eyJhbGciOiJIUzI1NiJ9.MDAwMDAwMDAwMDAx.FBvFzap1yehA-MpYHai4gXT8GZ_ly-I-OBThILg_y4U";
      this.$http
        .post("/buyer/user/store.collect.add", {
          token,
          store_id: id
        })
        .then(res => {
          console.log(res);
        });
    },
    // 获取商品列表
    getData(type) {
      this.$http
        .get(
          `/buyer/homelist?type=${type}&store_id=${this.$route.params.id}`,
        )
        .then(res => {
          if (res.code === 1) {
            this.goodslist = res.result;
          }
        });
    }
  },
  mounted() {
    console.log(this.$route.params.id)
    new BScroll(".home-wrap", {
      click: true
    });
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: true
    });
    this.getData(0);
    this.shoplist = JSON.parse(localStorage.getItem("shopcarList")) || [];

    //地理定位
    this.$http.get("/location?lat=39.9&Ing=116.30").then(res => {
      if (res.code === 1) {
        this.address =
          res.result.ad_info.province +
          "-" +
          res.result.ad_info.city +
          "-" +
          res.result.ad_info.district;
      }
    });
    //店铺名字
    this.$http.get('/buyer/storelist').then(res=>{
      console.log(res)
      if(res.code===1){
          this.title=res.result.find(item=>item.store_id===this.$route.params.id)
      }
    })
  }
};
</script>
<style lang="scss" scoped>
@import url("../../node_modules/swiper/dist/css/swiper.css");
.myhome {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .home-wrap {
    flex: 1;
    overflow: hidden;
  }
  .home-site {
    height: 44px;
    background: #333333;
    padding: 0 10px;
    display: flex;
    align-items: center;
    color: white;
    i.icon {
      font-size: 20px;
      margin-right: 10px;
    }
  }
  .store-title {
    height: 110px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    dl {
      display: flex;
      dt {
        width: 70px;
        height: 70px;
        background: paleturquoise;
        margin-right: 10px;
      }
      dd {
        h3 {
          font-size: 17px;
          margin-bottom: 10px;
          span {
            color: orange;
          }
        }
        i {
          display: inline-block;
          font-style: normal;
          font-size: 14px;
          border: 1px solid #76e0d8;
          padding: 2px 5px;
          color: #76e0d8;
          margin-right: 10px;
        }
        span {
          color: #999999;
        }
      }
    }
    .home-collect {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i.icon {
        font-size: 30px;
        color: #ccc;
      }
      i.icon-active{
        color: orange;
      }
      p {
        color: #999;
        font-size: 14px;
      }
    }
  }
}
.home-swiper {
  height: 150px;
  img {
    width: 100%;
    height: 100%;
  }
}
.home-main {
  flex: 1;
  overflow: hidden;
  .commodity-nav {
    height: 44px;
    display: flex;
    border-bottom: 1px solid #ccc;
    li {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        color: orange;
        border-bottom: 1px solid orange;
      }
    }
  }
  .commodity-list {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    dl {
      display: flex;
      width: 100%;
      margin-top: 10px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      dt {
        width: 100px;
        height: 100px;
        background: red;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd {
        flex: 1;
        h4 {
          line-height: 25px;
          margin-bottom: 5px;
        }
        span {
          font-size: 15px;
        }
        .commodity-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          span {
            font-size: 16px;
          }
          button {
            width: 30px;
            height: 30px;
            background: #5adad0;
            border: 0;
            outline: none;
            font-size: 17px;
            color: white;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
.action{
  background: #ccc !important;
}
</style>


