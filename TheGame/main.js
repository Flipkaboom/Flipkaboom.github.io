
function preload() {
  images = [];
  images.length = 0;
  for(var i = 0; i < 75;  i++){
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
  scene = "arcade";
  drawList = [];
  functionList = [];
  animList = [];
  frames = 0;

//array

  scenes = [];
    scenes.arcade = {
      background:images[0],
      coinBagFunction(){
        if(this.hover == true){
          this.invisible = false;
          scenes.arcade.coin.invisible = false;
          sounds[2].play();
        }
        if(this.hover == false){
          this.invisible = true;
          if(scenes.arcade.coin.x > this.x && scenes.arcade.coin.x < this.x + this.width ){
            scenes.arcade.coin.invisible = true;
          }
        }
      },
      startButton:new Item(751,424,images[3],function(){if(frames == 0){this.invisible = false; sounds[1].play();}else if(frames == 30){this.invisible = true;}},0,0,false,0,0,255)
    };
//beginscene------------------------------------------------------------------
    scenes.arcade.coinBag = new MouseHover(1515,249,images[2],scenes.arcade.coinBagFunction,333,505,true,0,0,255);
    scenes.arcade.coin = new Draggable(1688,619,images[1],0,0,true,function(){if(this.x + (0.5*this.width) < scenes.arcade.coinBag.x || this.x + this.width > scenes.arcade.coinBag.x + scenes.arcade.coinBag.width || this.y < scenes.arcade.coinBag.y || this.y + this.height > scenes.arcade.coinBag.y + scenes.arcade.coinBag.height){this.invisible = false;}},0,0,255);
    scenes.arcade.coinslot = new Target(1225,923,0,function(){nextScene("opening");},scenes.arcade.coin,120,140,0,0,255);
//----------------------------------------------------------------------------
    scenes.opening = {
      background:images[23]
    };

    scenes.opening.intro = new Item(0,-80,images[23],function(){if(this.currentImg == 48 && this.animTimer > 0){this.animTimer = -1000; setTimeout(nextScene,1000,"desert");}},0,0,false,25,8,255);
//----------------------------------------------------------------------------

  scenes.desert = {
    background:images[49]
  };
  scenes.desert.pump = new Item(0,0,images[55],function(){if(this.active != true){this.animTimer = 0;}},0,0,false,7,10,255);
  scenes.desert.oil = new Item(1406,663,images[52],0,0,0,true,2,5,225);
  scenes.desert.lever = new Clickable(1672,407,images[51],function(){this.image = images[50]; scenes.desert.pump.active = true;setTimeout(function(){scenes.desert.oil.invisible = false;},1500); setTimeout(function(){scenes.desert.oilBarrelFalling.invisible = false;},2300); setTimeout(function(){scenes.desert.arrow.invisible = false;},700);},0,0,false,0,0,255);
  scenes.desert.oilBarrelFalling = new Item(1627,-362,images[69],function(){if(this.invisible == false && this.y < 662){this.y += 30;}else if(this.invisible == false){this.invisible = true; scenes.desert.oilBarrel.invisible = false;}},0,0,true,0,0,255);
  scenes.desert.oilBarrel = new Draggable(1627,690,images[69],0,0,true,function(){if(this.invisible == true){this.x = 1627; this.y = 690;}},0,0,255);
  scenes.desert.oilBarrelRefinery = new Item(1254,606,images[63],function(){if(this.invisible == true){this.animTimer = -1;}else if(this.currentImg == 68){this.animTimer = -1; setTimeout(function(){scenes.desert.arrowNext.invisible = false;},2000);}},0,0,true,5,10,255);
  scenes.desert.arrow = new Item(1152,796,images[70],function(){if(this.invisible == true){this.animTimer = 0;}},0,0,true,3,10,255);
  scenes.desert.refineryStation = new Target(1255,611,0,function(){scenes.desert.oilBarrelRefinery.invisible = false; scenes.desert.oilBarrel.invisible = true;},scenes.desert.oilBarrel,256,351,false,0,0,255);
  scenes.desert.arrowNext = new Clickable(1734,938,images[74],function(){nextScene("distillation");},0,0,true,0,0,255);
//----------------------------------------------------------------------------
    scenes.distillation = {
      background:images[4]
    };
    scenes.distillation.oilBarrel = new Draggable(1566,665,images[6],0,0,false,0,0,0,255);
    scenes.distillation.destillationTower = new Item(55,49,images[15],function(){if(this.invisible != true && this.opacity < 250){this.opacity += 10; console.log("hi");}else if(this.opacity == 250){this.opacity = 255;}},0,0,true,1,120,50);
    scenes.distillation.ovenOn = new Item(763,734,images[8],0,0,0,true,2,5,255);
    scenes.distillation.smoke = new Item (966,0,images[11],0,0,0,true,3,10,255);
    scenes.distillation.refineryStation = new Target(1147,600,0,function(){if(this.toggled != true){furnaceOn(); this.toggled = true;}},scenes.distillation.oilBarrel,256,351,false,0,0,255);
    scenes.distillation.arrow = new Item(1082,774,images[18],function(){if(this.invisible == true){this.animTimer = 0;}},0,0,true,3,10,255);
    scenes.distillation.arrow2 = new Item(523,628,images[18],function(){if(this.invisible == true){this.animTimer = 0;}},0,0,true,3,10,255);
    scenes.distillation.info = new Item(476,-465,images[22],function(){if(this.y < 23 && this.invisible != true){this.y += 20;}},0,0,true,0,0,255); //23
    scenes.distillation.pijl = new Clickable(30,938,images[7],function(){nextScene();},0,0,true,0,0,255);
//2e scene---------------------------------------------------------------------
scenes[2] = {
  background:images[1]
}
  // scenes[2].molecule[0] = new Draggable(x,y,i,w,h,inv,f,a,as,o);
  // scenes[2].molecule[1] = new Draggable(x,y,i,w,h,inv,f,a,as,o);
  // scenes[2].molecule[2] = new Draggable(x,y,i,w,h,inv,f,a,as,o);
  // scenes[2].molecule[3] = new Draggable(x,y,i,w,h,inv,f,a,as,o);
  // scenes[2].molecule[4] = new Draggable(x,y,i,w,h,inv,f,a,as,o);
  // scenes[2].molecule[5] = new Draggable(x,y,i,w,h,inv,f,a,as,o);
  // scenes[2].molecule[6] = new Draggable(x,y,i,w,h,inv,f,a,as,o);
  // scenes[2].molecule[7] = new Draggable(x,y,i,w,h,inv,f,a,as,o);
  // scenes[2].molecule[8] = new Draggable(x,y,i,w,h,inv,f,a,as,o);
  // scenes[2].molecule[9] = new Draggable(x,y,i,w,h,inv,f,a,as,o);

  // scenes[2].target[0] = new Item(x,y,i,function(){snap();},50,50,true,0,0,o);
  // scenes[2].target[1] = new Item(x,y,i,function(){snap();},50,50,true,0,0,o);
  // scenes[2].target[2] = new Item(x,y,i,function(){snap();},50,50,true,0,0,o);
  // scenes[2].target[3] = new Item(x,y,i,function(){snap();},50,50,true,0,0,o);
  // scenes[2].target[4] = new Item(x,y,i,function(){snap();},50,50,true,0,0,o);
  // scenes[2].target[5] = new Item(x,y,i,function(){snap();},50,50,true,0,0,o);
  // scenes[2].target[6] = new Item(x,y,i,function(){snap();},50,50,true,0,0,o);
  // scenes[2].target[7] = new Item(x,y,i,function(){snap();},50,50,true,0,0,o);
  // scenes[2].target[8] = new Item(x,y,i,function(){snap();},50,50,true,0,0,o);
  // scenes[2].target[9] = new Item(x,y,i,function(){snap();},50,50,true,0,0,o);





    // scenes[2].oven = new Target(x,y,i,f,r,w,h,inv);
    // scenes[2].polyetheen = new Draggable(x,y,i,w,h,inv,f);
    // scenes[2].infoPolyetheen = new MouseHover(x,y,i,f,w,h,inv);
//3e scene----------------------------------------------------------------------


    //MouseHover (x,y,i,f,w,h,inv,a,as,o)
    //Clickable (x,y,i,f,w,h,inv,a,as,o)
    //Draggable (x,y,i,w,h,inv,f,a,as,o)
    //Target (x,y,i,f,r,w,h,inv,a,as,o)
    //Item (x,y,i,f,w,h,inv,a,as,o)

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
  scenes.distillation.background = images[5];
  scenes.distillation.oilBarrel.invisible = true;
  setTimeout(furnaceOn15,300);
}
function furnaceOn15(){
  scenes.distillation.arrow.invisible = false;
  setTimeout(furnaceOn2,700);
}

function furnaceOn2(){
  sounds[4].play();
  scenes.distillation.ovenOn.invisible = false;

  setTimeout(furnaceOn25,300);
}
function furnaceOn25(){
    scenes.distillation.smoke.invisible = false;
  setTimeout(furnaceOn26,900);
}
function furnaceOn26(){
  scenes.distillation.arrow2.invisible = false;
  setTimeout(furnaceOn3,1100);
}

function furnaceOn3(){
  scenes.distillation.destillationTower.currentImg = scenes.distillation.destillationTower.startImage;
  scenes.distillation.destillationTower.invisible = false;
  setTimeout(furnaceOn35,3000);
}
function furnaceOn35(){
  scenes.distillation.info.invisible = false;
  setTimeout(furnaceOn4,3000);
}

function furnaceOn4(){
  scenes.distillation.pijl.invisible = false;
}


function nextScene(a){
  scenes[scene].background = images[17];
  drawList.length = 0;
  functionList.length = 0;
  setTimeout(nextScene2,500,a);
}
function nextScene2(a){
  scene = a;
  addToLists();
  for(var i = 0; i < sounds.length; i++){
    sounds[i].pause();
  }
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

  function achtergrondMuziek() {
    if (scene > 0 ) {
      sounds[0].play();
    }
  }

function animationFunction(){
    // if(this.animLength == 1){console.log(this.animTimer);}
if(this.animTimer > this.animSpeed){

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
    push();
    if(obj.opacity != 255){
      tint(255,obj.opacity);
    }
    image(obj.image,obj.x,obj.y);
    pop();
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
  constructor(x,y,i,f,w,h,inv,a,as,o){
    this.x = x;
    this.y = y;
    this.image = i;
    this.function = f;
    this.invisible = inv;
    this.hover = false;
    this.animLength = a;
    this.animSpeed = as;
    this.opacity = o;
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
  constructor(x,y,i,f,w,h,inv,a,as, o){
    this.x = x;
    this.y = y;
    this.image = i;
    this.function = f;
    this.invisible = inv;
    this.animLength = a;
    this.animSpeed = as;
    this.opacity = o;
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
  constructor(x,y,i,w,h,inv,f,a,as, o){
    this.x = x;
    this.y = y;
    this.image = i;
    this.invisible = inv;
    this.function = f;
    this.animLength = a;
    this.animSpeed = as;
    this.opacity = o;
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
  constructor(x,y,i,f,r,w,h,inv,a,as, o){
    this.x = x;
    this.y = y;
    this.image = i;
    this.requirement = r;
    this.function = f;
    this.invisible = inv;
    this.animLength = a;
    this.animSpeed = as;
    this.opacity = o;
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
  constructor(x,y,i,f,w,h,inv,a,as,o){
    this.x = x;
    this.y = y;
    this.image = i;
    this.loop = f;
    this.invisible = inv;
    this.animLength = a;
    this.animSpeed = as;
    this.opacity = o;
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
