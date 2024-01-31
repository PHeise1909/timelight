<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="background">
    <div class="flex-container"> 
      <div class="left-side" v-if="socketValue === 0"> 
        <div class="text-container">
          <div class="abstand" style="font-size: 6vw; text-transform: uppercase">Willkommen</div>
          <div class="abstand" style="font-size: 6vw; text-transform: uppercase">zu TimeLight!</div>
          <div class="abstand" style="font-size: 3vw">Gleich geht's los...</div>
        </div> 
        <div class="right-side">
        <img style="height: 90vh; align-items: right" src="./assets/Allgemein/EMI-Surfing.png">
      </div>
      </div>
         
    </div>
    <div class="element-question">
      <div v-if="socketValue === 1">
        Welches Jahrzehnt hatte die beste Musik?
      </div>
      <div v-if="socketValue === 3">
        Wie weit war dein Anreiseweg?
      </div>
      <div v-if="socketValue === 5">
        Was war dein erstes Mobiltelefon?
      </div>
      <div v-if="socketValue === 7">
        Welches Internetphänomen war das prägendste für dich?
      </div>
      <div v-if="socketValue === 9">
        Das wievielte Mal nimmst du am Meet-Up teil?
      </div>
      <div v-if="socketValue === 11">
        Wie alt bist du?
      </div>
      <div v-if="socketValue === 13">
        Was ist deine bevorzugte Zeit für Vorlesungen?
      </div>
      <div v-if="socketValue === 15">
        Welches vergessene Wort aus den 90ern sollte wieder zum Trend werden?
      </div>
      <div v-if="socketValue === 17">
        Wie beschreibst du die Geschwindigkeit, mit der Semesterferien vergehen? 
      </div>
      <div v-if="socketValue === 19">
        Welches historisches Ereignis könnte als Filmtitel für eine Komödie dienen?
      </div>
    </div>
    <div v-if="socketValue === 2">
      <div class="row first-row">
        <div class="column">
          <p class="center-text text">Welches Jahrzehnt hatte die beste Musik?</p>
        </div>
      </div>
      <div class="separator-vertical"></div>
      <div class="row second-row">
        <div class="column">
          <img style="height: 66.66vh; width: 66.66vh" class="center-image" :src="getGif(evaluationAnswers.blue.answer)">
        </div>
        <div class="separator-horizontal"></div>
        <div class="column">
          <img style="height: 66.66vh; width: 66.66vh" class="center-image" :src="getGif(evaluationAnswers.red.answer)">
        </div>
        <div class="separator-horizontal"></div>
        <div class="column">
          <img style="height: 66.66vh; width: 66.66vh" class="center-image" :src="getGif(evaluationAnswers.green.answer)">
        </div>
      </div>
    </div>

    <div class="frage-allgemein" v-if="socketValue === 4">
      <p>Gruppe {{ numericAnswer.zone }} wohnt insgesamt {{numericAnswer.distance}} km entfernt.</p>
      <p>Eine Galápagos-Riesenschildkröte würde für die Strecke </p>
       <p style="font-size: 3em;"> {{ Math.round(numericAnswer.time) }} Tage</p> 
      <p>benötigen</p>
      <img style="height: 30vh" src="./assets/Weg/galapagos.gif">
    </div>

    <div v-if="socketValue === 6">
      <div class="row first-row">
        <div class="column">
          <p class="center-text text">Was war euer erstes Mobiltelefon?</p>
        </div>
      </div>
      <div class="separator-vertical"></div>
      <div class="row second-row">
        <div class="column" style="background-color: #7B16BD">
          <img style="height: 66.66vh; width: 66.66vh" class="center-image" :src="getImage(evaluationAnswers.blue.answer)">
        </div>
        <div class="separator-horizontal"></div>
        <div class="column" style="background-color: #4E8DEA">
          <img style="height: 66.66vh; width: 66.66vh" class="center-image" :src="getImage(evaluationAnswers.red.answer)">
        </div>
        <div class="separator-horizontal"></div>
        <div class="column" style="background-color: #D833E0"> 
          <img style="height: 66.66vh; width: 66.66vh" class="center-image" :src="getImage(evaluationAnswers.green.answer)">
        </div>
      </div>
    </div>

    <div class="frage-allgemein" v-if="socketValue === 8">
      <div class="row first-row">
        <div class="column">
          <p class="center-text">Welches Internetphänomen war das prägendste für dich?</p>
        </div>
      </div>
      <div class="separator-vertical"></div>
      <div class="row second-row">
        <div class="column">
          <img style="height: 66.66vh; width: 66.66vh" class="center-image" :src="getGif(evaluationAnswers.blue.answer)">
        </div>
        <div class="separator-horizontal"></div>
        <div class="column">
          <img style="height: 66.66vh; width: 66.66vh" class="center-image" :src="getGif(evaluationAnswers.red.answer)">
        </div>
        <div class="separator-horizontal"></div>
        <div class="column">
          <img style="height: 66.66vh; width: 66.66vh" class="center-image" :src="getGif(evaluationAnswers.green.answer)">
        </div>
      </div>
    </div>

    <div class="frage-allgemein" v-if="socketValue === 10">
      {{getMaxAverageGroup()}}
    </div>

    <div class="frage-allgemein" v-if="socketValue === 12">
      Ihr solltet euch alt fühlen, selbst das Holstentor ist 
       <p style="font-size: 3em;">{{getAgeDiff()}}</p> 
      <p>als ihr alle zusammen</p>
    </div> 

    <div class="frage-allgemein" v-if="socketValue === 14">
      Gruppe B, ihr liebt es einfach früh aufzustehen!
      <img class="center-image" src="./assets/Aufstehen/Frühaufsteher.gif"> 
    </div>

    <div style="font-size: 3em" class="frage-allgemein" v-if="socketValue === 16">
      <p>Blau: {{evaluationAnswers.blue.answer}}</p>
      <p>Grün: {{evaluationAnswers.green.answer}}</p>
      <p>Rot: {{evaluationAnswers.red.answer}}</p>
    </div>

    <div class="frage-allgemein" v-if="socketValue === 18">
      <p>Blau: {{evaluationAnswers.blue.answer}}</p>
      <p>Grün: {{evaluationAnswers.green.answer}}</p>
      <p>Rot: {{evaluationAnswers.red.answer}}</p>
    </div>

    <div class="frage-allgemein" v-if="socketValue === 20">
      <p>Blau: {{evaluationAnswers.blue.answer}}</p>
      <p>Grün: {{evaluationAnswers.green.answer}}</p>
      <p>Rot: {{evaluationAnswers.red.answer}}</p>
    </div>

    <div ref="celebrate" v-if="socketValue === 21"> </div>
    <div class="frage-allgemein ende" v-if="socketValue === 21">
      Eure Teilnahme war radikal!
    </div>

  </div>
  
