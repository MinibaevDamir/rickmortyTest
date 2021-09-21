<template>
  <div id = "message" class = "message">
    <div class = "msgHist">
       Send a new message
    </div>
    <form @submit.prevent="onSubmit">
      <div class = "mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" class="form-control" id="title" placeholder="Enter the title" name = "title" v-model="titleInput.title" @blur="titleInput.touched = true">
          <div v-if="validTitle() === false && this.titleInput.touched" class = "error">Please enter the correct title</div>
      </div>
      <div class = "mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea class="form-control" id="message" placeholder="Enter the message here..." rows = "5" name = "message" v-model="messageInput.message" @blur="messageInput.touched = true"> </textarea>
          <div v-if="validMessage() === false && this.messageInput.touched" class = "error">Please enter the correct message</div>
      </div>
      <div class = "mb-3">
          <rick-select @select = "setSelect" @touch= "setTouch" v-if="this.characters.length > 0" v-bind:characters="characters" v-bind:text="text">
          </rick-select>
          <div v-if="this.characterInput.character === null && this.characterInput.touched" class = "error">Please choose the character</div>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="Quickspot" v:bind:value = "true" name = "Quickspot" v-model="Quickspot">
        <label class="form-check-label checkboxLabel" for="Quickspot">I want to use InterGalaxy Quickspot™</label>
      </div>
      <button type = "submit">
          Send
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'message-page',
  data() {
    return {
      text: "Pick a character",
      characters: null,
      errors: [],
      titleInput: {
        title: " ",
        touched: false,
      },
      messageInput: {
        message: " ",
        touched: false
      },
      characterInput: {
        character: " ",
        img: null,
        touched: false
      },
      Quickspot: false
    }
  },
  created() {
    axios 
      .get("https://rickandmortyapi.com/api/character")
      .then(res => this.characters = res.data.results)
  },
  methods: {

    setSelect(data) {
      this.characterInput.character = data.character
      this.characterInput.img = data.img
    },
    setTouch(data) {
      this.characterInput.touched = data.touched
    },
    validTitle: function() {
      return this.titleInput.title?.length > 3 && this.titleInput.title?.length < 32 
    },
    validMessage: function(){ 
      return this.messageInput.message?.length < 256 && this.messageInput.message?.length > 0
    },
    setNull: function(date) {
        date.toString().length === 1 ? date = "0" + date : date
        return date
    },
    getHM: function(){
      return this.setNull(new Date().getHours()) + ':' + this.setNull(new Date().getMinutes())
    },
    getDate: function(){
      return this.setNull(new Date().getDay()) + '.' + this.setNull(new Date().getMonth()) + '.' + new Date().getFullYear()
    },
    onSubmit(event) {
      if(this.validTitle() && this.validMessage() && this.characterInput.character !== null) {
        let temp = JSON.parse(localStorage.getItem('messages')) || []
        temp.push({id: temp.length + 1 || 0, title: this.titleInput.title, sentTo: this.characterInput.character, date: this.getDate(), at: this.getHM(), img: this.characterInput.img,
        text: this.messageInput.message, Quickspot: this.Quickspot})
        this.titleInput.title = this.messageInput.message = this.characterInput.character = null
        this.Quickspot =  this.titleInput.touched = this.messageInput.touched = this.characterInput.touched = false
        event.target.reset()
        this.$router.push({name:'message-history', params: {sent: true} }); 
        return localStorage.setItem('messages', JSON.stringify(temp))
      }
    }
  },
  components: {
    rickSelect
  }
}
import axios from "axios"
import rickSelect from "@/components/rick-select/rickSelect.vue"
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
  input[type='checkbox']{
    width: 24px !important;
    height: 24px !important;
    margin-right: 9px;
  }
  input[type='checkbox']:checked{
    border-color: #4EADC5;
    background-color:#4EADC5;
  }
  button {
    align-self: flex-end;
    border-radius: 20px;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    width: 82px;
    height: 40px;
    padding: 8px 23px 8px 23px;
    background-color: #4EADC5;
    font-size: 16px;
  }
  .error {
    margin-top: 8px;
    font-size: 10px;
    color: #DE212B
  }
  .checkboxLabel {
    margin-top: 3px;
  }
  label {
    align-self: baseline;
  }
  input, textarea, select {
    border-radius: 8px;
    width: 460px;
  }
  .mb-3 {
    margin-bottom: 14px;
  }
  option:hover {
    color: #F4F4F4 !important
  }
  .message {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
  }
   .msgHist {
      font-size: 32px;
      margin-bottom: 32px;
  }
  @media screen and (max-width: 480px) {
    input, textarea, select {
    width: 350px;
    }
  }
 
</style>
