/* Twinkling starfield, densest at the left and right edges. */
(() => {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const TINTS = ["#ffffff", "#d9d0ff", "#b9acf5", "#9fb4ff", "#ffe9b8"]; // last one = pale gold
  const DIM = 0.55; // overall star brightness (0 to 1), lower = more ominous
  let stars = [], sparkles = [], w = 0, h = 0, dpr = 1;

  // 0 at the center of the page, 1 at the far edges
  const edgeness = (x) => Math.abs(x / w - 0.5) * 2;

  function scatter(count, minEdge) {
    const out = [];
    let guard = 0;
    while (out.length < count && guard++ < count * 40) {
      const x = Math.random() * w;
      const keep = minEdge + (1 - minEdge) * Math.pow(edgeness(x), 1.3);
      if (Math.random() > keep) continue;
      out.push({
        x, y: Math.random() * h,
        tint: TINTS[Math.floor(Math.random() * TINTS.length)],
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.6,
      });
    }
    return out;
  }

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const area = w * h;
    stars = scatter(Math.min(260, Math.round(area / 9000)), 0.08)
      .map((s) => ({ ...s, r: 0.4 + Math.random() * 1.0 }));
    sparkles = scatter(Math.min(14, Math.round(area / 120000)), 0.03)
      .map((s) => ({ ...s, r: 5 + Math.random() * 7, speed: 0.4 + Math.random() * 0.8 }));
  }

  // Four-point sparkle with concave sides
  function sparkle(x, y, r, tint, alpha) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = tint;
    ctx.shadowColor = tint;
    ctx.shadowBlur = r * 0.9;
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.quadraticCurveTo(x, y, x, y + r);
    ctx.quadraticCurveTo(x, y, x - r, y);
    ctx.quadraticCurveTo(x, y, x, y - r);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    const time = t / 1000;

    for (const s of stars) {
      const a = still ? 0.7 : 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));
      ctx.globalAlpha = a * DIM;
      ctx.fillStyle = s.tint;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const s of sparkles) {
      const pulse = still ? 0.8 : 0.5 + 0.5 * Math.sin(time * s.speed + s.phase);
      sparkle(s.x, s.y, s.r * (0.55 + 0.45 * pulse), s.tint, (0.25 + 0.55 * pulse) * DIM + 0.1);
    }

    ctx.globalAlpha = 1;
    if (!still) requestAnimationFrame(draw);
  }

  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { build(); if (still) draw(0); }, 150);
  });

  build();
  requestAnimationFrame(draw);
})();