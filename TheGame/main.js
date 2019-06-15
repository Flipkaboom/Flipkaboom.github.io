
function preload() {
  images = [];
  images.length = 0;
  for(var i = 0; i < 17;  i++){
    images.push(loadImage("images/" + i + ".png"));
  }
  sounds = [];
  sounds.length = 0;
  for(var i = 0; i < 5; i++){
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
  animList = [];
  frames = 0;
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
      startButton:new Item(751,424,images[3],function(){if(frames == 0){this.invisible = false; geluidScene1();}else if(frames == 30){this.invisible = true;}},0,0,false,0,0)
    }
//beginscene------------------------------------------------------------------
    scenes[0].coinBag = new MouseHover(1515,249,images[2],scenes[0].coinBagFunction,333,505,true,0,0);
    scenes[0].coin = new Draggable(1688,619,images[1],0,0,true,function(){if(this.x + (0.5*this.width) < scenes[0].coinBag.x || this.x + this.width > scenes[0].coinBag.x + scenes[0].coinBag.width || this.y < scenes[0].coinBag.y || this.y + this.height > scenes[0].coinBag.y + scenes[0].coinBag.height){this.invisible = false;}},0,0);
    scenes[0].coinslot = new Target(1225,923,0,function(){nextScene();},scenes[0].coin,120,140,0,0);
//----------------------------------------------------------------------------
    scenes[1] = {
      background:images[4]
    }
    scenes[1].oilBarrel = new Draggable(1566,665,images[6],0,0,0,false,0,0);
    scenes[1].destillationTower = new Item(81,67,images[7],0,0,0,true,1,60);
    scenes[1].ovenOn = new Item(695,708,images[8],0,0,0,false,3,1);
    scenes[1].smoke = new Item (966,0,images[11],0,0,0,true,4,10);
    scenes[1].refineryStation = new Target(1147,600,0,function(){furnaceOn();},scenes[1].oilBarrel,256,351,false,0,0);
    scenes[1].pijl = new Clickable(30,938,images[15],function(){clickedOnArrow();},0,0,true,0,0);
//2e scene---------------------------------------------------------------------
scenes[2] = {
  background:images[1]
}
    // scenes[2].oven = new Target(x,y,i,f,r,w,h,inv);
    // scenes[2].polyetheen = new Draggable(x,y,i,w,h,inv,f);
    // scenes[2].infoPolyetheen = new MouseHover(x,y,i,f,w,h,inv);
//3e scene----------------------------------------------------------------------


    //MouseHover (x,y,i,f,w,h,inv,a,as)
    //Clickable (x,y,i,f,w,h,inv,a,as)
    //Draggable (x,y,i,w,h,inv,f,a,as)
    //Target (x,y,i,f,r,w,h,inv,a,as)
    //Item (x,y,i,f,w,h,inv,a,as)

    addToLists();

    //einde setup
}

function clickedOnArrow(){

  nextScene();
}

function furnaceOn(){
  sounds[4].play();
  scenes[1].background = images[5];
  scenes[1].oilBarrel.invisible = true;
  scenes[1].destillationTower.invisible = false;
  scenes[1].ovenOn.invisible = false;
  scenes[1].smoke.invisible = false;
  scenes[1].pijl.invisible = false;
}


function nextScene(){
  drawList.length = 0;
  functionList.length = 0;
  scenes[scene].background = images[16];
  setTimeout(nextScene2,500);
}
function nextScene2(){
  scene++;
  addToLists();
  sounds[3].play();
}

