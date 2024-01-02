<template>
    <div> {{ this.questions[1].question }}</div>
  </template>
  
  <style scoped>
  
  </style>
  
  <script>
    import axios from 'axios';
    export default{
  
      data(){
        return {
          questions: [],
        }
      },
      created(){
        this.fetchQuestions();
      },
      methods:{
        async fetchQuestions(){
          try{
            //const response = await this.$http.get(`/api/questions`);
            //this.questions = response.data;
  
            const response = await axios.get('http://localhost:3500/api/questions');
            this.questions = response.data;
            console.log(this.questions);
  
            //console.log('AbgerufeneFrage: ' + this.questions)
          } catch (error){
            console.error('Error fetching question: ', error)
          }
        }
      }
    }
  </script>