// Context-aware animations — auto-generated for this project
(function() {
    try {
        (function() {
    const dpr = window.devicePixelRatio || 1;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const objects = [];
    const mouse = { x: 0, y: 0, active: false };
    let lastVisibilityChange = Date.now();
    let animationFrameId;

    const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
    document.body.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const objectShapes = [
        (ctx, size) => { // Data Node (Hexagon)
            ctx.beginPath(); for (let i = 0; i < 6; i++) { const angle = Math.PI / 3 * i; ctx.lineTo(size * Math.cos(angle), size * Math.sin(angle)); } ctx.closePath();
        },
        (ctx, size) => { // Asteroid (Irregular Polygon)
            ctx.beginPath(); const points = 5 + Math.floor(Math.random() * 3); for (let i = 0; i < points; i++) { const angle = (Math.PI * 2 / points) * i; const radius = size * (0.8 + Math.random() * 0.4); ctx.lineTo(radius * Math.cos(angle), radius * Math.sin(angle)); } ctx.closePath();
        },
        (ctx, size) => { // Nebula Wisp (Bezier Curve)
            ctx.beginPath(); ctx.moveTo(-size / 2, 0); ctx.bezierCurveTo(-size / 4, -size, size / 4, size, size / 2, 0); ctx.bezierCurveTo(size / 4, -size / 2, -size / 4, size / 2, -size / 2, 0); ctx.closePath();
        }
    ];

    class CanvasObject {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * window.innerWidth; this.y = Math.random() * window.innerHeight;
            this.depth = Math.random(); this.size = (10 + Math.random() * 30) * (0.5 + this.depth * 0.5);
            this.vx = (Math.random() - 0.5) * (0.2 + this.depth * 0.3); this.vy = (Math.random() - 0.5) * (0.2 + this.depth * 0.3);
            this.rotation = Math.random() * Math.PI * 2; this.rotationSpeed = (Math.random() - 0.5) * 0.005 * (0.5 + this.depth * 0.5);
            this.opacity = 0.1 + this.depth * 0.4; this.color = getCssVar('--color-primary');
            this.shape = objectShapes[Math.floor(Math.random() * objectShapes.length)]; this.glow = 0;
        }
        update() {
            this.x += this.vx; this.y += this.vy; this.rotation += this.rotationSpeed;
            const dx = mouse.x - this.x, dy = mouse.y - this.y, dist = Math.sqrt(dx * dx + dy * dy);
            if (mouse.active && dist < 200) { const force = (1 - dist / 200) * 0.5; this.vx -= dx / dist * force * (1 - this.depth); this.vy -= dy / dist * force * (1 - this.depth); }
            if (this.x < -this.size) this.x = window.innerWidth + this.size; if (this.x > window.innerWidth + this.size) this.x = -this.size;
            if (this.y < -this.size) this.y = window.innerHeight + this.size; if (this.y > window.innerHeight + this.size) this.y = -this.size;
        }
        draw() {
            ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation);
            ctx.fillStyle = this.color; ctx.globalAlpha = this.opacity + this.glow;
            this.shape(ctx, this.size); ctx.fill();
            ctx.shadowBlur = this.glow > 0 ? this.size * 0.8 : 0; ctx.shadowColor = this.color;
            ctx.restore();
        }
    }

    for (let i = 0; i < 15; i++) { objects.push(new CanvasObject()); }

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < objects.length; i++) {
            for (let j = i + 1; j < objects.length; j++) {
                const obj1 = objects[i], obj2 = objects[j];
                const dx = obj1.x - obj2.x, dy = obj1.y - obj2.y, dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 150;
                if (dist < maxDist) {
                    const r = parseInt(obj1.color.slice(1,3),16), g = parseInt(obj1.color.slice(3,5),16), b = parseInt(obj1.color.slice(5,7),16);
                    ctx.beginPath(); ctx.moveTo(obj1.x, obj1.y); ctx.lineTo(obj2.x, obj2.y);
                    ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dist / maxDist) * 0.1})`;
                    ctx.lineWidth = 1; ctx.stroke();
                }
            }
        }
        objects.forEach(obj => { obj.update(); obj.draw(); });
        animationFrameId = requestAnimationFrame(animateCanvas);
    }

    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; });
    window.addEventListener('mouseleave', () => { mouse.active = false; });

    const parallaxElements = document.querySelectorAll('.parallax-bg');
    const countUpElements = document.querySelectorAll('.count-up');
    const scrollProgressBar = document.createElement('div');
    scrollProgressBar.style.cssText = 'position:fixed;top:0;left:0;width:0%;height:3px;background:linear-gradient(90deg, var(--color-secondary), var(--color-primary));z-index:9999;';
    document.body.appendChild(scrollProgressBar);

    function handleScroll() {
        const scrollY = window.scrollY, scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollHeight > 0 ? scrollY / scrollHeight : 0;
        scrollProgressBar.style.width = `${scrollProgress * 100}%`;
        objects.forEach(obj => { obj.vx += (Math.random() - 0.5) * scrollProgress * 0.5; obj.vy += (Math.random() - 0.5) * scrollProgress * 0.5; obj.glow = scrollProgress * 0.5; });
        parallaxElements.forEach(el => { const speed = parseFloat(el.dataset.parallaxSpeed || 0.1); el.style.transform = `translateY(${scrollY * speed}px)`; });
        countUpElements.forEach(el => {
            if (el.dataset.counted) return;
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                el.dataset.counted = true; const target = parseInt(el.dataset.target, 10); const duration = 2000; let start = null;
                const animateCount = (timestamp) => {
                    if (!start) start = timestamp; const progress = (timestamp - start) / duration;
                    const easedProgress = 1 - Math.pow(1 - progress, 3); const current = Math.floor(easedProgress * target);
                    el.textContent = current.toLocaleString();
                    if (progress < 1) requestAnimationFrame(animateCount); else el.textContent = target.toLocaleString();
                };
                requestAnimationFrame(animateCount);
            }
        });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    function handleVisibilityChange() {
        if (document.visibilityState === 'hidden') { lastVisibilityChange = Date.now(); cancelAnimationFrame(animationFrameId); }
        else {
            const timeAway = Date.now() - lastVisibilityChange;
            if (timeAway > 3000) {
                objects.forEach(obj => { obj.vx = (Math.random() - 0.5) * 10; obj.vy = (Math.random() - 0.5) * 10; });
                setTimeout(() => { objects.forEach(obj => obj.reset()); }, 1000);
                countUpElements.forEach(el => delete el.dataset.counted); handleScroll();
                scrollProgressBar.style.transition = 'opacity 0.2s ease-in-out'; scrollProgressBar.style.opacity = '0.5';
                setTimeout(() => { scrollProgressBar.style.opacity = '1'; setTimeout(() => scrollProgressBar.style.transition = 'none', 200); }, 200);
                if (timeAway > 30000) {
                    const shimmer = document.createElement('div');
                    shimmer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(208,188,255,0.2) 0%, transparent 40%);pointer-events:none;z-index:99999;opacity:0;transition:opacity 0.5s ease-out;';
                    document.body.appendChild(shimmer);
                    setTimeout(() => { shimmer.style.opacity = '1'; setTimeout(() => { shimmer.style.opacity = '0'; setTimeout(() => shimmer.remove(), 500); }, 1000); }, 100);
                }
            }
            animateCanvas();
        }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const centerX = rect.width / 2; const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * 8; const rotateY = (x - centerX) / centerX * -8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; card.style.transition = 'none';
        });
        card.addEventListener('mouseleave', () => { card.style.transition = 'transform 0.3s ease-out'; card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'; });
    });

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect(); const x = e.clientX - (rect.left + rect.width / 2); const y = e.clientY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(x * x + y * y); const maxDistance = 50;
            if (distance < maxDistance) { const strength = (1 - distance / maxDistance) * 0.3; btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`; }
            else { btn.style.transform = 'translate(0,0)'; } btn.style.transition = 'none';
        });
        btn.addEventListener('mouseleave', () => { btn.style.transition = 'transform 0.3s ease-out'; btn.style.transform = 'translate(0,0)'; });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) { heroSection.addEventListener('mousemove', (e) => { heroSection.style.setProperty('--mouse-x', `${e.clientX}px`); heroSection.style.setProperty('--mouse-y', `${e.clientY}px`); }); }

    document.querySelectorAll('.parallax-img').forEach(img => {
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect(); const x = e.clientX - (rect.left + rect.width / 2); const y = e.clientY - (rect.top + rect.height / 2);
            img.style.transform = `translate(${x * -0.02}px, ${y * -0.02}px)`; img.style.transition = 'none';
        });
        img.addEventListener('mouseleave', () => { img.style.transition = 'transform 0.3s ease-out'; img.style.transform = 'translate(0,0)'; });
    });

    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.href;
            if (href.startsWith(window.location.origin) && href !== window.location.href) {
                e.preventDefault(); document.body.classList.add('page-exit');
                setTimeout(() => { window.location.href = href; }, 300);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('page-enter');
        setTimeout(() => { document.body.classList.remove('page-enter'); }, 600);
        animateCanvas();
    });
})();
    } catch(e) {
        console.warn('Animation init error:', e);
    }
})();