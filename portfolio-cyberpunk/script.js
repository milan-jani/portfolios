// ========== DATA ==========
const DEFAULT_PROJECTS = [
  { id:1, title:"NeoChat", desc:"Real-time messaging platform with AI-powered smart replies, end-to-end encryption, and a sleek dark interface.", category:"web", tech:["React","Node.js","Socket.io","OpenAI"], color:"#00f0ff", icon:"💬", link:"#", github:"#" },
  { id:2, title:"QuantumPay", desc:"Next-gen payment gateway with blockchain verification, biometric authentication, and instant cross-border transfers.", category:"web", tech:["Next.js","Solidity","Stripe","PostgreSQL"], color:"#bf00ff", icon:"💳", link:"#", github:"#" },
  { id:3, title:"VisionAI", desc:"Computer vision platform that detects objects in real-time using custom-trained deep learning models.", category:"ai", tech:["Python","TensorFlow","FastAPI","Docker"], color:"#ff003c", icon:"🧠", link:"#", github:"#" },
  { id:4, title:"Orbiter", desc:"Cross-platform mobile app for tracking satellite positions with AR overlay and notification alerts.", category:"mobile", tech:["React Native","Three.js","Firebase"], color:"#00ff88", icon:"🛰️", link:"#", github:"#" },
  { id:5, title:"Synthwave Studio", desc:"Browser-based music production DAW with a retro synthwave aesthetic, real-time effects, and cloud sync.", category:"design", tech:["Web Audio API","Canvas","Vue.js"], color:"#ffaa00", icon:"🎹", link:"#", github:"#" },
  { id:6, title:"DataForge", desc:"Visual data pipeline builder — drag, drop, and connect nodes to ETL data from any source to any destination.", category:"ai", tech:["D3.js","Python","Apache Kafka","React"], color:"#ff66b2", icon:"⚡", link:"#", github:"#" },
];

const SKILLS = [
  { name:"JavaScript", icon:"⚡", level:95, category:"Frontend" },
  { name:"React", icon:"⚛️", level:92, category:"Frontend" },
  { name:"TypeScript", icon:"🔷", level:88, category:"Frontend" },
  { name:"Node.js", icon:"🟢", level:90, category:"Backend" },
  { name:"Python", icon:"🐍", level:85, category:"Backend" },
  { name:"CSS/SASS", icon:"🎨", level:93, category:"Frontend" },
  { name:"MongoDB", icon:"🍃", level:82, category:"Backend" },
  { name:"PostgreSQL", icon:"🐘", level:80, category:"Backend" },
  { name:"Docker", icon:"🐳", level:78, category:"DevOps" },
  { name:"AWS", icon:"☁️", level:75, category:"DevOps" },
  { name:"Git", icon:"📦", level:90, category:"Tools" },
  { name:"Figma", icon:"🖌️", level:70, category:"Design" },
];

const TIMELINE_DATA = [
  { date:"2025 - PRESENT", title:"Senior Developer", company:"TechNova Inc.", desc:"Leading frontend architecture and mentoring junior devs. Shipped 3 major products." },
  { date:"2023 - 2025", title:"Full Stack Developer", company:"PixelForge Studio", desc:"Built scalable web apps and APIs serving 100k+ users. Introduced CI/CD pipelines." },
  { date:"2022 - 2023", title:"Frontend Developer", company:"Startup Hub", desc:"Crafted pixel-perfect UIs and interactive dashboards with React and D3.js." },
  { date:"2021 - 2022", title:"Junior Developer", company:"CodeCraft Agency", desc:"Started my journey building websites and learning the craft of clean code." },
];

const TYPED_STRINGS = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
  "Creative Problem Solver",
  "Coffee → Code Converter ☕",
];

// ========== UTILS ==========
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const lerp = (a,b,t) => a + (b - a) * t;

