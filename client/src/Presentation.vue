<template>
  <div class="color-background">
    <div class="grid" v-if="socketValue < 3">
        <Timer :key="timerKey"></Timer>
        <QuestionDisplay :initialQuestion="socketValue"></QuestionDisplay>
    </div> 
    <div class="frage-allgemein frage1" v-if="socketValue === 10">
      80s | 90s | 00s 
    </div>
    <div class="frage-allgemein frage2" v-if="socketValue === 11">
      Eine Galápagos-Riesenschildkröte würde für die Strecke 
       <br> <div style="font-size: 3em;">20 Jahre</div> </br> 
      <br>benötigen</br>
    </div>
    <div class="frage-allgemein frage3" v-if="socketValue === 12">
      Nokia | Backstein | Smartphone 
    </div>
    <div class="frage-allgemein frage4" v-if="socketValue === 13">
      Gangnam Style
    </div>
    <div class="frage-allgemein frage5" v-if="socketValue === 14">
      Im Durchschnitt 2 mal
    </div>
    <div class="frage-allgemein frage6" v-if="socketValue === 15">
      Das Holstentor ist blabla jünger/älter als ihr
    </div>
    <div class="frage-allgemein frage7" v-if="socketValue === 16">
      Nachteulen 
    </div>
    <div class="frage-allgemein frage8" v-if="socketValue === 17">
      Radikal!
    </div>
    <div class="frage-allgemein frage9" v-if="socketValue === 18">
      Zeitraffer
    </div>
    <div class="frage-allgemein frage10" v-if="socketValue === 19">
      AI generiertes Bild
    </div>
    <div ref="celebrate" v-if="socketValue === 20">
    </div>
    <div class="frage-allgemein ende" v-if="socketValue === 20">
      Eure Teilnahme war radikal!
    </div>
  </div>
  
</template>

<style scoped>
    .color-background{
        height: 100vh;
        background-color: rgb(108,21,173);
    }

  .grid {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    height: 100vh;
  }
  .color-box {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .frage-allgemein{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100%;
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    text-align: center;
    font-size: 5em;
  }
  .frage1{
    display: flex;
  }

  .question-grid{
  }
  .frage2{
  
  }

</style>

<script>
import QuestionDisplay from './components/question-display.vue';
import Timer from './components/BaseTimer.vue';
import confetti from "canvas-confetti";

export default {
  components: {
    QuestionDisplay,
    Timer,
  },
  data() {
    return {
      timerKey: 0,
      socketValue: 0,
      socket: null,
      isCelebrate: false,
    };
  },
  created() {
   this.setupWebSocket();
  },

  watch: {
    socketValue(newValue) {
      if (newValue === 20) {
        this.celebrate();
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
  },
};
</script>