/*
 * @Author: 张哲 
 * @Date: 2019-04-27 16:01:23 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-28 08:37:13
 */

<template>
    <div class="storelist">
        <header>
            店铺列表
        </header>
        <main ref="bscrollStore">
            <div>
                <dl class="store" v-for="v in list" :key="v.store_id" @click="handProduct(v.store_id)">
                    <dt>
                        <img v-lazy="v.img" >
                    </dt>
                    <dd>
                        <p>{{v.store_name+"店铺"}}</p>
                    </dd>
                </dl>
              
            </div>
        </main>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[]
        }
    },
    mounted(){
        this.$http.get('/buyer/storelist').then(res=>{
            console.log(res)
            if(res.code===1){
                res.result.forEach(item=>{
                    item['img']='/1.jpg'
                })
                this.list=res.result
            }
        })
        new this.BScroll(this.$refs.bscrollStore,{
            click:true
        })
    },
    methods:{
        handProduct(id){
            this.$router.push('/home/myhome/'+id)
        }
    }
}
</script>
<style lang="scss" scoped>
.storelist{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
header{
    width: 100%;
    height: 50px;
    background: #000;
    color: #fff;
    line-height: 50px;
    text-align: center;
}
main{
    flex: 1;
    overflow: hidden;
    &>div{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
}
.store{
    width: 46%;
    height: 250px;
    margin-top: 10px;
    margin-left: 10px;
    border: 1px solid #ccc;
    &>dt{
        width: 100%;
        height: 80%;
        &>img{
            width: 100%;
            height: 100%;
        }
    }
    &>dd{
        width: 100%;
        height: 20%;
        p{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 0 10px;
            display: flex;
            align-items: center;            
        }
    }
}
</style>

