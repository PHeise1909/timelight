<template>
  <div class="grid">
    <div class="color-box" style="background-color: rgb(108,21,173);">
      <QuestionDisplay :initialQuestion="calculatedValue"></QuestionDisplay>
    </div>
    <div class="color-box" style="background-color: rgb(108,21,173);">
      <Timer :key="timerKey"></Timer>
      <v-btn class="button" size="x-large" color="green" @click="nextQuestion()" style="margin-rigt: 10px">Nächste Frage</v-btn>
      <v-btn class="button" size="x-large" color="red" @click="decrementValue()">Vorherige Frage</v-btn>
    </div>
    <div class="color-box" style="background-color: rgb(108,21,173);"></div>
    <div class="color-box" style="background-color: rgb(108,21,173);"></div>
  </div>
</template>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
    border: 2px solid black;
  }
  .button{
    margin-top: 10px;
  }
</style>

<script>
import QuestionDisplay from './components/question-display.vue';
import Timer from './components/BaseTimer.vue';

export default {
  components: {
    QuestionDisplay,
    Timer,
  },
  data() {
    return {
      timerKey: 0,
    };
  },
  computed: {
    calculatedValue() {
      return this.$store.state.realtimeValue; // Beispielberechnung
    },
  },
  methods: {
    nextQuestion() {
      // Erhöhe den Timer-Schlüssel, um die Komponente neu zu laden
      this.timerKey += 1;
      fetch('http://localhost:3500/updateValue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'increment' }),
            });
    },
    decrementValue(){
      this.timerKey -= 1;
      fetch('http://localhost:3500/updateValue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'decrement' }),
            });
    }
  },
};
</script>
