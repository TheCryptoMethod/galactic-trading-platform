// Context-aware animations — auto-generated for this project
(function() {
    try {
        (function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Design Tokens (hardcoded fallbacks for brevity)
    const C = {
        P: '#00F0FF', // Accent Primary
        S: '#FF00C1', // Accent Secondary
        BG: '#02040A' // Background Primary
    };

    // --- CANVAS ---
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let nodes = [];
    let mouse = { x: 0, y: 0, r: 200 }; // r for radius
    let animFrameId;

    function setupCanvas() {
        document.body.appendChild(canvas);
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
        initNodes();
        if (!prefersReducedMotion) animateCanvas();
    }

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
    }

    class Node {
        constructor(type) {
            this.x = Math.random() * window.innerWidth; this.y = Math.random() * window.innerHeight;
            this.z = Math.random(); // Depth
            this.r = 5 + this.z * 10; // Radius
            this.type = type;
            this.c = this.z > 0.5 ? C.P : C.S; // Color
            this.a = 0.2 + this.z * 0.6; // Alpha
            this.vx = (Math.random() - 0.5) * (0.2 + this.z * 0.3);
            this.vy = (Math.random() - 0.5) * (0.2 + this.z * 0.3);
            this.rot = Math.random() * Math.PI * 2;
            this.rotS = (Math.random() - 0.5) * 0.005;
        }
        draw() {
            ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rot);
            ctx.globalAlpha = this.a; ctx.strokeStyle = this.c; ctx.lineWidth = 1 + this.z;
            ctx.beginPath();
            if (this.type === 'h') for (let i = 0; i < 6; i++) ctx.lineTo(this.r * Math.cos(Math.PI / 3 * i), this.r * Math.sin(Math.PI / 3 * i));
            else if (this.type === 'd') { ctx.moveTo(-this.r, 0); ctx.lineTo(this.r, 0); ctx.moveTo(-this.r * 0.8, -this.r * 0.5); ctx.lineTo(this.r * 0.8, this.r * 0.5); }
            else if (this.type === 'r') ctx.arc(0, 0, this.r, 0, Math.PI * 1.5);
            ctx.closePath(); ctx.stroke(); ctx.restore();
        }
        update() {
            this.x += this.vx; this.y += this.vy; this.rot += this.rotS;
            if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
            if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
            const dx = mouse.x - this.x, dy = mouse.y - this.y, dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.r) { const f = (mouse.r - dist) / mouse.r; this.vx -= (dx / dist) * f * 0.05; this.vy -= (dy / dist) * f * 0.05; }
        }
    }

    function initNodes() {
        nodes = [];
        const types = ['h', 'd', 'r']; // hexagon, dataLine, ring
        for (let i = 0; i < (prefersReducedMotion ? 4 : 15); i++) nodes.push(new Node(types[Math.floor(Math.random() * types.length)]));
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(n => { n.update(); n.draw(); });
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const n1 = nodes[i], n2 = nodes[j], dx = n1.x - n2.x, dy = n1.y - n2.y, dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) { ctx.beginPath(); ctx.moveTo(n1.x, n1.y); ctx.lineTo(n2.x, n2.y); ctx.strokeStyle = `rgba(255,255,255,${0.1 * (1 - dist / 150)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
            }
        }
        animFrameId = requestAnimationFrame(animateCanvas);
    }

    // --- SCROLL EFFECTS ---
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,${C.P},${C.S});z-index:9999;width:0%;transition:width 0.1s linear;`;
    document.body.appendChild(progressBar);

    function handleScroll() {
        const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${p}%`;
        if (!prefersReducedMotion) nodes.forEach(n => { n.vx *= (1 + p * 0.0001); n.vy *= (1 + p * 0.0001); n.a = 0.2 + n.z * 0.6 + p * 0.001; });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                if (e.target.dataset.animateOnScroll && !prefersReducedMotion) e.target.classList.add('is-visible');
                if (e.target.dataset.countUp) { startCountUp(e.target); observer.unobserve(e.target); }
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-animate-on-scroll], [data-count-up]').forEach(el => observer.observe(el));

    function startCountUp(el) {
        if (prefersReducedMotion) { el.textContent = el.dataset.countUp; return; }
        const target = parseInt(el.dataset.countUp, 10); let current = 0; const dur = 2000; const start = performance.now();
        function anim(ts) {
            const elapsed = ts - start; const prog = Math.min(elapsed / dur, 1);
            const easedProg = prog === 1 ? 1 : 1 - Math.pow(2, -10 * prog);
            current = Math.floor(easedProg * target); el.textContent = current;
            if (prog < 1) requestAnimationFrame(anim); else el.textContent = target;
        }
        requestAnimationFrame(anim);
    }

    // --- VISIBILITY API ---
    let lastHidden = 0;
    function handleVisibility() {
        if (document.hidden) { lastHidden = performance.now(); cancelAnimationFrame(animFrameId); }
        else {
            const hiddenDur = performance.now() - lastHidden;
            if (hiddenDur > 3000 && !prefersReducedMotion) {
                nodes.forEach(n => { n.vx = (Math.random() - 0.5) * 5; n.vy = (Math.random() - 0.5) * 5; });
                document.querySelectorAll('[data-animate-on-scroll]').forEach(el => { el.classList.remove('is-visible'); el.classList.add('is-visible'); });
                progressBar.style.transition = 'none'; progressBar.style.opacity = '1'; progressBar.style.boxShadow = `0 0 15px ${C.P}`;
                setTimeout(() => { progressBar.style.transition = 'width 0.1s linear, opacity 0.5s ease, box-shadow 0.5s ease'; progressBar.style.opacity = '0.8'; progressBar.style.boxShadow = 'none'; }, 100);
            }
            if (hiddenDur > 30000 && !prefersReducedMotion) { document.body.classList.add('welcome-back-shimmer'); setTimeout(() => document.body.classList.remove('welcome-back-shimmer'), 1500); }
            if (!prefersReducedMotion) animateCanvas();
        }
    }
    document.addEventListener('visibilitychange', handleVisibility);

    // --- HOVER ZONES ---
    function initHovers() {
        if (prefersReducedMotion) return;
        document.querySelectorAll('[data-magnetic-btn]').forEach(b => {
            b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); const x = e.clientX - (r.left + r.width / 2); const y = e.clientY - (r.top + r.height / 2); b.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`; });
            b.addEventListener('mouseleave', () => b.style.transform = 'translate(0,0)');
        });
        document.querySelectorAll('[data-tilt-card]').forEach(c => {
            c.style.cssText += 'transition:transform 0.1s ease-out;transform-style:preserve-3d;';
            c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(); const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2); const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2); c.style.transform = `perspective(1000px) rotateX(${y * -8}deg) rotateY(${x * 8}deg)`; });
            c.addEventListener('mouseleave', () => c.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)');
        });
        const hero = document.querySelector('[data-hero-light]');
        if (hero) {
            hero.style.cssText += 'position:relative;overflow:hidden;';
            const light = document.createElement('div');
            light.style.cssText = `position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle at center,rgba(0,240,255,0.15) 0%,transparent 70%);pointer-events:none;transform:translate(-50%,-50%);filter:blur(20px);opacity:0;transition:opacity 0.3s ease;`;
            hero.appendChild(light);
            hero.addEventListener('mouseenter', () => light.style.opacity = '1');
            hero.addEventListener('mouseleave', () => light.style.opacity = '0');
            hero.addEventListener('mousemove', e => { const r = hero.getBoundingClientRect(); light.style.left = `${e.clientX - r.left}px`; light.style.top = `${e.clientY - r.top}px`; });
        }
        document.querySelectorAll('[data-parallax-img]').forEach(img => {
            img.style.transition = 'transform 0.1s ease-out';
            img.addEventListener('mousemove', e => { const r = img.getBoundingClientRect(); const x = (e.clientX - (r.left + r.width / 2)) * -0.02; const y = (e.clientY - (r.top + r.height / 2)) * -0.02; img.style.transform = `translate(${x}px, ${y}px)`; });
            img.addEventListener('mouseleave', () => img.style.transform = 'translate(0,0)');
        });
    }

    // --- PAGE TRANSITIONS ---
    function initTransitions() {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('page-loaded');
            document.body.classList.remove('page-enter'); // Assume page-enter is set by default
        });
        document.querySelectorAll('a[href]').forEach(l => {
            if (l.hostname === window.location.hostname) {
                l.addEventListener('click', e => {
                    const h = l.href;
                    if (h === window.location.href) { e.preventDefault(); return; }
                    e.preventDefault(); document.body.classList.add('page-exit');
                    setTimeout(() => { window.location.href = h; }, 300);
                });
            }
        });
    }

    // --- Initialize All ---
    function initAstroTrade() {
        document.body.classList.add('page-enter'); // Initial class for fade-in
        setupCanvas();
        initHovers();
        initTransitions();
    }

    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', initAstroTrade) : initAstroTrade();
})();
    } catch(e) {
        console.warn('Animation init error:', e);
    }
})();