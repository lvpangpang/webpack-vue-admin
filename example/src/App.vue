<template>
  <div id="app">
    <HelloWorld msg="vue" />
    <div class="name">吕肥肥哈哈666666</div>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="less" scoped>
#app {
  .name {
    color: red
  }
}
</style>
