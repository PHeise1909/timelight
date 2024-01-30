<template>
    <div class="landing-page">
      <div class="content">
        <div>
          <h1 class="willkommen">
            Willkommen<br>
            bei
          </h1>
          <h1 class="title">
            Timelight
          </h1>
          <img src="@/assets/Allgemein/EMI-Surfing.png" class="image">
          
          <h1 class="bottom-right">
            Gleich gehts los...
          </h1>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .landing-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    background-image: url(@/assets/Allgemein/Background-highRes.png);
    background-size: cover;
    color: white; 
  }
  
  .content {
    text-align: center;
    font-family: 'Bebas Neue', sans-serif;
    text-transform: uppercase;
    text-align: center;
  }
  
  .image{
    max-width: 90%;
    padding-bottom: 1vh;;
  }

  .willkommen {
    font-size: 2em;
    font-size: xx-large;
    line-height: 1.3;
  }

  .title {
    font-size: 4em;
    font: size 4em;;
  }

  .bottom-right{
    position: relative;
    vertical-align: bottom;
  }
  
  </style>
  
  <script>
    export default {
        data() {
            return {
            };
        },
    };
  </script>
  