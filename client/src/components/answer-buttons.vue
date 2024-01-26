<template>
    <div class="answer-button-container">
        <v-btn size="large" class="mt-10" style="background-color: rgb(232,110,220); color:white" @click="saveAnswer(0)">{{this.answers[0].text}}</v-btn>
        <v-btn size="large" class="mt-10" style="background-color: rgb(197, 102, 255); color:white" @click="saveAnswer(1)">{{this.answers[1].text}}</v-btn>
        <v-btn size="large" class="mt-10" style="background-color: rgb(102,181,255); color:white" @click="saveAnswer(2)">{{this.answers[2].text}}</v-btn>
        <v-btn size="large" class="mt-10" style="background-color: rgb(79,199,78); color:white" @click="saveAnswer(3)">{{this.answers[3].text}}</v-btn>
    </div>
</template>

<style scoped> 
    .answer-button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .v-btn {
        width: 80%;
        margin-top: 10px;
    }
</style>

<script>
    import axios from 'axios';

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
                    await axios.post('http://localhost:3500/api/setAnswer', {
                        userId,
                        position: this.questionNr,
                        answer
                    });
                    console.log('Antwort erfolgreich gespeichert!');
                }
                catch (error){
                    console.error('Fehler beim speichern der Antwort!', error)
                }
            }
        }
    };
</script>
