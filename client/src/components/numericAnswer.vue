<template>
  <div class="numeric-answer-container">
    <div class="question">{{ question }}</div>
    <div class="input-container">
      <input type="number" v-model="numericAnswer" placeholder="Antwort eingeben" />
    </div>
    <button @click="sendNumericAnswer">Senden</button>
  </div>
</template>
  
  <style scoped>
    .numeric-answer-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      color: white;
      margin-top: 20px;
    }
  
    .question {
      position: absolute;
      top: 2%;
      left: 5%;
      right: 5%;
      color: white;
      font-family: 'Bebas Neue', sans-serif;
      text-transform: uppercase;
      text-align: center;
      font-size: xx-large;
    }
  
    .input-container {
      position: relative;
      background-color: white;
      width: 80%;
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
      padding: 5px;
      box-sizing: border-box;
    }

    button {
      background-color: rgb(79, 199, 78);
      color: white;
      padding: 10px;
      cursor: pointer;
      margin-top: 10px;
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
  