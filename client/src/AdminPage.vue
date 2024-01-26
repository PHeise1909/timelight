<template>
  <div class="grid">
    <div class="color-box" style="background-color: rgb(108,21,173);">
      <QuestionDisplay :initialQuestion="socketValue"></QuestionDisplay>
    </div>
    <div class="color-box" style="background-color: rgb(108,21,173);">
      <Timer :key="timerKey"></Timer>
      <v-btn class="button" size="x-large" color="green" @click="nextQuestion()" style="margin-rigt: 10px">Nächste Frage</v-btn>
      <v-btn class="button" size="x-large" color="red" @click="decrementValue()">Vorherige Frage</v-btn>
    </div>
    <div class="color-box" style="background-color: rgb(108,21,173);">
      <v-btn @click="getEvaluation()">Get Evaluation</v-btn>
    </div>
    <div class="color-box" style="background-color: rgb(108,21,173);"></div>
  </div>
</template>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
    border: 2px solid black;
  }
  .button{
    margin-top: 10px;
  }
</style>

<script>
import QuestionDisplay from './components/question-display.vue';
import Timer from './components/BaseTimer.vue';
import axios from 'axios';

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
    nextQuestion() {
      this.timerKey += 1;
      this.socket.send(JSON.stringify({type: 'increment' }));
      console.log(this.socketValue);
    },
    decrementValue(){
      this.timerKey -= 1;
      this.socket.send(JSON.stringify({type: 'decrement' }));
      console.log(this.socketValue);
    },
    async getEvaluation(){
      try{
         const response = await axios.get('http://localhost:3500/api/eval', {
          params: {
            questionIndex: this.socketValue
          }
        });
         console.log(response.data);
      }
      catch (error){
        console.error('Fehler beim evaluieren', error);
      }
    },
  },
};
</script>
