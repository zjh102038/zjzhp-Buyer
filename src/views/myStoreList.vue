<template>
  <div class="box">
    <myheader title="收藏店铺列表">
      <span>
        <i class="icon iconfont icon-share"></i>
      </span>
    </myheader>
    <main>
      <ul>
        <li v-for="item in storeList" :key="item.id">
          <dl>
            <dt>
              <img :src="item.logo" alt>
            </dt>
            <dd>
              <p>{{item.title}}</p>
              <span>{{item.tag}}</span>
            </dd>
          </dl>
          <dl @click="handleCancle(item.store_id)">
            <dt>
              <el-button type="warning" icon="el-icon-star-off" circle></el-button>
            </dt>
            <dd>取消关注</dd>
          </dl>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import myheader from "../components/myheader";
export default {
  name: "mystorelist",
  data: function() {
    return {
      storeList: [
        {
          id: 0,
          title: "秀色可餐蛋糕店",
          logo: "/4.jpg",
          tag: "蛋糕",
          store_id: "b677754d0282970d81e285ef6297100d"
        },
        {
          id: 1,
          title: "喵掌柜肉肉店",
          logo: "/4.jpg",
          tag: "零食",
          store_id: "500b78c66434db93f3e186bdecbb42c3"
        }
      ]
    };
  },
  components: {
    myheader
  },
  methods: {
    handleCancle(id) {
      let token =
        "eyJhbGciOiJIUzI1NiJ9.MDAwMDAwMDAwMDAx.FBvFzap1yehA-MpYHai4gXT8GZ_ly-I-OBThILg_y4U";
      this.$http
        .post("/buyer/user/store.collect.remove", {
          token,
          store_id: id
        })
        .then(res => {
          console.log(res);
        });
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
    ul {
      width: 100%;
      height: 100%;
      li {
        width: 100%;
        height: 75px;
        padding: 0 15px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        dl {
          &:first-child {
            display: flex;
            align-items: center;
            dt {
              width: 50px;
              height: 50px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            dd {
              margin-left: 10px;
              line-height: 25px;
              p {
                font-size: 16px;
              }
              span {
                font-size: 12px;
                border: 1px solid #ddd;
                padding: 4px 8px;
                background: #f8f8f8;
                color: #999;
              }
            }
          }
          &:last-child {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            dd {
              font-size: 11px;
              color: #999;
            }
          }
        }
      }
    }
  }
}
</style>

