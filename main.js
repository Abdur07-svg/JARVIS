/* JARVIS AI — main.js v2.5 (mobile-ready) */
(function () {

  /* ── CANVAS BG ── */
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 55 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.4 + 0.3,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    a: Math.random() * 0.5 + 0.15
  }));

  let frame = 0;
  function drawBG() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Radial glows
    const g1 = ctx.createRadialGradient(canvas.width * 0.2, canvas.height * 0.4, 0, canvas.width * 0.2, canvas.height * 0.4, canvas.width * 0.45);
    g1.addColorStop(0, 'rgba(0,212,255,0.04)'); g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1; ctx.fillRect(0, 0, canvas.width, canvas.height);

    const g2 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.8, 0, canvas.width * 0.8, canvas.height * 0.8, canvas.width * 0.35);
    g2.addColorStop(0, 'rgba(0,255,136,0.03)'); g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2; ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(0,212,255,0.04)'; ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += 55) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 55) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Particles
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.a})`; ctx.fill();
    });

    // Scan line
    const phase = (frame % 300) / 300;
    if (phase < 0.5) {
      const sy = phase * 2 * canvas.height;
      ctx.strokeStyle = `rgba(0,212,255,${0.04 * Math.sin(phase * 2 * Math.PI)})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(canvas.width, sy); ctx.stroke();
    }

    frame++;
    requestAnimationFrame(drawBG);
  }
  drawBG();

  /* ── LOADER ── */
  const loaderLabels = ['INITIALIZING', 'LOADING AI CORE', 'CONNECTING WIKI', 'READY'];
  let lblStep = 0;
  const lblEl  = document.getElementById('loader-label');
  const lblInt = setInterval(() => {
    lblStep++;
    if (lblStep < loaderLabels.length && lblEl) lblEl.textContent = loaderLabels[lblStep];
  }, 700);

  window.addEventListener('load', () => {
    setTimeout(() => {
      clearInterval(lblInt);
      const loader = document.getElementById('loader');
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.style.display = 'none';
        document.getElementById('shell').classList.add('visible');
      }, 500);
    }, 2800);
  });

  /* ── CLOCK ── */
  function tick() {
    const n  = new Date();
    const hh = String(n.getHours()).padStart(2, '0');
    const mm = String(n.getMinutes()).padStart(2, '0');
    const ss = String(n.getSeconds()).padStart(2, '0');
    const el = document.getElementById('header-time');
    if (el) el.textContent = `${hh}:${mm}:${ss}`;
  }
  tick(); setInterval(tick, 1000);

  /* ── TYPING EFFECT ── */
  const texts = [
    'AWAITING YOUR COMMAND...',
    'ENGLISH / বাংলা / हिन्दी',
    'WIKIPEDIA SEARCH ENABLED',
    'HOW CAN I ASSIST YOU?',
    'ONLINE & OPERATIONAL'
  ];
  let ti = 0, ci = 0, del = false;
  const tyEl = document.getElementById('typing-text');
  function type() {
    if (!tyEl) return;
    const cur = texts[ti];
    tyEl.textContent = del ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
    del ? ci-- : ci++;
    let spd = del ? 38 : 65;
    if (!del && ci === cur.length)       { spd = 1800; del = true; }
    else if (del && ci === 0)            { del = false; ti = (ti + 1) % texts.length; spd = 380; }
    setTimeout(type, spd);
  }
  type();

  /* ── SUBMIT BRIDGE ── */
  // main.js handles submit so script.js form listener also works
  document.getElementById('jarvis-submit').addEventListener('click', () => {
    const inp = document.getElementById('jarvis-input');
    if (!inp || !inp.value.trim()) return;
    if (typeof unlockJarvisVoice === 'function') unlockJarvisVoice();
    if (typeof handleJarvisQuestion === 'function') handleJarvisQuestion(inp.value.trim());
  });

  document.getElementById('jarvis-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('jarvis-submit').click();
  });

  /* ── VOICE BUTTON BRIDGE ── */
  // script.js already attaches the voice toggle listener via id="jarvis-voice"
  // We just expose stat updater
  window.updateJarvisStats = function (lang, voiceOn) {
    const names = { en: 'ENGLISH', bn: 'BENGALI', hi: 'HINDI' };
    const lEl = document.getElementById('stat-lang');
    const vEl = document.getElementById('stat-voice');
    if (lEl) lEl.textContent = names[lang] || lang.toUpperCase();
    if (vEl) {
      vEl.textContent = voiceOn ? 'ACTIVE' : 'MUTED';
      vEl.style.color = voiceOn ? 'var(--cyan)' : '#ff3b5c';
    }
  };

})();