function addToLists(){
  for (var property in scenes[scene]) {
    try{
      scenes[scene][property].addLists();
    }
    catch{

    }
  }
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

var animation = function animationFunction(){

if(this.animSpeed < this.animTimer){
  this.currentImg++;
  this.animTimer = 0;
    if (this.currentImg > this.animLength + this.startImage){
      this.currentImg = this.startImage;
    }
  this.image = this.currentImg;
  }
  this.animTimer++;
}

function draw(){
  frames++;
  // console.log(frames);
  if(frames==60){
    frames = 0;
  }

  background(scenes[scene].background);
  for(var i = 0; i < functionList.length; i++){
      functionList[i].loop();
  }
  for(var i = 0; i < drawList.length; i++){
      render(drawList[i]);
  }
  for(var i = 0; i < animList.length; i++){
      animList[i].animFunction();
  }
  // fill("black");
  // rect(1225,923,120,140);
  // sounds[3].play();
}

function render(obj){
  if(obj.invisible != true){
    image(obj.image,obj.x,obj.y);
  }
}

function addLists(obj){
  if(obj.image != 0){
    drawList.push(obj);
  }
  if(obj.loop != 0){
    functionList.push(obj);
  }
  if(obj.animLength != 0){
    animList.push(obj);
    obj.animFunction = animation;
    obj.startImage = images.indexOf(obj.image);
    obj.currentImg = startImage
    obj.animTimer = 0;
  }
}
//class
class MouseHover{
  constructor(x,y,i,f,w,h,inv,a,as){
    this.x = x;
    this.y = y;
    this.image = i;
    this.function = f;
    this.invisible = inv;
    this.hover = false;
    this.animLength = a;
    this.animSpeed = as;
    if(this.image != 0){
      this.width = this.image.width;
      this.height = this.image.height;
    }else{
      this.width = w;
      this.height = h;
    }

  }
  addLists(){
    addLists(this);
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
  constructor(x,y,i,f,w,h,inv,a,as){
    this.x = x;
    this.y = y;
    this.image = i;
    this.function = f;
    this.invisible = inv;
    this.animLength = a;
    this.animSpeed = as;
    this.mice = false;
    if(this.image != 0){
      this.width = this.image.width;
      this.height = this.image.height;
    }else{
      this.width = w;
      this.height = h;
    }
  }
  addLists(){
    addLists(this);
  }
  loop(){
    if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height && mouseIsPressed && this.mice == false){
      this.function();
      this.mice = true;
    }else if(mouseIsPressed == false){
      this.mice = false;
    }
  }
}
class Draggable{
  constructor(x,y,i,w,h,inv,f,a,as){
    this.x = x;
    this.y = y;
    this.image = i;
    this.invisible = inv;
    this.function = f;
    this.animLength = a;
    this.animSpeed = as;
    if(this.image != 0){
      this.width = this.image.width;
      this.height = this.image.height;
    }else{
      this.width = w;
      this.height = h;
    }
  }
  addLists(){
    addLists(this);
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
  constructor(x,y,i,f,r,w,h,inv,a,as){
    this.x = x;
    this.y = y;
    this.image = i;
    this.requirement = r;
    this.function = f;
    this.invisible = inv;
    this.animLength = a;
    this.animSpeed = as;
    if(this.image != 0){
      this.width = this.image.width;
      this.height = this.image.height;
    }else{
      this.width = w;
      this.height = h;
    }
  }
  addLists(){
    addLists(this);
  }
  loop(){
    this.checkRequirement();
  }
  checkRequirement(){
    if(this.requirement.x + (0.5 * this.requirement.width) > this.x && this.requirement.x + (0.5*this.requirement.width) < this.x + this.width && this.requirement.y + (0.5 * this.requirement.height) > this.y && this.requirement.y + (0.5*this.requirement.height) < this.y + this.height){
      this.function();
    }
  }
}

class Item{
  constructor(x,y,i,f,w,h,inv,a,as){
    this.x = x;
    this.y = y;
    this.image = i;
    this.loop = f;
    this.invisible = inv;
    this.animLength = a;
    this.animSpeed = as;
    if(this.image != 0){
      this.width = this.image.width;
      this.height = this.image.height;
    }else{
      this.width = w;
      this.height = h;
    }
  }
  addLists(){
    addLists(this);
  }
}

//setInterval(achtergrondMuziek,29000);
