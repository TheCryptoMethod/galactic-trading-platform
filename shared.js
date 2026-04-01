// Shared JS — Website Factory v2
document.documentElement.classList.add('js');

// Active nav highlighting
(function() {
    const path = location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('#main-nav a[data-page]').forEach(function(a) {
        if (a.dataset.page === path) a.classList.add('active');
    });
})();

// Scroll reveal (IntersectionObserver)
(function() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) e.target.classList.add('visible');
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('section').forEach(function(s) { observer.observe(s); });
})();

// Scroll progress bar
(function() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function() {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }, { passive: true });
})();

// Cursor-following gradient on hero
(function() {
    var hero = document.querySelector('.hero, #hero, [data-hero]');
    if (!hero) return;
    hero.addEventListener('mousemove', function(e) {
        var rect = hero.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--mouse-x', x + '%');
        hero.style.setProperty('--mouse-y', y + '%');
    });
})();

// Magnetic CTA buttons
(function() {
    document.querySelectorAll('.btn-primary, .btn-magnetic').forEach(function(btn) {
        btn.addEventListener('mousemove', function(e) {
            var rect = btn.getBoundingClientRect();
            var dx = e.clientX - (rect.left + rect.width / 2);
            var dy = e.clientY - (rect.top + rect.height / 2);
            btn.style.transform = 'translate(' + (dx * 0.4) + 'px, ' + (dy * 0.4) + 'px)';
        });
        btn.addEventListener('mouseleave', function() {
            btn.style.transform = '';
        });
    });
})();

// Mobile nav toggle
(function() {
    var hamburger = document.querySelector('.nav-hamburger');
    var links = document.querySelector('.nav-links');
    if (!hamburger || !links) return;
    hamburger.addEventListener('click', function() {
        links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() { links.classList.remove('open'); });
    });
})();

// FAQ accordion (for FAQ/pricing pages)
(function() {
    document.querySelectorAll('.faq-question, .accordion-toggle').forEach(function(q) {
        q.addEventListener('click', function() {
            var item = q.parentElement;
            item.classList.toggle('open');
            var answer = item.querySelector('.faq-answer, .accordion-content');
            if (answer) {
                answer.style.maxHeight = item.classList.contains('open') ? answer.scrollHeight + 'px' : '0';
            }
        });
    });
})();

// Context animations injected by _build_context_animations()
