/* ==========================================================
🌗 THEME TOGGLE
========================================================== */
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
  });
}

/* ==========================================================
🌌 DOODLE CANVAS — TRIANGLES, CIRCLES, LINES (with SMART FADE)
========================================================== */
const canvas = document.getElementById("possibilityCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

function sizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
if (canvas && ctx) {
  sizeCanvas();
  Object.assign(canvas.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: "-1",
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity 600ms ease",
  });
  window.addEventListener("resize", sizeCanvas);
}

let shapes = [];

function currentStroke() {
  return body.classList.contains("dark-mode")
    ? "rgba(250, 250, 250, 0.55)"
    : "rgba(17, 17, 17, 0.55)";
}

function randomShape() {
  if (!canvas) return null;
  const types = ["circle", "triangle", "line"];
  return {
    type: types[Math.floor(Math.random() * types.length)],
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 10 + Math.random() * 30,
    opacity: 0.3 + Math.random() * 0.7,
    dx: (Math.random() - 0.5) * 0.7,
    dy: (Math.random() - 0.5) * 0.7,
  };
}

function drawShape(s) {
  if (!ctx || !s) return;
  ctx.save();

  // Smart fade near text/buttons
  const elements = document.querySelectorAll("h1, p, button, .service-box");
  let fadeFactor = 1;
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.hypot(s.x - centerX, s.y - centerY);
    if (dist < 250) fadeFactor = Math.min(fadeFactor, dist / 250);
  });

  ctx.globalAlpha = s.opacity * fadeFactor;
  ctx.strokeStyle = currentStroke();
  ctx.lineWidth = 1.5;
  ctx.beginPath();

  if (s.type === "circle") {
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
  } else if (s.type === "triangle") {
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + s.size, s.y + s.size);
    ctx.lineTo(s.x - s.size, s.y + s.size);
    ctx.closePath();
  } else {
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + s.size * 1.5, s.y + s.size * 0.3);
  }

  ctx.stroke();
  ctx.restore();
}

/* ==========================================================
🎞️ Animate with Motion Blur
========================================================== */
function animate() {
  if (!ctx || !canvas) return;

  ctx.fillStyle = body.classList.contains("dark-mode")
    ? "rgba(0, 0, 0, 0.08)"
    : "rgba(255, 255, 255, 0.06)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const s of shapes) {
    s.x += s.dx;
    s.y += s.dy;

    if (s.x < -60) s.x = canvas.width + 60;
    if (s.x > canvas.width + 60) s.x = -60;
    if (s.y < -60) s.y = canvas.height + 60;
    if (s.y > canvas.height + 60) s.y = -60;

    drawShape(s);
  }

  requestAnimationFrame(animate);
}
animate();

/* ==========================================================
🪄 HOVER DOODLE CONTROLLER
========================================================== */
let activeHoverCount = 0;

function showDoodles({ count, speedScale = 1, sizeScale = 1, opacityScale = 1, targetOpacity = 1 }) {
  shapes = Array.from({ length: count }, () => randomShape()).filter(Boolean);
  shapes.forEach((s) => {
    s.dx *= speedScale;
    s.dy *= speedScale;
    s.size *= sizeScale;
    s.opacity *= opacityScale;
  });

  if (canvas) {
    canvas.style.transition = "opacity 1.4s ease-in"; // slow fade-in
    canvas.style.opacity = String(targetOpacity);
  }
}

function onEnter(config) {
  activeHoverCount++;
  showDoodles(config);
}

function onLeave() {
  activeHoverCount = Math.max(0, activeHoverCount - 1);
  if (activeHoverCount === 0 && canvas) {
    canvas.style.transition = "opacity 0.6s ease-out"; // fast fade-out
    canvas.style.opacity = "0";
  }
}

function bindHover(selector, config) {
  const nodes = document.querySelectorAll(selector);
  nodes.forEach((el) => {
    el.addEventListener("mouseenter", () => onEnter(config));
    el.addEventListener("mouseleave", onLeave);
  });
}

bindHover(".sketch-btn", { count: 120, speedScale: 1, targetOpacity: 1 });
bindHover(".back-btn", { count: 60, speedScale: 0.4, targetOpacity: 0.8 });
bindHover(".service-box", { count: 80, speedScale: 0.3, targetOpacity: 0.9 });

/* ==========================================================
📱 MOBILE MODE — Always show doodles
========================================================== */
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
  // On mobile, show gentle doodles by default
  window.addEventListener("load", () => {
    showDoodles({
      count: 70,
      speedScale: 0.4,
      sizeScale: 0.9,
      opacityScale: 0.8,
      targetOpacity: 0.9,
    });
  });
}

/* ==========================================================
🌄 PARALLAX PAPER BACKGROUND
========================================================== */
let targetX = 0,
  targetY = 0,
  currentX = 0,
  currentY = 0;

document.addEventListener("mousemove", (e) => {
  const intensity = 25;
  targetX = (e.clientX / window.innerWidth - 0.5) * intensity;
  targetY = (e.clientY / window.innerHeight - 0.5) * intensity;
});

function animatePaperLight() {
  currentX += (targetX - currentX) * 0.05;
  currentY += (targetY - currentY) * 0.05;

  const isDark = body.classList.contains("dark-mode");
  const texture = isDark
    ? "url('https://www.transparenttextures.com/patterns/asfalt-light.png')"
    : "url('https://www.transparenttextures.com/patterns/paper-fibers.png')";
  const glow = isDark
    ? `radial-gradient(circle at ${50 + currentX / 2}% ${50 + currentY / 2}%, rgba(255,255,255,0.05), rgba(0,0,0,0.9))`
    : `radial-gradient(circle at ${50 + currentX / 2}% ${50 + currentY / 2}%, rgba(255,255,255,0.9), rgba(230,230,230,0.6))`;

  body.style.backgroundImage = `${texture}, ${glow}`;
  body.style.backgroundBlendMode = isDark ? "soft-light" : "multiply";
  body.style.backgroundPosition = `${currentX}px ${currentY}px`;
  body.style.backgroundSize = "400px 400px, cover";

  requestAnimationFrame(animatePaperLight);
}
animatePaperLight();
