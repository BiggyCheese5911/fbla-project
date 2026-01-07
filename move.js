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

  player.style.top = topPos + "px";
  player.style.left = leftPos + "px";

  requestAnimationFrame(updatePosition);
}

requestAnimationFrame(updatePosition);