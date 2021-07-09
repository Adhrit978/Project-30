const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground;
var tower1;
var tower2;
var bridge;
var link;
var towerlink;
var stones=[];
var backgroundimage;
var button;
var buttoncircle;
var ground1;
var ground2;
var ground3;

function preload() {
  backgroundimage=loadImage("background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground=new Base(0, height-4, width, 50);
  ground1=new Base(width/2, height-4, width, 50);
  ground2=new Base(width/2+width/4, height-4, width, 50);
  ground3=new Base(width/2+width/3, height-4, width, 50);

  bridge=new Bridge(28, {x:0, y:250});

  towerlink=new Base(width-100, 270, 20, 20);

  Matter.Composite.add(bridge.body, towerlink);
  link=new Link(bridge, towerlink);

  for (let i=0; i<=10; i++) {
    var x=random(width/2+170, width/2-170);
    var y=random(70, 100);
    var stone=new Stone(x, y, 30);
    stones.push(stone);
  }

  button=createImg('axe.png');
  button.position(width-228, height/2-35);
  button.size(50, 50);
  button.mouseClicked(dropstones);
}

function draw() {
  background(backgroundimage);
  Engine.update(engine);

  bridge.show();

  for (let i=0; i<=10; i++) {
    stones[i].display();
  }

  noStroke();
  fill("green");
  ellipse(width-200, height/2-12, 31);
}

function dropstones() {
  link.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
