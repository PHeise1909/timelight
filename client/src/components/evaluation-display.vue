<template>
    <div class="container">
      <div class="content">
        <div class="text-container">
          <h1 class="text">
            Vielen Dank<br>
            für deine
          </h1>
          <h1 class="title">
            Antwort
          </h1>          
          <h1 class="bottom-right">
            Gleich gehts weiter...
          </h1>
        </div>
      </div>
    </div>
    <a href="https://www.imis.uni-luebeck.de/de/datenschutz" class="privacy-link">Datenschutz</a>
  </template>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    background-color: rgb(108,21,173);
    color: white; 
    background-image: url(@/assets/Allgemein/PolygonEvaluation.png);
    background-position: center;
    background-size: 90%;
  }
  
  .content {
    text-align: center;
    font-family: 'Bebas Neue', sans-serif;
    text-transform: uppercase;
    text-align: center;
  }
  
  .text {
    font-size: 2em;
    font-size: xx-large;
    line-height: 1.3;
  }
  
  .title {
    font-size: 4em;
  }
  
  .bottom-right {
    position: relative;
    vertical-align: bottom;
  }
  .privacy-link{
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    text-decoration: none;
    font-size: 20px;
  }
  </style>
  
  <script>
  export default {
    data() {
      return {};
    },
  };
  </script>
  