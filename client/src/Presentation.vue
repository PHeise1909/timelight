<template>
  <div class="color-background">
    <div class="grid" v-if="socketValue < 3">
        <Timer :key="timerKey"></Timer>
        <QuestionDisplay :initialQuestion="socketValue"></QuestionDisplay>
    </div> 
    <div class="frage1" v-if="socketValue === 10">
      Hallo
    </div>
    <div class="frage2 question-grid" v-if="socketValue === 11">
      Eine Galápagos-Riesenschildkröte würde für die Strecke 
       <br> <div style="font-size: 3em;">20 Jahre</div> </br> 
      <br>benötigen</br>
      </div>
</div>
  
</template>

<style scoped>
    .color-background{
        height: 100vh;
        background-color: rgb(108,21,173);
    }

  .grid {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    height: 100vh;
  }
  .color-box {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .frage1{
    display: flex;
  }

  .question-grid{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100%;
  }
  .frage2{
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    text-align: center;
    font-size: 5em;
    display: flex;
  }

</style>

<script>
import QuestionDisplay from './components/question-display.vue';
import Timer from './components/BaseTimer.vue';

export default {
  components: {
    QuestionDisplay,
    Timer,
  },
  data() {
    return {
      timerKey: 0,
      socketValue: 0,
      socket: null,
    };
  },
  created() {
   this.setupWebSocket();
  },
  methods: {
    setupWebSocket() {
      this.socket = new WebSocket('ws://localhost:3500');
      this.socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if(data.type === 'update'){
          this.socketValue = data.value;
        }
      });
    },
  },
};
</script>