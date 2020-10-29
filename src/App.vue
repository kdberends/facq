<template>
  <div id="app">
    <div id='answer' :style="styleGradient">
        <h1 v-if="ReplyToCompliment">
          <!--"<span class="actionText" v-touch:tap="changeAddressLevel" @click="changeAddressLevel">{{address}} </span> 
             <span class="actionText" v-touch:tap="toggleTeam" @click="toggleTeam">{{team}}</span>, 
             <span class="actionText" v-touch:tap="generateAnswer" @click="generateAnswer">{{grateful_expression}} {{demonstrative}} {{grateful_adjective}} {{grateful_subject}} {{grateful_object}}</span>"-->
            "<span class="actionText" @click="changeAddressLevel">{{address}} </span> 
             <span class="actionText" @click="toggleTeam">{{team}}</span>, 
             <span class="actionText" @click="generateAnswer">{{grateful_expression}} {{demonstrative}} {{grateful_adjective}} {{grateful_subject}} {{grateful_object}}</span>"
        </h1>
        <h1 v-else>
            "<span class="actionText">Thank your for your thought-provoking question. </span>"
        </h1>
        <div id="footer">
            <img id="facq_logo" src="../src/assets/logo.svg">
            <span>
            Response to <b>{{address_title}}</b> following a courteous opening remark.
            </span>
        </div>
    </div>
    <a href="https://github.com/kdberends/facq" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#511072; color:#DDD; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
  </div>
</template>

<script>
import library from './assets/library.json'

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    address_level: 3,
    grateful_expression: String,
    grateful_subject: String,
    grateful_object: String,
    grateful_adjective: String,
    complimentary_ajective: String,
    demonstrative: String,
    isSupervisor: false,
    LinGradRotation: 90,
    LinGradBlue: 100,
    BoxShadowH: 0,
    BoxShadowV: 0,
    ReplyToCompliment: true,
    library: library,
  }),
  computed: {
    team: function(){
      if (this.isSupervisor){
        return "supervisor"
      } else {
        return "opponent  "
      }
    },
    address: function(){
      if (this.address_level == 0){
        return "My dude"
      } else if (this.address_level == 1){
        return "Dear"
      } else if (this.address_level == 2){
        return "Learned"
      } else if (this.address_level == 3){
        return "Highly learned"
      } else {
        return "Your majesty the"
      }
    },
    address_title: function(){
      if (this.address_level == 0){
        return "a Dude"
      } else if (this.address_level == 1){
        return "a Master of Science"
      } else if (this.address_level == 2){
        return "a Doctor of Philosophy"
      } else if (this.address_level == 3){
        return "a Professor"
      } else {
        return "a member of the Royal House"
      } 
    },
    styleGradient: function() {
      return {
      '--lingradient': "linear-gradient("+this.LinGradRotation+"deg, rgba(227,19,19,1) 0%, rgba(9,9,121,1) 52%, rgba(0,212,255,1) "+this.LinGradBlue+"%)",
      '--boxshadow': this.BoxShadowH+"px "+this.BoxShadowV+"0px 30px 0px rgba(0,0,0,0.75)"}
    }
  },
  created() {this.generateAnswer()},
  mounted: function () {
    window.addEventListener('keypress', this.handleKeyPress)
    window.addEventListener('keyup', this.handleKeyDown)
    window.addEventListener('mousemove', this.handleMouseMove)
  },
  methods:{
    toggleTeam: function() {
    this.isSupervisor = !this.isSupervisor
    },
    changeAddressLevel () {
      if (this.address_level<4){
        this.address_level ++
      } else {
        this.address_level = 0
      }
    },
    generateAnswer() {
      this.grateful_expression = library.grateful_expressions[parseInt(Math.random()*library.grateful_expressions.length)];

      this.grateful_subject = library.grateful_subjects[parseInt(Math.random()*library.grateful_subjects.length)];

      this.grateful_object = library.grateful_objects[parseInt(Math.random()*library.grateful_objects.length)];

      this.demonstrative = library.demonstratives[parseInt(Math.random()*library.demonstratives.length)];

      this.grateful_adjective = library.grateful_adjectives[parseInt(Math.random()*library.grateful_adjectives.length)];
      
    },
    handleKeyPress: function(e) {
      if (e.keyCode==32){
        this.generateAnswer()
        e.preventDefault()
      }
    },
    handleKeyDown: function(e) {
      //37 is left, 39 is right, 38 up, 40 down
      console.log(e.keyCode)
      if (e.keyCode==37 || e.keyCode==39){
        //keyup 
        this.toggleTeam()
        e.preventDefault()
      } else if (e.keyCode==40){
        //keydown
        if (this.address_level >= 0){
          this.address_level--  
        }
      } else if (e.keyCode==38){
        if (this.address_level <=3){
          this.address_level++
        } 
      }
    },
    handleMouseMove: function(e) {
      let rect = document.getElementById("answer").getBoundingClientRect();
      
      let elx = rect.x+rect.width/2
      let ely = rect.y+rect.height/2

      let dx = elx-e.clientX
      let dy = ely-e.clientY

      let distance = Math.sqrt(dx*dx + dy*dy)
      let rad = 0
      let deg = 0
      if (dy > 0){
        rad = Math.atan(dx/dy)
        deg = -180/3.14*rad
      } else {
        rad = Math.atan(dx/dy)
        deg = 180-180/3.14*rad
      }
      

      this.LinGradRotation = parseInt(deg)
      this.LinGradBlue = distance/5 + 80
      this.BoxShadowH = dx/50
      this.BoxShadowV = dy/50
    }
  }
}
</script>

<style>
#app {
  display: flex;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: Commissioner, Ubuntu, Courier, Avenir, Helvetica, Arial, sans-serif;
}

#answer{
  background-color: #EEE;
  max-width: 420px;
  padding: 20px;
  margin: auto;
  margin-top: 100px;
  box-shadow: var(--boxshadow);
}

h1 {
  font-size: 5.5vh;
  background: var(--lingradient);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

#footer{
    display: flex;
    justify-content: space-between;
}

#footer span{
    font-size: 2.5vh;
    font-style: italic;
    text-align: right;
}

#facq_logo {
    position: relative;
    width: 40%;
}

.github-corner:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {
    0% {
        transform: rotate(0deg);
    }

    20% {
        transform: rotate(-25deg);
    }

    40% {
        transform: rotate(10deg);
    }

    60% {
        transform: rotate(-25deg);
    }

    80% {
        transform: rotate(10deg);
    }

    100% {
        transform: rotate(0deg);
    }
}

@media (max-width: 500px) {
    .github-corner:hover .octo-arm {
        animation: none;
    }

    .github-corner .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
    }
}

.actionText{
  border-bottom: 2px solid a;
  font-size: 5.5vh;
  transition: all 1s ease-out;
  -webkit-text-fill-color: transparent;
}

.touchActive{
  font-size: 6vh;
  transition: all 0s ease-out;
  -webkit-text-fill-color: #EEE;
}

body{
    background-color: #DDD;
}
</style>
