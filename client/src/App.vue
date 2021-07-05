<template>
  <div id="app">
    <span class="logo">🖼</span>
    <h3>Image Scraper 2021-07</h3>
    <ImageList />
    <a href="/api">API</a>
  </div>
</template>

<script>
import ImageList from './components/ImageList.vue'

export default {
  name: 'App',
  components: {
    ImageList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  font-size: 100px;
  color: #007bff;
}
</style>
