/*
	The Game Project Part 7 - Game Mechanics
*/

//variables
var gameChar_x;
var gameChar_y;
var floorPos_y;

var cameraPosX;
var backCameraPosX;

var trees_x;
var trees_y;

var clouds;
var mountain1;
var mountain2;
var bushes;
var canyons;
var flagpole;
var flagpole2;
var collectables;

var playSound;
var backgroundMusic;
var jumpSound;
var collectSound;
var bigCollectSound;
var gameOverSound;
var fakeWinSound;
var winSound;

var isLeft;
var isRight;
var isFalling;
var isJumping;
var isPlummeting;

var gameScore;
var levelComplete;

//loading in music and sound effects
function preload() {
  backgroundMusic = loadSound("background_swing.mp3");
  jumpSound = loadSound("jump.mp3");
  collectSound = loadSound("collect.mp3");
  bigCollectSound = loadSound("collect+.mp3");
  gameOverSound = loadSound("game_over.mp3");
  fakeWinSound = loadSound("win.mp3");
  winSound = loadSound("win+.mp3");
}

//initialisation of variables + canvas setup
function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y + 35;

  cameraPosX = 0;
  backCameraPosX = 0;

  backgroundMusic.loop();
  playSound = true;

  gameScore = 0;
  levelComplete = false;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isJumping = false;
  isPlummeting = false;

  trees_x = [-1500, -700, 200, 800, 1700, 2500];
  treePos_y = 265;

  clouds = {
    x_pos: [100, 400, 700, 1000],
    y_pos: [70, 85, 50, 90],
  };

  mountain1 = {
    x_pos: [95, 1300],
  };

  mountain2 = {
    x_pos: [-600, 750, 1800],
  };

  bushes = {
    x_pos: [
      -1700, -1565, -1425, -1325, -1225, -1125, -925, -725, -500, -275, -120,
      75, 300, 400, 500, 600, 700, 900, 1100, 1325, 1550, 1750, 1950, 2050,
      2150, 2250, 2390, 2600,
    ],
    size: [
      100, 200, 100, 150, 100, 175, 270, 200, 300, 200, 150, 300, 200, 100, 150,
      100, 175, 270, 200, 300, 200, 270, 175, 100, 150, 100, 200, 300,
    ],
  };

  canyons = [
    { x_pos: -600, width: 150 },
    { x_pos: -200, width: 100 },
    { x_pos: 0, width: 120 },

    { x_pos: 900, width: 120 },
    { x_pos: 1100, width: 100 },
    { x_pos: 1500, width: 150 },
  ];

  flagpole = {
    x_pos: -1180,
    isReached: false,
  };

  flagpole2 = {
    x_pos: 2200,
    isReached: false,
  };

  collectables = [
    {
      x_pos: -1005,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },
    {
      x_pos: -940,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },
    {
      x_pos: -875,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },
    {
      x_pos: -810,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },

    {
      x_pos: -390,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },
    {
      x_pos: -325,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },
    {
      x_pos: -260,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },

    {
      x_pos: 1290,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 1355,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 1420,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 1840,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 1905,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 1970,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 2035,
      y_pos: floorPos_y - 10,
      size: 30,
      isFound: false,
    },

    {
      x_pos: width / 2,
      y_pos: floorPos_y - 23,
      size: 50,
      isFound: false,
    },
  ];
}

