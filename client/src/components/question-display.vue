<template>
  <div v-if="questions.length > initialQuestion">{{ questions[initialQuestion].question }}</div>
  <div v-else>No Question available</div>

  </template>
  
  <style scoped>
  </style>
  
  <script>
    import axios from 'axios';
    export default{

      props:{
        initialQuestion:{
          type: Number,
          required: true,
        }
      },
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