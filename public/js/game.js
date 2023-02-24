(function () {
  const TAMX = 600;
  const TAMY = 800;
  const FPS = 100;

  const PROB_ENEMY_SHIP = 0.07;
  const PROB_DISCO = 0.05;
  const PROB_METEOR_BIG = 0.04;
  const PROB_METEOR_SMALL = 0.03;

  let space, ship,bullet;
  let enemies = [];
  //let disco = [];
  let bullets = [];
  var vidas = 1;

  function init() {
    space = new Space();
    ship = new Ship();
    //bullet = new Bullet();
    const interval = window.setInterval(run, 1000 / FPS);
  }

  let isPaused = false;
  let isOn = false;

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") ship.mudaDirecao(-1);
    else if (e.key === "ArrowRight") ship.mudaDirecao(+1);
    if (e.key == " ") bullets.push(new Bullet());
    if(e.key == "p") (function(){
      {
        if(isPaused){
          isPaused = false;
        }else{
          isPaused = true;
        }
      };
    })();
    


  });

  class Space {
    constructor() {
      this.element = document.getElementById("space");
      this.element.style.width = `${TAMX}px`;
      this.element.style.height = `${TAMY}px`;
      this.element.style.backgroundPositionY = "0px";  
    }
    move() {
      this.element.style.backgroundPositionY = `${
        parseInt(this.element.style.backgroundPositionY) + 1
      }px`;
    }
  }

  class Ship {
    constructor() {
      this.element = document.getElementById("ship");
      this.AssetsDirecoes = [
        "img/playerLeft.png",
        "img/player.png",
        "img/playerRight.png",
      ];
      this.direcao = 1;
      this.element.src = this.AssetsDirecoes[this.direcao];
      this.element.style.bottom = "20px";
      this.element.style.left = `${parseInt(TAMX / 2) - 50}px`;
    }
    mudaDirecao(giro) {
      if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
        this.direcao += giro;
        this.element.src = this.AssetsDirecoes[this.direcao];
      }
    }
    move() {
      console.log(this.element.style.left);
      if (this.direcao === 0 && this.element.style.left > '0px')
        this.element.style.left = `${parseInt(this.element.style.left) - 1}px`;
      if(this.direcao === 2 && parseInt(this.element.style.left) < parseInt(517))
        this.element.style.left = `${parseInt(this.element.style.left) + 1}px`;
      space.move();
    }

    
  }

  class Bullet {
    constructor(){
      this.direcao = 1;
      this.element = document.createElement("img");
      this.element.className = "laser-red";
      this.element.src = "img/laserRed.png";
      this.element.style.bottom = "100px";
      const nav= document.getElementById('ship');
      const pos = `${parseInt(nav.offsetLeft)+44}px`;
      //console.log(pos);
      //
      this.element.style.left =  pos;
      space.element.appendChild(this.element);
      
    }
    
    move() {
      this.element.style.bottom = `${parseInt(this.element.style.bottom) + 2}px`;
      
      for(var i=0;i<enemies.length;i++){
        if(enemies[i].element.classList.contains('enemy-ship')){
          var inimigos = document.getElementsByClassName("enemy-ship");
          const p = 50;
          colide(this.element, inimigos,p);
        }else if(enemies[i].element.classList.contains('enemy-ufo')){
          var inimigos = document.getElementsByClassName("enemy-ufo");
          const p = 20;
          colide(this.element,inimigos,p);
        }else if(enemies[i].element.classList.contains('meteor-big')){
          var inimigos = document.getElementsByClassName("meteor-big");
          const p= 10;
          colide(this.element,inimigos,p);
        }
        else if(enemies[i].element.classList.contains('meteor-small')){
          var inimigos = document.getElementsByClassName("meteor-small");
          const p = 100;
          colide(this.element,inimigos,p);
        }
      }

      
    }
  }
  function colide(bala, inimigos,p){
    for(var i=0; i < inimigos.length; i++){
      var inimigo = inimigos[i];
      if(inimigo != undefined){
        var inimigoA = inimigo.getBoundingClientRect();
        var balaA = bala.getBoundingClientRect();

        if (
          balaA.left >= inimigoA.left &&
          balaA.right <= inimigoA.right &&
          balaA.top <= inimigoA.top &&
          balaA.bottom <= inimigoA.bottom
        ){
          inimigo.src = 'img/laserRedShot.png';
          document.getElementById("points").innerHTML =
          parseInt(document.getElementById("points").innerHTML) + p;
          space.element.removeChild(bala);
          a = setTimeout(()=>{
            space.element.removeChild(inimigo);
          },100);
        }

      }
    }
  }


  class EnemyShip {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "enemy-ship";
      this.element.src = "img/enemyShip.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
    }
    move() {
      
      this.element.style.top = `${parseInt(this.element.style.top) + 2}px`;
      if(this.element.style.top === `${TAMY}px`){
        document.getElementById('ship').src = 'img/playerDamaged.png';
        const a = setInterval(()=>{
          document.getElementById('ship').src = 'img/player.png';
        },5000);
        space.element.removeChild(this.element);
          if(vidas>3){
            window.location.href = '/game_over'
          }else{
            document.getElementById('img' + vidas).src="";
            vidas++;
          }
        }
    }
    
    
    
  }
  class EnemyUFO {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "enemy-ufo";
      this.element.src = "img/enemyUFO.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
    }
    move() {
      this.element.style.top = `${parseInt(this.element.style.top) + 2}px`;
      if(this.element.style.top === `${TAMY}px`){
        space.element.removeChild(this.element);
          if(vidas>=3){
            window.location.href = '/game_over'
          }else{
            document.getElementById('img' + vidas).src="";
            vidas++;
          }
        }
    }
  }
  class MeteorBig {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "meteor-big";
      this.element.src = "img/meteorBig.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
    }
    move() {
      this.element.style.top = `${parseInt(this.element.style.top) + 2}px`;
      if(this.element.style.top === `${TAMY}px`){
        space.element.removeChild(this.element);
          if(vidas>=3){
            window.location.href = '/game_over'
          }else{
            document.getElementById('img' + vidas).src="";
            vidas++;
          }
        }
    }
  }
  class MeteorSmall {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "meteor-small";
      this.element.src = "img/meteorSmall.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
    }
    move() {
      this.element.style.top = `${parseInt(this.element.style.top) + 2}px`;
      if(this.element.style.top === `${TAMY}px`){
        space.element.removeChild(this.element);
          if(vidas>=3){
            window.location.href = '/game_over'
          }else{
            document.getElementById('img' + vidas).src="";
            vidas++;
          }
        }
    }
  }
 

  function run() {

    if(isPaused){
      return 0;
    }

    const random_enemy_ship = Math.random() * 100;
    if (random_enemy_ship <= PROB_ENEMY_SHIP) {
      enemies.push(new EnemyShip());
    }
    const random_enemy_ufo = Math.random()*100;
    if(random_enemy_ufo <= PROB_DISCO){
      enemies.push(new EnemyUFO());
    }
    const random_meteor_big = Math.random()*100;
    if(random_meteor_big <= PROB_METEOR_BIG){
      enemies.push(new MeteorBig());
    }
    const random_meteor_small = Math.random()*100;
    if(random_meteor_big <= PROB_METEOR_SMALL){
      enemies.push(new MeteorSmall());
    }
    
    enemies.forEach((e) => e.move());
    bullets.forEach((e)=>e.move());
    ship.move();
    //bullet.move();
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === " "){
      isOn = true;
    }
  });
  
   init();
 

})();
