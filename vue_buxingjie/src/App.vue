<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.article-content a {
  color: #326ca6;
}

.more {
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.no-result {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -10px;
  margin-left: -55px;
  text-align: center;
  font-size: 14px;
  color: #999;
}
</style>
