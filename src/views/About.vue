<template>
  <div class="about">
    <h1>about页面</h1>
    <router-view key='about内的routerView'></router-view>

  </div>
</template>
<script>
export default {
  name: "about",
  created() {
    // console.log("about------matched", this.$route);
  }
};
</script>