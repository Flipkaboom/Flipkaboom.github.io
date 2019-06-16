
function preload() {
  images = [];
  images.length = 0;
  for(var i = 0; i < 23;  i++){
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
    scenes[1].destillationTower = new Item(55,49,images[15],0,0,0,true,1,120);
    scenes[1].ovenOn = new Item(763,734,images[8],0,0,0,true,2,5);
    scenes[1].smoke = new Item (966,0,images[11],0,0,0,true,3,10);
    scenes[1].refineryStation = new Target(1147,600,0,function(){furnaceOn();},scenes[1].oilBarrel,256,351,false,0,0);
    scenes[1].arrow = new Item(1082,774,images[18],0,0,0,true,3,10);
    scenes[1].arrow2 = new Item(523,628,images[18],0,0,0,true,3,10);
    scenes[1].info = new Item(476,23,images[22],0,0,0,true,0,0);
    scenes[1].pijl = new Clickable(30,938,images[7],function(){nextScene();},0,0,true,0,0);
//2e scene---------------------------------------------------------------------
scenes[2] = {
  background:images[1]
}
  // scenes[2].molecule[0] = new Draggable(x,y,i,w,h,inv,f,a,as);
  // scenes[2].molecule[1] = new Draggable(x,y,i,w,h,inv,f,a,as);
  // scenes[2].molecule[2] = new Draggable(x,y,i,w,h,inv,f,a,as);
  // scenes[2].molecule[3] = new Draggable(x,y,i,w,h,inv,f,a,as);
  // scenes[2].molecule[4] = new Draggable(x,y,i,w,h,inv,f,a,as);
  // scenes[2].molecule[5] = new Draggable(x,y,i,w,h,inv,f,a,as);
  // scenes[2].molecule[6] = new Draggable(x,y,i,w,h,inv,f,a,as);
  // scenes[2].molecule[7] = new Draggable(x,y,i,w,h,inv,f,a,as);
  // scenes[2].molecule[8] = new Draggable(x,y,i,w,h,inv,f,a,as);
  // scenes[2].molecule[9] = new Draggable(x,y,i,w,h,inv,f,a,as);

  // scenes[2].target[0] = new Item(x,y,i,function(){snap();},50,50,true,0,0);
  // scenes[2].target[1] = new Item(x,y,i,function(){snap();},50,50,true,0,0);
  // scenes[2].target[2] = new Item(x,y,i,function(){snap();},50,50,true,0,0);
  // scenes[2].target[3] = new Item(x,y,i,function(){snap();},50,50,true,0,0);
  // scenes[2].target[4] = new Item(x,y,i,function(){snap();},50,50,true,0,0);
  // scenes[2].target[5] = new Item(x,y,i,function(){snap();},50,50,true,0,0);
  // scenes[2].target[6] = new Item(x,y,i,function(){snap();},50,50,true,0,0);
  // scenes[2].target[7] = new Item(x,y,i,function(){snap();},50,50,true,0,0);
  // scenes[2].target[8] = new Item(x,y,i,function(){snap();},50,50,true,0,0);
  // scenes[2].target[9] = new Item(x,y,i,function(){snap();},50,50,true,0,0);





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

 // function snap(obj){
 //   for(i = 0; i < 10; i++){
 //          if(scenes[2].molecule[i].x + 0.5*scenes[2].molecule[i].width > scene[2].target[i].x && scenes[2].molecule[i].x < scene[2].target[i].x + scene[2].target[i].width && scenes[2].molecule[i].y + 0.5*scenes[2].molecule.height > scenes[2].target[i].y && scenes[2].molecule[i].y < scenes[2].target[i].y + scene[2].target[i].height ){
 //          scenes[2].molecule[i].x = -200;
 //          obj.target[i].invisible = false;
 //        }
 //      }
 //   }


function furnaceOn(){
  scenes[1].background = images[5];
  scenes[1].oilBarrel.invisible = true;
  setTimeout(furnaceOn15,300);
}
function furnaceOn15(){
  scenes[1].arrow.invisible = false;
  setTimeout(furnaceOn2,700);
}

function furnaceOn2(){
  sounds[4].play();
  scenes[1].ovenOn.invisible = false;

  setTimeout(furnaceOn25,300);
}
function furnaceOn25(){
    scenes[1].smoke.invisible = false;
  setTimeout(furnaceOn26,900);
}
function furnaceOn26(){
  scenes[1].arrow2.invisible = false;
  setTimeout(furnaceOn3,1100);
}

function furnaceOn3(){
  scenes[1].destillationTower.invisible = false;
  setTimeout(furnaceOn35,3000);
}
function furnaceOn35(){
  scenes[1].info.invisible = false;
  setTimeout(furnaceOn4,3000);
}

function furnaceOn4(){
  scenes[1].pijl.invisible = false;
}


function nextScene(){
  scenes[scene].background = images[17];
  drawList.length = 0;
  functionList.length = 0;
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
    catch(error){

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

function animationFunction(){
    console.log(this.animTimer);
if(this.animSpeed < this.animTimer){

  this.currentImg++;
  this.animTimer = 0;
    if (this.currentImg > this.animLength + this.startImage){
      this.currentImg = this.startImage;
    }
  this.image = images[this.currentImg];
  }
  this.animTimer++;
}

function draw(){
  frames++;
  // console.log(frames);
  if(frames==60){
    frames = 0;
  }

  for(var i = 0; i < functionList.length; i++){
      functionList[i].loop();
  }
  background(scenes[scene].background);
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
    obj.animFunction = animationFunction;
    console.log("1");
    obj.startImage = images.indexOf(obj.image);
    console.log("2");
    obj.currentImg = obj.startImage;
    console.log("3")
    obj.animTimer = 0;
    console.log("4")
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
