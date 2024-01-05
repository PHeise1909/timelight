<template>
  <div v-if="questions.length > 1">{{ questions[0].question }}</div>
  <div v-else>No question available</div>
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
  
            const response = await axios.get('http://localhost:3500/api/questions');
            this.questions = response.data;
            console.log(this.questions);
  
          } catch (error){
            console.error('Error fetching question: ', error)
          }
        }
      }
    }
  </script>