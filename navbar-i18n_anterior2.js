// ========================================
// DYNAMIC NAVBAR INTERNATIONALIZATION WITH FLAGS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🌐 Navbar i18n: Initializing...');

  // Detect current language from URL
  const currentPath = window.location.pathname;
  let currentLang = 'es'; // default

  if (currentPath.includes('index-en.html')) {
    currentLang = 'en';
  } else if (currentPath.includes('index-pt.html')) {
    currentLang = 'pt';
  }

  console.log('🌐 Detected language:', currentLang);

  // Navbar translations with flags
  const translations = {
    es: {
      pdfText: 'Descargar PDF',
      pdfHref: 'index-es.pdf',
      langButton: 'Idioma',
      flagIcon: 'images/flags/COL.png',
      flagAlt: 'Español',
      homeHref: 'index-es.html',
      languages: [
        { code: 'en', name: 'English', href: 'index-en.html' },
        { code: 'pt', name: 'Português', href: 'index-pt.html' }
      ]
    },
    en: {
      pdfText: 'Download PDF',
      pdfHref: 'index-en.pdf',
      langButton: 'Language',
      flagIcon: 'images/flags/USA.png',
      flagAlt: 'English',
      homeHref: 'index-en.html',
      languages: [
        { code: 'es', name: 'Español', href: 'index-es.html' },
        { code: 'pt', name: 'Português', href: 'index-pt.html' }
      ]
    },
    pt: {
      pdfText: 'Baixar PDF',
      pdfHref: 'index-pt.pdf',
      langButton: 'Idioma',
      flagIcon: 'images/flags/BRA.png',
      flagAlt: 'Português',
      homeHref: 'index-pt.html',
      languages: [
        { code: 'es', name: 'Español', href: 'index-es.html' },
        { code: 'en', name: 'English', href: 'index-en.html' }
      ]
    }
  };

  const t = translations[currentLang];
  console.log('🌐 Using translations:', t);

  // ========================================
  // MAKE TITLE CLICKABLE
  // ========================================
  const navbarBrand = document.querySelector('.navbar-brand');
  if (navbarBrand) {
    navbarBrand.href = t.homeHref;
    console.log('✅ Navbar title link updated to:', t.homeHref);
  } else {
    console.warn('⚠️ Navbar brand not found');
  }

  // ========================================
  // UPDATE PDF BUTTON
  // ========================================
  let pdfLink = document.querySelector('a[href*="index.pdf"]') ||
                document.querySelector('a[href*="PDF"]') ||
                document.querySelector('a[href*="pdf"]');

  if (!pdfLink) {
    const allLinks = document.querySelectorAll('.navbar a');
    for (let link of allLinks) {
      if (link.textContent.toLowerCase().includes('pdf') ||
          link.textContent.toLowerCase().includes('descargar') ||
          link.textContent.toLowerCase().includes('download') ||
          link.textContent.toLowerCase().includes('baixar')) {
        pdfLink = link;
        break;
      }
    }
  }

  if (pdfLink) {
    console.log('✅ PDF link found:', pdfLink.href);
    // Preserve original classes
    const originalClasses = pdfLink.className;
    pdfLink.textContent = t.pdfText;
    pdfLink.href = t.pdfHref;
    pdfLink.className = originalClasses; // Restore classes
    console.log('✅ PDF link updated to:', t.pdfHref);
  } else {
    console.warn('⚠️ PDF link not found in navbar');
  }

  // ========================================
  // UPDATE LANGUAGE DROPDOWN BUTTON WITH FLAG
  // ========================================
  const langButton = document.querySelector('.nav-item.dropdown > a.nav-link');
  if (langButton) {
    // Preserve original classes
    const originalClasses = langButton.className;

    // Create flag image
    const flagImg = document.createElement('img');
    flagImg.src = t.flagIcon;
    flagImg.alt = t.flagAlt;
    flagImg.className = 'flag-icon';
    flagImg.style.width = '40px';
    flagImg.style.height = '40px';
    flagImg.style.marginRight = '12px';
    flagImg.style.verticalAlign = 'middle';
    flagImg.style.borderRadius = '1px';

    // Update button content with flag
    langButton.innerHTML = '';
    langButton.className = originalClasses; // Restore classes

    langButton.appendChild(flagImg);

    // Add text with proper spacing
    const textNode = document.createTextNode(t.langButton + ' ');
    langButton.appendChild(textNode);

    // Add caret
    const caret = document.createElement('span');
    caret.className = 'caret';
    langButton.appendChild(caret);

    console.log('✅ Language button updated with flag');
  } else {
    console.warn('⚠️ Language dropdown button not found');
  }

  // ========================================
  // UPDATE LANGUAGE DROPDOWN ITEMS
  // ========================================
  const langDropdown = document.querySelector('.nav-item.dropdown .dropdown-menu');
  if (langDropdown) {
    langDropdown.innerHTML = '';
    t.languages.forEach(lang => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'dropdown-item';
      a.href = lang.href;
      a.textContent = lang.name;
      li.appendChild(a);
      langDropdown.appendChild(li);
    });
    console.log('✅ Language dropdown updated with', t.languages.length, 'options');
  } else {
    console.warn('⚠️ Language dropdown menu not found');
  }

  console.log('🌐 Navbar i18n: Complete!');
});
