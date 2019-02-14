<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
      return{
        routList:''
      }
  },mounted:function () {
          console.log("---------------->",this.routList)
  }
  ,methods:{
        getrouterList(){
              this.routList = this.$route.meta.routeList
        },
  },beforeRouteEnter(to, from, next) {
    next(vm=>{
      vm.routList = to.meta.routeList
    })
  }
  ,watch:{
  $route:{
    handler: function(val, oldVal){
      console.log(val);
    },
    // 深度观察监听
    deep: true
  }
},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
