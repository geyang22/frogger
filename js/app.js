// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    //  You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // A function to keep the enmies on the canvas and resest their location when they get to the right edge
    if (this.x < 505)
      this.x += this.speed * dt;
    else {
      this.x = -5;
      this.speed = 100 + Math.floor(Math.random() * 111);
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

};

// Now write your own player class
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
  }

  // This class requires an update(), render() and
  // a handleInput() method.
  update() {
    // Winning
    if (this.y < 40) {
      // Winning popup
      const victory = document.getElementsByClassName('victory')[0];
      victory.style.display = "block";
      const defeat = document.getElementsByClassName('defeat')[0];
      defeat.style.display = "none";
      openWindow();
      console.log("won!!!");
      //Resetting the player's position
      this.x = 400;
      this.y = 400
      setTimeout(function() {
        popup.style.display = "none";
      }, 1000);
    }

  }

  // A method to check for crashes
  crash(object) {
    const playerLeft = this.x;
    const playerRight = this.x + 70;
    const playerTop = this.y + 50;
    const playerBottom = this.y + 100;
    const objectLeft = object.x;
    const objectRight = object.x + 35;
    const objectTop = object.y + 50;
    const objectBottom = object.y + 100;
    let collision = true;
    if ((playerBottom < objectTop) ||
      (playerTop > objectBottom) ||
      (playerRight < objectLeft) ||
      (playerLeft > objectRight)) {
      collision = false;
    }
    return collision;
  }


  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(direction) {
    if (direction === 'left' && this.x > 0) {
      this.x -= 100;
    } else if (direction === 'right' && this.x < 400) {
      this.x += 100;
    } else if (direction === 'up' && this.y > 20) {
      this.y -= 90;
    } else if (direction === 'down' && this.y < 400) {
      this.y += 90;
    }
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
// const enemy1 = new Enemy (30, 60, 5);
// allEnemies.push(enemy1);
// const enemy2 = new Enemy (30, 140, 5);
// allEnemies.push(enemy2);
// const enemy3 = new Enemy (30, 220, 5);
// allEnemies.push(enemy3);

// A function to create the enemies
function CreateEnemies() {
  this.y = 60;
  for (i = 0; i < 3; i++) {
    const enemy = new Enemy(30, this.y, 5);
    allEnemies.push(enemy);
    this.y += 80;
  }
  return allEnemies;
}
CreateEnemies();


// Place the player object in a variable called player
const player = new Player(400, 400);


// Function to render popup window in case victory or defeat
const popup = document.getElementsByClassName('popup')[0];

function openWindow() {
  popup.style.display = "block";
}

// Function to check for collisions;
function checkCollisions() {
  allEnemies.forEach(function(enemy) {
    const obstacle = enemy;
    if (player.crash(obstacle)) {
      openWindow();
      // console.log("Game over")
    }
  });
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
