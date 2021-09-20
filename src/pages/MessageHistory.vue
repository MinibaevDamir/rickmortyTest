<template>
    <div class = "calendar">

      <a class = "days" v-for="day in date" :key="day.id" :href="'#messages-for-' + day">
       <img src = "../assets/chevron.svg" class = "chevron">
        {{ moment(day) }}
      </a>
    </div>
  <div id = "messageHistory" class = "messageHistory">
    
    <div class = "sent" v-bind:class="{active: activate}">
      Message sent successfully <img src = "../assets/successful.png"> 
    </div>
    <div class = "title">
       Message History
    </div>
    <rick-accordion v-for="message in messages" :key="message.id" v-bind:message="message" :id="'messages-for-' + message.date"/>

  </div>
</template>

<script>
export default {
  name: 'messageHistory',
  data() {
    return {
      date: [],
      messages: JSON.parse(localStorage.getItem('messages')).sort(this.sortByDate) || [],
      activate: false
    }
  },
  methods: {
    sortByDate: function(a, b) {
      let A = new Date(a.date).getTime();
      let B = new Date(b.date).getTime();
      if(A === B) {
        let At = a.at.replace(":", "")
        let Bt = b.at.replace(":", "")
        return At > Bt ? -1 : 1;
      }
      else {
      return A > B ? -1 : 1;
      } 
    },
    uniq: function(arr) {
      let seen = {};
      let out = [];
      let len = arr.length;
      let j = 0;
      for(let i = 0; i < len; i++) {
         let item = arr[i];
         if(seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
            }
      }
      return out;
    },
     moment: function (date) {
       return moment(date.split('.').join('-'), "DD-MM-YYYY").format('DD MMM YY');
    }
  },
  mounted() {
    const anchors = document.querySelectorAll('a[href*="#"]')
    const messages = document.querySelectorAll('div.accordion')
    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const blockID = anchor.getAttribute('href').substr(1)
    
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
          })
      })
    }
    window.addEventListener('scroll', () => {
      let index = messages.length;
       while(--index && window.scrollY + 50  < messages[index].offsetTop) {}
         anchors.forEach((a) => a.classList.remove('active'));
         if(anchors[index] && anchors[index].classList) {
            anchors[index].classList.add('active');  
         }
    });
  },
  
  created() {
    this.messages.map(element => this.date.push(element.date))
    this.date = this.uniq(this.date)
  },
  components: {
    RickAccordion
  }
}
import RickAccordion from "../components/rick-accordion/rickAccordion.vue"
import moment from "moment"
</script>

<style scoped>
    .chevron {
      transform: rotate(90deg);
      width: 18px;
      height: 18px;
    }
    .active {
      text-decoration: underline;
    }
    a {
      text-decoration: none;
      display: block;
    }
    .calendar {
      position: fixed;
      z-index: 101;
      margin-top: 10%;
      margin-left: 70%;
      border: 5px solid ;
      /* background-color: whitesmoke; */
      padding: 12px 18px;
      width: 300px;
      height: 200px;
      border-radius: 10px 20px 30px 40px/30px;
    }
    .days {
      margin-right: 4px;
    }
    .sent {
      color: #50C878;
      font-size: 24px;
      margin: 18px auto 24px;
      visibility: hidden;
    }
    .active {
      visibility: initial;
    }
    .sent img {
        width: 22px;
        height: 18px
    }
    .messageHistory {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .title {
        font-size: 32px;
        margin-bottom: 32px;
    }
    @media screen and (max-width: 1100px) {
        .calendar {
        visibility: hidden;}
        .days { visibility: hidden; }
    }
</style>
