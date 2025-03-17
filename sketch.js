let countdown = 10;  
let countdownTimer;
let savedDrawings = []; 
let isDrawing = false; 
let isViewingLetters = false; 
let button, viewButton, viewx;
let letterY, timerY, buttonY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  setupUI();
  cursor(CROSS);
  generateRandomCharacter();
  startCountdown();
}

function setupUI() {
  button = createButton('Skip Letter');
  button.mousePressed(resetCanvas);
  styleButton(button);

  viewButton = createButton('View Letters');
  viewButton.mousePressed(toggleViewLetters);
  styleButton(viewButton);

  viewx = createButton('View Instructions');
  viewx.mousePressed(toggleViewLetters2);
  styleButton(viewx);

  countdownTimer = createDiv('Time Left: 15s');
  countdownTimer.style('font-size', '16px');
  countdownTimer.style('color', '#394060');
  countdownTimer.style('font-family', 'Gloock');

  positionUI();
}

function positionUI() {
  let margin = 10;
  let spacing = 10; 
  let footerOffset = height - 100; 

  buttonY = footerOffset - 70;
  timerY = buttonY - spacing - 10; 
  letterY = timerY - spacing - 80; 

  button.position(margin, buttonY);
  viewButton.position(margin, buttonY + 40);
  viewx.position(margin, buttonY + 80);
  countdownTimer.position(margin, timerY);
}

function styleButton(btn) {
  btn.style('background-color', '#394060');
  btn.style('color', 'white');
  btn.style('font-family', 'Gloock');
  btn.style('border', 'none');
  btn.style('padding', '10px 20px');
  btn.style('font-size', '16px');
  btn.style('cursor', 'cross');

  btn.mouseOver(() => btn.style('background-color', '#535E90')); 
  btn.mouseOut(() => btn.style('background-color', '#394060'));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
  positionUI();
  generateRandomCharacter();
}

function startCountdown() {
  countdown = 10;
  countdownTimer.html('Time Left: ' + countdown + 's');
  setInterval(() => {
    if (!isViewingLetters && countdown > 0) {
      countdown--;
      countdownTimer.html('Time Left: ' + countdown + 's');
    } else if (countdown === 0) {
      saveDrawing();
      resetCanvas();
    }
  }, 1000);
}

function generateRandomCharacter(yPosition = letterY) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*€£@$&";
  let randomChar = chars.charAt(floor(random(chars.length)));
  
  fill(57, 64, 96);
  textSize(100);
  textFont('Gloock'); 
  text(randomChar, 10, yPosition);
}

function draw() {
  frameRate(120);
  
  if (mouseIsPressed && isDrawing) {
    fill(237, 28, 36);
    strokeWeight(0);
    
    let step = 5;
    let d = dist(mouseX, mouseY, pmouseX, pmouseY);
    let steps = d / step;
    
    for (let i = 0; i < steps; i++) {
      let x = lerp(pmouseX, mouseX, i / steps); 
      let y = lerp(pmouseY, mouseY, i / steps); 
      rect(x, y, 120, 10); 
    }
  }
}

function resetCanvas() {
  background(255);
  generateRandomCharacter();
  isDrawing = true;  
  resetCountdown();  
}

function resetCountdown() {
  countdown = 10;  
  countdownTimer.html('Time Left: ' + countdown + 's');
}

function saveDrawing() {
  let drawing = get(); 
  savedDrawings.push(drawing);  
  resetCanvas();  
}

function toggleViewLetters() {
  isViewingLetters = !isViewingLetters;
  if (isViewingLetters) {
    displayThumbnails(); 
  } else {
    resetCanvas(); 
  }
}

function toggleViewLetters2() {
  isViewingLetters = !isViewingLetters;
  if (isViewingLetters) {
    displayInfo(); 
  } else {
    resetCanvas(); 
  }
}

function displayInfo() {
  background(255);
  
  fill(237, 28, 36); 
  textSize(24); 
  textFont('Gloock');
  text('Instructions:', 10, 30); 
   text('Information:', 10, 120);  
  fill(57, 64, 96);
  textSize(16);
  textFont('Gloock');

  text('Have a go at drawing the random letter within the fifteen second timer!', 10, 50);
  text('Your letter will be saved to the View Letters Tab after the fifteen seconds', 10, 67);
  text('have passed. How many can you do?', 10, 84);
    text('I aim to explore the passing of time through this minigame, specifically', 10, 140);
  text('in relation to typography and the construction of letterforms. ', 10, 157);
  text('I spend a huge amount of my time carefully planning and exploring new', 10, 174);
    text('ways of building letters, often physically, and find myself often getting lost', 10, 191);
      text('in microscopic nuances for hours on end. This program flips that on its', 10, 208);
        text('head, allowing myself, and other users to quickly react and consider the', 10, 225);
          text('hierarchy of their markmaking in response to a random charachter and', 10, 242);
            text('time limit. Which charachters need the least marks to be recognisable?', 10, 259);
  
  
  isDrawing = false;
}

function displayThumbnails() {
  background(255);
  let x = 10;
  let y = 10;

  for (let i = 0; i < savedDrawings.length; i++) {
    image(savedDrawings[i], x, y, 100, 100); 
    x += 110; 
    if (x > width - 110) { 
      x = 10;
      y += 110;
    }
  }
  isDrawing = false;
}

function keyPressed() {
  if (key === 'f' || key === 'F') {
    let fs = fullscreen();
    fullscreen(!fs);
    setTimeout(() => {
      windowResized();
    }, 100); 
  }
}
