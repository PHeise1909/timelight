<template>
  
  
  <p>Realtime Value: {{ realtimeValue}}</p>

  <QuestionDisplay :initialQuestion="realtimeValue"></QuestionDisplay>

</template>

<style scoped>

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
      realtimeValue: 0,
    }
  },

  mounted() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const paramValue = urlSearchParams.get('parameter');

    if(paramValue === 'blue' || paramValue === 'red' || paramValue === 'blue'){
      this.recognizedParameter = paramValue;
    } else {
      console.error("Ungültiger Parameter");
    }
    this.getOrCreateUser();
    this.setupSSE();
    this.fetchInitialValue();
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

    setupSSE() {
      const eventSource = new EventSource('http://localhost:3500/sse');

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if(data.type === 'update'){
          this.realtimeValue = data.value;
          console.log(this.realtimeValue);
        }
      }
    },

    async fetchInitialValue(){
      try{
        const response = await axios.get('http://localhost:3500/api/getInitialValue');
        this.realtimeValue = response.data.value;
      } catch (error) {
        console.error('Error detching initial Value: ', error);
      }
    }
  }
}
</script>