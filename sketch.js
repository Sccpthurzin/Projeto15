var Trex;
var Trexanimacao
var TrexCollide

var Chao
var ChaoImagem

var Chaoinvisivel

var Nuvem
var NuvemImagem

var Obstaculos
var Obstaculo1
var Obstaculo2
var Obstaculo3
var Obstaculo4
var Obstaculo5
var Obstaculo6

var score=0;

var JOGAR=1
var FIM=0
var Estadodejogo=JOGAR

var VocePerdeu
var VocePerdeuImagem

var Botao
var BotaoImagem

var GrupoCactos
var Nuvens1

//Essa função e pré-carregamento de images e animações
function preload (){
  //loadAnimation carrega a animação
   Trexanimacao = loadAnimation("trex1.png","trex3.png","trex4.png");
   TrexCollide = loadAnimation("trex_collided.png");

   ChaoImagem = loadImage ("ground2.png");

   NuvemImagem = loadImage ("cloud.png");

  Obstaculo1 = loadImage ("obstacle1.png");
  Obstaculo2 = loadImage ("obstacle2.png");
  Obstaculo3 = loadImage ("obstacle3.png");
  Obstaculo4 = loadImage ("obstacle4.png");
  Obstaculo5 = loadImage ("obstacle5.png");
  Obstaculo6 = loadImage ("obstacle6.png");

  VocePerdeuImagem = loadImage ("gameOver.png");

  BotaoImagem = loadImage ("restart.png");
}

function setup (){
  
  createCanvas(600,200)

  Trex = createSprite (50,160,20,50);
  //addAnimation adiciona a animação
  Trex.addAnimation("Correndo",Trexanimacao);
  Trex.scale=0.5;
  //Sprite do chão
  Chao = createSprite (200,180,400,20);
  
  Chao.addImage(ChaoImagem);
  Chaoinvisivel = createSprite (200,190,600,10);
  Chaoinvisivel.visible=false;

   GrupoCactos=new Group();
   Nuvens1=new Group();

   VocePerdeu = createSprite(300,100);
   VocePerdeu.addImage(VocePerdeuImagem);
   VocePerdeu.scale=0.5;

   Botao = createSprite(300,140);
   Botao.addImage(BotaoImagem);
   Botao.scale=0.5;

}

function draw(){
  background("white")
  
  if (Estadodejogo==JOGAR){
    Chao.velocityX=-7;
    score = score + Math.round(frameCount/60);
    if (Chao.x<0){
      //Width e largura
      Chao.x = Chao.width/2;
    }
    if (keyDown("space")&& Trex.y>129){
      Trex.velocityY =-3;
   
   }
   
   //Gravidade
   Trex.velocityY = Trex.velocityY+0.5;

   gerarnuvens();
   gerarobstaculos();

   if (GrupoCactos.isTouching(Trex)){
        Estadodejogo=FIM;
   }
   VocePerdeu.visible=false
   Botao.visible=false
  }
  else
  
  if (Estadodejogo==FIM){
    Trex.changeAnimation ("Collider",TrexCollide);
    Chao.velocityX=0;
    GrupoCactos.setVelocityXEach(0);
    Nuvens1.setVelocityXEach(0);
    Trex.velocityY=0;
    GrupoCactos.setLifetimeEach(-1);
    Nuvens1.setLifetimeEach(-1);
    VocePerdeu.visible=true
    Botao.visible=true
  }

  text("Score: "+ score, 500,50);
//Raio de colisão
Trex.setCollider("Circle",0,0,46);
Trex.debug=true;
//Para colisão com o chão
Trex.collide (Chaoinvisivel);


 drawSprites();
}

function gerarnuvens(){
  if (frameCount%60==0){
    Nuvem = createSprite(600,100,40,10);
    Nuvem.velocityX=-7;
    Nuvem.addImage (NuvemImagem);
    Nuvem.scale=0.5;
    //Math trasforma o numero decimal em numero interio
    //E o random escolhe numeros aleatorios
    Nuvem.y=Math.round(random (50,200));
    //Depth e profundidade
    Nuvem.depth=Trex.depth;
    console.log(Nuvem.depth);
    console.log(Trex.depth);
    Trex.depth=Trex.depth+1;
    
    Nuvem.lifetime=120;

    Nuvens1.add(Nuvem);
  }
  

}

function gerarobstaculos(){
  if (frameCount%60==0){
  Obstaculos = createSprite(400,165,10,40);
  Obstaculos.velocityX=-7;
  Obstaculos.scale=0.4;
  Obstaculos.lifetime=120;
  GrupoCactos.add(Obstaculos);
  var valor=Math.round(random(1,6));
  switch(valor){
  case 1:

  Obstaculos.addImage(Obstaculo1);

  break;

  case 2:
  
  Obstaculos.addImage(Obstaculo2);

  break;

  case 3:

  Obstaculos.addImage(Obstaculo3);

  break;

  case 4:

  Obstaculos.addImage(Obstaculo4);

  break;

  case 5:

  Obstaculos.addImage(Obstaculo5);

  break;

  case 6:

  Obstaculos.addImage(Obstaculo6);

  break;
  default:break;
  
  }

  }



}