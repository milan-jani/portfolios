// ========== ROYAL LUXURY DATA ==========
const DEFAULT_PROJECTS = [
  { id:1, title:"Aura Estate", desc:"A bespoke digital experience for an ultra-luxury real estate agency, featuring immersive 3D property tours.", category:"web", tech:["React","Three.js","GSAP","Next.js"], color:"#c9a84c", icon:"🏰", link:"#", github:"#" },
  { id:2, title:"Chronos", desc:"An elegant e-commerce platform for vintage, high-end timepieces. Designed with refined typography and smooth transitions.", category:"design", tech:["Vue.js","Tailwind","Shopify"], color:"#8b5e3c", icon:"⏱️", link:"#", github:"#" },
  { id:3, title:"Maison Rouge", desc:"Brand identity and reservation system for a Michelin-starred dining experience.", category:"web", tech:["Node.js","PostgreSQL","Stripe","Figma"], color:"#6b2737", icon:"🍷", link:"#", github:"#" },
  { id:4, title:"Lumina", desc:"AI-powered interior design assistant that visualizes opulent room transformations in real-time.", category:"ai", tech:["Python","PyTorch","FastAPI","React"], color:"#2c4a5a", icon:"✨", link:"#", github:"#" },
  { id:5, title:"Aethel", desc:"Exclusive private members club mobile application with encrypted concierge messaging and bespoke event booking.", category:"mobile", tech:["React Native","Firebase","WebSockets"], color:"#7b6b8a", icon:"🗝️", link:"#", github:"#" },
];

const SKILLS = [
  { name:"JavaScript", icon:"JS", level:95 },
  { name:"TypeScript", icon:"TS", level:88 },
  { name:"React / Next", icon:"Re", level:92 },
  { name:"Node.js", icon:"No", level:90 },
  { name:"Python", icon:"Py", level:85 },
  { name:"UI/UX Design", icon:"De", level:85 },
  { name:"WebGL", icon:"3D", level:75 },
];

const TIMELINE_DATA = [
  { date:"2025 - PRESENT", title:"Principal Architect", company:"Aethelred Digital", desc:"Orchestrating the development of premium digital experiences for Fortune 500 luxury brands." },
  { date:"2023 - 2025", title:"Senior Craftsman", company:"Bespoke Web Co.", desc:"Lead the engineering team in crafting award-winning immersive web applications with uncompromising performance." },
  { date:"2022 - 2023", title:"Frontend Artisan", company:"Aesthetic Studios", desc:"Honed my craft in translating intricate design systems into pixel-perfect, accessible code." },
  { date:"2021 - 2022", title:"Apprentice Developer", company:"The Coding Guild", desc:"Began the journey of mastering the foundational arts of software engineering." },
];

const TYPED_STRINGS = [
  "Bespoke Digital Experiences",
  "Refined Web Architecture",
  "Uncompromising Performance",
  "Elegant User Interfaces",
];

// ========== UTILS ==========
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const lerp = (a,b,t) => a + (b - a) * t;

// ========== PRELOADER ==========
(function initPreloader() {
  const pct = $('.loader-percent');
  const bar = $('.loader-bar-fill');
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 12;
    if (p >= 100) { 
        p = 100; 
        clearInterval(iv); 
        setTimeout(() => { 
            $('#preloader').classList.add('hidden'); 
            document.body.style.overflow = ''; 
        }, 600); 
    }
    pct.textContent = Math.floor(p) + '%';
    bar.style.width = p + '%';
  }, 120);
  document.body.style.overflow = 'hidden';
})();

// ========== CUSTOM CURSOR ==========
(function initCursor() {
  const dot = $('#cursor-dot'), ring = $('#cursor-ring');
  let mx = 0, my = 0, dx = 0, dy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mousedown', () => ring.classList.add('click'));
  document.addEventListener('mouseup', () => ring.classList.remove('click'));
  
  function registerHovers() {
      $$('a, button, .project-card, .filter-btn, .color-swatch, .skill-showcase-item').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
      });
  }
  registerHovers();
  window.registerCursorHovers = registerHovers; // expose for dynamic renders

  (function loop() {
    dx = lerp(dx, mx, .12); dy = lerp(dy, my, .12);
    dot.style.transform = `translate(${mx - 2.5}px, ${my - 2.5}px)`;
    ring.style.transform = `translate(${dx - 16}px, ${dy - 16}px)`;
    requestAnimationFrame(loop);
  })();
})();

