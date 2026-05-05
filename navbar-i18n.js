// ========================================
// DYNAMIC NAVBAR INTERNATIONALIZATION WITH FLAGS
// ========================================

document.addEventListener('DOMContentLoaded', function() {

  // ── Fix title link ────────────────────────────────────────
  const navbarBrand = document.querySelector('.navbar-brand');
  if (navbarBrand && navbarBrand.tagName === 'A') {
    navbarBrand.href = 'index-es.html';
  }

  // ── Detect language from URL ──────────────────────────────
  const currentPath = window.location.pathname;
  let currentLang = 'es';
  if (currentPath.includes('index-en.html')) currentLang = 'en';
  else if (currentPath.includes('index-pt.html')) currentLang = 'pt';

  // ── Navbar translations ───────────────────────────────────
  const translations = {
    es: {
      pdfText: 'Descargar PDF',
      pdfHref: 'index-es.pdf',
      langButton: 'Idioma',
      flagIcon: 'images/flags/COL.png',
      flagAlt: 'Español',
      languages: [
        { code: 'en', name: 'English',   href: 'index-en.html' },
        { code: 'pt', name: 'Português', href: 'index-pt.html' }
      ]
    },
    en: {
      pdfText: 'Download PDF',
      pdfHref: 'index-en.pdf',
      langButton: 'Language',
      flagIcon: 'images/flags/USA.png',
      flagAlt: 'English',
      languages: [
        { code: 'es', name: 'Español',   href: 'index-es.html' },
        { code: 'pt', name: 'Português', href: 'index-pt.html' }
      ]
    },
    pt: {
      pdfText: 'Baixar PDF',
      pdfHref: 'index-pt.pdf',
      langButton: 'Idioma',
      flagIcon: 'images/flags/BRA.png',
      flagAlt: 'Português',
      languages: [
        { code: 'es', name: 'Español', href: 'index-es.html' },
        { code: 'en', name: 'English', href: 'index-en.html' }
      ]
    }
  };

  const t = translations[currentLang];

  // ── Update PDF button ─────────────────────────────────────
  let pdfLink = document.querySelector('a[href*="index.pdf"]') ||
                document.querySelector('a[href*="PDF"]') ||
                document.querySelector('a[href*="pdf"]');

  if (!pdfLink) {
    for (let link of document.querySelectorAll('.navbar a')) {
      const text = link.textContent.toLowerCase();
      if (text.includes('pdf') || text.includes('descargar') ||
          text.includes('download') || text.includes('baixar')) {
        pdfLink = link; break;
      }
    }
  }

  if (pdfLink) {
    const cls = pdfLink.className;
    pdfLink.textContent = t.pdfText;
    pdfLink.href = t.pdfHref;
    pdfLink.className = cls;
  }

  // ── Update language dropdown button with flag ─────────────
  const langButton = document.querySelector('.nav-item.dropdown > a.nav-link');
  if (langButton) {
    const cls = langButton.className;
    const flagImg = document.createElement('img');
    flagImg.src = t.flagIcon;
    flagImg.alt = t.flagAlt;
    flagImg.className = 'flag-icon';
    flagImg.style.cssText = 'width:40px;height:40px;margin-right:16px;vertical-align:middle;border-radius:1px;';
    langButton.innerHTML = '';
    langButton.className = cls;
    langButton.appendChild(flagImg);
    langButton.appendChild(document.createTextNode(t.langButton + ' '));
    const caret = document.createElement('span');
    caret.className = 'caret';
    langButton.appendChild(caret);
  }

  // ── Update language dropdown items ────────────────────────
  const langDropdown = document.querySelector('.nav-item.dropdown .dropdown-menu');
  if (langDropdown) {
    langDropdown.innerHTML = '';
    t.languages.forEach(function(lang) {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.className   = 'dropdown-item';
      a.href        = lang.href;
      a.textContent = lang.name;
      li.appendChild(a);
      langDropdown.appendChild(li);
    });
  }

});


// ============================================================
// MODAL DE EXPERIENCIA — event delegation
// Un solo listener en document: no depende del timing de carga.
// ============================================================

