function hide() {
  let directions = document.getElementById("directions");
  directions.style.display = 'none';
  game()
}

function game() {

  let score = 0;
const scoreEl = document.getElementById("score");

setInterval(() => {
  score++;
  scoreEl.textContent = "Score: " + score;
}, 1000);

  let player = document.getElementById("player");
  let moveSpeed = 10;

  let keys = {
    w: false,
    a: false,
    s: false,
    d: false,
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "w" || e.key === "W") keys.w = true;
    if (e.key === "a" || e.key === "A") keys.a = true;
    if (e.key === "s" || e.key === "S") keys.s = true;
    if (e.key === "d" || e.key === "D") keys.d = true;
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "w" || e.key === "W") keys.w = false;
    if (e.key === "a" || e.key === "A") keys.a = false;
    if (e.key === "s" || e.key === "S") keys.s = false;
    if (e.key === "d" || e.key === "D") keys.d = false;
  });

function updatePosition() {
  let topPos = parseInt(
    window.getComputedStyle(player).getPropertyValue("top")
  );
  let leftPos = parseInt(
    window.getComputedStyle(player).getPropertyValue("left")
  );

  if (keys.w) topPos -= moveSpeed;
  if (keys.s) topPos += moveSpeed;
  if (keys.a) leftPos -= moveSpeed;
  if (keys.d) leftPos += moveSpeed;

  // screen boundries
  const playerWidth = player.offsetWidth;
  const playerHeight = player.offsetHeight;

  const maxX = window.innerWidth - playerWidth;
  const maxY = window.innerHeight - playerHeight;

  // clamp values
  leftPos = Math.max(0, Math.min(leftPos, maxX));
  topPos = Math.max(0, Math.min(topPos, maxY));

  player.style.top = topPos + "px";
  player.style.left = leftPos + "px";

  requestAnimationFrame(updatePosition);
}

  requestAnimationFrame(updatePosition);

   spawner()
}


  function spawner() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const objects = [];
    let spawnRate = 1000;
    const minSpawnRate = 200;
    let lastSpawnTime = Date.now();

    const objectTypes = [
        { type: 'red', color: 'red', radius: 10 },
        { type: 'blue', color: 'blue', radius: 15 },
        { type: 'green', color: 'green', radius: 8 }
    ];

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function spawnRandomObject() {
        const randomIndex = Math.floor(Math.random() * objectTypes.length);
        const chosenType = objectTypes[randomIndex];
        const newObject = {
            type: chosenType.type,
            color: chosenType.color,
            radius: chosenType.radius,
            x: getRandomNumber(chosenType.radius, canvas.width - chosenType.radius),
            y: 0 - chosenType.radius
        };
        objects.push(newObject);
    }

    function update() {
        const currentTime = Date.now();
        if (currentTime > lastSpawnTime + spawnRate) {
            lastSpawnTime = currentTime;
            spawnRandomObject();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];
            object.y += 2;
            ctx.beginPath();
            ctx.arc(object.x, object.y, object.radius, 0, Math.PI * 2);
            ctx.fillStyle = object.color;
            ctx.fill();

            if (object.y > canvas.height + object.radius) {
                objects.splice(i, 1);
                i--;
                spawnRate = Math.max(minSpawnRate, spawnRate - 5);
            }
        }

        requestAnimationFrame(update);
    }

    update();
  }