// ====================================================
// NAGA DEEPTHI VALLURU – ULTRA-ADVANCED RESUME SCRIPTS
// AI Console · Particles · Glassmorphism · Animations
// ====================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Particle System ───────────────────────────────
  const canvas  = document.getElementById('particleCanvas');
  const ctx     = canvas ? canvas.getContext('2d') : null;
  let particles = [];
  let animFrame;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    const hues = [195, 265, 220, 320]; // cyan, purple, blue, pink
    const h = hues[Math.floor(Math.random() * hues.length)];
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.55 + 0.1,
      hue: h,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.012 + Math.random() * 0.02
    };
  }

  function initParticles() {
    if (!canvas) return;
    resizeCanvas();
    const count = Math.min(Math.floor(window.innerWidth / 8), 160);
    particles = Array.from({ length: count }, createParticle);
    animateParticles();
  }

  function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;
      const op = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${op})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, 0.5)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.08;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    animFrame = requestAnimationFrame(animateParticles);
  }

  if (canvas) {
    initParticles();
    window.addEventListener('resize', () => {
      resizeCanvas();
      particles = Array.from({ length: Math.min(Math.floor(window.innerWidth / 8), 160) }, createParticle);
    });
  }

  // ── 2. Scroll Progress Bar ───────────────────────────
  const scrollProgress = document.getElementById('scrollProgress');
  const updateScrollProgress = () => {
    const scrolled     = window.scrollY;
    const totalHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = totalHeight > 0 ? Math.min((scrolled / totalHeight) * 100, 100) : 0;
    if (scrollProgress) scrollProgress.style.width = `${progress}%`;
  };

  // ── 3. Navbar Scroll Effects ─────────────────────────
  const navbar       = document.getElementById('navbar');
  const backToTop    = document.getElementById('backToTop');
  const navLinks     = document.querySelectorAll('.nav-link');
  const sections     = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    updateScrollProgress();

    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── 4. Back To Top ───────────────────────────────────
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── 5. Mobile Hamburger ──────────────────────────────
  const hamburger         = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // ── 6. Theme Toggle ──────────────────────────────────
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const html        = document.documentElement;

  const savedTheme = localStorage.getItem('resumeTheme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('resumeTheme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // ── 7. Reveal on Scroll ──────────────────────────────
  const revealEls      = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((s, idx) => { if (s === entry.target) delay = idx * 90; });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── 8. Animated Counter ──────────────────────────────
  const statNumbers     = document.querySelectorAll('.stat-number[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();
    const step = (now) => {
      const t    = Math.min((now - start) / duration, 1);
      const ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      el.textContent = Math.floor(ease * target);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  // ── 9. Skills Tabs ───────────────────────────────────
  const skillTabs   = document.querySelectorAll('.skill-tab');
  const skillPanels = document.querySelectorAll('.skills-panel');

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInPanel {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = `panel${cap(tab.dataset.tab)}`;
      skillTabs.forEach(t => t.classList.remove('active'));
      skillPanels.forEach(p => { p.classList.remove('active'); p.style.animation = ''; });
      tab.classList.add('active');
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.classList.add('active');
        panel.style.animation = 'fadeInPanel 0.35s ease forwards';
      }
    });
  });

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  // ── 10. Rotating Hero Title ──────────────────────────
  const rotatingTitle = document.getElementById('rotatingTitle');
  const titles = [
    'Enterprise Architect',
    'MuleSoft Developer',
    'Cloud Strategist',
    'Integration Lead',
    'Full Stack Expert',
    'Aviation Tech Leader',
    'DevSecOps Champion'
  ];
  let titleIndex = 0;

  if (rotatingTitle) {
    setInterval(() => {
      rotatingTitle.style.opacity = '0';
      rotatingTitle.style.transform = 'translateY(-8px)';
      setTimeout(() => {
        titleIndex = (titleIndex + 1) % titles.length;
        rotatingTitle.textContent = titles[titleIndex];
        rotatingTitle.style.opacity = '1';
        rotatingTitle.style.transform = 'translateY(0)';
        rotatingTitle.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      }, 350);
    }, 2800);
  }

  // ── 11. Persona / AI Tailor Switcher ─────────────────
  const personaBtns = document.querySelectorAll('.persona-btn');
  const heroBio     = document.getElementById('heroBio');
  const heroChips   = document.getElementById('heroChips');

  const personaData = {
    architect: {
      title: 'Enterprise Architect',
      bio: 'Visionary Enterprise Architect with <strong>20+ years</strong> of excellence in N-Tier, Microservices, and Serverless architectures. Expert in designing resilient, cloud-native systems for <strong>The Boeing Company</strong> and global airline networks. Specializing in high-throughput integration and governance frameworks.',
      chips: [
        { icon: 'fas fa-map-marker-alt', text: 'Hyderabad, India' },
        { icon: 'fas fa-sitemap', text: 'N-Tier & Microservices' },
        { icon: 'fas fa-cloud', text: 'Cloud-Native Architecture' },
        { icon: 'fas fa-globe', text: 'Open to Relocation' },
        { icon: 'fas fa-award', text: '20 Years Experience' }
      ]
    },
    cloud: {
      title: 'Cloud / DevSecOps Expert',
      bio: 'Certified <strong>Azure Fundamentals (AZ-900)</strong> practitioner with hands-on expertise across Azure, AWS, and GCP. Driving enterprise-grade CI/CD pipelines, Coverity vulnerability management, Azure Functions (serverless), and multi-cloud transformation strategies across aviation ecosystems.',
      chips: [
        { icon: 'fas fa-cloud', text: 'Microsoft Azure' },
        { icon: 'fab fa-aws', text: 'AWS Ready' },
        { icon: 'fas fa-shield-halved', text: 'DevSecOps / Coverity' },
        { icon: 'fas fa-code-branch', text: 'CI/CD Pipelines' },
        { icon: 'fas fa-globe', text: 'Remote / Hybrid Ready' }
      ]
    },
    integration: {
      title: 'Integration Lead',
      bio: '<strong>Salesforce Certified MuleSoft Developer (2024)</strong> and Anypoint Platform expert. Built Experience, Process, and System APIs for elite global carriers including United Airlines, Singapore Airlines, LATAM, Lion Air, and Norwegian Longhaul — handling ATA SPEC2000 compliance at scale.',
      chips: [
        { icon: 'fas fa-plug', text: 'MuleSoft ESB' },
        { icon: 'fas fa-network-wired', text: 'API Management' },
        { icon: 'fas fa-plane', text: 'Aviation APIs' },
        { icon: 'fas fa-exchange-alt', text: 'RabbitMQ / Queuing' },
        { icon: 'fas fa-globe', text: 'Global Delivery' }
      ]
    },
    fullstack: {
      title: 'Full Stack Lead',
      bio: 'Full Stack expert proficient in <strong>.NET Core, ReactJS, Java Spring Boot, and Python</strong>. Built enterprise portals, real-time dashboards, and multi-format data ingestion platforms supporting mission-critical Boeing aviation reliability systems with RabbitMQ event-driven architectures.',
      chips: [
        { icon: 'fas fa-code', text: '.NET Core + ReactJS' },
        { icon: 'fab fa-java', text: 'Java / Spring Boot' },
        { icon: 'fas fa-database', text: 'SQL & NoSQL DBs' },
        { icon: 'fas fa-layer-group', text: 'Full Stack Delivery' },
        { icon: 'fas fa-globe', text: 'Open to Relocation' }
      ]
    }
  };

  personaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      personaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const persona = btn.dataset.persona;
      const data    = personaData[persona];
      if (!data) return;

      // Update hero rotating title
      if (rotatingTitle) {
        rotatingTitle.style.opacity = '0';
        setTimeout(() => {
          rotatingTitle.textContent = data.title;
          rotatingTitle.style.opacity = '1';
        }, 300);
      }

      // Update bio
      if (heroBio) {
        heroBio.style.opacity = '0';
        heroBio.style.transform = 'translateY(10px)';
        setTimeout(() => {
          heroBio.innerHTML = data.bio;
          heroBio.style.opacity = '1';
          heroBio.style.transform = 'translateY(0)';
          heroBio.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        }, 200);
      }

      // Update chips
      if (heroChips) {
        heroChips.style.opacity = '0';
        setTimeout(() => {
          heroChips.innerHTML = data.chips.map(c =>
            `<span class="chip"><i class="${c.icon}"></i> ${c.text}</span>`
          ).join('');
          heroChips.style.opacity = '1';
          heroChips.style.transition = 'opacity 0.35s ease';
        }, 200);
      }
    });
  });

  // ── 12. Smooth Anchor Scroll ──────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── 13. Project Card 3D Tilt ──────────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
      this.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
      this.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // ── 14. AI Float Button → Scroll to Console ──────────
  const aiFloatBtn = document.getElementById('aiFloatBtn');
  const aiNavBtn   = document.getElementById('aiNavBtn');

  function scrollToTerminal() {
    const terminal = document.getElementById('terminal-section');
    if (terminal) {
      terminal.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const input = document.getElementById('terminalInput');
        if (input) input.focus();
      }, 800);
    }
  }

  if (aiFloatBtn) aiFloatBtn.addEventListener('click', scrollToTerminal);
  if (aiNavBtn)   aiNavBtn.addEventListener('click', scrollToTerminal);

  // ── 15. AI CONSOLE / TERMINAL ─────────────────────────
  const terminalBody  = document.getElementById('terminalBody');
  const terminalInput = document.getElementById('terminalInput');
  const terminalSend  = document.getElementById('terminalSend');
  const shortcuts     = document.querySelectorAll('.shortcut-chip');

  // --- Profile Knowledge Base ---
  const profileKB = {
    name:          'Naga Deepthi Valluru',
    title:         'Principal Enterprise Architect & Full Stack Integration Lead',
    email:         'nagadeepthi.t@gmail.com',
    location:      'Hyderabad, India',
    linkedin:      'https://www.linkedin.com/in/nagadeepthi-tholu-707a192a8/',
    experience:    '20+ years (2006 – Present)',
    employer:      'Cyient Inc, USA / Cyient Ltd, India',
    client:        'The Boeing Company',
    relocation:    'Open to international relocation: USA, Europe, APAC, Middle East',
    certifications:['Microsoft Azure Fundamentals AZ-900 (May 2024)', 'Salesforce MuleSoft Developer 1 (May 2024)', 'SAFe Agilist Certification (2020)'],
    skills: {
      frameworks:  ['.NET Core', 'ASP.NET MVC', 'Web API', 'Spring Boot', 'MuleSoft ESB', 'Anypoint Platform'],
      languages:   ['C# .NET', 'Java', 'Python', 'DataWeave', 'VB.NET', 'LINQ'],
      frontend:    ['ReactJS', 'AngularJS', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
      data:        ['Teradata', 'SQL Server', 'Oracle', 'Snowflake', 'Cosmos DB', 'MongoDB', 'SSIS/SSRS', 'Power BI'],
      cloud:       ['Microsoft Azure (Functions, CosmosDB, Azure SQL)', 'AWS (EC2, S3, Lambda)', 'GCP', 'Azure DevOps'],
      middleware:  ['MuleSoft ESB', 'RabbitMQ', 'REST APIs', 'SOAP/WS', 'JWT Auth', 'Message Queuing'],
      devops:      ['Azure DevOps', 'GitHub', 'Coverity', 'TFS', 'Postman', 'SoapUI', 'CI/CD']
    },
    airlines:  ['United Airlines', 'Singapore Airlines', 'LATAM', 'Lion Air', 'Malindo Air', 'Norwegian Longhaul'],
    projects: [
      { name: 'Boeing RDM Load Report API',          period: '2025–Present',  role: 'Lead Enterprise Architect',            stack: 'MuleSoft, CloudHub, Teradata' },
      { name: 'Boeing SPEC2K Standard API Ecosystem', period: '2023–2024',    role: 'Principal Integration Architect',       stack: 'MuleSoft, Message Queues, Tableau Cloud' },
      { name: 'Events Formatting Tool 2.0',           period: '2023–Present', role: 'Technical Architect & Full Stack Lead', stack: '.NET Core, ReactJS, RabbitMQ, Azure' },
      { name: 'Boeing Data Ingestion Project (BDIP)', period: '2021–2023',    role: 'Senior Full Stack Architect',           stack: '.NET Core, ReactJS, SQL Server, SSIS' },
      { name: 'Boeing ISDP Web Adapter Framework',    period: '2018–2021',    role: 'Lead Application Developer',           stack: 'Java, AngularJS, XML/XSD, Teradata' },
      { name: 'Global Airline Data Conversion',       period: '2008–2016',    role: 'Onsite Technical Lead',                stack: 'C# .NET, Oracle, SAP, DB2, Snowflake' }
    ],
    education: 'B.Tech Computer Science and Engineering, J.B. Institute of Engineering and Technology (JNTU), 2005'
  };

  // --- AI Response Engine ---
  function generateAIResponse(query) {
    const q = query.toLowerCase().trim();

    // help
    if (q === 'help' || q === '?' || q === 'commands') {
      return [
        { type: 'highlight', text: '━━━ Available Commands ━━━' },
        { type: 'dim',       text: '  skills           → List all technical skills' },
        { type: 'dim',       text: '  boeing projects  → Describe Boeing project portfolio' },
        { type: 'dim',       text: '  certifications   → List professional certifications' },
        { type: 'dim',       text: '  relocation        → Relocation & availability info' },
        { type: 'dim',       text: '  cloud expertise  → Cloud platforms & DevSecOps' },
        { type: 'dim',       text: '  mulesoft         → MuleSoft & API integration details' },
        { type: 'dim',       text: '  airlines          → Airlines integrated & clients served' },
        { type: 'dim',       text: '  experience        → Career timeline & highlights' },
        { type: 'dim',       text: '  education         → Academic background' },
        { type: 'dim',       text: '  contact           → Contact & LinkedIn details' },
        { type: 'dim',       text: '  clear / cls       → Clear terminal' },
        { type: 'success',   text: '  Or ask any free-form question about the profile!' }
      ];
    }

    // clear
    if (q === 'clear' || q === 'cls') {
      return [{ type: 'special', text: '__clear__' }];
    }

    // contact / linkedin
    if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('reach')) {
      return [
        { type: 'highlight', text: '━━━ Contact Information ━━━' },
        { type: 'ai',        text: `📧 Email:    ${profileKB.email}` },
        { type: 'ai',        text: `📍 Location: ${profileKB.location}` },
        { type: 'ai',        text: `🔗 LinkedIn: ${profileKB.linkedin}` },
        { type: 'success',   text: '✓ Open to Senior/Principal roles globally (USA · Europe · APAC · Middle East)' }
      ];
    }

    // relocation / availability
    if (q.includes('relocat') || q.includes('availab') || q.includes('visa') || q.includes('remote') || q.includes('open to')) {
      return [
        { type: 'highlight', text: '━━━ Availability & Relocation ━━━' },
        { type: 'ai',        text: `✈️  ${profileKB.relocation}` },
        { type: 'ai',        text: '💼 Targeting: Senior / Principal level roles' },
        { type: 'ai',        text: '🌐 Domains: Aviation, Cloud Architecture, Enterprise Integration' },
        { type: 'success',   text: '✓ Actively seeking international opportunities as of 2025' }
      ];
    }

    // certifications
    if (q.includes('cert') || q.includes('az-900') || q.includes('mulesoft cert') || q.includes('safe')) {
      return [
        { type: 'highlight', text: '━━━ Professional Certifications ━━━' },
        ...profileKB.certifications.map((c, i) => ({
          type: 'ai',
          text: `  [${i + 1}] 🏅 ${c}`
        })),
        { type: 'success', text: '✓ All certifications are current and active' }
      ];
    }

    // top skills / all skills
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('expertise') || q.includes('language')) {
      return [
        { type: 'highlight', text: '━━━ Technical Skills Matrix ━━━' },
        { type: 'ai',        text: `🔷 Frameworks:  ${profileKB.skills.frameworks.join(' · ')}` },
        { type: 'ai',        text: `🔷 Languages:   ${profileKB.skills.languages.join(' · ')}` },
        { type: 'ai',        text: `🔷 Frontend:    ${profileKB.skills.frontend.join(' · ')}` },
        { type: 'ai',        text: `🔷 Data/DB:     ${profileKB.skills.data.join(' · ')}` },
        { type: 'ai',        text: `☁️  Cloud:       ${profileKB.skills.cloud.join(' · ')}` },
        { type: 'ai',        text: `🔀 Middleware:  ${profileKB.skills.middleware.join(' · ')}` },
        { type: 'ai',        text: `⚙️  DevOps:      ${profileKB.skills.devops.join(' · ')}` },
        { type: 'success',   text: '✓ 20+ years of hands-on enterprise technology leadership' }
      ];
    }

    // cloud / azure / aws / devops
    if (q.includes('cloud') || q.includes('azure') || q.includes('aws') || q.includes('gcp') || q.includes('devsecops') || q.includes('devops')) {
      return [
        { type: 'highlight', text: '━━━ Cloud & DevSecOps Expertise ━━━' },
        { type: 'ai',        text: '☁️  Microsoft Azure (AZ-900 Certified):' },
        { type: 'dim',       text: '    → Azure Functions, Cosmos DB, Azure SQL, Azure DevOps' },
        { type: 'ai',        text: '☁️  AWS: EC2, S3, Lambda (hands-on experience)' },
        { type: 'ai',        text: '☁️  GCP: Working knowledge and integration patterns' },
        { type: 'ai',        text: '🛡️  DevSecOps: Coverity vulnerability mgmt, NUnit, MUnit testing' },
        { type: 'ai',        text: '⚙️  CI/CD: Azure DevOps pipelines, GitHub Actions, TFS' },
        { type: 'success',   text: '✓ Led cloud modernization from legacy on-premises to Azure/MuleSoft' }
      ];
    }

    // mulesoft / integration / api
    if (q.includes('mulesoft') || q.includes('anypoint') || q.includes('integration') || q.includes('api') || q.includes('rabbitmq')) {
      return [
        { type: 'highlight', text: '━━━ MuleSoft & API Integration ━━━' },
        { type: 'ai',        text: '🔌 Salesforce Certified MuleSoft Developer 1 (May 2024)' },
        { type: 'ai',        text: '🔌 Anypoint Platform, CloudHub, DataWeave expert' },
        { type: 'ai',        text: '🔌 Built Experience, Process & System API layers (3-tier API architecture)' },
        { type: 'ai',        text: '🔌 ATA SPEC2000 compliant API ecosystems for global airlines' },
        { type: 'ai',        text: '🔌 Massive payload splitting, JSON-to-XML transformation APIs' },
        { type: 'ai',        text: '📨 RabbitMQ message queuing & event-driven microservices' },
        { type: 'success',   text: '✓ 60+ global airlines integrated via Boeing MuleSoft ecosystems' }
      ];
    }

    // airlines / clients
    if (q.includes('airline') || q.includes('client') || q.includes('boeing') || q.includes('carrier') || q.includes('united') || q.includes('singapore')) {
      return [
        { type: 'highlight', text: '━━━ Boeing & Airline Client Portfolio ━━━' },
        { type: 'ai',        text: `🏢 Primary Client: ${profileKB.client} (2006 – Present)` },
        { type: 'ai',        text: '✈️  Global Carriers Integrated:' },
        ...profileKB.airlines.map(a => ({ type: 'dim', text: `    → ${a}` })),
        { type: 'ai',        text: '📊 60+ airline databases connected to Boeing RDM data warehouse' },
        { type: 'success',   text: '✓ Multi-format data compliance: SPEC2000, SIMS, ATA standards' }
      ];
    }

    // boeing projects / projects
    if (q.includes('project') || q.includes('portfolio') || q.includes('deliveries') || q.includes('work')) {
      return [
        { type: 'highlight', text: '━━━ Boeing Project Portfolio ━━━' },
        ...profileKB.projects.map((p, i) => [
          { type: 'ai',  text: `  [${String(i + 1).padStart(2, '0')}] ${p.name}` },
          { type: 'dim', text: `       Period: ${p.period} · Role: ${p.role}` },
          { type: 'dim', text: `       Stack:  ${p.stack}` }
        ]).flat(),
        { type: 'success', text: '✓ 15+ enterprise-scale projects delivered as Lead/Principal Architect' }
      ];
    }

    // experience / career
    if (q.includes('experience') || q.includes('career') || q.includes('cyient') || q.includes('work history') || q.includes('years')) {
      return [
        { type: 'highlight', text: '━━━ Career Overview ━━━' },
        { type: 'ai',        text: `👤 ${profileKB.name}` },
        { type: 'ai',        text: `🎯 ${profileKB.title}` },
        { type: 'ai',        text: `🏢 ${profileKB.employer}` },
        { type: 'ai',        text: `📅 ${profileKB.experience}` },
        { type: 'ai',        text: `⭐ Strategic Client: ${profileKB.client}` },
        { type: 'ai',        text: '🚀 Key highlights:' },
        { type: 'dim',       text: '    → Legacy-to-cloud modernization (Azure + MuleSoft)' },
        { type: 'dim',       text: '    → N-Tier & serverless architectural governance' },
        { type: 'dim',       text: '    → SAFe Agile delivery management' },
        { type: 'dim',       text: '    → Global onsite deployments across 60+ airlines' },
        { type: 'success',   text: '✓ 20 years of unbroken aviation technology leadership' }
      ];
    }

    // education
    if (q.includes('educat') || q.includes('degree') || q.includes('university') || q.includes('btech') || q.includes('jntu')) {
      return [
        { type: 'highlight', text: '━━━ Education ━━━' },
        { type: 'ai',        text: '🎓 ' + profileKB.education }
      ];
    }

    // name / about / who
    if (q.includes('who') || q.includes('about') || q.includes('name') || q.includes('naga') || q.includes('deepthi') || q === '') {
      return [
        { type: 'highlight', text: '━━━ Profile Overview ━━━' },
        { type: 'ai',        text: `👤 Name:     ${profileKB.name}` },
        { type: 'ai',        text: `🎯 Title:    ${profileKB.title}` },
        { type: 'ai',        text: `📍 Location: ${profileKB.location}` },
        { type: 'ai',        text: `📅 Exp:      ${profileKB.experience}` },
        { type: 'ai',        text: `🏢 Employer: ${profileKB.employer}` },
        { type: 'ai',        text: `📧 Email:    ${profileKB.email}` },
        { type: 'ai',        text: `✈️  Domain:   Aviation & Aerospace Technology` },
        { type: 'success',   text: '  Type "help" to see all available commands' }
      ];
    }

    // fallback — smart keyword search
    const keywords = q.split(/\s+/);
    const matched = [];

    if (keywords.some(k => ['java', '.net', 'c#', 'python', 'react', 'angular'].includes(k))) {
      matched.push(...profileKB.skills.languages, ...profileKB.skills.frameworks, ...profileKB.skills.frontend);
    }

    if (matched.length > 0) {
      return [
        { type: 'highlight', text: '━━━ Matched Skills ━━━' },
        { type: 'ai', text: matched.filter((v, i, a) => a.indexOf(v) === i).join(' · ') }
      ];
    }

    // default fallback
    return [
      { type: 'error',   text: `⚠  Query not precisely matched: "${query}"` },
      { type: 'ai',      text: '💡 Try asking about: skills · projects · certifications · cloud · mulesoft · airlines · experience · contact · relocation' },
      { type: 'success', text: '  Type "help" for a full command list' }
    ];
  }

  // --- Terminal Rendering ---
  let commandHistory = [];
  let historyIndex   = -1;

  function addLine(type, text, prefix = '') {
    if (!terminalBody) return;
    const line = document.createElement('div');
    line.className = 'terminal-line';

    if (type === 'user') {
      line.innerHTML = `
        <span class="terminal-user">recruiter</span>
        <span class="terminal-host">@ndv</span>
        <span class="terminal-prompt">:~$</span>
        <span class="terminal-text command">${escHtml(text)}</span>
      `;
    } else if (type === 'system') {
      line.innerHTML = `<span class="terminal-text dim">${prefix}${escHtml(text)}</span>`;
    } else if (type === 'blank') {
      line.innerHTML = '&nbsp;';
    } else {
      line.innerHTML = `<span class="terminal-prompt" style="opacity:0;user-select:none">$</span><span class="terminal-text ${type}">${escHtml(text)}</span>`;
    }

    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
    return line;
  }

  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function clearTerminal() {
    if (!terminalBody) return;
    terminalBody.innerHTML = '';
    addLine('system', '  Terminal cleared. Type "help" for commands.');
  }

  async function typeLines(lines, delayBetween = 55) {
    for (const ln of lines) {
      if (ln.type === 'special' && ln.text === '__clear__') {
        await sleep(200);
        clearTerminal();
        return;
      }
      await sleep(delayBetween + Math.random() * 30);
      addLine(ln.type, ln.text);
    }
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  function showThinking() {
    if (!terminalBody) return null;
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.id = 'thinkingLine';
    line.innerHTML = `
      <span class="terminal-prompt" style="opacity:0;user-select:none">$</span>
      <span class="terminal-text ai">
        <span style="opacity:0.7">NDV-AI</span>
        <span class="ai-thinking">
          <span></span><span></span><span></span>
        </span>
      </span>
    `;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
    return line;
  }

  async function handleQuery(query) {
    if (!query.trim()) return;
    commandHistory.unshift(query);
    historyIndex = -1;

    addLine('user', query);
    addLine('blank');

    const thinkEl = showThinking();
    await sleep(650 + Math.random() * 350);
    if (thinkEl) thinkEl.remove();

    const response = generateAIResponse(query);
    await typeLines(response, 45);
    addLine('blank');
  }

  // Boot sequence
  async function bootTerminal() {
    if (!terminalBody) return;
    await sleep(400);

    const bootLines = [
      { type: 'success', text: '  NDV-AI Console v2.0 · Profile Intelligence Engine' },
      { type: 'dim',     text: '  Loading profile knowledge base...' },
      { type: 'dim',     text: '  Initializing semantic search engine...' },
      { type: 'success', text: '  ✓ All systems ready · 20 years of experience indexed' },
      { type: 'blank',   text: '' },
      { type: 'highlight', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'ai',      text: `  Welcome! I'm the AI assistant for ${profileKB.name}.` },
      { type: 'ai',      text: `  Ask me anything about ${profileKB.title}.` },
      { type: 'highlight', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'blank',   text: '' },
      { type: 'dim',     text: '  💡 Quick start: Type "help" · "skills" · "boeing projects"' },
      { type: 'blank',   text: '' }
    ];

    for (const ln of bootLines) {
      if (ln.type === 'blank') { addLine('blank', ''); }
      else { addLine(ln.type, ln.text); }
      await sleep(50);
    }
  }

  bootTerminal();

  // Send button
  if (terminalSend) {
    terminalSend.addEventListener('click', () => {
      const q = terminalInput.value.trim();
      if (q) {
        terminalInput.value = '';
        handleQuery(q);
      }
    });
  }

  // Enter key
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = terminalInput.value.trim();
        if (q) {
          terminalInput.value = '';
          handleQuery(q);
        }
      }
      // Command history navigation
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex] || '';
        }
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex] || '';
        } else {
          historyIndex = -1;
          terminalInput.value = '';
        }
      }
    });
  }

  // Shortcut chips
  shortcuts.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.dataset.query || chip.textContent;
      if (terminalInput) terminalInput.value = q;
      handleQuery(q);
      if (terminalInput) terminalInput.value = '';
    });
  });

  // ── 16. Skill Tag Hover Effect ────────────────────────
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // ── 17. Magnetic Button Effect ────────────────────────
  document.querySelectorAll('.btn-primary, .download-btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
      this.style.transform = `translateY(-3px) translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  console.log('✅ NDV Resume — Ultra-Advanced AI Console Ready');
  console.log('🚀 Naga Deepthi Valluru | Principal Enterprise Architect');
  console.log('🔗 https://www.linkedin.com/in/nagadeepthi-tholu-707a192a8/');
});