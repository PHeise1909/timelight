<template>
  <div class="container">
    <div v-if="questions.length > initialQuestion">

      <div style="color:white" v-if="questions[initialQuestion].type === 'single-choice'">
        <div class="question">{{ questions[initialQuestion].question }}</div>
        <AnswerButtons :answers="getAnswers()" :questionNr="initialQuestion" @answerSelected="logAnswer" />
      </div>
      
      <div style="color:white" v-else-if="questions[initialQuestion].type === 'numeric'">
        <NumericAnswer :question="questions[initialQuestion].question" :initialQuestion="initialQuestion" />
      </div>

      <div v-else>
        No Question Available
      </div>

    </div>
  </div>
  </template>
  
  <style scoped>
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100%;
  }

  .question {
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    text-transform: uppercase;
    text-align: center;
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  </style>
  
  <script>
    import axios from 'axios';
    import AnswerButtons from './answer-buttons.vue';
    import NumericAnswer from './numericAnswer.vue';

    export default{
      components:{
        AnswerButtons,
        NumericAnswer,
      },
      props:{
        initialQuestion:{
          type: Number,
          required: true,
        }
      },
      data(){
        return {
          questions: [],
          numericAnswer: null
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
        },
        logAnswer(answer){
          console.log("Selected answer: ", answer);
        },
        sendNumericAnswer(){
          if(this.numericAnswer !== null && !isNaN(this.numericAnswer)){
            console.log(this.numericAnswer);
          }
          else{
            console.error('Invalid numeric Answer');
          }
        },
        getAnswers(){
          if(this.questions[this.initialQuestion] && this.questions[this.initialQuestion].answers){
            return this.questions[this.initialQuestion].answers;
          } else{
            return [];
          }
        }
      }
    }
  </script>