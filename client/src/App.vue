<template>
  
  <QuestionDisplay></QuestionDisplay>
  
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
     
    }
  }
}

</script>