// ========== PARTICLES (Gold Dust) ==========
(function initParticles() {
  const c = $('#particle-canvas'), ctx = c.getContext('2d');
  let w, h, particles = [];
  function resize() { w = c.width = innerWidth; h = c.height = innerHeight; }
  resize(); window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w; this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .15; this.vy = -Math.random() * .2 - .05; // float up
      this.r = Math.random() * 1.5 + .2;
      this.o = Math.random() * .4 + .1;
      this.shimmer = Math.random() * .02;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.o += Math.sin(Date.now() * this.shimmer) * .01;
      if (this.o < 0) this.o = 0; if (this.o > .6) this.o = .6;
      if (this.x < 0 || this.x > w || this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = '#c9a84c'; ctx.globalAlpha = this.o; ctx.fill();
    }
  }
  const count = Math.min(Math.floor(w * h / 9000), 120);
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0,0,w,h);
    particles.forEach(p => { p.update(); p.draw(); });
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
    let speed = deleting ? 30 : 60;
    if (!deleting && ci === s.length + 1) { speed = 2500; deleting = true; }
    if (deleting && ci === -1) { deleting = false; ci = 0; si = (si + 1) % TYPED_STRINGS.length; speed = 500; }
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
        if (e.target.classList.contains('stat-item') || e.target.classList.contains('fact-card')) {
          const numEl = e.target.querySelector('[data-target]');
          if (numEl && !numEl.dataset.animated) { numEl.dataset.animated = '1'; animateCounter(numEl, +numEl.dataset.target); }
        }
        if (e.target.classList.contains('skill-card')) {
          const bar = e.target.querySelector('.skill-bar');
          if (bar) setTimeout(() => bar.style.width = bar.dataset.level + '%', 300);
        }
      }
    });
  }, { threshold: .15 });

  $$('.reveal-text,.reveal-left,.reveal-right,.reveal-up,.project-card,.skill-card,.timeline-item').forEach(el => obs.observe(el));
  $$('.stat-item').forEach(el => { el.classList.add('reveal-up'); obs.observe(el); });
  $$('.fact-card').forEach(el => obs.observe(el));
})();

// ========== PROJECTS ==========
let allProjects = [...DEFAULT_PROJECTS, ...JSON.parse(localStorage.getItem('luxuryProjects') || '[]')];
let activeFilter = 'all';

