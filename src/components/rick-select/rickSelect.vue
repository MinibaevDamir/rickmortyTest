<template>
    <div>
        <button class="accordion" type="button" v-on:click="touched">
            {{text}}
        </button>
        <div class="panel">
            <div class="option" v-on:click="selected"  v-for="character in characters" :data-value="character.name" :data-img="character.image" :key="character.id">{{character.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'rick-select',
  data() {
    return {
      value: ''
    }
  },
  methods: {
    touched: function(e) {
      e.target.classList.toggle("active");

      let panel = e.target.nextElementSibling;

      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
      this.$emit('touch', {
        touched: true
      })
    },
    selected: function(e) {
      e.target.parentElement.previousElementSibling.innerHTML = e.target.dataset.value;
      e.target.parentElement.style = "none"
      this.$emit('select', {
        character: e.target.dataset.value,
        img: e.target.dataset.img
      })
    }
  },
  props: {
    text: {
        type: String,
        required: true
    },
    characters: {
        type: Array,
        required: true
    }
  },
}

</script>
<style scoped>
.accordion {
    padding: 0px;
    box-sizing :border-box;
    height: 48px;
    font-size: 14px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid #ced4da;
    background-image: url("../../assets/path.svg");
    background-repeat: no-repeat;
    background-position: right .75rem center;
    background-size: 12px 6px;
    position: relative;
    overflow: hidden;
    color: #324B72 !important;
}

.panel {
    border: 1px solid #ced4da;
    border-radius: 0px 0px 8px 8px 
}
.accordion .active {
    border-radius: 8px 8px 0px 0px !important;
}
.accordion, .option .active {
    background-color: unset; 
    cursor: pointer;
    padding: 18px;
    width: 100%;
    text-align: left;
    outline: none;
}
.option:hover {
    background-color: #F4F4F4;
}
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: white;
}

::-webkit-scrollbar-thumb {
  background: #C4C4C4;
border-radius: 2px;

}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.panel {
    display: none;
    overflow-y: scroll;
    height: 160px;
}

.option {
  padding: 9px 18px;
}
</style>
