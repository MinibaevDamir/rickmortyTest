<template>
    <div class="accordion" :id="message.id">
        <div class="accordion-item">
            <h2 class="accordion-header custom" :id="'heading' + message.id">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + message.id" aria-expanded="true" :aria-controls ="'collapse' + message.id">
                    {{ message.title }}
                </button>
            </h2>
            <div :id="'collapse' + message.id" class="accordion-collapse collapse show" :aria-labelledby="'heading' + message.id" :data-bs-parent="message.id">
                <div class="accordion-body custom">
                    <div class = "header-letter">
                        <hr/>
                        <div>
                            <img v-bind:src = "message.img" class = "char-img">
                        </div>
                        <div class = "data-header">
                            <div class = "data-info">
                                Sent to: {{message.sentTo}}
                            </div>
                            <div class = "data-info">
                                Date: {{message.date}}
                            </div>
                            <div class = "data-info">
                                At: {{message.at}}
                            </div>
                        </div>
                        <div v-if="message.Quickspot === true" class = "quickspot-header">
                            <span><img src = "../../assets/successful.png"/> </span>
                            <span class = "quickspot-element">Using Quickspot™</span>
                        </div>
                    </div>
                    <div class = "text"> 
                    {{ message.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>       
</template>

<script>
export default {
  name: 'rick-accordion',
  props: {
    message: {
        type: Object,
        required: true
    },
    index: {
        index: Number
    }
  },
}
</script>

<style scoped>
    hr{ 
        margin: 0px 6px 0px 0px;
        border: none;
        border-left: 1px solid hsla(200, 10%, 50%,100);
        height: 48px;
    }
    .char-img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
    }
    .data-header {
        display: flex;
        flex-direction: column;
        margin-left: 6px;
    }
    .quickspot-header {
        margin-left: auto;
    }
    .data-info {
        font-size:12px
    }
    .quickspot-element {
        margin-left: 4px;
        font-size: 14px
    }
    .header-letter {
        display: flex;
        flex-direction: row;
    }
    .accordion-item {
        border: none !important
    }
    .accordion-button:not(.collapsed) {
        color: #324B72 !important;
        background-color: white !important
    }
 
    .accordion-button:not(.collapsed)::after {
        transform: rotate(-180deg);
        background-image: url("../../assets/path.svg");

    }
    .accordion-button::after {
        background-image: url("../../assets/path.svg");
    }
    .accordion-button {
        color:  #324B72;
        box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
    }
    .custom {
        width: 480px;
    }
     @media screen and (max-width: 480px) {
    .custom {
        width: 350px;
    }
  }
</style>
