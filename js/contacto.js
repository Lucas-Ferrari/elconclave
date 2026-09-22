/**
 * contacto.js — validación del formulario de "El Cónclave".
 * No hay backend: al validar correctamente se simula el envío y se
 * muestra un mensaje de confirmación accesible (aria-live).
 */
(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(input, message) {
    var errorEl = document.getElementById(input.id + 'Error');
    if (errorEl) errorEl.textContent = message || '';
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  function validateField(input) {
    var value = input.value.trim();

    if (input.hasAttribute('required') && !value) {
      return setError(input, 'Este campo es obligatorio.');
    }
    if (input.type === 'checkbox' && input.hasAttribute('required') && !input.checked) {
      return setError(input, 'Debes aceptar esta condición para continuar.');
    }
    if (input.id === 'nombre' && value.length < 2) {
      return setError(input, 'El nombre debe tener al menos 2 caracteres.');
    }
    if (input.id === 'email' && !EMAIL_RE.test(value)) {
      return setError(input, 'Introduce un correo electrónico válido.');
    }
    if (input.id === 'mensaje' && value.length < 10) {
      return setError(input, 'Cuéntanos un poco más: al menos 10 caracteres.');
    }
    if (input.id === 'asunto' && !value) {
      return setError(input, 'Selecciona el motivo de tu mensaje.');
    }
    return setError(input, '');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var status = document.getElementById('formStatus');
    var fields = form.querySelectorAll('.form__control, input[type="checkbox"][required]');

    fields.forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allValid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) {
        status.hidden = false;
        status.className = 'form__status form__status--error';
        status.textContent = 'Revisa los campos marcados: el Cónclave necesita esa información antes de recibir tu mensaje.';
        status.focus();
        return;
      }

      status.hidden = false;
      status.className = 'form__status form__status--success';
      status.textContent = '¡Tu mensaje ha partido hacia el Cónclave! Te responderemos pronto por correo.';
      status.setAttribute('tabindex', '-1');
      status.focus();
      form.reset();
      fields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
    });
  });
})();
