/**
 * main.js — comportamiento compartido por las 5 páginas del sitio:
 * menú móvil, citas dinámicas en el footer, modo "Ojo de Sauron"
 * y el easter egg de las Puertas de Durin (M + I + O + R).
 */
(function () {
  'use strict';

  /* ---------- Menú de navegación móvil ---------- */
  function initNav() {
    var toggle = document.querySelector('.nav__toggle');
    var nav = document.querySelector('.nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ---------- Citas dinámicas en el footer ---------- */
  var QUOTES = [
    { text: 'No todo lo que es oro reluce, ni todo el que vaga está perdido.', cite: 'J.R.R. Tolkien, El Señor de los Anillos' },
    { text: 'Incluso la persona más pequeña puede cambiar el curso del futuro.', cite: 'Galadriel, El Señor de los Anillos' },
    { text: 'Hay que tener cuidado con qué se desea, sobre todo cuando se trata de anillos.', cite: 'Gandalf' },
    { text: 'El mundo está lleno de suficiente peligro, y en él hay muchos lugares oscuros.', cite: 'Haldir, Las Dos Torres' },
    { text: 'No es fuerza lo que gobierna en el mundo largo tiempo, sino sabiduría y respeto.', cite: 'Faramir' },
    { text: 'Todos debemos decidir qué hacer con el tiempo que nos ha sido dado.', cite: 'Gandalf, La Comunidad del Anillo' },
    { text: 'Incluso la más oscura de las noches terminará y saldrá el sol.', cite: 'Pippin Took' },
    { text: 'Los cuentos que más importan no siempre son los que buscamos, sino los que nos encuentran.', cite: 'Bilbo Bolsón' }
  ];

  function initFooterQuote() {
    var el = document.getElementById('footerQuote');
    if (!el) return;
    var pick = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    var p = document.createElement('p');
    p.textContent = '“' + pick.text + '”';
    var cite = document.createElement('cite');
    cite.className = 'footer-quote__cite';
    cite.textContent = '— ' + pick.cite;
    el.innerHTML = '';
    el.appendChild(p);
    el.appendChild(cite);
  }

  /* ---------- Modo "Ojo de Sauron" ---------- */
  function initSauronMode() {
    var btn = document.getElementById('eyeToggle');
    if (!btn) return;
    var STORAGE_KEY = 'tierra-media:sauron-mode';

    function apply(active) {
      document.body.classList.toggle('sauron-mode', active);
      btn.setAttribute('aria-pressed', String(active));
    }

    var saved = false;
    try { saved = localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { /* almacenamiento no disponible */ }
    apply(saved);

    btn.addEventListener('click', function () {
      var next = !document.body.classList.contains('sauron-mode');
      apply(next);
      try { localStorage.setItem(STORAGE_KEY, next ? '1' : '0'); } catch (e) { /* ignorar */ }
    });
  }

  /* ---------- Easter egg: el Enigma de la Puerta de Durin ---------- */
  var DURIN_KEYS = ['m', 'i', 'o', 'r'];
  var DURIN_WINDOW_MS = 1500;

  function buildDurinOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'durin-overlay';
    overlay.id = 'durinOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'durinTitle');
    overlay.innerHTML =
      '<div class="durin-overlay__stars" id="durinStars"></div>' +
      '<div class="durin-overlay__panel">' +
        '<p class="durin-overlay__runes">⸙ Annon edhellen, edro hi ammen ⸙</p>' +
        '<h2 id="durinTitle">Las Puertas de Durin se iluminan</h2>' +
        '<p>Una luz de estrellas recorre la piedra. Susurra la palabra correcta para que Moria te reconozca como amigo.</p>' +
        '<div class="durin-overlay__trivia" role="radiogroup" aria-label="Trivia de la Tierra Media">' +
          '<p><strong>¿Qué significa "Mellon" en sindarin?</strong></p>' +
          '<label><input type="radio" name="durin-trivia" value="correct"> Amigo</label>' +
          '<label><input type="radio" name="durin-trivia" value="wrong1"> Enemigo</label>' +
          '<label><input type="radio" name="durin-trivia" value="wrong2"> Piedra</label>' +
          '<label><input type="radio" name="durin-trivia" value="wrong3"> Estrella</label>' +
          '<p class="durin-overlay__feedback" id="durinFeedback" aria-live="polite"></p>' +
        '</div>' +
        '<button type="button" class="durin-overlay__close" id="durinClose">Cerrar la puerta</button>' +
      '</div>';
    document.body.appendChild(overlay);

    var starsContainer = overlay.querySelector('#durinStars');
    for (var i = 0; i < 40; i++) {
      var star = document.createElement('span');
      star.className = 'durin-overlay__star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = (Math.random() * 1.8).toFixed(2) + 's';
      starsContainer.appendChild(star);
    }

    overlay.querySelectorAll('input[name="durin-trivia"]').forEach(function (input) {
      input.addEventListener('change', function () {
        var feedback = overlay.querySelector('#durinFeedback');
        if (input.value === 'correct') {
          feedback.textContent = '¡Mellon! Las puertas reconocen tu palabra y se abren de par en par.';
          feedback.style.color = 'var(--tolkien-gold-light)';
        } else {
          feedback.textContent = 'La piedra permanece en silencio. Esa no es la palabra, amigo.';
          feedback.style.color = 'var(--fire-red-light)';
        }
      });
    });

    overlay.querySelector('#durinClose').addEventListener('click', closeDurinGate);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeDurinGate();
    });
    document.addEventListener('keydown', function onEsc(e) {
      if (e.key === 'Escape') closeDurinGate();
    });

    return overlay;
  }

  function openDurinGate() {
    var overlay = document.getElementById('durinOverlay') || buildDurinOverlay();
    overlay.classList.add('durin-overlay--visible');
  }

  function closeDurinGate() {
    var overlay = document.getElementById('durinOverlay');
    if (overlay) overlay.classList.remove('durin-overlay--visible');
  }

  function initDurinEasterEgg() {
    var buffer = [];
    var lastTime = 0;

    window.addEventListener('keydown', function (e) {
      var key = e.key.toLowerCase();
      if (DURIN_KEYS.indexOf(key) === -1) return;

      var now = Date.now();
      if (now - lastTime > DURIN_WINDOW_MS) buffer = [];
      lastTime = now;

      if (buffer.indexOf(key) === -1) buffer.push(key);

      var complete = DURIN_KEYS.every(function (k) { return buffer.indexOf(k) !== -1; });
      if (complete) {
        openDurinGate();
        buffer = [];
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initFooterQuote();
    initSauronMode();
    initDurinEasterEgg();
  });
})();