// ========== PRELOADER ==========
(function initPreloader() {
  const pct = $('.loader-percent');
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 15;
    if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => { $('#preloader').classList.add('hidden'); document.body.style.overflow = ''; }, 400); }
    pct.textContent = Math.floor(p) + '%';
  }, 100);
  document.body.style.overflow = 'hidden';
})();

// ========== THEME TOGGLE ==========
(function initTheme() {
  const html = document.documentElement;
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) html.setAttribute('data-theme', saved);

  const toggle = $('#theme-toggle');
  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'dark') {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('portfolio-theme', next);
    // update particles to match
    if (window._updateParticleColors) window._updateParticleColors();
  });
})();

// ========== CUSTOM CURSOR ==========
(function initCursor() {
  const dot = $('#cursor-dot'), ring = $('#cursor-ring');
  let mx = 0, my = 0, dx = 0, dy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mousedown', () => ring.classList.add('click'));
  document.addEventListener('mouseup', () => ring.classList.remove('click'));
  $$('a, button, .project-card, .filter-btn, .color-swatch, .orbit-skill, .theme-toggle').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
  (function loop() {
    dx = lerp(dx, mx, .15); dy = lerp(dy, my, .15);
    dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    ring.style.transform = `translate(${dx - 18}px, ${dy - 18}px)`;
    requestAnimationFrame(loop);
  })();
})();

// ========== PARTICLES ==========
(function initParticles() {
  const c = $('#particle-canvas'), ctx = c.getContext('2d');
  let w, h, particles = [], mouse = { x: -999, y: -999 };
  function resize() { w = c.width = innerWidth; h = c.height = innerHeight; }
  resize(); window.addEventListener('resize', resize);
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  function getThemeColors() {
    const style = getComputedStyle(document.documentElement);
    return {
      colors: [
        style.getPropertyValue('--cyan').trim(),
        style.getPropertyValue('--purple').trim(),
        style.getPropertyValue('--pink').trim(),
        style.getPropertyValue('--green').trim()
      ],
      lineColor: style.getPropertyValue('--cyan').trim()
    };
  }
  let themeColors = getThemeColors();

  window._updateParticleColors = function() {
    themeColors = getThemeColors();
    particles.forEach(p => {
      p.color = themeColors.colors[Math.floor(Math.random() * themeColors.colors.length)];
    });
  };

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w; this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .3; this.vy = (Math.random() - .5) * .3;
      this.r = Math.random() * 1.5 + .5;
      this.o = Math.random() * .5 + .1;
      this.color = themeColors.colors[Math.floor(Math.random() * themeColors.colors.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      const dx = mouse.x - this.x, dy = mouse.y - this.y, d = Math.sqrt(dx*dx+dy*dy);
      if (d < 120) { this.x -= dx * .01; this.y -= dy * .01; }
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = this.color; ctx.globalAlpha = this.o; ctx.fill();
    }
  }
  const count = Math.min(Math.floor(w * h / 8000), 150);
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0,0,w,h);
    particles.forEach(p => { p.update(); p.draw(); });
    // draw connections
    ctx.globalAlpha = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if (d < 100) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = themeColors.lineColor; ctx.globalAlpha = (1 - d/100) * .12;
          ctx.lineWidth = .5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// ========== SCROLL PROGRESS ==========
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - innerHeight) * 100;
  $('#scroll-progress').style.width = pct + '%';
});

// ========== NAVBAR ==========
(function initNav() {
  const nb = $('#navbar'), tog = $('#nav-toggle'), links = $('#nav-links');
  window.addEventListener('scroll', () => nb.classList.toggle('scrolled', scrollY > 50));
  tog.addEventListener('click', () => { tog.classList.toggle('active'); links.classList.toggle('active'); });
  $$('.nav-link').forEach(l => l.addEventListener('click', () => { tog.classList.remove('active'); links.classList.remove('active'); }));
  // active link on scroll
  const sections = $$('.section');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 200) cur = s.id; });
    $$('.nav-link').forEach(l => { l.classList.toggle('active', l.dataset.section === cur); });
  });
})();

