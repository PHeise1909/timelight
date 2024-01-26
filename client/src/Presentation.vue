<template>
    <div class="grid">
      <div class="color-box" style="background-color: rgb(108,21,173);">
        <Timer :key="timerKey"></Timer>
      </div>
      <div class="color-box" style="background-color: rgb(108,21,173);">
        <QuestionDisplay :initialQuestion="socketValue"></QuestionDisplay>
      </div>
    </div>
  </template>
  
  <style scoped>
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
  