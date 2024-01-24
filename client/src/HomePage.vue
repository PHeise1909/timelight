<template>
    <div class="app-container">
      <QuestionDisplay :initialQuestion="socketValue"></QuestionDisplay>
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
  import axios from 'axios';

  export default {
    components: {
      QuestionDisplay,
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
            const response = await axios.get('http://localhost:3500/api/setUser', {zone: this.recognizedParameter});
            console.log(response.data._id);
            localStorage.setItem('User', response.data._id)
          } catch{
            console.log("error");
          }
        } else console.log("User bereits vorhanden: ", localStorage.getItem('User'));
      },
      setupWebSocket() {
      this.socket = new WebSocket('ws://localhost:3500');
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