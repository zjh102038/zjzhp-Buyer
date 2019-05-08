<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url("./fonts/iconfont.css");
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  text-decoration: none;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
}
</style>
