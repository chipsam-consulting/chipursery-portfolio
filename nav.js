/* nav.js — premium editorial interaction layer */
(function () {

  /* ── Active page highlight ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ── Nav scroll state ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Hamburger ── */
  const ham  = document.querySelector('.hamburger');
  const mob  = document.querySelector('.mobile-menu');
  const cls  = document.querySelector('.mobile-close');
  if (ham && mob) {
    ham.addEventListener('click', () => { mob.classList.add('open'); document.body.style.overflow = 'hidden'; });
    cls && cls.addEventListener('click', close);
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    function close() { mob.classList.remove('open'); document.body.style.overflow = ''; }
  }

  /* ── Custom cursor ── */
  const cur = document.querySelector('.cursor');
  if (cur && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      cx += (mx - cx) * 0.14;
      cy += (my - cy) * 0.14;
      cur.style.left = cx + 'px';
      cur.style.top  = cy + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('expanded'));
      el.addEventListener('mouseleave', () => cur.classList.remove('expanded'));
    });
  }

  /* ── Scroll reveal ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ── Horizontal marquee clone ── */
  document.querySelectorAll('.marquee-inner').forEach(inner => {
    inner.innerHTML += inner.innerHTML;
  });

})();
