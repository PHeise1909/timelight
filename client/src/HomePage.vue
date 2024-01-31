<template>
    <div class="app-container">
      <div>
        <div v-if="socketValue === 0">
          <LandingPage></LandingPage>
        </div>
        <div v-else-if="socketValue%2 === 1 && socketValue <= 20">
          <QuestionDisplay :initialQuestion="socketValue"></QuestionDisplay>
        </div>
        <div v-else-if="socketValue%2 === 0 && socketValue <= 20">
          <EvaluationDisplay></EvaluationDisplay>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  html body{
    height: 100%;
  }
    .app-container{
      height: 100vh;
      background-color: rgb(108,21,173);
    }
  </style>
  
  <script>
  import QuestionDisplay from './components/question-display.vue'
  import LandingPage from './components/landingPage.vue'
  import EvaluationDisplay from './components/evaluation-display.vue'
  import axios from 'axios';
  const ws = import.meta.env.VITE_VUE_APP_WS;
  const backend = import.meta.env.VITE_VUE_APP_BACKEND_ADDRESS;
  export default {
    components: {
      LandingPage,
      QuestionDisplay,
      EvaluationDisplay,
    },
    data(){
      return{
        recognizedParameter: null,
        socketValue: 0,
        socket: null,
      }
    },
    mounted() {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const paramValue = urlSearchParams.get('parameter') || 'default';
  
      console.log('paramValue:', paramValue);
      if(['blue','red','green'].includes(paramValue)){
        this.recognizedParameter = paramValue;
      } else {
        console.error("Ungültiger Parameter");
      }
      this.getOrCreateUser();
    },
    created() {
      this.setupWebSocket();
    },
    methods: {
      async getOrCreateUser(){
        console.log("User überprüfen");
        console.log(this.recognizedParameter);
        if(localStorage.getItem("User") === null){
          try{
            console.log("Neuer User wird erstellt")
            const response = await axios.get(`${backend}/setUser`, {zone: this.recognizedParameter});
            console.log(response.data._id);
            localStorage.setItem('User', response.data._id)
          } catch{
            console.log("error");
          }
        } else console.log("User bereits vorhanden: ", localStorage.getItem('User'));
      },
      setupWebSocket() {
      this.socket = new WebSocket(ws);
      this.socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if(data.type === 'update'){
          this.socketValue = data.value;
        }
      });
    },
    }
  }
  </script>