// ============================================================
//  DJ ENGINEERING PORTFOLIO — SCRIPT.JS
//  Three.js + GSAP + Vanilla Tilt + Dynamic Effects
// ============================================================

// ---- DATA ----
const SKILLS_DATA = [
    { category: 'Programming', icon: '⚡', skills: [{n:'C / C++',v:95},{n:'Rust',v:75},{n:'Python',v:85},{n:'Assembly',v:60}]},
    { category: 'Embedded', icon: '🔧', skills: [{n:'RTOS / FreeRTOS',v:90},{n:'ARM Cortex',v:92},{n:'ESP32 / STM32',v:88},{n:'FPGA / HDL',v:65}]},
    { category: 'Tools', icon: '🛠️', skills: [{n:'Altium / KiCad',v:88},{n:'Oscilloscope',v:95},{n:'Git / CI-CD',v:80},{n:'Docker / Linux',v:78}]},
    { category: 'Hardware', icon: '📡', skills: [{n:'PCB Design',v:85},{n:'Sensor Fusion',v:78},{n:'BLE / Wi-Fi',v:82},{n:'JTAG / SWD',v:90}]}
];

const GAUGE_DATA = [
    {n:'Firmware',v:95}, {n:'PCB Layout',v:88}, {n:'RTOS',v:90},
    {n:'DSP',v:72}, {n:'IoT',v:85}, {n:'Linux',v:78}
];

let PROJECTS_DATA = [
    {id:1, title:'AutoPilot Drone Controller', desc:'STM32-based flight controller with sub-ms PID loop updates, 9-axis IMU sensor fusion, and LiDAR terrain mapping.', tech:['C++','STM32','FreeRTOS','PID'], icon:'✈️'},
    {id:2, title:'SmartGrid Energy Monitor', desc:'IoT energy monitoring platform with ESP32 mesh network, MQTT telemetry, and real-time dashboard visualization.', tech:['ESP32','MQTT','Python','Grafana'], icon:'⚡'},
    {id:3, title:'BioSense Wearable', desc:'Ultra-low power ARM Cortex health monitor achieving 30-day battery life on coin cell with BLE 5.0 streaming.', tech:['nRF52','BLE 5.0','Rust','PCB'], icon:'💓'},
    {id:4, title:'Industrial IoT Gateway', desc:'Secure Yocto Linux gateway for industrial sensor mesh with TPM 2.0 hardware crypto and OTA firmware updates.', tech:['Yocto','TPM 2.0','MQTT','Python'], icon:'🏭'},
    {id:5, title:'SignalForge SDR', desc:'Custom software-defined radio receiver with FPGA front-end and Python DSP pipeline for spectrum analysis.', tech:['FPGA','Verilog','Python','DSP'], icon:'📻'},
    {id:6, title:'ThermalMapper', desc:'Infrared thermal imaging system with real-time heatmap overlay, object detection, and temperature logging.', tech:['RPi','OpenCV','IR Sensor','C++'], icon:'🌡️'}
];

const TIMELINE_DATA = [
    {date:'2022 — Present', role:'Lead Firmware Engineer', company:'Aerospace Dynamics Inc.', desc:'Developing NextGen orbital stabilization firmware for micro-satellite constellation.'},
    {date:'2019 — 2022', role:'Senior Embedded Developer', company:'AutoTech Motors', desc:'Optimized low-level driver stacks for ADAS systems, reducing boot times by 40%.'},
    {date:'2017 — 2019', role:'Embedded Systems Engineer', company:'IoT Solutions Corp', desc:'Designed BLE mesh networks and sensor fusion algorithms for industrial IoT products.'},
    {date:'2015 — 2017', role:'Junior Hardware Engineer', company:'Robotics Systems Lab', desc:'Created multi-layer PCBs for robotic arms and integrated motor control firmware.'}
];

const TYPED_STRINGS = ['Embedded Firmware Architect', 'Electronics Engineer', 'IoT Systems Designer', 'Low-Level Wizard'];

