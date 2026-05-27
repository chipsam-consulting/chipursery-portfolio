/* nav.js — shared interaction layer */
(function () {

  /* active link */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-center a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* nav scroll */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', scrollY > 40);
    }, { passive: true });
  }

  /* hamburger */
  const ham = document.querySelector('.hamburger');
  const mob = document.querySelector('.mobile-menu');
  const cls = document.querySelector('.mob-close');
  if (ham && mob) {
    const open  = () => { mob.classList.add('open');  document.body.style.overflow = 'hidden'; };
    const close = () => { mob.classList.remove('open'); document.body.style.overflow = ''; };
    ham.addEventListener('click', open);
    cls && cls.addEventListener('click', close);
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }

  /* dual cursor */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring && window.matchMedia('(pointer:fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    dot.style.cssText = `left:${mx}px;top:${my}px`;

    (function loop() {
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* scroll reveal */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('v'); io.unobserve(e.target); }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* marquee clone */
  document.querySelectorAll('.marquee-inner').forEach(el => {
    el.innerHTML += el.innerHTML;
  });

})();
