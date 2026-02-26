(function () {
  let translateWidgetObserver = null;

  function forceTranslateWidgetStyle() {
    const menuValueElements = document.querySelectorAll('.goog-te-menu-value, .goog-te-menu-value span');
    menuValueElements.forEach((el) => {
      if (el.style) {
        el.style.color = '#c9d1d9';
        el.style.setProperty('color', '#c9d1d9', 'important');
      }
    });

    const gadgetSimple = document.querySelector('.goog-te-gadget-simple');
    if (gadgetSimple) {
      const textElements = gadgetSimple.querySelectorAll('span, div');
      textElements.forEach((el) => {
        if (el.classList && (el.classList.contains('goog-te-menu-value') || el.tagName === 'SPAN')) {
          if (el.style) {
            el.style.color = '#c9d1d9';
            el.style.setProperty('color', '#c9d1d9', 'important');
          }
        }
      });
    }
  }

  function setupTranslateWidgetObserver() {
    if (translateWidgetObserver) return;

    translateWidgetObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const menuValueElements = node.querySelectorAll ? node.querySelectorAll('.goog-te-menu-value, .goog-te-menu-value span') : [];
            menuValueElements.forEach((el) => {
              if (el.style) {
                el.style.color = '#c9d1d9';
                el.style.setProperty('color', '#c9d1d9', 'important');
              }
            });
            if (node.classList && (node.classList.contains('goog-te-menu-value') || node.classList.contains('goog-te-gadget-simple'))) {
              if (node.style) {
                node.style.color = '#c9d1d9';
                node.style.setProperty('color', '#c9d1d9', 'important');
              }
            }
          }
        });
      });
      forceTranslateWidgetStyle();
    });

    const translateElement = document.getElementById('google_translate_element');
    if (translateElement) {
      translateWidgetObserver.observe(translateElement, { childList: true, subtree: true });
    }

    translateWidgetObserver.observe(document.body, { childList: true, subtree: true });
  }

  function googleTranslateElementInit() {
    if (typeof google !== 'undefined' && google.translate) {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,da,de,es,fr,it,nl,no,pl,pt,ru,sv,zh-CN,ja,ko',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');

      setupTranslateWidgetObserver();
      setTimeout(forceTranslateWidgetStyle, 50);
      setTimeout(forceTranslateWidgetStyle, 200);
      setTimeout(forceTranslateWidgetStyle, 500);
      setTimeout(forceTranslateWidgetStyle, 1000);
    } else {
      console.error('Google Translate API not loaded');
    }
  }

  window.googleTranslateElementInit = googleTranslateElementInit;

  window.addEventListener('load', () => {
    if (typeof google === 'undefined' || !google.translate) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    } else {
      setupTranslateWidgetObserver();
      setTimeout(forceTranslateWidgetStyle, 100);
      setTimeout(forceTranslateWidgetStyle, 500);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupTranslateWidgetObserver();
    });
  } else {
    setupTranslateWidgetObserver();
  }
})();
