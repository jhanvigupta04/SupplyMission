//creating all the variables that we will be using
var helicopterIMG, helicopterSprite, packageSprite, packageIMG;
var packageBody, ground, boxLeft, boxBottom, boxRight;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	//adding the images to the package and helicopter
	helicopterIMG=loadImage("helicopter.png")
	packageIMG = loadImage("package.png")
}

function setup() {
	//setting up the prerequisites for our game, ensuring that everything gets shown properly
	createCanvas(800, 700);
	rectMode(CENTER);

	//creating the package and its properties
	packageSprite = createSprite(width / 2, 80, 50, 50);
	packageSprite.addImage(packageIMG)
	packageSprite.scale = 0.2

	//creating the helicopter and its properties

	helicopterSprite = createSprite(width / 2, 200, 10, 10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale = 0.6

	//creating the ground and its properties
	groundSprite = createSprite(width / 2, height - 35, width, 10);
	groundSprite.shapeColor = color(255)

	//creating the box and its parts as sprites
	boxLeft = createSprite(310, 600, 20, 100);
	boxLeft.shapeColor = rgb(255, 0, 0);

	boxBottom = createSprite(400, 650, 200, 20);
	boxBottom.shapeColor = rgb(255, 0, 0);

	boxRight = createSprite(490, 600, 20, 100);
	boxRight.shapeColor = rgb(255, 0, 0);

	//setting up the engine and world
	engine = Engine.create();
	world = engine.world;

	//making the packagebody and adding it to the world
	packageBody = Bodies.circle(width / 2, 200, 5, { restitution: 0.5, isStatic: true });
	World.add(world, packageBody);

	//creating the box and its parts for the Bodies, then adding them to the world
	boxLeft = Bodies.rectangle(310, 600, 20, 100, { isStatic: true });
	World.add(world, boxLeft);
	boxBottom = Bodies.rectangle(400, 650, 200, 20, { isStatic: true });
	World.add(world, boxBottom);
	boxRight = Bodies.rectangle(490, 600, 20, 100, { isStatic: true });
	World.add(world, boxRight);


	//create a Ground

	ground = Bodies.rectangle(width / 2, 650, width, 10, { isStatic: true });
	World.add(world, ground);

	//updating the engine so the game runs (similar to the drawSprites function)
	Engine.run(engine);
  
}


function draw() {
	rectMode(CENTER);
	background(0);

	//making the package sprite move with the package body

	packageSprite.x = packageBody.position.x 
	packageSprite.y = packageBody.position.y


	drawSprites();
 
}

function keyPressed() {

	if (keyCode === LEFT_ARROW) {

		helicopterSprite.x=helicopterSprite.x-20;    
		translation={x:-20,y:0}
		Matter.Body.translate(packageBody, translation)
	
	
	  } else if (keyCode === RIGHT_ARROW) {
		helicopterSprite.x=helicopterSprite.x+20;
		translation={x:20,y:0}
		Matter.Body.translate(packageBody, translation)
	  }

	  
	  else if (keyCode === DOWN_ARROW) {
		//allowing the package to drop, rather than staying in midair
		Matter.Body.setStatic(packageBody, false);
    
	}



}