<template>
  <div class="detail">
     <my-header title="商品详情">
      <span>
        <i class="icon iconfont icon-gengduo"></i>
      </span>
      </my-header>
      <main>
        <div>
          <div class="swiper">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="/1.png" alt=""></div>
                <div class="swiper-slide"><img src="/123.png" alt=""></div>
                <div class="swiper-slide"><img src="/2.png" alt=""></div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
            <div class="mark">
              <div class="icon_box">
                  <span class="icon iconfont">&#xe749;</span>
              </div>
               <div style="color:#f49b3f;font-size:18px">
                  店铺已打烊
               </div>
               <div>营业时间：周一至周五</div>
               <div>08:00-21:00</div>
            </div>
          </div>
          <div class="brief-introduction">
            <div class="price">
               ￥{{data.price}}
            </div>
            <div class="introduction">
              {{data.goods_name}}
            </div>
          </div>
          <div class="specification" @click="showSpecificationsChoice">
            <span>选择规格</span>
            <span></span>
            <i class="icon iconfont icon-angle-right"></i>
          </div>

          <div class="break-line">
              <img src="/detail.jpg" alt="">
          </div>
        </div>
          
      </main>
      <SpecificationsChoice :data="data" :weight="weight"></SpecificationsChoice>
      <footer>
        <div class="shop_icon"><span class="icon iconfont">&#xe501;</span></div>
        <div class="btn">
          <div @click="addshop">加入购物车</div>
          <div>立即购买</div>
        </div>
      </footer>
  </div>
</template>
<script>
import Swiper from 'swiper'
import Header from '@/components/myheader.vue'
import SpecificationsChoice from '@/components/SpecificationsChoice.vue'
export default {
  components:{
    SpecificationsChoice,
    "my-header":Header
  },
  data(){
    return {
      weight:['100G','200G','300G','1000G'],
      addFlag:false,
      data:{}
    }
  },
  created(){
    this.$http.get(`/buyer/detail?goods_id=${this.$route.query.goods_id}`).then(res=>{
      this.data=res.result
      this.weight=[res.result.goods_name]
    })
  },
   mounted(){
     new this.BScroll('main',{
       click:true
     })
     new Swiper('.swiper-container',{
       loop:true,
       autoplay:{
         disableOnInteraction:false
       },
       pagination:{
          el:".swiper-pagination",
          clickable:true
       }
     })
   },
   methods:{
     addshop(addFlag){
        this.$bus.$emit('add')
     },
     showSpecificationsChoice(){
       this.$children[1].flag=true
     }
   }
}
</script>
<style lang="scss" scoped>
@import url('../font/font_h6ksq3n2dqd/iconfont.css');
.detail{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  main{
    flex: 1;
    background: #eee;
    overflow: hidden;
    &>div{
      width: 100%;
      display: flex;
      flex-direction: column;
      .break-line{
        width: 100%;
        color: #fff;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .specification{
        width: 100%;
        height: 50px;
        background: #fff;
        box-sizing: border-box;
        padding: 15px;
        margin: 10px 0;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
      }
      .brief-introduction{
        width: 100%;
        height: 90px;
        background: #fff;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 5px 10px;
        .introduction{
          flex: 1;

        }
        div.price{
          width: 100%;
          height: 35%;
          font-size: 20px;
          color: #f2922f;
        }

      }
      .swiper{
        width: 100%;
        height: 300px;
        position: relative;
        .swiper-container{
          width: 100%;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .mark{
          width: 100%;
          height:135px;
          position: absolute;
          bottom: 0;
          left: 0;
          background: rgba(0,0,0,.6);
          z-index: 999;
          div{
            text-align: center;
            .icon{
              font-size: 30px;
              color: #eee;
            }
          }
          div{
            color: #fff;
            font-size: 14px;
            padding: 2px 0;
          }
          .icon_box{
             padding: 10px 0;
          }
        }

      }
      
    }
  }
  footer{
    width: 100%;
    height: 50px;
    display: flex;
    .btn{
      width: 65%;
      height: 100%;
      display: flex;
         div{
           flex:1;
           text-align: center;
           line-height: 50px;
           font-size: 16px;
           color: #fff;
         }
         div:nth-of-type(1){
           background: #5adad0
         }
         div:nth-of-type(2){
           background: #f2922f
         }
       }
    .shop_icon{
      flex: 1;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding-left: 15px; 
      .icon{
        font-size: 25px;
        font-weight: 100;
      }
    }
  }
}
</style>

