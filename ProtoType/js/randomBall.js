// the balls go out of the screen after a while and disappear. 
//Must fix this.

let balls = [];
let threshold = 30;

let accChangeX = 0;
let accChangeY = 0;
let accChangeT = 0;

function setup() {
  // Create a canvas that fills the entire viewport display
  createCanvas(windowWidth, windowHeight);

  // Create 70 instances of the Ball class
  for (let i = 0; i < 110; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  background(0);

  // For each ball created, move the ball in response to the measurements gathered by checkForShake()
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
  }
  checkForShake();
}

function checkForShake() {
  // Calculate the total change for accelerationX and accelerationY
  accChangeX = abs(accelerationX - pAccelerationX);
  accChangeY = abs(accelerationY - pAccelerationY);

  // Calculate the overall change in the mobile device's acceleration
  accChangeT = accChangeX + accChangeY;

  // If the overall change meets or is greater than the threshold, call shake() and turn() methods
  if (accChangeT >= threshold) {
    for (let i = 0; i < balls.length; i++) {
      balls[i].shake();
      balls[i].turn();
    }
  } else {
    for (let i = 0; i < balls.length; i++) {
      balls[i].stopShake();
      balls[i].turn();
      balls[i].move();
    }
  }
}

class Ball {
  constructor() {
    // Make each ball have a random size, speed, and placement
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(5, 12);
    this.xspeed = random(-0.2, 0.2);
    this.yspeed = random(-0.2, 0.2);
    this.direction = 0.5;

    // Random color for each ball
    this.color = color(random(255), random(255), random(255), 100);

    // Original speed for slowing down
    this.oxspeed = this.xspeed;
    this.oyspeed = this.yspeed;
  }

  // Move the ball based on its speed and direction
  move() {
    this.x += this.xspeed * this.direction;
    this.y += this.yspeed * this.direction;
  }

  // Bounce off edges
  turn() {
    if (this.x < 0 || this.x > width) {
      this.xspeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.yspeed *= -1;
    }
  }

  // Speed up when shaking
  shake() {
    this.xspeed += random(5, accChangeX / 3);
    this.yspeed += random(5, accChangeX / 3);
  }

  // Gradually slow down
  stopShake() {
    if (this.xspeed > this.oxspeed) {
      this.xspeed -= 0.6;
    } else {
      this.xspeed = this.oxspeed;
    }
    if (this.yspeed > this.oyspeed) {
      this.yspeed -= 0.6;
    } else {
      this.yspeed = this.oyspeed;
    }
  }

  // Display the ball with its random color
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

// Adjust the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
