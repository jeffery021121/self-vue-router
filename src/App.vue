<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> 
      <router-link to="/about">About</router-link>
      <button @click="clickMe">点我去/about/a</button>
      我是app
    </div>
    <router-view key="app.vue内的routerView"></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  beforeCreate() {
    // console.log('app:::::::::',this)
  },
  methods:{
    clickMe(){
      this.$router.push('/about/a')
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