// ========== TYPED TEXT ==========
(function initTyped() {
  const el = $('#typed-text');
  let si = 0, ci = 0, deleting = false;
  function tick() {
    const s = TYPED_STRINGS[si];
    el.textContent = deleting ? s.substring(0, ci--) : s.substring(0, ci++);
    let speed = deleting ? 40 : 80;
    if (!deleting && ci === s.length + 1) { speed = 2000; deleting = true; }
    if (deleting && ci === -1) { deleting = false; ci = 0; si = (si + 1) % TYPED_STRINGS.length; speed = 400; }
    setTimeout(tick, speed);
  }
  setTimeout(tick, 1000);
})();

// ========== STAT COUNTER ==========
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(p * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ========== INTERSECTION OBSERVER (Reveals) ==========
(function initReveals() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // counters
        if (e.target.classList.contains('stat-item') || e.target.classList.contains('fact-card')) {
          const numEl = e.target.querySelector('[data-target]');
          if (numEl && !numEl.dataset.animated) { numEl.dataset.animated = '1'; animateCounter(numEl, +numEl.dataset.target); }
        }
        // skill bars
        if (e.target.classList.contains('skill-card')) {
          const bar = e.target.querySelector('.skill-bar');
          if (bar) setTimeout(() => bar.style.width = bar.dataset.level + '%', 200);
        }
      }
    });
  }, { threshold: .2 });

  $$('.reveal-text,.reveal-left,.reveal-right,.reveal-up,.project-card,.skill-card,.timeline-item').forEach(el => obs.observe(el));
  $$('.stat-item').forEach(el => { el.classList.add('reveal-up'); obs.observe(el); });
  $$('.fact-card').forEach(el => obs.observe(el));
})();

// ========== PROJECTS ==========
let allProjects = [...DEFAULT_PROJECTS, ...JSON.parse(localStorage.getItem('userProjects') || '[]')];
let activeFilter = 'all';

function renderProjects(filter = 'all') {
  const grid = $('#projects-grid');
  const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="project-card" data-id="${p.id}" style="--accent:${p.color}">
      <div class="project-card-image">
        <div class="project-card-gradient" style="background:linear-gradient(135deg,${p.color}33,${p.color}11)"></div>
        <span class="project-icon">${p.icon || '🚀'}</span>
        <div class="project-card-overlay"><span>View Details</span></div>
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.desc}</p>
        <div class="project-card-tech">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
  // animate in
  setTimeout(() => $$('.project-card').forEach((c, i) => setTimeout(() => c.classList.add('visible'), i * 100)), 50);
  // 3D tilt
  $$('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `translateY(-8px) perspective(800px) rotateX(${-y*8}deg) rotateY(${x*8}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    card.addEventListener('click', () => openProjectModal(+card.dataset.id));
  });
}

// Filters
$$('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProjects(activeFilter);
  });
});

renderProjects();

// ========== PROJECT MODAL ==========
function openProjectModal(id) {
  const p = allProjects.find(x => x.id === id);
  if (!p) return;
  const modal = $('#project-modal');
  $('#modal-body').innerHTML = `
    <div class="modal-hero-img" style="background:linear-gradient(135deg,${p.color}22,${p.color}08)">
      <span class="project-icon" style="font-size:80px;opacity:.4">${p.icon || '🚀'}</span>
    </div>
    <h3 class="modal-title">${p.title}</h3>
    <p class="modal-desc">${p.desc}</p>
    <h4 class="modal-section-title">Tech Stack</h4>
    <div class="modal-tech-list">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
    <div class="modal-links">
      ${p.link ? `<a href="${p.link}" class="modal-link modal-link-primary" target="_blank">Live Demo</a>` : ''}
      ${p.github ? `<a href="${p.github}" class="modal-link modal-link-secondary" target="_blank">GitHub</a>` : ''}
    </div>
  `;
  modal.classList.add('active');
}
$('#modal-close').addEventListener('click', () => $('#project-modal').classList.remove('active'));
$('#project-modal').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.classList.remove('active'); });

