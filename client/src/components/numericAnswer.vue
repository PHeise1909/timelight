<template>
  <div class="numeric-answer-container">
    <div class="question">{{ question }}</div>
    <div class="input-element">
      <div class="input-container">
        <input type="number" v-model="numericAnswer" placeholder="Antwort eingeben" />
      </div>
      <button @click="sendNumericAnswer">Senden</button>
    </div>
  </div>
</template>
  
  <style scoped>
    .numeric-answer-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content:space-around;
      color: white;
      height: 100%;
    }
    


    .question {
      position: relative;
      padding:5%;

      color: white;
      font-family: 'Bebas Neue', sans-serif;
      text-transform: uppercase;
      text-align: center;
      font-size: xx-large;
    }
  
    .input-element{
      position: relative;
      margin-top: 30vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .input-container {
      background-color: white;
      width: 90%;
      padding: 10px;
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0%;
      border-style: solid;
      border-width: 0.8cm;
      border-color: rgb(59, 33, 118);
    }

    input {
      width: 100%;
      border: none;
      padding: 10px;
      box-sizing: border-box;
    }

    button {
      position: relative;
      align-self: center;
      background-color: rgb(79, 199, 78);
      color: white;
      padding: 10px;
      cursor: pointer;
      margin-top: 1vh;
      font-family: 'Be Vietnam', sans-serif;
      text-align: center;
      font-size: x-large;
    }
  </style>
  
  <script>
  import axios from 'axios';
  const backend = import.meta.env.VITE_VUE_APP_BACKEND_ADDRESS;

  export default {
    props: {
      question: {
        type: String,
        required: true,
      },
      initialQuestion: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        numericAnswer: null,
      };
    },
    methods: {
      async sendNumericAnswer() {
        if (this.numericAnswer !== null && !isNaN(this.numericAnswer)) {
          const userId = localStorage.getItem('User');
  
          if (!userId) {
            console.error("UserID nicht im localStorage gefunden!");
            return;
          }
  
          try {
            await axios.post(`${backend}/setAnswer`, {
              userId,
              position: this.initialQuestion,
              answer: this.numericAnswer.toString(),
            });
            this.$emit('answerSelected')
            console.log('Numerische Antwort erfolgreich gespeichert!');
          } catch (error) {
            console.error('Fehler beim Speichern der numerischen Antwort!', error);
          }
        } else {
          console.error('Ungültige numerische Antwort');
        }
      },
    },
  };
  </script>
  