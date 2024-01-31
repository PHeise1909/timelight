<template>
    <div class="answer-button-container">
        <v-btn size="large" class="mt-10 font-color text-wrap" style="background-color: rgb(232,110,220); " @click="saveAnswer(0)">{{this.answers[0].text}}</v-btn>
        <v-btn size="large" class="mt-10 font-color text-wrap" style="background-color: rgb(197, 102, 255); " @click="saveAnswer(1)">{{this.answers[1].text}}</v-btn>
        <v-btn size="large" class="mt-10 font-color text-wrap" style="background-color: rgb(102,181,255); color:white" @click="saveAnswer(2)">{{this.answers[2].text}}</v-btn>
        <v-btn size="large" class="mt-10 font-color text-wrap" style="background-color: rgb(79,199,78); color:white" @click="saveAnswer(3)">{{this.answers[3].text}}</v-btn>
    </div>
</template>

<style scoped> 
    .font-color {
        color: white;
        font-family: 'Bebas Neue', sans-serif;
        text-transform: uppercase;
    }
    
    .answer-button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .mt-10 {
        width: 90%;
        padding-top: 5vh;
        padding-bottom: 8vh; 
        border-radius: 0px; 
        text-align: center;
        text-overflow: clip; 
        font-size: large;
        align-self: center;   
    }
</style>

<script>
    import axios from 'axios';
    const backend = import.meta.env.VITE_VUE_APP_BACKEND_ADDRESS;
    export default{
        props: {
            answers: {
                type: Array,
                required: true,
            },
            questionNr: {
                type: Number,
                required: true,
            },
        },
        methods: {
            async saveAnswer(position){
                const userId = localStorage.getItem('User');

                if(!userId){
                    console.error("UserID nicht im localStorage gefunden!");
                    return;
                }

                const answer = this.answers[position].text;

                try{
                    await axios.post(`${backend}/setAnswer`, {
                        userId,
                        position: this.questionNr,
                        answer
                    });
                    console.log('Antwort erfolgreich gespeichert!');
                    this.$emit('answerSelected')
                }
                catch (error){
                    console.error('Fehler beim speichern der Antwort!', error)
                }
            }
        }
    };
</script>