///////////DRAWING CODE//////////
function draw() {
  //camera movement
  if (isRight && !isPlummeting && !levelComplete) {
    cameraPosX -= 5;
    backCameraPosX -= 2;
  }
  if (isLeft && !isPlummeting && !levelComplete) {
    cameraPosX += 5;
    backCameraPosX += 2;
  }

  //fill the sky blue
  background(100, 155, 255);
  noStroke();

  //draw some green ground
  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y);
  fill(0, 200, 0);
  rect(0, floorPos_y + 30, width, height - floorPos_y);

  //clouds
  for (var i = 0; i < clouds.x_pos.length; i++) {
    fill(255);
    circle(clouds.x_pos[i], clouds.y_pos[i], 80);
    circle(clouds.x_pos[i] - 30, clouds.y_pos[i] + 15, 60);
    circle(clouds.x_pos[i] + 30, clouds.y_pos[i] + 5, 80);
    circle(clouds.x_pos[i] + 60, clouds.y_pos[i] + 15, 60);
    fill(255, 255, 255, 200);
    circle(clouds.x_pos[i] - 5, clouds.y_pos[i] + 5, 80);
    circle(clouds.x_pos[i] - 35, clouds.y_pos[i] + 20, 60);
    circle(clouds.x_pos[i] + 25, clouds.y_pos[i] + 10, 80);
    circle(clouds.x_pos[i] + 55, clouds.y_pos[i] + 20, 60);
    clouds.x_pos[i] += 0.2;
    if (clouds.x_pos[i] > width + 100) {
      clouds.x_pos[i] = -100;
    }
  }

  //background camera
  push();
  translate(backCameraPosX, 0);

  //mountain1
  for (var i = 0; i < mountain1.x_pos.length; i++) {
    fill(0, 130, 100);
    triangle(
      mountain1.x_pos[i],
      150,
      mountain1.x_pos[i] + 725,
      432,
      mountain1.x_pos[i] - 780,
      432
    );
  }

  //mountain2
  for (var i = 0; i < mountain2.x_pos.length; i++) {
    fill(0, 160, 90);
    triangle(
      mountain2.x_pos[i],
      90,
      mountain2.x_pos[i] - 460,
      432,
      mountain2.x_pos[i] + 1210,
      432
    );
    fill(0, 130, 100);
    triangle(
      mountain2.x_pos[i],
      90,
      mountain2.x_pos[i] - 460,
      432,
      mountain2.x_pos[i] - 10,
      432
    );
  }

  //background camera end
  pop();

  //main camera
  push();
  translate(cameraPosX, 0);

  //bushes
  for (var i = 0; i < bushes.x_pos.length; i++) {
    fill(0, 200, 0);
    arc(
      bushes.x_pos[i],
      floorPos_y,
      bushes.size[i],
      bushes.size[i],
      3.141593,
      0
    );
  }

  //canyons
  noStroke();
  fill(92, 40, 0);
  for (var i = 0; i < canyons.length; i++) {
    rect(canyons[i].x_pos, floorPos_y, canyons[i].width, height - floorPos_y);
    if (
      canyons[i].x_pos + canyons[i].width > gameChar_x &&
      gameChar_x > canyons[i].x_pos &&
      gameChar_y - 20 >= floorPos_y + 15
    ) {
      isPlummeting = true;
    }
  }

  //trees
  for (var i = 0; i < trees_x.length; i++) {
    fill(128, 89, 67);
    rect(trees_x[i], treePos_y, 16, 170);
    quad(
      trees_x[i] - 25,
      treePos_y + 30,
      trees_x[i] - 30,
      treePos_y + 35,
      trees_x[i],
      treePos_y + 100,
      trees_x[i],
      treePos_y + 80
    );
    quad(
      trees_x[i] + 55,
      treePos_y + 45,
      trees_x[i] + 55,
      treePos_y + 55,
      trees_x[i] + 16,
      treePos_y + 80,
      trees_x[i] + 16,
      treePos_y + 65
    );
    triangle(
      trees_x[i] - 5,
      treePos_y + 170,
      trees_x[i] + 8,
      treePos_y + 100,
      trees_x[i] + 21,
      treePos_y + 170
    );
    fill(16, 119, 26);
    circle(trees_x[i], treePos_y, 120);
    circle(trees_x[i] + 50, treePos_y, 80);
    circle(trees_x[i] - 40, treePos_y + 40, 70);
    circle(trees_x[i] + 60, treePos_y + 40, 70);
  }

  //flagpole
  if (gameChar_x < flagpole.x_pos) {
    flagpole.isReached = true;
  }

  if (!flagpole.isReached) {
    strokeWeight(2);
    stroke(90, 50, 30);
    fill(128, 89, 67);
    rect(flagpole.x_pos, 325, 6, 120);
    rect(flagpole.x_pos - 3, 440, 12, 5);
    circle(flagpole.x_pos + 3, 323, 12);
    strokeWeight(1);
  } else {
    levelComplete = true;
    strokeWeight(2);
    stroke(90, 50, 30);
    fill(128, 89, 67);
    rect(flagpole.x_pos, 325, 6, 120);
    rect(flagpole.x_pos - 3, 440, 12, 5);
    circle(flagpole.x_pos + 3, 323, 12);
    stroke(100, 0, 0);
    fill(255, 0, 0);
    rect(flagpole.x_pos + 6, 330, 50, 30);
    fill(200, 0, 0);
    rect(flagpole.x_pos, 330, 6, 30);
    strokeWeight(1);
  }

  //flagpole2
  if (gameChar_x > flagpole2.x_pos) {
    flagpole2.isReached = true;
  }

  if (!flagpole2.isReached) {
    strokeWeight(2);
    stroke(90, 50, 30);
    fill(128, 89, 67);
    rect(flagpole2.x_pos, 325, 6, 120);
    rect(flagpole2.x_pos - 3, 440, 12, 5);
    circle(flagpole2.x_pos + 3, 323, 12);
    strokeWeight(1);
  } else {
    levelComplete = true;
    strokeWeight(2);
    stroke(90, 50, 30);
    fill(128, 89, 67);
    rect(flagpole2.x_pos, 325, 6, 120);
    rect(flagpole2.x_pos - 3, 440, 12, 5);
    circle(flagpole2.x_pos + 3, 323, 12);
    stroke(100, 0, 0);
    fill(255, 0, 0);
    rect(flagpole2.x_pos + 6, 330, 50, 30);
    fill(200, 0, 0);
    rect(flagpole2.x_pos, 330, 6, 30);
    strokeWeight(1);
  }

  //collectables
  for (var i = 0; i < 14; i++) {
    if (
      dist(
        gameChar_x,
        gameChar_y - 45,
        collectables[i].x_pos,
        collectables[i].y_pos
      ) <=
        collectables[i].size + 10 &&
      !collectables[i].isFound
    ) {
      collectables[i].isFound = true;
      collectSound.play();
      gameScore++;
    }
  }
  for (var i = 0; i < 14; i++) {
    if (!collectables[i].isFound) {
      strokeWeight(0);
      fill(0, 0, 0, 100);
      ellipse(
        collectables[i].x_pos,
        collectables[i].y_pos + collectables[i].size / 1.2,
        collectables[i].size / 1.5,
        collectables[i].size / 9
      );
      stroke(0);
      strokeWeight(2);
      fill(255, 215, 0);
      circle(
        collectables[i].x_pos,
        collectables[i].y_pos,
        collectables[i].size
      );
      stroke(120, 100, 0);
      fill(234, 195, 0);
      circle(
        collectables[i].x_pos,
        collectables[i].y_pos,
        collectables[i].size / 1.3
      );
      strokeWeight(1);
    }
  }

  //special collectable
  if (gameScore >= 7 && !collectables[14].isFound) {
    strokeWeight(0);
    fill(0, 0, 0, 100);
    ellipse(
      collectables[14].x_pos,
      collectables[14].y_pos + collectables[i].size / 1.2,
      collectables[14].size / 1.5,
      collectables[14].size / 9
    );
    stroke(0);
    strokeWeight(2);
    fill(255, 215, 0);
    circle(
      collectables[14].x_pos,
      collectables[14].y_pos,
      collectables[14].size
    );
    stroke(120, 100, 0);
    fill(234, 195, 0);
    circle(
      collectables[14].x_pos,
      collectables[14].y_pos,
      collectables[14].size / 1.3
    );
    strokeWeight(1);
    if (
      dist(
        gameChar_x,
        gameChar_y - 45,
        collectables[14].x_pos,
        collectables[14].y_pos
      ) <=
        collectables[14].size + 10 &&
      !collectables[14].isFound
    ) {
      collectables[14].isFound = true;
      bigCollectSound.play();
      gameScore += 6;
    }
  }

  ///////////GAME CHARACTER//////////
  if (isLeft && (isFalling || isPlummeting || isJumping)) {
    // add your jumping-left code
    beginShape();
    fill(0, 80, 0);
    stroke(0, 200, 0);
    vertex(gameChar_x - 8, gameChar_y - 53);
    vertex(gameChar_x - 13, gameChar_y - 53);
    vertex(gameChar_x - 11, gameChar_y - 61);
    vertex(gameChar_x - 16, gameChar_y - 61);
    vertex(gameChar_x - 18, gameChar_y - 48);
    vertex(gameChar_x - 8, gameChar_y - 48);
    endShape(CLOSE);
    beginShape();
    fill(0, 80, 180);
    stroke(0, 0, 255);
    vertex(gameChar_x + 6, gameChar_y - 33);
    vertex(gameChar_x, gameChar_y - 28);
    vertex(gameChar_x + 4, gameChar_y - 24);
    vertex(gameChar_x + 13, gameChar_y - 23);
    vertex(gameChar_x + 14, gameChar_y - 22);
    vertex(gameChar_x + 14, gameChar_y - 28);
    vertex(gameChar_x + 8, gameChar_y - 29);
    endShape(CLOSE);
    beginShape();
    fill(0, 100, 0);
    stroke(0, 200, 0);
    vertex(gameChar_x - 8, gameChar_y - 53);
    vertex(gameChar_x - 6, gameChar_y - 33);
    vertex(gameChar_x + 6, gameChar_y - 33);
    vertex(gameChar_x + 6, gameChar_y - 42);
    vertex(gameChar_x + 8, gameChar_y - 48);
    vertex(gameChar_x + 13, gameChar_y - 48);
    vertex(gameChar_x + 11, gameChar_y - 41);
    vertex(gameChar_x + 16, gameChar_y - 41);
    vertex(gameChar_x + 18, gameChar_y - 53);
    vertex(gameChar_x + 8, gameChar_y - 53);
    endShape(CLOSE);
    beginShape();
    fill(0, 100, 200);
    stroke(0, 0, 255);
    vertex(gameChar_x - 9, gameChar_y - 39);
    vertex(gameChar_x - 13, gameChar_y - 29);
    vertex(gameChar_x - 14, gameChar_y - 28);
    vertex(gameChar_x - 8, gameChar_y - 27);
    vertex(gameChar_x - 6, gameChar_y - 33);
    vertex(gameChar_x, gameChar_y - 28);
    vertex(gameChar_x + 4, gameChar_y - 30);
    vertex(gameChar_x + 6, gameChar_y - 33);
    endShape(CLOSE);
    fill(0, 200, 0);
    stroke(0, 255, 0);
    ellipse(gameChar_x - 13.5, gameChar_y - 61, 9, 8);
    ellipse(gameChar_x + 13.5, gameChar_y - 41, 9, 8);
    ellipse(gameChar_x, gameChar_y - 60, 20, 18);
    fill(255);
    stroke(0);
    ellipse(gameChar_x - 7, gameChar_y - 60, 10, 10);
    ellipse(gameChar_x + 7, gameChar_y - 60, 10, 10);
    fill(0);
    ellipse(gameChar_x - 8, gameChar_y - 60, 5, 5);
    ellipse(gameChar_x + 8, gameChar_y - 60, 5, 5);
  } else if (isRight && (isFalling || isPlummeting || isJumping)) {
    // add your jumping-right code
    beginShape();
    fill(0, 80, 0);
    stroke(0, 200, 0);
    vertex(gameChar_x + 8, gameChar_y - 53);
    vertex(gameChar_x + 13, gameChar_y - 53);
    vertex(gameChar_x + 11, gameChar_y - 61);
    vertex(gameChar_x + 16, gameChar_y - 61);
    vertex(gameChar_x + 18, gameChar_y - 48);
    vertex(gameChar_x + 8, gameChar_y - 48);
    endShape(CLOSE);
    beginShape();
    fill(0, 80, 180);
    stroke(0, 0, 255);
    vertex(gameChar_x - 6, gameChar_y - 33);
    vertex(gameChar_x, gameChar_y - 28);
    vertex(gameChar_x - 4, gameChar_y - 24);
    vertex(gameChar_x - 13, gameChar_y - 23);
    vertex(gameChar_x - 14, gameChar_y - 22);
    vertex(gameChar_x - 14, gameChar_y - 28);
    vertex(gameChar_x - 8, gameChar_y - 29);
    endShape(CLOSE);
    beginShape();
    fill(0, 100, 0);
    stroke(0, 200, 0);
    vertex(gameChar_x + 8, gameChar_y - 53);
    vertex(gameChar_x + 6, gameChar_y - 33);
    vertex(gameChar_x - 6, gameChar_y - 33);
    vertex(gameChar_x - 6, gameChar_y - 42);
    vertex(gameChar_x - 8, gameChar_y - 48);
    vertex(gameChar_x - 13, gameChar_y - 48);
    vertex(gameChar_x - 11, gameChar_y - 41);
    vertex(gameChar_x - 16, gameChar_y - 41);
    vertex(gameChar_x - 18, gameChar_y - 53);
    vertex(gameChar_x - 8, gameChar_y - 53);
    endShape(CLOSE);
    beginShape();
    fill(0, 100, 200);
    stroke(0, 0, 255);
    vertex(gameChar_x + 9, gameChar_y - 39);
    vertex(gameChar_x + 13, gameChar_y - 29);
    vertex(gameChar_x + 14, gameChar_y - 28);
    vertex(gameChar_x + 8, gameChar_y - 27);
    vertex(gameChar_x + 6, gameChar_y - 33);
    vertex(gameChar_x, gameChar_y - 28);
    vertex(gameChar_x - 4, gameChar_y - 30);
    vertex(gameChar_x - 6, gameChar_y - 33);
    endShape(CLOSE);
    fill(0, 200, 0);
    stroke(0, 255, 0);
    ellipse(gameChar_x + 13.5, gameChar_y - 61, 9, 8);
    ellipse(gameChar_x - 13.5, gameChar_y - 41, 9, 8);
    ellipse(gameChar_x, gameChar_y - 60, 20, 18);
    fill(255);
    stroke(0);
    ellipse(gameChar_x - 7, gameChar_y - 60, 10, 10);
    ellipse(gameChar_x + 7, gameChar_y - 60, 10, 10);
    fill(0);
    ellipse(gameChar_x - 8, gameChar_y - 60, 5, 5);
    ellipse(gameChar_x + 8, gameChar_y - 60, 5, 5);
  } else if (isLeft) {
    // add your walking left code
    beginShape();
    fill(0, 80, 0);
    stroke(0, 200, 0);
    vertex(gameChar_x - 8, gameChar_y - 53);
    vertex(gameChar_x - 13, gameChar_y - 53);
    vertex(gameChar_x - 13, gameChar_y - 61);
    vertex(gameChar_x - 18, gameChar_y - 61);
    vertex(gameChar_x - 18, gameChar_y - 48);
    vertex(gameChar_x - 8, gameChar_y - 48);
    endShape(CLOSE);
    beginShape();
    fill(0, 80, 180);
    stroke(0, 0, 255);
    vertex(gameChar_x + 6, gameChar_y - 33);
    vertex(gameChar_x, gameChar_y - 28);
    vertex(gameChar_x + 8, gameChar_y - 23);
    vertex(gameChar_x + 17, gameChar_y - 22);
    vertex(gameChar_x + 18, gameChar_y - 21);
    vertex(gameChar_x + 18, gameChar_y - 27);
    vertex(gameChar_x + 12, gameChar_y - 28);
    endShape(CLOSE);
    beginShape();
    fill(0, 100, 0);
    stroke(0, 200, 0);
    vertex(gameChar_x - 8, gameChar_y - 53);
    vertex(gameChar_x - 6, gameChar_y - 33);
    vertex(gameChar_x + 6, gameChar_y - 33);
    vertex(gameChar_x + 6, gameChar_y - 42);
    vertex(gameChar_x + 8, gameChar_y - 48);
    vertex(gameChar_x + 13, gameChar_y - 48);
    vertex(gameChar_x + 13, gameChar_y - 41);
    vertex(gameChar_x + 18, gameChar_y - 41);
    vertex(gameChar_x + 18, gameChar_y - 53);
    endShape(CLOSE);
    beginShape();
    fill(0, 100, 200);
    stroke(0, 0, 255);
    vertex(gameChar_x - 13, gameChar_y - 33);
    vertex(gameChar_x - 15, gameChar_y - 24);
    vertex(gameChar_x - 16, gameChar_y - 23);
    vertex(gameChar_x - 10, gameChar_y - 22);
    vertex(gameChar_x - 8, gameChar_y - 28);
    vertex(gameChar_x, gameChar_y - 28);
    vertex(gameChar_x + 4, gameChar_y - 30);
    vertex(gameChar_x + 6, gameChar_y - 33);
    endShape(CLOSE);
    fill(0, 200, 0);
    stroke(0, 255, 0);
    ellipse(gameChar_x - 15.5, gameChar_y - 61, 9, 8);
    ellipse(gameChar_x + 15.5, gameChar_y - 41, 9, 8);
    ellipse(gameChar_x, gameChar_y - 60, 20, 18);
    fill(255);
    stroke(0);
    ellipse(gameChar_x - 7, gameChar_y - 60, 10, 10);
    ellipse(gameChar_x + 7, gameChar_y - 60, 10, 10);
    fill(0);
    ellipse(gameChar_x - 8, gameChar_y - 60, 5, 5);
    ellipse(gameChar_x + 8, gameChar_y - 60, 5, 5);
  } else if (isRight) {
    // add your walking right code
    beginShape();
    fill(0, 80, 0);
    stroke(0, 200, 0);
    vertex(gameChar_x + 8, gameChar_y - 53);
    vertex(gameChar_x + 13, gameChar_y - 53);
    vertex(gameChar_x + 13, gameChar_y - 61);
    vertex(gameChar_x + 18, gameChar_y - 61);
    vertex(gameChar_x + 18, gameChar_y - 48);
    vertex(gameChar_x + 8, gameChar_y - 48);
    endShape(CLOSE);
    beginShape();
    fill(0, 80, 180);
    stroke(0, 0, 255);
    vertex(gameChar_x - 6, gameChar_y - 33);
    vertex(gameChar_x, gameChar_y - 28);
    vertex(gameChar_x - 8, gameChar_y - 23);
    vertex(gameChar_x - 17, gameChar_y - 22);
    vertex(gameChar_x - 18, gameChar_y - 21);
    vertex(gameChar_x - 18, gameChar_y - 27);
    vertex(gameChar_x - 12, gameChar_y - 28);
    endShape(CLOSE);
    beginShape();
    fill(0, 100, 0);
    stroke(0, 200, 0);
    vertex(gameChar_x + 8, gameChar_y - 53);
    vertex(gameChar_x + 6, gameChar_y - 33);
    vertex(gameChar_x - 6, gameChar_y - 33);
    vertex(gameChar_x - 6, gameChar_y - 42);
    vertex(gameChar_x - 8, gameChar_y - 48);
    vertex(gameChar_x - 13, gameChar_y - 48);
    vertex(gameChar_x - 13, gameChar_y - 41);
    vertex(gameChar_x - 18, gameChar_y - 41);
    vertex(gameChar_x - 18, gameChar_y - 53);
    endShape(CLOSE);
    beginShape();
    fill(0, 100, 200);
    stroke(0, 0, 255);
    vertex(gameChar_x + 13, gameChar_y - 33);
    vertex(gameChar_x + 15, gameChar_y - 24);
    vertex(gameChar_x + 16, gameChar_y - 23);
    vertex(gameChar_x + 10, gameChar_y - 22);
    vertex(gameChar_x + 8, gameChar_y - 28);
    vertex(gameChar_x, gameChar_y - 28);
    vertex(gameChar_x - 4, gameChar_y - 30);
    vertex(gameChar_x - 6, gameChar_y - 33);
    endShape(CLOSE);
    fill(0, 200, 0);
    stroke(0, 255, 0);
    ellipse(gameChar_x + 15.5, gameChar_y - 61, 9, 8);
    ellipse(gameChar_x - 15.5, gameChar_y - 41, 9, 8);
    ellipse(gameChar_x, gameChar_y - 60, 20, 18);
    fill(255);
    stroke(0);
    ellipse(gameChar_x - 7, gameChar_y - 60, 10, 10);
    ellipse(gameChar_x + 7, gameChar_y - 60, 10, 10);
    fill(0);
    ellipse(gameChar_x - 8, gameChar_y - 60, 5, 5);
    ellipse(gameChar_x + 8, gameChar_y - 60, 5, 5);
  } else if (isFalling || isPlummeting || isJumping) {
    // add your jumping facing forwards code
    beginShape();
    fill(0, 100, 0);
    stroke(0, 200, 0);
    vertex(gameChar_x - 8, gameChar_y - 53);
    vertex(gameChar_x - 18, gameChar_y - 56);
    vertex(gameChar_x - 18, gameChar_y - 43);
    vertex(gameChar_x - 13, gameChar_y - 43);
    vertex(gameChar_x - 13, gameChar_y - 50);
    vertex(gameChar_x - 8, gameChar_y - 48);
    vertex(gameChar_x - 6, gameChar_y - 33);
    vertex(gameChar_x - 0, gameChar_y - 33);
    vertex(gameChar_x + 6, gameChar_y - 33);
    vertex(gameChar_x + 8, gameChar_y - 48);
    vertex(gameChar_x + 13, gameChar_y - 50);
    vertex(gameChar_x + 13, gameChar_y - 43);
    vertex(gameChar_x + 18, gameChar_y - 43);
    vertex(gameChar_x + 18, gameChar_y - 56);
    vertex(gameChar_x + 8, gameChar_y - 53);
    endShape(CLOSE);
    beginShape();
    fill(0, 100, 200);
    stroke(0, 0, 255);
    vertex(gameChar_x - 6, gameChar_y - 34);
    vertex(gameChar_x - 13, gameChar_y - 36);
    vertex(gameChar_x - 15, gameChar_y - 23);
    vertex(gameChar_x - 16, gameChar_y - 22);
    vertex(gameChar_x - 10, gameChar_y - 22);
    vertex(gameChar_x - 10, gameChar_y - 30);
    vertex(gameChar_x - 0, gameChar_y - 28);
    vertex(gameChar_x + 10, gameChar_y - 30);
    vertex(gameChar_x + 10, gameChar_y - 22);
    vertex(gameChar_x + 16, gameChar_y - 22);
    vertex(gameChar_x + 15, gameChar_y - 23);
    vertex(gameChar_x + 13, gameChar_y - 36);
    vertex(gameChar_x + 6, gameChar_y - 34);
    endShape(CLOSE);
    fill(0, 200, 0);
    stroke(0, 255, 0);
    ellipse(gameChar_x - 15.5, gameChar_y - 43, 9, 8);
    ellipse(gameChar_x + 15.5, gameChar_y - 43, 9, 8);
    ellipse(gameChar_x, gameChar_y - 60, 20, 18);
    fill(255);
    stroke(0);
    ellipse(gameChar_x - 7, gameChar_y - 60, 10, 10);
    ellipse(gameChar_x + 7, gameChar_y - 60, 10, 10);
    fill(0);
    ellipse(gameChar_x - 8, gameChar_y - 60, 5, 5);
    ellipse(gameChar_x + 8, gameChar_y - 60, 5, 5);
  } else {
    // add your standing front facing code
    beginShape();
    fill(0, 100, 0);
    stroke(0, 200, 0);
    vertex(gameChar_x - 18, gameChar_y - 53);
    vertex(gameChar_x - 18, gameChar_y - 41);
    vertex(gameChar_x - 13, gameChar_y - 41);
    vertex(gameChar_x - 13, gameChar_y - 48);
    vertex(gameChar_x - 8, gameChar_y - 48);
    vertex(gameChar_x - 6, gameChar_y - 33);
    vertex(gameChar_x - 0, gameChar_y - 33);
    vertex(gameChar_x + 6, gameChar_y - 33);
    vertex(gameChar_x + 8, gameChar_y - 48);
    vertex(gameChar_x + 13, gameChar_y - 48);
    vertex(gameChar_x + 13, gameChar_y - 41);
    vertex(gameChar_x + 18, gameChar_y - 41);
    vertex(gameChar_x + 18, gameChar_y - 53);
    endShape(CLOSE);
    beginShape();
    fill(0, 100, 200);
    stroke(0, 0, 255);
    vertex(gameChar_x - 6, gameChar_y - 33);
    vertex(gameChar_x - 15, gameChar_y - 31);
    vertex(gameChar_x - 15, gameChar_y - 20);
    vertex(gameChar_x - 16, gameChar_y - 19);
    vertex(gameChar_x - 10, gameChar_y - 19);
    vertex(gameChar_x - 10, gameChar_y - 26);
    vertex(gameChar_x - 0, gameChar_y - 28);
    vertex(gameChar_x + 10, gameChar_y - 26);
    vertex(gameChar_x + 10, gameChar_y - 19);
    vertex(gameChar_x + 16, gameChar_y - 19);
    vertex(gameChar_x + 15, gameChar_y - 20);
    vertex(gameChar_x + 15, gameChar_y - 31);
    vertex(gameChar_x + 6, gameChar_y - 33);
    endShape(CLOSE);
    fill(0, 200, 0);
    stroke(0, 255, 0);
    ellipse(gameChar_x - 15.5, gameChar_y - 41, 9, 8);
    ellipse(gameChar_x + 15.5, gameChar_y - 41, 9, 8);
    ellipse(gameChar_x, gameChar_y - 60, 20, 18);
    fill(255);
    stroke(0);
    ellipse(gameChar_x - 7, gameChar_y - 60, 10, 10);
    ellipse(gameChar_x + 7, gameChar_y - 60, 10, 10);
    fill(0);
    ellipse(gameChar_x - 8, gameChar_y - 60, 5, 5);
    ellipse(gameChar_x + 8, gameChar_y - 60, 5, 5);
  }

  //main camera end
  pop();

  //score counter
  fill(0);
  textSize(30);
  text("Score " + gameScore, 50, 50);

  //game over
  if (gameChar_y > height) {
    fill(255, 0, 0);
    textSize(100);
    text("Game Over", width / 4, height / 2);
    if (playSound) {
      backgroundMusic.pause();
      gameOverSound.play();
      playSound = false;
    }
  }

  //level complete states
  if (levelComplete) {
    fill(0, 255, 0);
    textSize(100);
    if (gameScore < 7) {
      text("Why. ", width / 3 + 60, height / 2);
      if (playSound) {
        backgroundMusic.pause();
        fakeWinSound.play();
        playSound = false;
      }
    } else if (gameScore >= 7 && gameScore < 20) {
      text("You Won! ", width / 3 - 20, height / 2);
      textSize(20);
      text("OR DID YOU? ", width / 3, height / 2 + 30);
      if (playSound) {
        backgroundMusic.pause();
        fakeWinSound.play();
        playSound = false;
      }
    } else if (gameScore == 20) {
      text("You Won! ", width / 3 - 20, height / 2);
      if (playSound) {
        backgroundMusic.pause();
        winSound.play();
        playSound = false;
      }
    }
  }

  ///////////INTERACTION CODE//////////
  //Put conditional statements to move the game character below here

  //character movement
  if (isLeft && !isPlummeting && !levelComplete) {
    gameChar_x -= 5;
  }
  if (isRight && !isPlummeting && !levelComplete) {
    gameChar_x += 5;
  }

  //character gravity
  if (gameChar_y - 35 < floorPos_y) {
    if (gameChar_y - 35 < floorPos_y - 65) {
      isJumping = false;
      isFalling = true;
    }
  } else {
    isFalling = false;
  }
  if (isFalling) {
    gameChar_y += 2;
  }
  if (isJumping) {
    gameChar_y -= 12;
  }

  //character falling into canyon
  if (isPlummeting) {
    isJumping = false;
    gameChar_y += 12;
  }
}

// if statements to control the animation of the character when
// keys are pressed.
function keyPressed() {
  if (levelComplete) {
    return;
  }
  if (key == "a") {
    isLeft = true;
  } else if (key == "d") {
    isRight = true;
  } else if (key == "w" && !isFalling && !isPlummeting) {
    isJumping = true;
    jumpSound.play();
  }
}

// if statements to control the animation of the character when
// keys are released.
function keyReleased() {
  if (key == "a") {
    isLeft = false;
  } else if (key == "d") {
    isRight = false;
  }
}