</template>

<style scoped>
    .flex-container {
      display: flex;
      height: 100vh;
    }
    .flex-container {
      display: flex;
    }
    .left-side,
    .right-side {
      padding-left: 5vh;
      display: flex;
      align-items: center;
      justify-content: right; 
    }
    .left-side {
      align-items: center;
      justify-content: center;
      color: white;
      font-family: 'Bebas Neue', sans-serif;
    }

    .text-container {
      text-align: left;
    }
    .abstand{
      margin-bottom: 10px;
    }
    .background{
      display: flex;
      background-image: url('./assets/Allgemein/Background-highRes.png');
      background-size: cover;
      height: 100vh;
      background-color: rgb(108,21,173);
    }

  .element-question{
    position: absolute;
    top: 40%;
    left: 5%;
    width: 90%; /* Set the width as per your design */
    text-align: center;
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 4em;
    text-transform: uppercase;
  }
  .frage-allgemein{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100%;
    width:100%;
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 4em;
    text-align: center;
  }

  .separator-horizontal {
    width: 4px;
    height: 100%;
    background-color: white;
  }

  .separator-vertical {
    width: 100%;
    height: 4px;
    background-color: white;
  }
  .row {
    display: flex;
  }

  .first-row {
    height: 33.33vh; /* 1/3 der Höhe der Webseite */
  }

  .second-row {
    height: 66.66vh; /* 2/3 der Höhe der Webseite */
  }

  .column {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .center-text {
    text-align: center;
  }

  .text{
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 4em;
  }

  .center-image{
    align-items: center;
    justify-content: center;
  }

</style>

<script>
import confetti from "canvas-confetti";
import axios from 'axios';
const backend = import.meta.env.VITE_VUE_APP_BACKEND_ADDRESS;

export default {
  components: {
  },
  data() {
    return {
      timerKey: 0,
      socketValue: 0,
      socket: null,
      isCelebrate: false,
      evaluationAnswers: {
        blue: { answer: '', percentage: 0},
        red: { answer: '', percentage: 0},
        green: { answer: '', percentage: 0},
      },
      numericAnswer: {zone: '', distance: '', time: ''},
      averageEvaluation: {
        blue: { average: 0},
        green: { average: 0},
        red: { average: 0},
      }
    };
  },
  created() {
    this.setupWebSocket();
  },

  watch: {
    socketValue(newValue) {
      if (newValue === 21) {
        this.celebrate();
      }
      else if(newValue === 2){
        this.getEvaluation();
      }
      else if(newValue === 4){
        this.getNumericEvaluation();
      }
      else if(newValue === 6){
        this.getEvaluation();
      }
      else if(newValue === 8){
        this.getEvaluation();
      }
      else if(newValue === 10){
        this.getAverageEvaluation();
      }
      else if(newValue === 12){
        this.getEvaluation();
      }
      else if(newValue === 14){
        this.getEvaluation();
      }
      else if(newValue === 16){
        this.getEvaluation();
      }
      else if(newValue === 18){
        this.getEvaluation();
      }
      else if(newValue === 20){
        this.getEvaluation();
      }
    },
    
  },

  methods: {
    setupWebSocket() {
      this.socket = new WebSocket('ws://localhost:3500');
      this.socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if(data.type === 'update'){
          this.socketValue = data.value;
        }
      });
    },
    celebrate() {
      this.isCelebrate = true;
      confetti({
        particleCount: 300,
        spread: 950,
        origin: { y: 0.4 },
        colors: ["#4E8DEA", "#D833E0", "#383991"],
        disableForReducedMotion: true,
      });
    },
    async getEvaluation() {
      try {
        const response = await axios.get(`${backend}/eval`);
        this.processEvaluation(response.data);
      } catch (error) {
        console.error('Fehler beim Evaluieren!', error);
      }
    },
    async getNumericEvaluation() {
      try {
        const response = await axios.get(`${backend}/eval`);
        this.numericAnswer = response.data.answerReturn;
        console.log(this.numericAnswer.answerReturn);
      } catch (error) {
        console.error('Fehler beim Evaluieren!', error);
      }
    },
    async getAverageEvaluation() {
      try {
        const response = await axios.get(`${backend}/eval`);
        this.processAverageEvaluation(response.data);
      } catch (error) {
        console.error('Fehler beim Abrufen der durchschnittlichen Bewertung!', error);
      }
    },
    processAverageEvaluation(data) {
      // Überprüfe, ob die Antwort Daten enthält
      if (data && Object.keys(data).length > 0) {
        this.averageEvaluation = data.answerReturn; // Setze die Antwort in die Daten des Komponenten
        console.log(JSON.stringify(this.averageEvaluation));
      } else {
        console.error('Ungültige Antwort vom Backend erhalten.');
      }
    },
    processEvaluation(data) {
      // Überprüfe, ob die Antwort Daten enthält
      if (data && Object.keys(data).length > 0) {
        this.evaluationAnswers = data.answerReturn; // Setze die Antwort in die Daten des Komponenten
        console.log(JSON.stringify(this.evaluationAnswers));
      } else {
        console.error('Ungültige Antwort vom Backend erhalten.');
      }
    },
    getMaxAverageGroup() {
      const max = Math.max(this.averageEvaluation.blue.average, this.averageEvaluation.red.average, this.averageEvaluation.green.average);
      let group = '';
      if (max === this.averageEvaluation.blue.average) {
        group = 'blue';
      } else if (max === this.averageEvaluation.red.average) {
        group = 'red';
      } else if (max === this.averageEvaluation.green.average) {
        group = 'green';
      }
      return `Gruppe ${group} war im Durchschnitt am öftesten hier. Ganze ${max} mal!`;
    },
    getMaxSum(){
      const maxSum = Math.max(
        this.evaluationAnswers.blue.sum,
        this.evaluationAnswers.red.sum,
        this.evaluationAnswers.green.sum
      );
      return maxSum.toString();
    },
    getAgeDiff(){
      
      const ageDiff = 2024 - 1478;
      let sum = this.evaluationAnswers.blue.sum + this.evaluationAnswers.green.sum + this.evaluationAnswers.red.sum;
      console.log(typeof sum);
      let groupAgeDiff = sum - ageDiff;
      console.log(sum);
      console.log(ageDiff);
      console.log(groupAgeDiff);
      if(groupAgeDiff > 0){
        return groupAgeDiff + " Jahre jünger";
      } else if(groupAgeDiff < 0){
        return -groupAgeDiff + "Jahre älter";
      } else{
        return "Ihr seit genauso alt wie das Holstentor, " + sum + "Jahre!"
      }
    },
    getGif(answer){
      switch(answer) {
        case '80er Jahre':
          return "src/assets/Musik/rickroll.gif"
        case '90er Jahre':
          return "src/assets/Musik/barbie.gif";
        case '2000er Jahre':
          return "src/assets/Musik/nickelback.gif";
        case '2010er Jahre':
          return "src/assets/Musik/thriftShop.gif";
        case 'Nyan Cat':
          return "src/assets/Internet/nyancat.gif";
        case 'Harlem Shake':
          return "src/assets/Internet/harlemshake.gif";
        case 'Ice Bucket Challenge':
          return "src/assets/Internet/iceBucket.gif";
        case 'Planking':
          return "src/assets/Internet/planking.gif";
        default:
          return ""; 
      }
    },
    getImage(answer){
      switch(answer){
        case 'Ein Backstein':
          return 'src/assets/Handys/backstein.jpg'
        case 'Nokia Backstein':
          return 'src/assets/Handys/nokia.jpg'
        case 'Klapphandy':
          return 'src/assets/Handys/Klapphandy.jpg'
        case 'Smartphone':
          return 'src/assets/Handys/Smartphone.jpg'
        default:
          return ""; 
      }
    }
  },
};
</script>