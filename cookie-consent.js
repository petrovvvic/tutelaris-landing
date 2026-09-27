/*
 * Cookie-/Datenschutz-Hinweis nach TTDSG § 25 und Art. 6, 7 DSGVO.
 * Alle Inhalte dieser Website (Text, selbst gehostete Schriftarten, Icons,
 * Bilder) laden unabhängig von der Cookie-Auswahl. Die Auswahl in diesem
 * Banner betrifft ausschließlich optionale Marketing-/Werbe-Cookies, die
 * aktuell nicht eingesetzt werden.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'tutelaris_consent_v1';
  var MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000; // 12 Monate, danach erneute Abfrage
  var lang = (document.documentElement.lang || 'de').toLowerCase().indexOf('en') === 0 ? 'en' : 'de';
  var privacyHref = lang === 'en' ? 'https://tutelaris.de/datenschutz.html' : 'datenschutz.html';

  var T = {
    de: {
      bannerTitle: 'Cookie- & Datenschutzeinstellungen',
      bannerBody: 'Wir speichern auf dieser Website nur, was technisch notwendig ist – etwa Ihre Cookie-Auswahl selbst. Es findet kein Tracking und keine Analyse Ihres Verhaltens statt.',
      privacyLink: 'Datenschutzerklärung',
      btnNecessary: 'Nur Notwendige',
      btnSettings: 'Einstellungen',
      btnAcceptAll: 'Alle akzeptieren',
      modalTitle: 'Datenschutz-Einstellungen',
      modalIntro: 'Alle Inhalte dieser Website funktionieren unabhängig von Ihrer Auswahl hier. Die folgende Einstellung betrifft ausschließlich optionale Marketing- und Werbe-Cookies.',
      catNecessaryTitle: 'Technisch notwendig',
      catNecessaryBadge: 'Immer aktiv',
      catNecessaryDesc: 'Wird benötigt, damit die Website funktioniert und Ihre Cookie-Auswahl gespeichert werden kann. Kann nicht deaktiviert werden.',
      catFontsTitle: 'Marketing & Werbung',
      catFontsDesc: 'Aktuell setzen wir keine Marketing- oder Werbe-Cookies ein. Sollte sich das ändern, fragen wir vorher über dieses Banner um Erlaubnis.',
      btnSave: 'Auswahl speichern',
      close: 'Schließen',
      footerLink: 'Cookie-Einstellungen'
    },
    en: {
      bannerTitle: 'Cookie & Privacy Settings',
      bannerBody: 'On this website we only store what is technically necessary – for example, your cookie choice itself. We do not track or analyse your behaviour.',
      privacyLink: 'Privacy Policy',
      btnNecessary: 'Necessary only',
      btnSettings: 'Settings',
      btnAcceptAll: 'Accept all',
      modalTitle: 'Privacy Settings',
      modalIntro: 'Every part of this website works regardless of your choice here. The setting below covers only optional marketing and advertising cookies.',
      catNecessaryTitle: 'Technically necessary',
      catNecessaryBadge: 'Always active',
      catNecessaryDesc: 'Required for the website to function and to remember your cookie choice. Cannot be turned off.',
      catFontsTitle: 'Marketing & advertising',
      catFontsDesc: 'We currently do not use any marketing or advertising cookies. If that changes, we will ask for your permission via this banner first.',
      btnSave: 'Save choice',
      close: 'Close',
      footerLink: 'Cookie Settings'
    }
  }[lang];

  function readConsent() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || data.v !== 1 || typeof data.marketing !== 'boolean' || !data.ts) return null;
      if (Date.now() - new Date(data.ts).getTime() > MAX_AGE_MS) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(marketing) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        necessary: true,
        marketing: !!marketing,
        ts: new Date().toISOString(),
        v: 1
      }));
    } catch (e) { /* Local Storage nicht verfügbar – Auswahl gilt nur für diesen Aufruf */ }
  }

  var STYLE = '' +
    '.tut-cc-banner,.tut-cc-modal{font-family:Inter,"Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;}' +
    '.tut-cc-banner{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#fff;border-top:1px solid #e4e7ec;box-shadow:0 -8px 30px rgba(15,23,42,.10);padding:18px 20px;display:flex;flex-wrap:wrap;align-items:center;gap:16px;}' +
    '.tut-cc-text{flex:1 1 380px;min-width:240px;}' +
    '.tut-cc-title{font-weight:800;font-size:14.5px;color:#0b0f19;margin:0 0 4px;}' +
    '.tut-cc-body{font-size:13px;line-height:1.55;color:#475467;margin:0;}' +
    '.tut-cc-links{display:flex;flex-wrap:wrap;align-items:center;gap:16px;margin:8px 0 0;}' +
    '.tut-cc-links a,.tut-cc-links button{font-size:12.5px;font-weight:600;color:#2563eb;text-decoration:underline;background:none;border:none;padding:0;cursor:pointer;}' +
    '.tut-cc-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;flex:0 0 auto;}' +
    '.tut-cc-btn{appearance:none;border-radius:999px;font-size:13.5px;font-weight:600;padding:9px 18px;cursor:pointer;white-space:nowrap;border:1px solid transparent;}' +
    '.tut-cc-btn-primary{background:#4f89fb;color:#fff;}' +
    '.tut-cc-btn-primary:hover{background:#3d75e6;}' +
    '.tut-cc-btn-secondary{background:#fff;color:#344054;border-color:#d0d5dd;}' +
    '.tut-cc-btn-secondary:hover{background:#f8f9fb;}' +
    '.tut-cc-overlay{position:fixed;inset:0;z-index:10000;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;padding:16px;}' +
    '.tut-cc-modal{background:#fff;border-radius:20px;max-width:560px;width:100%;max-height:88vh;overflow-y:auto;padding:26px;box-shadow:0 24px 60px rgba(15,23,42,.25);}' +
    '.tut-cc-modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:6px;}' +
    '.tut-cc-modal h2{font-size:19px;font-weight:800;color:#0b0f19;margin:0;}' +
    '.tut-cc-modal-close{appearance:none;background:none;border:none;cursor:pointer;color:#98a2b3;font-size:20px;line-height:1;padding:4px;}' +
    '.tut-cc-modal-intro{font-size:13.5px;color:#475467;line-height:1.6;margin:8px 0 20px;}' +
    '.tut-cc-cat{border:1px solid #e4e7ec;border-radius:14px;padding:16px;margin-bottom:14px;}' +
    '.tut-cc-cat-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px;}' +
    '.tut-cc-cat-title{font-size:14.5px;font-weight:700;color:#0b0f19;}' +
    '.tut-cc-badge{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#2563eb;background:#eef4fe;border-radius:999px;padding:3px 10px;}' +
    '.tut-cc-cat-desc{font-size:13px;line-height:1.55;color:#667085;margin:0;}' +
    '.tut-cc-switch{position:relative;display:inline-block;width:42px;height:24px;flex:0 0 auto;}' +
    '.tut-cc-switch input{opacity:0;width:0;height:0;}' +
    '.tut-cc-slider{position:absolute;cursor:pointer;inset:0;background:#d0d5dd;border-radius:999px;transition:.15s;}' +
    '.tut-cc-slider:before{content:"";position:absolute;height:18px;width:18px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.15s;}' +
    '.tut-cc-switch input:checked + .tut-cc-slider{background:#4f89fb;}' +
    '.tut-cc-switch input:checked + .tut-cc-slider:before{transform:translateX(18px);}' +
    '.tut-cc-switch input:disabled + .tut-cc-slider{opacity:.6;cursor:default;}' +
    '.tut-cc-modal-actions{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end;margin-top:18px;}' +
    '.tut-cc-modal-foot{margin-top:16px;font-size:12.5px;color:#98a2b3;text-align:right;}' +
    '.tut-cc-modal-foot a{color:#667085;text-decoration:underline;}' +
    '@media (max-width:640px){.tut-cc-banner{padding:16px;}.tut-cc-actions{width:100%;}.tut-cc-actions .tut-cc-btn{flex:1 1 auto;text-align:center;}}';

  function injectStyle() {
    var s = document.createElement('style');
    s.setAttribute('data-tut-cc', '');
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  var banner = null;
  var overlay = null;

  function removeBanner() {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    banner = null;
  }

  function closeModal() {
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    overlay = null;
  }

  function finish(marketing) {
    writeConsent(marketing);
    removeBanner();
    closeModal();
  }

  function openModal() {
    var stored = readConsent();
    var marketingOn = stored ? stored.marketing : false;

    overlay = document.createElement('div');
    overlay.className = 'tut-cc-overlay';
    overlay.setAttribute('role', 'presentation');
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    var modal = document.createElement('div');
    modal.className = 'tut-cc-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', T.modalTitle);

    modal.innerHTML =
      '<div class="tut-cc-modal-head"><h2>' + T.modalTitle + '</h2>' +
      '<button type="button" class="tut-cc-modal-close" aria-label="' + T.close + '">✕</button></div>' +
      '<p class="tut-cc-modal-intro">' + T.modalIntro + '</p>' +
      '<div class="tut-cc-cat">' +
      '<div class="tut-cc-cat-head"><span class="tut-cc-cat-title">' + T.catNecessaryTitle + '</span>' +
      '<label class="tut-cc-switch"><input type="checkbox" checked disabled><span class="tut-cc-slider"></span></label></div>' +
      '<p class="tut-cc-cat-desc">' + T.catNecessaryDesc + ' (' + T.catNecessaryBadge + ')</p></div>' +
      '<div class="tut-cc-cat">' +
      '<div class="tut-cc-cat-head"><span class="tut-cc-cat-title">' + T.catFontsTitle + '</span>' +
      '<label class="tut-cc-switch"><input type="checkbox" id="tut-cc-marketing-toggle"' + (marketingOn ? ' checked' : '') + '><span class="tut-cc-slider"></span></label></div>' +
      '<p class="tut-cc-cat-desc">' + T.catFontsDesc + '</p></div>' +
      '<div class="tut-cc-modal-actions">' +
      '<button type="button" class="tut-cc-btn tut-cc-btn-secondary" data-act="save">' + T.btnSave + '</button>' +
      '<button type="button" class="tut-cc-btn tut-cc-btn-primary" data-act="all">' + T.btnAcceptAll + '</button>' +
      '</div>' +
      '<div class="tut-cc-modal-foot"><a href="' + privacyHref + '">' + T.privacyLink + '</a></div>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelector('.tut-cc-modal-close').addEventListener('click', closeModal);
    modal.querySelector('[data-act="save"]').addEventListener('click', function () {
      var checked = modal.querySelector('#tut-cc-marketing-toggle').checked;
      finish(checked);
    });
    modal.querySelector('[data-act="all"]').addEventListener('click', function () {
      finish(true);
    });

    function onKeydown(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', onKeydown);
      }
    }
    document.addEventListener('keydown', onKeydown);
  }

  function showBanner() {
    banner = document.createElement('div');
    banner.className = 'tut-cc-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', T.bannerTitle);
    banner.innerHTML =
      '<div class="tut-cc-text"><p class="tut-cc-title">' + T.bannerTitle + '</p>' +
      '<p class="tut-cc-body">' + T.bannerBody + '</p>' +
      '<p class="tut-cc-links"><a href="' + privacyHref + '">' + T.privacyLink + '</a>' +
      '<button type="button" data-act="settings">' + T.btnSettings + '</button></p></div>' +
      '<div class="tut-cc-actions">' +
      '<button type="button" class="tut-cc-btn tut-cc-btn-secondary" data-act="necessary">' + T.btnNecessary + '</button>' +
      '<button type="button" class="tut-cc-btn tut-cc-btn-primary" data-act="all">' + T.btnAcceptAll + '</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('[data-act="necessary"]').addEventListener('click', function () {
      finish(false);
    });
    banner.querySelector('[data-act="all"]').addEventListener('click', function () {
      finish(true);
    });
    banner.querySelector('[data-act="settings"]').addEventListener('click', openModal);
  }

  function init() {
    injectStyle();
    var consent = readConsent();
    if (!consent) showBanner();
  }

  window.tutCookieConsent = { openSettings: openModal };

  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