// ESC key closes all modals
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    $('#project-modal').classList.remove('active');
    $('#add-project-modal').classList.remove('active');
    $('#easter-egg-overlay').classList.remove('active');
  }
});

// ========== ADD PROJECT ==========
$('#add-project-btn').addEventListener('click', () => $('#add-project-modal').classList.add('active'));
$('#add-modal-close').addEventListener('click', () => $('#add-project-modal').classList.remove('active'));
$('#add-project-modal').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.classList.remove('active'); });

let selectedColor = '#00f0ff';
$$('.color-swatch').forEach(s => {
  s.addEventListener('click', () => {
    $$('.color-swatch').forEach(x => x.classList.remove('active'));
    s.classList.add('active');
    selectedColor = s.dataset.color;
  });
});

$('#add-project-form').addEventListener('submit', e => {
  e.preventDefault();
  const proj = {
    id: Date.now(),
    title: $('#proj-title').value,
    desc: $('#proj-desc').value,
    category: $('#proj-category').value,
    tech: $('#proj-tech').value.split(',').map(s => s.trim()).filter(Boolean),
    color: selectedColor,
    icon: '🚀',
    link: $('#proj-link').value || '',
    github: $('#proj-github').value || '',
    custom: true
  };
  allProjects.push(proj);
  const stored = JSON.parse(localStorage.getItem('userProjects') || '[]');
  stored.push(proj);
  localStorage.setItem('userProjects', JSON.stringify(stored));
  renderProjects(activeFilter);
  $('#add-project-modal').classList.remove('active');
  $('#add-project-form').reset();
  $$('.color-swatch').forEach(s => s.classList.remove('active'));
  $$('.color-swatch')[0].classList.add('active');
  selectedColor = '#00f0ff';
  fireConfetti();
});

// ========== SKILLS ORBIT ==========
(function initSkills() {
  const container = $('.skills-orbit-container');
  // Create orbit rings + center
  container.innerHTML = `
    <div class="orbit-ring orbit-ring-1"></div>
    <div class="orbit-ring orbit-ring-2"></div>
    <div class="orbit-ring orbit-ring-3"></div>
    <div class="orbit-center">DJ</div>
  `;
  // Place skills on orbits
  const orbits = [80, 120, 160]; // radii
  const mobileOrbits = [60, 90, 120];
  const isMobile = innerWidth < 768;
  const radii = isMobile ? mobileOrbits : orbits;

  SKILLS.forEach((s, i) => {
    const orbitIdx = i < 4 ? 0 : i < 8 ? 1 : 2;
    const countInOrbit = orbitIdx === 0 ? 4 : orbitIdx === 1 ? 4 : SKILLS.length - 8;
    const idxInOrbit = orbitIdx === 0 ? i : orbitIdx === 1 ? i - 4 : i - 8;
    const angle = (idxInOrbit / countInOrbit) * Math.PI * 2 - Math.PI/2;
    const r = radii[orbitIdx];
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;

    const el = document.createElement('div');
    el.className = 'orbit-skill';
    el.style.left = `calc(50% + ${x}px - 21px)`;
    el.style.top = `calc(50% + ${y}px - 21px)`;
    el.innerHTML = `${s.icon}<span class="skill-tooltip">${s.name}</span>`;
    container.appendChild(el);
  });

  // Slowly rotate container
  let angle = 0;
  function rotateOrbit() {
    angle += .08;
    container.style.transform = `rotate(${angle}deg)`;
    container.querySelectorAll('.orbit-skill, .orbit-center').forEach(el => {
      el.style.transform = `rotate(${-angle}deg)`;
    });
    requestAnimationFrame(rotateOrbit);
  }
  rotateOrbit();

  // Skill cards
  const grid = $('#skills-grid');
  grid.innerHTML = SKILLS.map(s => `
    <div class="skill-card">
      <div class="skill-card-header">
        <span class="skill-card-icon">${s.icon}</span>
        <span class="skill-card-name">${s.name}</span>
      </div>
      <div class="skill-bar-container">
        <div class="skill-bar" data-level="${s.level}"></div>
      </div>
      <div class="skill-percentage">${s.level}%</div>
    </div>
  `).join('');

  // observe skill cards
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        const bar = e.target.querySelector('.skill-bar');
        if (bar) setTimeout(() => bar.style.width = bar.dataset.level + '%', 200);
      }
    });
  }, { threshold: .2 });
  $$('.skill-card').forEach(c => obs.observe(c));
})();