// ---- PRELOADER ----
(function initPreloader() {
    const lines = [
        '> BOOT SEQUENCE INITIATED',
        '> Loading firmware kernel.............. OK',
        '> Establishing secure uplink........... OK',
        '> Calibrating sensor arrays............ OK',
        '> Initializing 3D render engine........ OK',
        '> SYSTEM READY. Welcome, Engineer.'
    ];
    const container = document.getElementById('preloader-lines');
    let i = 0;
    function showLine() {
        if (i < lines.length) {
            const div = document.createElement('div');
            div.className = 'line';
            div.textContent = lines[i];
            container.appendChild(div);
            gsap.to(div, { opacity: 1, y: 0, duration: 0.3 });
            i++;
            setTimeout(showLine, i === lines.length ? 600 : 300);
        } else {
            setTimeout(() => {
                document.getElementById('preloader').classList.add('hidden');
                startHeroAnimations();
            }, 500);
        }
    }
    showLine();
})();

// ---- CUSTOM CURSOR ----
(function initCursor() {
    if (window.innerWidth < 768) return;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mx = -100, my = -100, dx = -100, dy = -100;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    const hoverEls = 'a, button, .project-card, .skill-category, .nav-cta, .btn-primary, .btn-ghost, .btn-add, .social-link';
    document.querySelectorAll(hoverEls).forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
    function refreshCursorTargets() {
        document.querySelectorAll(hoverEls).forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hover'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
        });
    }
    window._refreshCursorTargets = refreshCursorTargets;

    (function loop() {
        dx += (mx - dx) * 0.15;
        dy += (my - dy) * 0.15;
        dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
        ring.style.transform = `translate(${dx - 20}px, ${dy - 20}px)`;
        requestAnimationFrame(loop);
    })();
})();

// ---- SCROLL PROGRESS ----
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    document.getElementById('scroll-progress').style.width = pct + '%';
});

// ---- NAV SCROLL ----
window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 50);
});

// ---- THREE.JS HERO BACKGROUND ----
(function initThreeHero() {
    const container = document.getElementById('hero-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 1;
        sizes[i] = Math.random() * 3 + 1;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.15, vertexColors: true, transparent: true, opacity: 0.8,
        blending: THREE.AdditiveBlending, sizeAttenuation: true
    });
    const particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlesMesh);

    // Create wireframe grid / circuit lines
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.08 });
    const lineGroup = new THREE.Group();
    for (let i = 0; i < 40; i++) {
        const lineGeometry = new THREE.BufferGeometry();
        const start = new THREE.Vector3((Math.random()-0.5)*50, (Math.random()-0.5)*50, (Math.random()-0.5)*30);
        const mid = new THREE.Vector3(start.x + (Math.random()-0.5)*15, start.y, start.z);
        const end = new THREE.Vector3(mid.x, mid.y + (Math.random()-0.5)*15, mid.z);
        lineGeometry.setFromPoints([start, mid, end]);
        lineGroup.add(new THREE.Line(lineGeometry, lineMaterial));
    }
    scene.add(lineGroup);

    // Floating icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(4, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.15 });
    const ico = new THREE.Mesh(icoGeometry, icoMaterial);
    ico.position.set(12, 0, -5);
    scene.add(ico);

    // Torus knot
    const torusGeometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffa3, wireframe: true, transparent: true, opacity: 0.08 });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-15, -5, -10);
    scene.add(torus);

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;
        lineGroup.rotation.y += 0.0003;
        ico.rotation.x += 0.005;
        ico.rotation.y += 0.008;
        torus.rotation.x += 0.003;
        torus.rotation.z += 0.005;

        camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 3 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
})();

