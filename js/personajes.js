/**
 * personajes.js — ficha detallada de cada personaje en una galería flotante:
 * al hacer click en una tarjeta se abre un modal con un carrusel de escenas
 * ilustradas, biografía extendida y datos adicionales.
 *
 * El sitio no usa fotografías reales (es un fan site sin derechos sobre
 * material oficial de las películas o ediciones), así que cada "foto" del
 * carrusel es una escena ilustrada con un icono y una leyenda, coherente
 * con los avatares tipográficos que ya usan las tarjetas.
 */
(function () {
  'use strict';

  var CHARACTERS = {
    galadriel: {
      name: 'Galadriel',
      race: 'Elfa',
      theme: 'elfos',
      quote: '"Incluso la persona más pequeña puede cambiar el curso del futuro."',
      bio: 'Nacida en Valinor antes del exilio de los Noldor, Galadriel es una de los pocos seres que vivieron las tres Edades del Sol. Como Dama de Lothlórien junto a Celeborn, protege el bosque con el poder de su anillo Nenya y ofrece a la Comunidad del Anillo dones que resultarán decisivos en su viaje.',
      details: {
        'Título': 'Dama de Lothlórien',
        'Origen': 'Valinor, entre los Noldor',
        'Época': 'Activa desde la Primera Edad hasta el fin de la Tercera',
        'Anillo de Poder': 'Nenya, el Anillo Blanco',
        'Rasgo distintivo': 'Videncia y sabiduría milenaria'
      },
      slides: [
        { icon: '🪞', caption: 'El Espejo de Galadriel' },
        { icon: '👑', caption: 'Dama de Lothlórien' },
        { icon: '💍', caption: 'Portadora de Nenya' }
      ]
    },
    legolas: {
      name: 'Legolas',
      race: 'Elfo',
      theme: 'elfos',
      quote: '"Un elfo del reino del bosque no está a salvo tan lejos de casa."',
      bio: 'Hijo del rey Thranduil, Legolas representa a los Elfos del Bosque en la Comunidad del Anillo. Su puntería es legendaria y, a lo largo del viaje, forja una amistad inesperada con el enano Gimli que trasciende siglos de desconfianza entre sus pueblos.',
      details: {
        'Título': 'Príncipe del Bosque Negro',
        'Origen': 'Bosque Negro, reino del rey Thranduil',
        'Afiliación': 'Comunidad del Anillo',
        'Arma': 'Arco élfico y dagas blancas',
        'Rasgo distintivo': 'Vista y oído sobrehumanos'
      },
      slides: [
        { icon: '🏹', caption: 'Arquero del Bosque Negro' },
        { icon: '🐎', caption: 'Jinete de Arod' },
        { icon: '🤝', caption: 'Amistad con Gimli' }
      ]
    },
    elrond: {
      name: 'Elrond',
      race: 'Elfo',
      theme: 'elfos',
      quote: '"Solo tiene que llevar el Anillo. No tiene que usar su poder."',
      bio: 'Medio elfo, hijo de Eärendil y Elwing, Elrond funda el refugio de Rivendel y custodia el anillo Vilya. Convoca el Concilio que decide el destino del Anillo Único y es guardián de gran parte de la historia y los saberes de la Tierra Media.',
      details: {
        'Título': 'Señor de Rivendel',
        'Origen': 'Beleriand, hijo de Eärendil',
        'Anillo de Poder': 'Vilya, el Anillo Azul',
        'Época': 'Testigo de las tres Edades',
        'Rasgo distintivo': 'Sanador y erudito'
      },
      slides: [
        { icon: '🏛️', caption: 'Señor de Rivendel' },
        { icon: '📜', caption: 'El Concilio de Elrond' },
        { icon: '💍', caption: 'Portador de Vilya' }
      ]
    },
    thorin: {
      name: 'Thorin Escudo de Roble',
      race: 'Enano',
      theme: 'enanos',
      quote: '"Si más de nosotros valorara la comida, el júbilo y las canciones por encima del oro atesorado, sería un mundo más feliz."',
      bio: 'Descendiente de la línea de Durin, Thorin lidera a doce enanos y al hobbit Bilbo Bolsón en la misión de reclamar Erebor y su tesoro del dragón Smaug. Su travesía lo enfrenta tanto a antiguos enemigos como a la codicia que anida en su propia sangre.',
      details: {
        'Título': 'Rey bajo la Montaña',
        'Origen': 'Erebor, línea de Durin',
        'Afiliación': 'Compañía de Thorin',
        'Arma': 'Orcrist, la Hendedora de Trasgos',
        'Rasgo distintivo': 'Orgullo y determinación'
      },
      slides: [
        { icon: '⛏️', caption: 'Heredero de Erebor' },
        { icon: '🛡️', caption: 'Escudo de Roble' },
        { icon: '🐉', caption: 'Frente a Smaug' }
      ]
    },
    gimli: {
      name: 'Gimli',
      race: 'Enano',
      theme: 'enanos',
      quote: '"Doce solamente. ¡Bah! Mi hacha ha contado cuarenta y dos."',
      bio: 'Miembro de la Comunidad del Anillo, Gimli lleva con orgullo la tradición guerrera de su pueblo. Su rivalidad inicial con Legolas se transforma en una de las amistades más entrañables de la Tercera Edad, forjada en batallas como la del Abismo de Helm.',
      details: {
        'Título': 'Hijo de Glóin',
        'Origen': 'Montañas Grises / Erebor',
        'Afiliación': 'Comunidad del Anillo',
        'Arma': 'Hacha de guerra enana',
        'Rasgo distintivo': 'Lealtad feroz y humor cascarrabias'
      },
      slides: [
        { icon: '🪓', caption: 'Hijo de Glóin' },
        { icon: '🤝', caption: 'Rivalidad con Legolas' },
        { icon: '⚔️', caption: 'En el Abismo de Helm' }
      ]
    },
    frodo: {
      name: 'Frodo Bolsón',
      race: 'Hobbit',
      theme: 'hobbits',
      quote: '"Iré, pero no sé el camino."',
      bio: 'Sobrino de Bilbo Bolsón, Frodo hereda el Anillo Único y con él la responsabilidad de destruirlo. Su viaje desde la Comarca hasta el Monte del Destino, acompañado por Sam, pone a prueba los límites de su voluntad frente al peso corruptor del Anillo.',
      details: {
        'Título': 'Portador del Anillo',
        'Origen': 'La Comarca, Bolsón Cerrado',
        'Afiliación': 'Comunidad del Anillo',
        'Objeto': 'El Anillo Único / la espada Dardo',
        'Rasgo distintivo': 'Resistencia ante la corrupción del Anillo'
      },
      slides: [
        { icon: '💍', caption: 'Portador del Anillo' },
        { icon: '🏡', caption: 'La Comarca' },
        { icon: '🌋', caption: 'El Monte del Destino' }
      ]
    },
    samsagaz: {
      name: 'Samsagaz Gamyi',
      race: 'Hobbit',
      theme: 'hobbits',
      quote: '"Puedo llevar el Anillo, aunque no puedo llevarlo a usted. Pero puedo llevarle a usted."',
      bio: 'Jardinero de los Bolsón, Sam se convierte en el compañero más fiel de Frodo durante todo el viaje a Mordor. Su determinación práctica y su cariño incondicional son, para muchos lectores, el verdadero corazón de la historia.',
      details: {
        'Título': 'Jardinero de Bolsón Cerrado',
        'Origen': 'La Comarca',
        'Afiliación': 'Compañero de Frodo',
        'Rasgo distintivo': 'Lealtad inquebrantable',
        'Momento clave': 'Carga a Frodo en las pendientes del Monte del Destino'
      },
      slides: [
        { icon: '🌱', caption: 'Jardinero de Bolsón Cerrado' },
        { icon: '🍳', caption: 'Provisiones para el viaje' },
        { icon: '🕸️', caption: 'Frente a Ella-Laraña' }
      ]
    },
    bilbo: {
      name: 'Bilbo Bolsón',
      race: 'Hobbit',
      theme: 'hobbits',
      quote: '"No todo lo que es oro reluce."',
      bio: 'Bilbo abandona la tranquilidad de la Comarca para acompañar a Thorin y su compañía hasta Erebor. Durante el viaje encuentra el Anillo Único, un hallazgo que décadas más tarde heredará su sobrino Frodo con consecuencias que cambiarán el destino de la Tierra Media.',
      details: {
        'Título': 'Aventurero de la Comarca',
        'Origen': 'La Comarca, Bolsón Cerrado',
        'Afiliación': 'Compañía de Thorin (El Hobbit)',
        'Objeto': 'El Anillo Único / la espada Aguijón',
        'Rasgo distintivo': 'Curiosidad e ingenio'
      },
      slides: [
        { icon: '🎂', caption: 'Fiesta de cumpleaños' },
        { icon: '💍', caption: 'Hallazgo del Anillo' },
        { icon: '📖', caption: 'Autor de sus memorias' }
      ]
    },
    aragorn: {
      name: 'Aragorn',
      race: 'Hombre',
      theme: 'hombres',
      quote: '"No todos los que vagan están perdidos."',
      bio: 'Heredero de Isildur, Aragorn crece oculto entre los Elfos de Rivendel bajo el nombre de Trancos. Guía a la Comunidad tras la caída de Gandalf en Moria y, al reclamar la espada Andúril, asume finalmente su derecho al trono de Gondor y Arnor.',
      details: {
        'Título': 'Rey de Gondor y Arnor',
        'Origen': 'Línea de Isildur, criado en Rivendel',
        'Afiliación': 'Comunidad del Anillo',
        'Arma': 'Andúril, antes Narsil',
        'Rasgo distintivo': 'Liderazgo forjado en el exilio'
      },
      slides: [
        { icon: '🗺️', caption: 'Trancos, el Montaraz' },
        { icon: '⚔️', caption: 'Andúril reforjada' },
        { icon: '👑', caption: 'Rey de Gondor' }
      ]
    },
    eowyn: {
      name: 'Éowyn',
      race: 'Mujer de Rohan',
      theme: 'hombres',
      quote: '"No soy un hombre."',
      bio: 'Sobrina del rey Théoden, Éowyn desafía el papel que se espera de ella y cabalga disfrazada hacia la Batalla de los Campos del Pelennor. Allí protagoniza uno de los momentos más recordados de la guerra contra Sauron al enfrentarse al Rey Brujo de Angmar.',
      details: {
        'Título': 'Dama Escudo de Rohan',
        'Origen': 'Edoras, sobrina del rey Théoden',
        'Afiliación': 'Ejército de Rohan, disfrazada como "Dernhelm"',
        'Rasgo distintivo': 'Valentía frente a las expectativas de su papel',
        'Momento clave': 'Enfrenta al Rey Brujo de Angmar en los Campos del Pelennor'
      },
      slides: [
        { icon: '🛡️', caption: 'Escudera de Rohan' },
        { icon: '⚔️', caption: 'Frente al Rey Brujo' },
        { icon: '🏰', caption: 'Edoras, su hogar' }
      ]
    },
    gandalf: {
      name: 'Gandalf',
      race: 'Maia',
      theme: 'maiar',
      quote: '"Todos debemos decidir qué hacer con el tiempo que nos ha sido dado."',
      bio: 'Enviado a la Tierra Media como uno de los Istari, Gandalf porta en secreto el anillo Narya y dedica siglos a oponerse a la sombra de Sauron. Tras caer en Moria enfrentando al Balrog, regresa transformado en Gandalf el Blanco para liderar la resistencia final.',
      details: {
        'Título': 'Gandalf el Gris / el Blanco',
        'Origen': 'Maia de Valinor, enviado como Istari',
        'Anillo de Poder': 'Narya, el Anillo Rojo',
        'Afiliación': 'Comunidad del Anillo',
        'Rasgo distintivo': 'Sabiduría y guía espiritual'
      },
      slides: [
        { icon: '🧙', caption: 'El Mago Gris' },
        { icon: '🔥', caption: 'Frente al Balrog' },
        { icon: '⚡', caption: 'El Mago Blanco' }
      ]
    },
    sauron: {
      name: 'Sauron',
      race: 'Maia',
      theme: 'maiar',
      quote: '"Un Anillo para gobernarlos a todos."',
      bio: 'Antiguo Maia al servicio de Morgoth, Sauron forja el Anillo Único durante la Segunda Edad para someter a los demás pueblos de la Tierra Media. Su sombra, encarnada en el Ojo que vigila desde Barad-dûr, se cierne sobre toda la Tercera Edad hasta la destrucción del Anillo.',
      details: {
        'Título': 'El Señor Oscuro',
        'Origen': 'Maia corrompido, antiguo servidor de Morgoth',
        'Objeto': 'El Anillo Único',
        'Fortaleza': 'Barad-dûr, en Mordor',
        'Rasgo distintivo': 'Voluntad de dominio absoluto'
      },
      slides: [
        { icon: '👁️', caption: 'El Ojo sin cuerpo' },
        { icon: '💍', caption: 'El Anillo Único' },
        { icon: '🏯', caption: 'Barad-dûr' }
      ]
    },
    varda: {
      name: 'Varda (Elbereth)',
      race: 'Ainu (Valië)',
      theme: 'ainur',
      quote: '"A Elbereth Gilthoniel, o menel palan-díriel."',
      bio: 'La más venerada de los Valar entre los Elfos, Varda creó las estrellas que iluminaron Arda antes del Sol y la Luna. Su nombre, invocado como Elbereth, se convierte en un canto de protección frente a las criaturas de la oscuridad a lo largo de toda la historia.',
      details: {
        'Título': 'Reina de los Valar, Señora de las Estrellas',
        'Origen': 'Ainu, presente desde antes de la creación de Arda',
        'Morada': 'Valinor, en Taniquetil',
        'Invocación': 'Elbereth Gilthoniel',
        'Rasgo distintivo': 'Luz que ahuyenta a las criaturas de las sombras'
      },
      slides: [
        { icon: '✨', caption: 'Creadora de las estrellas' },
        { icon: '🙏', caption: 'Invocada como Elbereth' },
        { icon: '🏔️', caption: 'Morada en Valinor' }
      ]
    },
    manwe: {
      name: 'Manwë',
      race: 'Ainu (Vala)',
      theme: 'ainur',
      quote: '"Ningún mal puede prosperar para siempre."',
      bio: 'Esposo de Varda y el más poderoso de los Valar, Manwë gobierna Arda desde su trono en Taniquetil. Cercano al pensamiento de Eru Ilúvatar, vela por la Tierra Media a través de las Águilas de los Señores del Viento y convoca a los Valar cuando el mundo lo requiere.',
      details: {
        'Título': 'Rey de los Valar',
        'Origen': 'Ainu, presente desde antes de la creación de Arda',
        'Morada': 'Valinor, en Taniquetil',
        'Sirvientes': 'Las Águilas de los Señores del Viento',
        'Rasgo distintivo': 'Sabiduría y autoridad sobre los demás Valar'
      },
      slides: [
        { icon: '👑', caption: 'Rey de los Valar' },
        { icon: '🦅', caption: 'Señor de las Águilas' },
        { icon: '🏔️', caption: 'Trono en Taniquetil' }
      ]
    },
    boromir: {
      name: 'Boromir',
      race: 'Hombre',
      theme: 'hombres',
      quote: '"Es un extraño destino que debamos sufrir tanto temor y duda por una cosa tan pequeña."',
      bio: 'Hijo mayor del Senescal Denethor, Boromir viaja desde Gondor hasta Rivendel en busca de respuestas para salvar su reino y se une a la Comunidad del Anillo. La tentación del Anillo Único pone a prueba su lealtad, pero muere defendiendo a Merry y Pippin de los uruk-hai de Saruman.',
      details: {
        'Título': 'Hijo del Senescal de Gondor',
        'Origen': 'Minas Tirith, Gondor',
        'Afiliación': 'Comunidad del Anillo',
        'Arma': 'Espada y el Cuerno de Gondor',
        'Rasgo distintivo': 'Valentía y devoción por su pueblo'
      },
      slides: [
        { icon: '🛡️', caption: 'Hijo de Denethor' },
        { icon: '📯', caption: 'El Cuerno de Gondor' },
        { icon: '⚔️', caption: 'Última defensa de Merry y Pippin' }
      ]
    }
  };

  var modal, panel, slidesEl, dotsEl, nameEl, raceEl, bioEl, quoteEl, detailsEl;
  var slideIndex = 0;
  var currentChar = null;
  var triggerEl = null;

  function buildModal() {
    modal = document.createElement('div');
    modal.className = 'char-modal';
    modal.id = 'charModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'charModalName');
    modal.innerHTML =
      '<div class="char-modal__panel">' +
        '<button type="button" class="char-modal__close" id="charModalClose" aria-label="Cerrar ficha del personaje">&times;</button>' +
        '<div class="char-modal__gallery">' +
          '<button type="button" class="char-modal__nav char-modal__nav--prev" id="charModalPrev" aria-label="Imagen anterior">&#8249;</button>' +
          '<div class="char-modal__slides-clip">' +
            '<div class="char-modal__slides" id="charModalSlides"></div>' +
          '</div>' +
          '<button type="button" class="char-modal__nav char-modal__nav--next" id="charModalNext" aria-label="Imagen siguiente">&#8250;</button>' +
        '</div>' +
        '<div class="char-modal__dots" id="charModalDots"></div>' +
        '<div class="char-modal__body">' +
          '<span class="char-modal__race" id="charModalRace"></span>' +
          '<h3 class="char-modal__name" id="charModalName"></h3>' +
          '<p class="char-modal__bio" id="charModalBio"></p>' +
          '<blockquote class="char-modal__quote" id="charModalQuote"></blockquote>' +
          '<dl class="char-modal__details" id="charModalDetails"></dl>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    panel = modal.querySelector('.char-modal__panel');
    slidesEl = modal.querySelector('#charModalSlides');
    dotsEl = modal.querySelector('#charModalDots');
    nameEl = modal.querySelector('#charModalName');
    raceEl = modal.querySelector('#charModalRace');
    bioEl = modal.querySelector('#charModalBio');
    quoteEl = modal.querySelector('#charModalQuote');
    detailsEl = modal.querySelector('#charModalDetails');

    modal.querySelector('#charModalClose').addEventListener('click', closeCharModal);
    modal.querySelector('#charModalPrev').addEventListener('click', function () { showSlide(slideIndex - 1); });
    modal.querySelector('#charModalNext').addEventListener('click', function () { showSlide(slideIndex + 1); });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeCharModal();
    });

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('char-modal--visible')) return;
      if (e.key === 'Escape') { closeCharModal(); return; }
      if (e.key === 'ArrowRight') { showSlide(slideIndex + 1); return; }
      if (e.key === 'ArrowLeft') { showSlide(slideIndex - 1); return; }
      if (e.key === 'Tab') trapFocus(e);
    });
  }

  function trapFocus(e) {
    var focusable = panel.querySelectorAll('button');
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function showSlide(index) {
    var total = currentChar.slides.length;
    slideIndex = (index + total) % total;
    slidesEl.style.transform = 'translateX(-' + (slideIndex * 100) + '%)';
    dotsEl.querySelectorAll('.char-modal__dot').forEach(function (dot, i) {
      dot.setAttribute('aria-current', String(i === slideIndex));
    });
  }

  function renderChar(id) {
    var data = CHARACTERS[id];
    if (!data) return false;
    currentChar = data;

    modal.className = 'char-modal char-modal--' + data.theme;
    raceEl.textContent = data.race;
    nameEl.textContent = data.name;
    bioEl.textContent = data.bio;
    quoteEl.textContent = data.quote;

    slidesEl.innerHTML = '';
    data.slides.forEach(function (slide) {
      var div = document.createElement('div');
      div.className = 'char-modal__slide';
      div.innerHTML =
        '<span class="char-modal__slide-icon" aria-hidden="true">' + slide.icon + '</span>' +
        '<span class="char-modal__slide-caption">' + slide.caption + '</span>';
      slidesEl.appendChild(div);
    });

    dotsEl.innerHTML = '';
    data.slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'char-modal__dot';
      dot.setAttribute('aria-label', 'Ir a la imagen ' + (i + 1) + ' de ' + data.slides.length);
      dot.addEventListener('click', function () { showSlide(i); });
      dotsEl.appendChild(dot);
    });

    detailsEl.innerHTML = '';
    Object.keys(data.details).forEach(function (key) {
      var dt = document.createElement('dt');
      dt.textContent = key;
      var dd = document.createElement('dd');
      dd.textContent = data.details[key];
      detailsEl.appendChild(dt);
      detailsEl.appendChild(dd);
    });

    showSlide(0);
    return true;
  }

  function openCharModal(id, trigger) {
    if (!modal) buildModal();
    if (!renderChar(id)) return;
    triggerEl = trigger || null;
    document.body.classList.add('char-modal-open');
    modal.classList.add('char-modal--visible');
    modal.querySelector('#charModalClose').focus();
  }

  function closeCharModal() {
    if (!modal) return;
    modal.classList.remove('char-modal--visible');
    document.body.classList.remove('char-modal-open');
    if (triggerEl) triggerEl.focus();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var cards = document.querySelectorAll('.char-card[data-char]');
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        openCharModal(card.getAttribute('data-char'), card);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCharModal(card.getAttribute('data-char'), card);
        }
      });
    });
  });
})();
