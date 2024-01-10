<template>
    <div class="answer-button-container">
        <v-btn size="large" class="mt-10" style="background-color: rgb(232,110,220); color:white">{{this.answers[0].text}}</v-btn>
        <v-btn size="large" class="mt-10" style="background-color: rgb(197, 102, 255); color:white">{{this.answers[1].text}}</v-btn>
        <v-btn size="large" class="mt-10" style="background-color: rgb(102,181,255); color:white">{{this.answers[2].text}}</v-btn>
        <v-btn size="large" class="mt-10" style="background-color: rgb(79,199,78); color:white">{{this.answers[3].text}}</v-btn>
    </div>
</template>

<style scoped> 
    .answer-button-container{
        display:flex;
        flex-direction: column;
        justify-content: center;
    };
    .v-btn{
        margin-top: 100px;
        padding-top: 100px;
    }
</style>

<script>
    export default{
        props: {
            answers: {
                type: Array,
                required: true,
            },
        }
    };
</script>