// ---- HERO ANIMATIONS ----
function startHeroAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    const tl = gsap.timeline();
    tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6 })
      .from('.hero-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .from('.hero-typed', { y: 20, opacity: 0, duration: 0.5 }, '-=0.4')
      .from('.hero-desc', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.hero-buttons > *', { y: 20, opacity: 0, duration: 0.4, stagger: 0.15 }, '-=0.2');

    // Typing effect
    initTypedEffect();

    // Scroll-driven reveals
    initScrollReveals();

    // Skill bars
    initSkillAnimations();

    // Timeline draw
    initTimeline();

    // Counter animation
    initCounters();
}

// ---- TYPED EFFECT ----
function initTypedEffect() {
    const el = document.getElementById('typed-text');
    let si = 0, ci = 0, deleting = false;
    function tick() {
        const str = '> ' + TYPED_STRINGS[si];
        el.textContent = deleting ? str.substring(0, ci--) : str.substring(0, ci++);
        let speed = deleting ? 30 : 70;
        if (!deleting && ci === str.length + 1) { speed = 2500; deleting = true; }
        if (deleting && ci === 1) { deleting = false; ci = 0; si = (si + 1) % TYPED_STRINGS.length; speed = 500; }
        setTimeout(tick, speed);
    }
    setTimeout(tick, 800);
}

// ---- SCROLL REVEALS ----
function initScrollReveals() {
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
        });
    });
    gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 85%' },
            x: 0, opacity: 1, duration: 1, ease: 'power3.out'
        });
    });
    gsap.utils.toArray('.reveal-right').forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 85%' },
            x: 0, opacity: 1, duration: 1, ease: 'power3.out'
        });
    });

    // Stagger entrance for skill cards
    gsap.to('.skill-category', {
        scrollTrigger: { trigger: '#skills', start: 'top 70%' },
        y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out'
    });

    // Stagger entrance for project cards
    gsap.to('.project-card', {
        scrollTrigger: { trigger: '#projects', start: 'top 70%' },
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out'
    });

    // Gauge animations
    gsap.utils.toArray('.gauge-fill').forEach(gauge => {
        ScrollTrigger.create({
            trigger: gauge,
            start: 'top 90%',
            onEnter: () => {
                const target = gauge.getAttribute('data-offset');
                gauge.style.strokeDashoffset = target;
            }
        });
    });
}

// ---- SKILL BAR ANIMATIONS ----
function initSkillAnimations() {
    gsap.utils.toArray('.skill-bar-fill').forEach(bar => {
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 90%',
            onEnter: () => { bar.style.width = bar.getAttribute('data-width'); }
        });
    });
}

// ---- COUNTERS ----
function initCounters() {
    gsap.utils.toArray('.counter').forEach(el => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => {
                if (el.dataset.animated) return;
                el.dataset.animated = '1';
                const target = +el.dataset.target;
                gsap.to(el, { innerHTML: target, duration: 2, snap: { innerHTML: 1 }, ease: 'power1.out' });
            }
        });
    });
}

// ---- TIMELINE DRAW ----
function initTimeline() {
    const fill = document.querySelector('.timeline-line-fill');
    if (!fill) return;

    ScrollTrigger.create({
        trigger: '.timeline',
        start: 'top 60%',
        end: 'bottom 40%',
        onUpdate: self => {
            fill.style.height = (self.progress * 100) + '%';
        }
    });

    // Dot activation
    gsap.utils.toArray('.timeline-dot').forEach(dot => {
        ScrollTrigger.create({
            trigger: dot,
            start: 'top 70%',
            onEnter: () => dot.classList.add('active'),
        });
    });

    // Timeline card reveals
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        const content = item.querySelector('.tl-content');
        const dir = i % 2 === 0 ? 50 : -50;
        gsap.from(content, {
            scrollTrigger: { trigger: item, start: 'top 75%' },
            x: dir, opacity: 0, duration: 0.8, ease: 'power3.out'
        });
    });
}

// ---- RENDER SKILLS ----
function renderSkills() {
    const container = document.getElementById('skills-grid');
    container.innerHTML = SKILLS_DATA.map(cat => `
        <div class="skill-category reveal" style="opacity:0; transform:translateY(40px)">
            <div class="skill-cat-header">
                <span class="skill-cat-name">${cat.category}</span>
                <span class="skill-cat-icon">${cat.icon}</span>
            </div>
            ${cat.skills.map(s => `
                <div class="skill-item">
                    <div class="skill-info"><span class="skill-name">${s.n}</span><span class="skill-pct">${s.v}%</span></div>
                    <div class="skill-bar-bg"><div class="skill-bar-fill" data-width="${s.v}%"></div></div>
                </div>
            `).join('')}
        </div>
    `).join('');
}

