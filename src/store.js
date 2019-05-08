import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shopcarList:[],
    money:0
  },
  mutations: {
    addShopcar(state,action){
      state.shopcarList = action
    },
    totalPrice(state,action){
      state.money = action
    }
  },
  actions: {}
});
