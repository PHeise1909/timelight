<template>
  <div class="color-background">
    <div class="timer-element" v-if="socketValue < 10">
        <Timer :key="timerKey"></Timer>
    </div>
    <div class="element-question">
      <div v-if="socketValue === 0">
        Welches Jahrzehnt hatte die beste Musik?
      </div>
      <div v-if="socketValue === 1">
        Wie weit war dein Anreiseweg?
      </div>
      <div v-if="socketValue === 2">
        Was war dein erstes Mobiltelefon?
      </div>
      <div v-if="socketValue === 3">
        Welches Internetphänomen war das prägendste für dich?
      </div>
      <div v-if="socketValue === 4">
        Das wievielte Mal nimmst du am Meet-Up teil?
      </div>
      <div v-if="socketValue === 5">
        Wie alt fühlst du dich?
      </div>
      <div v-if="socketValue === 6">
        Was ist deine bevorzugte Zeit für Vorlesungen?
      </div>
      <div v-if="socketValue === 7">
        Welches vergessene Wort aus den 90ern sollte wieder zum Trend werden?
      </div>
      <div v-if="socketValue === 8">
        Wie beschreibst du die Geschwindigkeit, mit der Semesterferien vergehen? 
      </div>
      <div v-if="socketValue === 9">
        Welches historisches Ereignis könnte als Filmtitel für eine Komödie dienen?
      </div>
    </div>
  
    <div v-if="socketValue === 10">
      <div class="row first-row">
        <div class="column">
          <p class="center-text">Welches Jahrzehnt hatte die beste Musik?</p>
        </div>
      </div>
      <div class="separator-vertical"></div>
      <div class="row second-row">
        <div class="column">
          <img class="center-image" src="/Users/isabel/Desktop/Uni/siebtes_Semester/Bachelorprojekt - Timelight/timelight/client/src/assets/Musik/rickroll.gif">
        </div>
        <div class="separator-horizontal"></div>
        <div class="column">
          <img class="center-image" src="/Users/isabel/Desktop/Uni/siebtes_Semester/Bachelorprojekt - Timelight/timelight/client/src/assets/Musik/barbie.gif">
        </div>
        <div class="separator-horizontal"></div>
        <div class="column">
          <img class="center-image" src="/Users/isabel/Desktop/Uni/siebtes_Semester/Bachelorprojekt - Timelight/timelight/client/src/assets/Musik/nickelback.gif">
        </div>
      </div>
    </div>

    <div class="frage-allgemein" v-if="socketValue === 11">
      Eine Galápagos-Riesenschildkröte würde für die Strecke 
       <p style="font-size: 3em;">20 Jahre </p> 
      <p>benötigen</p>
    </div>

    <div v-if="socketValue === 12">
      <div class="row first-row">
        <div class="column">
          <p class="center-text">Was war euer erstes Mobiltelefon?</p>
        </div>
      </div>
      <div class="separator-vertical"></div>
      <div class="row second-row">
        <div class="column">
          <p class="center-text">Zu unserer Zeit gab es nur Backsteine</p>
        </div>
        <div class="separator-horizontal"></div>
        <div class="column">
          <p class="center-text">Das og Backstein-Handy von Nokia</p>
        </div>
        <div class="separator-horizontal"></div>
        <div class="column"> 
          <p class="center-text">Ein Klapphandy</p>
        </div>
      </div>
    </div>

    <div class="frage-allgemein" v-if="socketValue === 13">
      Gangnam Style
    </div>

    <div class="frage-allgemein" v-if="socketValue === 14">
      Im Durchschnitt 2 mal
    </div>
     
    <div class="frage-allgemein" v-if="socketValue === 15">
      Das Holstentor ist 
       <p style="font-size: 3em;">20 Jahre jünger/ älter </p> 
      <p>als ihr</p>
    </div> 

    <div class="frage-allgemein" v-if="socketValue === 16">
      Nachteulen 
    </div>

    <div class="frage-allgemein" v-if="socketValue === 17">
      Radikal!
    </div>

    <div class="frage-allgemein" v-if="socketValue === 18">
      Zeitraffer
    </div>

    <div class="frage-allgemein" v-if="socketValue === 19">
      AI generiertes Bild
    </div>

    <div ref="celebrate" v-if="socketValue === 20"> </div>
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

  .timer-element {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
  }

  .element-question{
    position: absolute;
    top: 45%;
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
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 4em;
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