(function () {

  /* ── helpers ─────────────────────────────────────────── */
  function el(id) { return document.getElementById(id); }

  function showSection(id, show) {
    var s = el(id);
    if (s) s.style.display = show ? 'block' : 'none';
  }

  function fillList(ulId, items) {
    var ul = el(ulId);
    if (!ul) return;
    ul.innerHTML = '';
    (items || []).forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
  }

  function fillTags(cId, tags) {
    var c = el(cId);
    if (!c) return;
    c.innerHTML = '';
    (tags || []).forEach(function (tag) {
      var span = document.createElement('span');
      span.className = 'modal-tag';
      span.textContent = tag;
      c.appendChild(span);
    });
  }

  /* ── crear modal en el DOM si no existe ──────────────────
     Quarto puede eliminar HTML raw del documento. Crearlo
     desde JS garantiza que siempre esté disponible.         */
  function ensureModal() {
    // Verificar el elemento INTERIOR (no el wrapper exterior que Quarto puede incluir vacío)
    if (document.getElementById('modal-cargo')) return;

    // Limpiar cualquier wrapper vacío que haya dejado Quarto
    var stale = document.getElementById('exp-modal-overlay');
    if (stale) stale.parentNode.removeChild(stale);

    var overlay = document.createElement('div');
    overlay.id        = 'exp-modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML =
      '<div class="modal-box" role="dialog" aria-modal="true">' +
        '<div class="modal-header">' +
          '<button class="modal-close" id="modal-close-btn" aria-label="Cerrar">&#215;</button>' +
          '<div id="modal-cargo"   class="modal-cargo"></div>' +
          '<div id="modal-empresa" class="modal-empresa"></div>' +
          '<div id="modal-fecha"   class="modal-fecha"></div>' +
        '</div>' +
        '<div class="modal-body">' +
          '<div id="modal-desc-section" class="modal-section">' +
            '<div class="modal-section-label" id="modal-label-desc"></div>' +
            '<div id="modal-descripcion" class="modal-description"></div>' +
          '</div>' +
          '<div id="modal-resp-section" class="modal-section">' +
            '<div class="modal-section-label" id="modal-label-resp"></div>' +
            '<ul id="modal-responsabilidades" class="modal-list modal-list-resp"></ul>' +
          '</div>' +
          '<div id="modal-logros-section" class="modal-section">' +
            '<div class="modal-section-label" id="modal-label-logros"></div>' +
            '<ul id="modal-logros" class="modal-list modal-list-logros"></ul>' +
          '</div>' +
          '<div id="modal-tech-section" class="modal-section">' +
            '<div class="modal-section-label" id="modal-label-tech"></div>' +
            '<div id="modal-tecnologias" class="modal-tags"></div>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
  }

  /* ── abrir / cerrar ───────────────────────────────────── */
  function openModal(idx) {
    ensureModal(); // crea el modal si Quarto lo eliminó del HTML
    // Los datos están en el atributo data-exp de la tarjeta
    var card = document.querySelector('[data-exp-idx="' + idx + '"]');
    if (!card) return;

    var raw = card.getAttribute('data-exp');
    if (!raw) return;

    var data;
    try {
      data = JSON.parse(raw);  // getAttribute ya decodificó &quot; → "
    } catch(e) {
      return;
    }

    var labels = window.expLabels || {};

    el('modal-cargo').textContent   = data.cargo   || '';
    el('modal-empresa').textContent = data.empresa || '';
    el('modal-fecha').textContent   = data.fecha   || '';

    if (el('modal-label-desc'))   el('modal-label-desc').textContent   = labels.description     || 'Descripción';
    if (el('modal-label-resp'))   el('modal-label-resp').textContent   = labels.responsibilities || 'Responsabilidades';
    if (el('modal-label-logros')) el('modal-label-logros').textContent = labels.achievements     || 'Logros';
    if (el('modal-label-tech'))   el('modal-label-tech').textContent   = labels.technologies     || 'Tecnologías';

    var desc = (data.descripcion || '').trim();
    if (el('modal-descripcion')) el('modal-descripcion').textContent = desc;
    showSection('modal-desc-section', desc.length > 0);

    var resp = (data.responsabilidades || []).filter(Boolean);
    fillList('modal-responsabilidades', resp);
    showSection('modal-resp-section', resp.length > 0);

    var logros = (data.logros || []).filter(Boolean);
    fillList('modal-logros', logros);
    showSection('modal-logros-section', logros.length > 0);

    var tech = (data.tecnologias || []).filter(Boolean);
    fillTags('modal-tecnologias', tech);
    showSection('modal-tech-section', tech.length > 0);

    var overlay = el('exp-modal-overlay');
    if (overlay) {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    var overlay = el('exp-modal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ── event delegation: UN solo listener en document ──────
     No importa cuándo carga el script ni cuándo está el DOM.
     Funciona para cualquier elemento presente o futuro.      */
  document.addEventListener('click', function (e) {

    // 1. Clic en tarjeta de experiencia (o hijo suyo)
    var card = e.target.closest('.experience-clickable');
    if (card) {
      var idx = parseInt(card.getAttribute('data-exp-idx'), 10);
      openModal(idx);
      return;
    }

    // 2. Clic en botón cerrar
    if (e.target.closest('#modal-close-btn')) {
      closeModal();
      return;
    }

    // 3. Clic en el overlay (fuera de la caja)
    if (e.target.id === 'exp-modal-overlay') {
      closeModal();
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

})();
