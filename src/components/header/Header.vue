<template>
  <div class = "main">
    <div class = "headerElements">
      <img src = "./logo.svg">
      <div class = "button-group">
          <router-link tag="a"  active-class="active" to="/" >New message</router-link>
          <router-link tag="a"  active-class="active" to="/history" >History</router-link>
      </div>  
    </div>  
    <hr/>
  </div>
</template>

<script>
export default {
  name: 'rick-header',
  props: {
    msg: String
  },
  methods: {
    newMsg: function(event) {
      if(event) {
        this.$router.push('./') }
    },
    history: function(event) {
      if(event) {
        this.$router.push('./history')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  height: 100px;
  width: 100%;
}
img {
  align-self: center;
}
.headerElements {
  height: 75px;
  margin: 16px 6.5% 0 6.5% !important;
  display: flex;
  justify-content: space-between;
}
hr {
  background-color: #4EADC5;
  height: 24px !important;
  border: none;
  opacity: unset;
  padding: 0px;
  margin: 0px;    
}
.button-group {
    align-self: flex-end;
    margin-bottom: 6px;
}
a:hover, .active {
  background-color: #4EADC5;
  color: #FAFFFD;
}
a  {
  background-color: #FAFFFD;
  border: none;
  padding: 10px 16px;
  font-family: sans-serif;
  text-decoration: none;
  cursor: pointer;
   color: #324B72
}
  @media screen and (max-width: 480px) {
    img {
      width: 110px;
      height: 32px;
      /* margin-bottom: 0px !important; */
  }
  }
</style>
