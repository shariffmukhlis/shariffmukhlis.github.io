/* =========================================================
   Shariff Mukhlis — Portfolio interactions
   ========================================================= */

(function () {
  'use strict';

  var nav       = document.getElementById('nav');
  var navLinks  = document.getElementById('navLinks');
  var navToggle = document.getElementById('navToggle');
  var hook      = document.querySelector('.hook');

  /* ---- sticky nav ---- */
  window.addEventListener('scroll', function () {
    nav.classList.toggle('is-stuck', window.scrollY > 30);
  }, { passive: true });

  /* ---- mobile menu ---- */
  function setMenu(open) {
    navLinks.classList.toggle('is-open', open);
    navToggle.classList.toggle('is-open', open);
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  navToggle.addEventListener('click', function () {
    setMenu(!navLinks.classList.contains('is-open'));
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---- scroll reveal ---- */
  var revealables = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = (i * 60) + 'ms';
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- active nav link ---- */
  var linkFor = {};
  navLinks.querySelectorAll('a').forEach(function (a) {
    linkFor[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = linkFor[entry.target.id];
        if (!link) return;
        Object.keys(linkFor).forEach(function (k) {
          linkFor[k].classList.remove('is-active');
        });
        link.classList.add('is-active');
      });
    }, { threshold: 0.35 });

    document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });

    /* hide the floating hook once the contact section is on screen */
    var contact = document.getElementById('contact');
    if (contact && hook) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          hook.style.opacity = entry.isIntersecting ? '0' : '1';
          hook.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
        });
      }, { threshold: 0.25 }).observe(contact);
    }
  }

  /* ---- graceful placeholder for images not uploaded yet ---- */
  document.querySelectorAll('.card__media img').forEach(function (img) {
    img.addEventListener('error', function () {
      var box = img.parentElement;
      box.classList.add('is-empty');
      box.setAttribute('data-empty', img.getAttribute('src').split('/').pop());
      img.remove();
    });
  });

  /* ---- footer year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();