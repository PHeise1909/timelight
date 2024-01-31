<template>
  <div class="container">
    <div v-if="questions.length > initialQuestion">

      <div style="color:white" v-if="questions[initialQuestion].type === 'single-choice'">
        <div class="question">{{ questions[initialQuestion].question }}</div>
        <AnswerButtons class="buttons" :answers="getAnswers()" :questionNr="initialQuestion" @answerSelected="handleAnswerSelected" />
      </div>
      
      <div style="color:white" v-else-if="questions[initialQuestion].type === 'numeric'">
        <NumericAnswer  :question="questions[initialQuestion].question" :initialQuestion="initialQuestion" />
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
    justify-content: space-around;
    height:100%;
    background-image: url(@/assets/Allgemein/PolygonQuestion.png);
    background-position-x: center;
    background-position-y: 0%;
    background-size: 100%;
  }


  .question {
    padding:5%;
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    text-transform: uppercase;
    text-align: center;
    font-size: xx-large;
    position: relative;
  }

  .buttons {
    padding-top: 10vw;
    padding-bottom: 1vw;
  }
  </style>
  
  <script>
    import axios from 'axios';
    import AnswerButtons from './answer-buttons.vue';
    import NumericAnswer from './numericAnswer.vue';
    const backend = import.meta.env.VITE_VUE_APP_BACKEND_ADDRESS;

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
            console.log(backend)
            const response = await axios.get(`${backend}/questions`);
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
        },
        handleAnswerSelected() {
            this.$emit('answerSelected');
        }
      }
    }
  </script>