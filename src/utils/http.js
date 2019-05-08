import axios from 'axios'
let instance = axios.create({
  timeout: 4000,
  headers: {
    'content-type': 'application/json',
    'authorization':'asdfgasg110'
  }
});
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.status === 200){
    return response.data
  }else{
    return response;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default {
  install(vue){
    Object.defineProperty(vue.prototype,'$http',{
      value:instance
    })
  }
}

// const http = {
//   install(Vue){
//     let $http = axios.create({
//       baseURL:'http://localhost:3000',
//       timeout:5000,
//       headers:{'content-type':'Application/json'}
//     })
//     $http.interceptors.request.use(config=>{
//       // console.log(config)
//     },(err)=>{
//       return err
//     })
//     $http.interceptors.response.use(res=>{
//       return res
//     },(err)=>{
//       console.log(err)
//     })
//     Object.defineProperty(Vue.prototype,'$http',{
//       value:$http
//     })
//   }
// }


// let instance = axios.create({
//   baseURL:'http://127.0.0.1:8080',
// })
// instance.interceptors.response.use((res)=>{
//   if(res.status === 200){
//     return res.data
//   }
// },(err)=>{
//   console.log(err)
// })
// let http = {
//   install(Vue){
//     // Vue.prototype.$http = instance;
//     Object.defineProperty(Vue.prototype,'$http',{
//       value:instance
//     });
//   }
// }
// export default http;
