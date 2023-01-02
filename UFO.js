const canvasSize = 400;

let ufo1 = {
  diameter: 100,
  // radius : diameter / 2,
  x: 200,
  y: 200,
  xSpeed: 5,
  ySpeed: 4,
  xDir: 1,
  yDir: 1,
  isBouncing: true,
  maxTrailLength: 50,
  trail: [],
};

let ufo2 = {
  diameter: 75,
  // radius : diameter / 2,
  x: 40,
  y: 300,
  xSpeed: 2,
  ySpeed: 4,
  xDir: 1,
  yDir: -1,
  isBouncing: true,
  maxTrailLength: 40,
  trail: [],
};

// let ufo1 = [100, 200, 200, 5, 4, 1, 1, [], "question", true, true, false, 50, true, 50, 50];

let ufos = [ufo1, ufo2]; // , ufo3];

function setup() {
  createCanvas(canvasSize, canvasSize);
  background("black");
}

function draw() {
  background("rgba(0, 0, 0, 1)");

  for (let i = 0; i < ufos.length; i++) {
    let ufo = ufos[i];

    if (ufo.isBouncing) {
      // update current position
      ufo.x += ufo.xDir * ufo.xSpeed;
      ufo.y += ufo.yDir * ufo.ySpeed;
    }

    // check wall collisions
    if (ufo.x < ufo.diameter / 2 || ufo.x > canvasSize - ufo.diameter / 2) {
      ufo.xDir *= -1;
    }
    if (ufo.y < ufo.diameter / 2 || ufo.y > canvasSize - ufo.diameter / 2) {
      ufo.yDir *= -1;
    }

    // draw funky trail
    for (let i = 0; i < ufo.trail.length; i++) {
      fill(random(256), random(256), random(256), 0.3 * 255);
      // "shadowing" the global variables x, y
      const [xi, yi] = ufo.trail[i]; // "array pattern"
      const di = (i / ufo.maxTrailLength) * ufo.diameter;
      circle(xi, yi, di);
    }

    // draw current position
    fill("white");
    noStroke();
    circle(ufo.x, ufo.y, ufo.diameter);

    // 1. store current x,y values in trail
    // 2. ensure trail.length <= maxTrailLength
    ufo.trail.push([ufo.x, ufo.y]);
    if (ufo.trail.length === ufo.maxTrailLength + 1) {
      ufo.trail.shift();
    }
    // console.log(trail.length);
  }
}

function mousePressed() {
  for (let i = 0; i < ufos.length; i++) {
    let ufo = ufos[i];

    let distance = Math.sqrt(Math.pow(mouseX - ufo.x, 2) + Math.pow(mouseY - ufo.y, 2));
    if (distance < ufo.diameter / 2) {
      ufo.isBouncing = false;
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < ufos.length; i++) {
    let ufo = ufos[i];
    ufo.isBouncing = true;
  }
}
