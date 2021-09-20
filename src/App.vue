
<template>
  <rick-header id="header" class = "rick-header"/>
    <router-view/>
</template>

<script>
  import RickHeader from "./components/header/Header.vue"
  export default {
  name: 'app',
  components: {
    RickHeader
  },

}
</script>



<style>

.rick-header {
  position:fixed; 
  width: 100%;
  opacity: 1;
  z-index: 99999;
  background-color: white;
  top:0;
  margin-bottom: 10%;
}

#app {
  padding-top: 100px;
  color: #324B72 !important;
  padding: auto;
  overflow: auto;
}
</style>