// ========== TIMELINE ==========
(function initTimeline() {
  const tl = $('#timeline');
  tl.innerHTML = TIMELINE_DATA.map(t => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-date">${t.date}</span>
        <h3 class="timeline-title">${t.title}</h3>
        <p class="timeline-company">${t.company}</p>
        <p class="timeline-desc">${t.desc}</p>
      </div>
    </div>
  `).join('');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: .2 });
  $$('.timeline-item').forEach(el => obs.observe(el));
})();

// ========== CONTACT FORM ==========
$('#contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = $('#send-btn');
  btn.classList.add('loading');
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.classList.add('success');
    fireConfetti();
    setTimeout(() => { btn.classList.remove('success'); $('#contact-form').reset(); }, 3000);
  }, 1500);
});

// ========== CONFETTI ==========
function fireConfetti() {
  const c = $('#confetti-canvas'), ctx = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const pieces = [];
  const colors = ['#00f0ff','#bf00ff','#ff003c','#00ff88','#ffaa00','#ff66b2'];
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: innerWidth / 2, y: innerHeight / 2,
      vx: (Math.random() - .5) * 16, vy: Math.random() * -14 - 4,
      w: Math.random() * 8 + 4, h: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360, rv: (Math.random() - .5) * 12,
      gravity: .25, life: 1
    });
  }
  function animate() {
    ctx.clearRect(0, 0, c.width, c.height);
    let alive = false;
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += p.gravity;
      p.rot += p.rv; p.life -= .008;
      if (p.life <= 0) return;
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });
    if (alive) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, c.width, c.height);
  }
  animate();
}

// ========== KONAMI CODE EASTER EGG ==========
(function initKonami() {
  const code = [38,38,40,40,37,39,37,39,66,65]; // up up down down left right left right b a
  let idx = 0;
  document.addEventListener('keydown', e => {
    if (e.keyCode === code[idx]) {
      idx++;
      if (idx === code.length) {
        idx = 0;
        $('#easter-egg-overlay').classList.add('active');
        fireConfetti();
      }
    } else idx = 0;
  });
  $('#easter-egg-close').addEventListener('click', () => $('#easter-egg-overlay').classList.remove('active'));
})();

// ========== SMOOTH SCROLL ==========
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ========== CLICK RIPPLE ==========
$$('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,.3);transform:scale(0);animation:ripple-effect .6s ease-out;pointer-events:none;`;
    const r = this.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - r.left - size/2) + 'px';
    ripple.style.top = (e.clientY - r.top - size/2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframes
const style = document.createElement('style');
style.textContent = `@keyframes ripple-effect { to { transform:scale(4); opacity:0; } }`;
document.head.appendChild(style);

// ========== RE-REGISTER CURSOR HOVERS AFTER RENDER ==========
function registerCursorHovers() {
  const ring = $('#cursor-ring');
  $$('a, button, .project-card, .filter-btn, .color-swatch, .orbit-skill, .theme-toggle').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}
const origRender = renderProjects;
// Patch renderProjects to re-register
const _origRP = renderProjects;
window.renderProjectsPatched = function(f) { _origRP(f); registerCursorHovers(); };

console.log('%c🚀 Portfolio loaded! Try the Konami Code: ↑↑↓↓←→←→BA', 'color:#00f0ff;font-size:14px;font-weight:bold;');
