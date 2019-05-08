<template>
  <div class="home">
    
    <div class="home-box">
      <router-view/>
    </div>
    <div class="footer">
      <router-link to="/home/storelist" tag="li" exact>
        <i class="icon iconfont icon-shouye"></i>
        <span>首页</span>
      </router-link>
      <router-link to="/home/shopcar" tag="li">
        <i class="icon iconfont icon-gouwuche"></i>
        <span>购物车</span>
      </router-link>
      <router-link to="/home/mine" tag="li">
        <i class="icon iconfont icon-wode"></i>
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>
<script>

export default {
  components: {
    
  }
};
</script>
<style lang="scss" scoped>
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  .home-box {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
}
.footer {
  width: 100%;
  height: 50px;
  display: flex;
  border-top: 1px solid #ccc;
  padding: 5px 0;
  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.router-link-active {
      color: orange;
    }
    i.icon {
      font-size: 20px;
    }
  }
}
</style>