function renderProjects(filter = 'all') {
  const grid = $('#projects-grid');
  const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="project-card" data-id="${p.id}" style="--gold-glow: 0 0 20px ${p.color}40, 0 0 60px ${p.color}20">
      <div class="project-card-image">
        <div class="project-card-gradient" style="background:linear-gradient(135deg,${p.color}20,transparent)"></div>
        <span class="project-icon" style="color:${p.color}">${p.icon || '✦'}</span>
        <div class="project-card-overlay"><span>View Details</span></div>
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.desc}</p>
        <div class="project-card-tech">${p.tech.map(t => `<span class="tech-tag" style="color:${p.color};border-color:${p.color}40;background:${p.color}10">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
  
  setTimeout(() => $$('.project-card').forEach((c, i) => setTimeout(() => c.classList.add('visible'), i * 80)), 50);
  
  $$('.project-card').forEach(card => card.addEventListener('click', () => openProjectModal(+card.dataset.id)));
  if(window.registerCursorHovers) window.registerCursorHovers();
}

$$('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProjects(activeFilter);
  });
});

renderProjects();

// ========== MODALS ==========
function openProjectModal(id) {
  const p = allProjects.find(x => x.id === id);
  if (!p) return;
  $('#modal-body').innerHTML = `
    <div class="modal-title-line"><span class="line-left"></span><span class="line-diamond">◆</span><span class="line-right"></span></div>
    <div class="modal-hero-img" style="background:linear-gradient(135deg,${p.color}15,transparent)">
      <span class="project-icon" style="font-size:72px;color:${p.color};opacity:.6">${p.icon || '✦'}</span>
    </div>
    <h3 class="modal-title">${p.title}</h3>
    <p class="modal-desc">${p.desc}</p>
    <h4 class="modal-section-title" style="color:${p.color}">Tech Stack</h4>
    <div class="modal-tech-list">${p.tech.map(t => `<span class="tech-tag" style="color:${p.color};border-color:${p.color}40;background:${p.color}10">${t}</span>`).join('')}</div>
    <div class="modal-links">
      ${p.link ? `<a href="${p.link}" class="btn modal-link modal-link-primary" target="_blank" style="background:linear-gradient(135deg,${p.color},transparent);border:1px solid ${p.color}">View Live</a>` : ''}
      ${p.github ? `<a href="${p.github}" class="btn modal-link modal-link-secondary" target="_blank">Source Code</a>` : ''}
    </div>
  `;
  $('#project-modal').classList.add('active');
}
$('#modal-close').addEventListener('click', () => $('#project-modal').classList.remove('active'));
$('#project-modal').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.classList.remove('active'); });

$('#add-project-btn').addEventListener('click', () => $('#add-project-modal').classList.add('active'));
$('#add-modal-close').addEventListener('click', () => $('#add-project-modal').classList.remove('active'));
$('#add-project-modal').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.classList.remove('active'); });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    $('#project-modal').classList.remove('active');
    $('#add-project-modal').classList.remove('active');
    $('#easter-egg-overlay').classList.remove('active');
  }
});

let selectedColor = '#c9a84c';
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
    icon: '✦',
    link: $('#proj-link').value || '',
    github: $('#proj-github').value || '',
    custom: true
  };
  allProjects.unshift(proj);
  const stored = JSON.parse(localStorage.getItem('luxuryProjects') || '[]');
  stored.unshift(proj);
  localStorage.setItem('luxuryProjects', JSON.stringify(stored));
  renderProjects(activeFilter);
  $('#add-project-modal').classList.remove('active');
  $('#add-project-form').reset();
  $$('.color-swatch').forEach(s => s.classList.remove('active'));
  $$('.color-swatch')[0].classList.add('active');
  selectedColor = '#c9a84c';
  fireConfetti();
});

// ========== SKILLS ==========
(function initSkills() {
  const showcase = $('#skills-showcase');
  showcase.innerHTML = SKILLS.map(s => `
    <div class="skill-showcase-item">
        <div class="skill-showcase-icon">${s.icon}</div>
        <div class="skill-showcase-name">${s.name}</div>
    </div>
  `).join('');

  const grid = $('#skills-grid');
  grid.innerHTML = SKILLS.map(s => `
    <div class="skill-card">
      <div class="skill-card-header">
        <span class="skill-card-name">${s.name}</span>
      </div>
      <div class="skill-bar-container">
        <div class="skill-bar" data-level="${s.level}"></div>
      </div>
      <div class="skill-percentage">${s.level}%</div>
    </div>
  `).join('');
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

// ========== CONFETTI (Gold & Jewels) ==========
function fireConfetti() {
  const c = $('#confetti-canvas'), ctx = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const pieces = [];
  const colors = ['#c9a84c','#e8d48b','#8b6914','#6b2737','#2c4a5a','#f5efe0'];
  for (let i = 0; i < 100; i++) {
    pieces.push({
      x: innerWidth / 2, y: innerHeight / 2,
      vx: (Math.random() - .5) * 14, vy: Math.random() * -12 - 4,
      w: Math.random() * 6 + 3, h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360, rv: (Math.random() - .5) * 8,
      gravity: .15, life: 1, type: Math.random() > .5 ? 'rect' : 'circle'
    });
  }
  function animate() {
    ctx.clearRect(0, 0, c.width, c.height);
    let alive = false;
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += p.gravity;
      p.rot += p.rv; p.life -= .006;
      if (p.life <= 0) return;
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      if(p.type === 'rect') ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      else { ctx.beginPath(); ctx.arc(0,0,p.w/2,0,Math.PI*2); ctx.fill(); }
      ctx.restore();
    });
    if (alive) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, c.width, c.height);
  }
  animate();
}

// ========== KONAMI CODE EASTER EGG ==========
(function initKonami() {
  const code = [38,38,40,40,37,39,37,39,66,65];
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

console.log('%c♛ Royal Portfolio loaded! Try the Konami Code: ↑↑↓↓←→←→BA', 'color:#c9a84c;font-size:14px;font-family:serif;');