function renderGauges() {
    const container = document.getElementById('gauge-grid');
    const circumference = 2 * Math.PI * 40; // r=40
    container.innerHTML = GAUGE_DATA.map(g => {
        const offset = circumference - (circumference * g.v / 100);
        return `
        <div class="gauge-item reveal" style="opacity:0; transform:translateY(40px)">
            <svg class="gauge-svg" viewBox="0 0 100 100">
                <circle class="gauge-bg" cx="50" cy="50" r="40"/>
                <circle class="gauge-fill" cx="50" cy="50" r="40" data-offset="${offset}" style="stroke-dasharray:${circumference}; stroke-dashoffset:${circumference}"/>
            </svg>
            <div class="gauge-value">${g.v}%</div>
            <div class="gauge-label">${g.n}</div>
        </div>`;
    }).join('');
}

// ---- RENDER PROJECTS ----
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = PROJECTS_DATA.map(p => `
        <div class="project-card reveal" data-tilt data-tilt-max="12" data-tilt-speed="400" data-tilt-glare data-tilt-max-glare="0.2" style="opacity:0; transform:translateY(40px)">
            <div class="project-links">
                <a href="#" title="Live Demo">🔗</a>
                <a href="#" title="GitHub">💻</a>
            </div>
            <div class="project-icon">${p.icon}</div>
            <h4 class="project-title">${p.title}</h4>
            <p class="project-desc">${p.desc}</p>
            <div class="project-tech">${p.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}</div>
        </div>
    `).join('');

    // Initialize Vanilla Tilt on new cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 12, speed: 400, glare: true, 'max-glare': 0.2
        });
    }
    if (window._refreshCursorTargets) window._refreshCursorTargets();
}

// ---- RENDER TIMELINE ----
function renderTimeline() {
    const container = document.getElementById('timeline-container');
    container.innerHTML = `
        <div class="timeline-line"><div class="timeline-line-fill"></div></div>
        ${TIMELINE_DATA.map(t => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="tl-content">
                    <div class="tl-date">${t.date}</div>
                    <div class="tl-role">${t.role}</div>
                    <div class="tl-company">${t.company}</div>
                    <div class="tl-desc">"${t.desc}"</div>
                </div>
            </div>
        `).join('')}
    `;
}

// ---- ADD PROJECT MODAL ----
function initModal() {
    const overlay = document.getElementById('modal-overlay');
    const openBtn = document.getElementById('btn-add-project');
    const closeBtn = document.getElementById('modal-close-btn');

    openBtn.addEventListener('click', () => overlay.classList.add('active'));
    closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });

    document.getElementById('add-project-form').addEventListener('submit', e => {
        e.preventDefault();
        const title = document.getElementById('ap-title').value;
        const desc = document.getElementById('ap-desc').value;
        const tech = document.getElementById('ap-tech').value.split(',').map(s => s.trim()).filter(Boolean);
        const icon = document.getElementById('ap-icon').value || '🚀';

        PROJECTS_DATA.push({ id: Date.now(), title, desc, tech, icon });
        renderProjects();
        // Re-init scroll triggers for new cards
        gsap.to('.project-card', {
            scrollTrigger: { trigger: '#projects', start: 'top 70%' },
            y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out'
        });
        overlay.classList.remove('active');
        e.target.reset();
    });
}

// ---- CONTACT FORM ----
function initContactForm() {
    document.getElementById('contact-form').addEventListener('submit', e => {
        e.preventDefault();
        const btn = e.target.querySelector('.btn-submit');
        btn.innerHTML = '⟳ TRANSMITTING...';
        btn.style.opacity = '0.7';
        setTimeout(() => {
            btn.innerHTML = '✓ TRANSMISSION SUCCESSFUL';
            btn.style.background = '#00ffa3';
            setTimeout(() => {
                btn.innerHTML = '↗ Send Message';
                btn.style.background = '';
                btn.style.opacity = '';
                e.target.reset();
            }, 3000);
        }, 1500);
    });
}

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ---- INIT ALL ----
renderSkills();
renderGauges();
renderProjects();
renderTimeline();
initModal();
initContactForm();
