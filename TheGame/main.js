
function preload() {
  images = [];
  images.length = 0;
  for(var i = 0; i < 4;  i++){
    images.push(loadImage("images/" + i + ".png"));
  }
  sounds = [];
  sounds.length = 0;
  for(var i = 0; i < 3; i++){
    var b = new Audio("Sound/" + i + ".mp3");
    sounds.push(b);


  }
}

function setup(){
  canvas = createCanvas(1920,1080);
  angleMode(DEGREES);
  frameRate(60);

  scene = 0;
  drawList = [];
  functionList = [];


  setInterval(geluidScene1,1000);

//array

  scenes = []

    scenes[0] = {
      background:images[0],
      coinBagFunction(){
        if(this.hover == true){
          this.invisible = false;
          scenes[0].coin.invisible = false;
          sounds[2].play();
        }
        if(this.hover == false){
          this.invisible = true;
          if(scenes[0].coin.x > this.x && scenes[0].coin.x < this.x + this.width ){
            scenes[0].coin.invisible = true;
          }
        }
      },
      startButton:new Item(751,424,images[3],function(){if(frameCount % 60 == 0){this.invisible = false; geluidScene1();}else if(frameCount % 60 == 30){this.invisible = true;}},0,0,false)
    }

    scenes[0].coinBag = new MouseHover(1515,249,images[2],scenes[0].coinBagFunction,333,505,true);
    scenes[0].coin = new Draggable(1688,619,images[1],0,0,true,function(){if(this.x + (0.5*this.width) < scenes[0].coinBag.x || this.x + this.width > scenes[0].coinBag.x + scenes[0].coinBag.width || this.y < scenes[0].coinBag.y || this.y + this.height > scenes[0].coinBag.y + scenes[0].coinBag.height){this.invisible = false;}});
    scenes[0].coinslot = new Target(1300,953,0,0,scenes[0].coin);
}



  function geluidScene1(){
    if (scene == 0) {
      sounds[1].play();

    }
  }

  function achtergrondMuziek() {

    if (scene > 0 ) {
      sounds[0].play();


    }
  }

function draw(){
  background(images[0]);
  for(var i = 0; i < functionList.length; i++){
      functionList[i].loop();
  }
  for(var i = 0; i < drawList.length; i++){
      render(drawList[i]);
  }
  // fill("black");
  // rect(1515,249,333,505);
}

// function placeholderBewegen(){
//   if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
//   this.x = mouseX;
//   this.y = mouseY;
//
//   }
// }
function render(obj){
  if(obj.invisible != true){
    image(obj.image,obj.x,obj.y);
  }
}
//class
class MouseHover{
  constructor(x,y,i,f,w,h,inv){
    this.x = x;
    this.y = y;
    this.image = i;
    this.function = f;
    this.invisible = inv;
    if(this.image != 0){
      drawList.push(this);
      this.width = this.image.width;
      this.height = this.image.height;
    }else{
      this.width = w;
      this.height = h;
    }
    functionList.push(this);
  }
  loop(){
    if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
      this.hover = true;
    }else{
      this.hover = false;
    }
    this.function();
  }
}

class Clickable{
  constructor(x,y,i,f,w,h,inv){
    this.x = x;
    this.y = y;
    this.image = i;
    this.function = f;
    this.invisible = inv;
    if(this.image != 0){
      drawList.push(this);
      this.width = this.image.width;
      this.height = this.image.height;
    }else{
      this.width = w;
      this.height = h;
    }
    functionList.push(this);
  }
  loop(){
    //-----------------------------------------------------------------------------------------------
  }
}
class Draggable{
  constructor(x,y,i,w,h,inv,f){
    this.x = x;
    this.y = y;
    this.image = i;
    this.invisible = inv;
    this.function = f;
    if(this.image != 0){
      drawList.push(this);
      this.width = this.image.width;
      this.height = this.image.height;
    }else{
      this.width = w;
      this.height = h;
    }
    functionList.push(this);
  }
  loop(){
    if(mouseX > this.x  && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height && mouseIsPressed) {
      this.mice = true;
    }else if(this.mice == true && mouseIsPressed == false){
      this.mice = false;
    }

    if(this.mice == true){
      this.x = mouseX - 0.5*this.width;
      this.y = mouseY - 0.5*this.height;
    }
    if(this.function != 0){
      this.function();
    }
  }
}

class Target{
  constructor(x,y,i,f,r,w,h,inv){
    this.x = x;
    this.y = y;
    this.image = i;
    this.requirement = r;
    this.function = f;
    this.invisible = inv;
    if(this.image != 0){
      drawList.push(this);
      this.width = this.image.width;
      this.height = this.image.height;
    }else{
      this.width = w;
      this.height = h;
    }
    functionList.push(this);
  }
  loop(){
    this.checkRequirement();
  }
  checkRequirement(){
    if(this.requirement.x > this.x && this.requirement.x + this.requirement.width < this.x && this.requirement.y > this.y && this.requirement.y + this.requirement.height < this.y ){
      this.function();
    }
  }
}

class Item{
  constructor(x,y,i,f,w,h,inv){
    this.x = x;
    this.y = y;
    this.image = i;
    this.loop = f;
    this.invisible = inv;
    if(this.image != 0){
      drawList.push(this);
      this.width = this.image.width;
      this.height = this.image.height;
    }else{
      this.width = w;
      this.height = h;
    }
    if(this.loop != 0){
      functionList.push(this);
    }
  }
}

//setInterval(achtergrondMuziek,29000);
