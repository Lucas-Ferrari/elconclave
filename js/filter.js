/**
 * filter.js — filtro genérico reutilizado en personajes.html (por raza)
 * y bibliografia.html (por edad de la Tierra Media).
 * Cada barra de filtros usa [data-filter-group] y cada tarjeta [data-filter-item]
 * con un atributo de datos (por defecto data-category) que se compara con el
 * valor de data-filter del botón pulsado.
 */
(function () {
  'use strict';

  function initFilterGroup(group) {
    var attr = group.getAttribute('data-filter-attr') || 'data-category';
    var itemsSelector = group.getAttribute('data-filter-target');
    var items = itemsSelector ? document.querySelectorAll(itemsSelector) : [];
    var buttons = group.querySelectorAll('.filter-bar__btn');
    var emptyMessage = document.querySelector(group.getAttribute('data-empty-target') || '');

    function applyFilter(value) {
      var visibleCount = 0;
      items.forEach(function (item) {
        var categories = (item.getAttribute(attr) || '').split(' ');
        var show = value === 'all' || categories.indexOf(value) !== -1;
        item.hidden = !show;
        if (show) visibleCount++;
      });
      if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;
    }

    function selectButton(btn) {
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      applyFilter(btn.getAttribute('data-filter'));
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () { selectButton(btn); });
    });

    var hashPrefix = group.getAttribute('data-hash-prefix');
    if (hashPrefix && window.location.hash.indexOf('#' + hashPrefix) === 0) {
      var wanted = window.location.hash.slice(hashPrefix.length + 1);
      var matchBtn = group.querySelector('[data-filter="' + wanted + '"]');
      if (matchBtn) selectButton(matchBtn);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-filter-group]').forEach(initFilterGroup);
  });
})();
