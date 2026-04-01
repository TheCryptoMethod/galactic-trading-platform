// Context-aware animations — auto-generated for this project
(function() {
    try {
        (function() {
    const dpr = window.devicePixelRatio || 1;
    const raf = window.requestAnimationFrame;
    const doc = document;
    const body = doc.body;

    // --- Design Tokens (assumed CSS custom properties) ---
    const getColor = (prop) => getComputedStyle(doc.documentElement).getPropertyValue(prop) || '#fff';
    const primaryColor = () => getColor('--color-primary') || '#00f0ff';
    const accentColor = () => getColor('--color-accent') || '#ff00ff';

    // --- Utility Functions ---
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    // --- Canvas Background Animation ---
    const canvas = doc.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -999, y: -999, radius: 200 };
    let canvasWidth, canvasHeight;

    function setupCanvas() {
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
        body.appendChild(canvas);
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });
        doc.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
        doc.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; }, { passive: true });
    }

    function resizeCanvas() {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        ctx.scale(dpr, dpr);
    }

    // Themed shapes: Data Node, Orbital Ring, AI Chip
    function drawDataNode(ctx, size) { ctx.beginPath(); ctx.moveTo(0, -size); ctx.lineTo(size * 0.866, size * 0.5); ctx.lineTo(0, size); ctx.lineTo(-size * 0.866, size * 0.5); ctx.closePath(); }
    function drawOrbitalRing(ctx, size) { ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.lineWidth = 1; ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2); ctx.lineWidth = 0.5; ctx.stroke(); }
    function drawAIChip(ctx, size) { ctx.beginPath(); ctx.rect(-size * 0.7, -size * 0.7, size * 1.4, size * 1.4); ctx.moveTo(-size * 0.5, -size * 0.7); ctx.lineTo(-size * 0.5, -size); ctx.moveTo(size * 0.5, -size * 0.7); ctx.lineTo(size * 0.5, -size); ctx.moveTo(-size * 0.7, size * 0.5); ctx.lineTo(-size, size * 0.5); ctx.moveTo(size * 0.7, size * 0.5); ctx.lineTo(size, size * 0.5); ctx.stroke(); }

    class Particle {
        constructor(id) { this.id = id; this.reset(); this.shapeType = Math.floor(Math.random() * 3); }
        reset() {
            this.x = Math.random() * canvasWidth; this.y = Math.random() * canvasHeight;
            this.z = Math.random() * 0.8 + 0.2; this.baseSize = Math.random() * 15 + 10;
            this.size = this.baseSize * this.z; this.vx = (Math.random() - 0.5) * 0.5 * this.z;
            this.vy = (Math.random() - 0.5) * 0.5 * this.z; this.rotation = Math.random() * Math.PI * 2;
            this.vr = (Math.random() - 0.5) * 0.005 * this.z; this.alpha = this.z * 0.3 + 0.2;
            this.color = this.id % 2 === 0 ? primaryColor() : accentColor();
        }
        update() {
            this.x += this.vx; this.y += this.vy; this.rotation += this.vr;
            if (this.x < -this.size || this.x > canvasWidth + this.size || this.y < -this.size || this.y > canvasHeight + this.size) {
                this.reset();
                if (this.x < -this.size) this.x = canvasWidth + this.size; else if (this.x > canvasWidth + this.size) this.x = -this.size;
                if (this.y < -this.size) this.y = canvasHeight + this.size; else if (this.y > canvasHeight + this.size) this.y = -this.size;
            }
            const dx = mouse.x - this.x, dy = mouse.y - this.y, dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) { const force = (mouse.radius - dist) / mouse.radius; this.vx -= dx * force * 0.005; this.vy -= dy * force * 0.005; }
        }
        draw() {
            ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation);
            ctx.globalAlpha = this.alpha; ctx.strokeStyle = this.color; ctx.fillStyle = this.color;
            if (this.shapeType === 0) drawDataNode(ctx, this.size); else if (this.shapeType === 1) drawOrbitalRing(ctx, this.size); else drawAIChip(ctx, this.size);
            ctx.stroke(); ctx.restore();
        }
    }

    function initParticles() { particles = []; for (let i = 0; i < 15; i++) particles.push(new Particle(i)); }
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i], p2 = particles[j];
                const dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
                    const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                    gradient.addColorStop(0, p1.color); gradient.addColorStop(1, p2.color);
                    ctx.strokeStyle = gradient; ctx.globalAlpha = (1 - (dist / 120)) * 0.15; ctx.lineWidth = 0.5; ctx.stroke();
                }
            }
        }
    }

    let scrollY = 0, lastScrollY = 0, scrollDirection = 0;

    function animateCanvas() {
        raf(animateCanvas); ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scrollFactor = clamp(scrollY / (doc.documentElement.scrollHeight - window.innerHeight), 0, 1);
        particles.forEach(p => {
            p.vx += scrollDirection * 0.005 * p.z; p.vy += scrollDirection * 0.005 * p.z;
            p.alpha = p.z * 0.3 + 0.2 + scrollFactor * 0.2; p.update(); p.draw();
        });
        connectParticles();
    }

    // --- Scroll-Driven Effects ---
    const parallaxBgs = doc.querySelectorAll('[data-parallax-bg]');
    const countUpElements = doc.querySelectorAll('[data-count-up]');
    const scrollProgress = doc.querySelector('[data-scroll-progress]');

    function handleScroll() {
        scrollY = window.scrollY; scrollDirection = scrollY > lastScrollY ? 1 : -1; lastScrollY = scrollY;
        parallaxBgs.forEach(el => { const speed = parseFloat(el.dataset.parallaxBg) || 0.1; el.style.transform = `translateY(${scrollY * speed}px)`; });
        if (scrollProgress) {
            const scrollPercent = scrollY / (doc.documentElement.scrollHeight - window.innerHeight);
            scrollProgress.style.width = `${scrollPercent * 100}%`;
            scrollProgress.style.boxShadow = `0 0 10px 2px ${primaryColor()}, 0 0 20px 5px ${accentColor()}`;
        }
    }

    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target, target = parseInt(el.dataset.countUp, 10), duration = parseInt(el.dataset.duration, 10) || 2000;
                let start = null;
                const animateCount = (timestamp) => {
                    if (!start) start = timestamp; const progress = (timestamp - start) / duration;
                    const easedProgress = easeOutExpo(clamp(progress, 0, 1));
                    el.textContent = Math.floor(easedProgress * target).toLocaleString();
                    if (progress < 1) raf(animateCount);
                };
                raf(animateCount); observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    countUpElements.forEach(el => countUpObserver.observe(el));
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Visibility API ---
    let lastHiddenTime = 0, awayTimer = null;
    doc.addEventListener('visibilitychange', () => {
        if (doc.hidden) {
            lastHiddenTime = Date.now();
            awayTimer = setTimeout(() => {
                const shimmerEl = doc.createElement('div');
                shimmerEl.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;background:radial-gradient(circle at 50% 50%, ${primaryColor()}33 0%, transparent 70%);opacity:0;pointer-events:none;transition:opacity 0.5s ease-out;`;
                body.appendChild(shimmerEl);
                setTimeout(() => { shimmerEl.style.opacity = 1; }, 10);
                setTimeout(() => { shimmerEl.style.opacity = 0; }, 1000);
                setTimeout(() => { shimmerEl.remove(); }, 1500);
            }, 30000);
        } else {
            clearTimeout(awayTimer);
            if (Date.now() - lastHiddenTime > 3000) {
                particles.forEach(p => { p.vx = (Math.random() - 0.5) * 10; p.vy = (Math.random() - 0.5) * 10; });
                setTimeout(() => particles.forEach(p => p.reset()), 1000);
                doc.querySelectorAll('.animate-on-scroll').forEach(el => {
                    el.style.opacity = 0; el.style.transform = 'translateY(20px)';
                    setTimeout(() => { el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'; el.style.opacity = 1; el.style.transform = 'translateY(0)'; }, Math.random() * 300);
                });
                if (scrollProgress) {
                    scrollProgress.style.transition = 'box-shadow 0.3s ease-in-out';
                    scrollProgress.style.boxShadow = `0 0 20px 5px ${primaryColor()}, 0 0 40px 10px ${accentColor()}`;
                    setTimeout(() => { scrollProgress.style.boxShadow = `0 0 10px 2px ${primaryColor()}, 0 0 20px 5px ${accentColor()}`; }, 300);
                }
            }
        }
    });

    // --- Interactive Hover Zones ---
    doc.querySelectorAll('[data-tilt]').forEach(card => {
        card.style.transition = 'transform 0.1s ease-out'; card.style.willChange = 'transform';
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect(); const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const centerX = rect.width / 2, centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -8, rotateY = (x - centerX) / centerX * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }, { passive: true });
        card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'; }, { passive: true });
    });

    doc.querySelectorAll('[data-magnetic]').forEach(btn => {
        btn.style.transition = 'transform 0.1s ease-out'; btn.style.willChange = 'transform';
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect(); const x = e.clientX - (rect.left + rect.width / 2), y = e.clientY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(x * x + y * y); const maxDistance = 50;
            if (distance < maxDistance) { const strength = 0.3; btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`; }
            else { btn.style.transform = 'translate(0, 0)'; }
        }, { passive: true });
        btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0, 0)'; }, { passive: true });
    });

    const heroSection = doc.querySelector('[data-hero-glow]');
    if (heroSection) {
        heroSection.style.position = 'relative'; heroSection.style.overflow = 'hidden';
        const glow = doc.createElement('div');
        glow.style.cssText = `position:absolute;pointer-events:none;border-radius:50%;background:radial-gradient(circle, ${primaryColor()}33 0%, transparent 70%);transform:translate(-50%, -50%);opacity:0;transition:opacity 0.3s ease-out;width:400px;height:400px;`;
        heroSection.appendChild(glow);
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect(); const x = e.clientX - rect.left, y = e.clientY - rect.top;
            glow.style.left = `${x}px`; glow.style.top = `${y}px`; glow.style.opacity = 1;
        }, { passive: true });
        heroSection.addEventListener('mouseleave', () => { glow.style.opacity = 0; }, { passive: true });
    }

    doc.querySelectorAll('[data-parallax-img]').forEach(img => {
        img.style.transition = 'transform 0.1s ease-out'; img.style.willChange = 'transform';
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect(); const x = e.clientX - (rect.left + rect.width / 2), y = e.clientY - (rect.top + rect.height / 2);
            const factor = parseFloat(img.dataset.parallaxImg) || 0.02;
            img.style.transform = `translate(${x * -factor}px, ${y * -factor}px)`;
        }, { passive: true });
        img.addEventListener('mouseleave', () => { img.style.transform = 'translate(0, 0)'; }, { passive: true });
    });

    // --- Page Transition Prep ---
    doc.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.includes('://')) {
            link.addEventListener('click', function(e) {
                e.preventDefault(); body.classList.add('page-exit');
                setTimeout(() => { window.location.href = href; }, 300);
            });
        }
    });

    window.addEventListener('load', () => {
        body.classList.add('page-enter');
        setTimeout(() => { body.classList.remove('page-enter'); }, 600);
    });

    // --- Initialize ---
    setupCanvas();
    initParticles();
    animateCanvas();
    handleScroll();
})();
    } catch(e) {
        console.warn('Animation init error:', e);
    }
})();