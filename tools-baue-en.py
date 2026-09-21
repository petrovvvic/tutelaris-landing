#!/usr/bin/env python3
"""Erzeugt aus den deutschen Seiten statische englische Seiten unter en/."""
import re, json, os, glob, html

WT = '/private/tmp/claude-501/-Users-andreipiatrouski-Documents-Projects-Ventures-tutelaris-landingpage/890259db-6b5a-4fe2-92c9-0967502007f0/scratchpad/landing-new'
DE_BASIS = 'https://tutelaris.de'
EN_BASIS = 'https://tutelarisapp.com'

# Englische Seitenbeschreibungen (die Meta-Angaben tragen keine Schlüssel)
BESCHREIBUNG = {
 'index.html': 'Report near misses in under two minutes, spoken and anonymous, without a form. tutelaris turns reports into patterns and documented measures, first-aid log included.',
 'preise.html': 'The tutelaris pilot programme: three months free for five sites. No contract, no price list, just your feedback.',
 'ueber-uns.html': 'Who is behind tutelaris: our stance, our six principles and the team building it.',
 'logistik.html': 'Near misses in logistics: report from the loading gate or the driver’s cab via QR code, without signing in.',
 'produktion.html': 'Near misses in manufacturing: report at the machine in your own words, anonymously, and see what came of it.',
 'baugewerbe.html': 'Near misses in construction: one QR code per site, reporting without an account, analysis across all sites.',
 'sicherheit.html': 'How tutelaris protects your data: access control, encryption and where processing happens.',
 'iso-45001.html': 'ISO 45001: what the standard requires and which building blocks tutelaris covers digitally.',
 'arbeitsschutzgesetz.html': 'The German Occupational Safety Act: the key employer duties and how tutelaris supports them.',
 'dguv-vorschriften.html': 'DGUV rules 1 and 2: first-aid documentation, safety specialists and reportable accidents.',
 'ehs-leitfaeden.html': 'Active prevention culture: how reports turn into a culture where speaking up is a matter of course.',
 'checklisten-vorlagen.html': 'Checklists and templates for workplace safety, available to download shortly.',
}

# Rechtstexte bleiben deutsch und liegen weiter auf tutelaris.de
NUR_DEUTSCH = {'impressum.html', 'datenschutz.html', 'agb.html'}

UMSCHALTER_EN_DESKTOP = '''<div class="hidden sm:block">
      <a class="flex items-center gap-1 text-[14px] font-medium text-slate-700 hover:text-slate-900" href="{de_url}" hreflang="de" title="Auf Deutsch lesen">EN <span class="material-symbols-outlined text-[18px] text-slate-400">translate</span></a>
    </div>
    '''
UMSCHALTER_EN_MOBIL = '''<div class="flex items-center justify-between px-2 py-2.5">
        <span class="text-[14px] font-medium text-slate-700">Language</span>
        <a class="px-3 py-1.5 rounded-full text-[13px] font-semibold text-slate-700 bg-slate-100" href="{de_url}" hreflang="de">Deutsch</a>
      </div>
      '''
UMSCHALTER_DE_DESKTOP = '''<div class="hidden sm:block">
      <a class="flex items-center gap-1 text-[14px] font-medium text-slate-700 hover:text-slate-900" href="{en_url}" hreflang="en" title="Read in English">DE <span class="material-symbols-outlined text-[18px] text-slate-400">translate</span></a>
    </div>
    '''
UMSCHALTER_DE_MOBIL = '''<div class="flex items-center justify-between px-2 py-2.5">
        <span class="text-[14px] font-medium text-slate-700">Sprache</span>
        <a class="px-3 py-1.5 rounded-full text-[13px] font-semibold text-slate-700 bg-slate-100" href="{en_url}" hreflang="en">English</a>
      </div>
      '''


def tabelle(s):
    m = re.search(r'var translations = (\{.*?\});\n', s, re.S)
    return json.loads(m.group(1)) if m else None


def uebersetze(s, d):
    """Ersetzt Inhalte, Platzhalter und Beschriftungen durch die englische Fassung.
    Verschachtelte Elemente werden über eine Tiefenzählung korrekt umschlossen."""
    ergebnis, pos = [], 0
    muster = re.compile(r'<(\w+)([^>]*\bdata-i18n="([^"]+)"[^>]*)>')
    while True:
        m = muster.search(s, pos)
        if not m: break
        tag, attrs, key = m.group(1), m.group(2), m.group(3)
        # passendes schließendes Tag über Tiefenzählung finden
        tiefe, i = 1, m.end()
        paar = re.compile(rf'<{tag}\b[^>]*>|</{tag}>')
        while tiefe and i < len(s):
            t = paar.search(s, i)
            if not t: break
            tiefe += -1 if t.group(0).startswith('</') else 1
            i = t.end()
            if tiefe == 0:
                schluss_start = t.start()
        if tiefe: break
        en = d.get(key, {}).get('en')
        ergebnis.append(s[pos:m.start()])
        if en is None:
            ergebnis.append(s[m.start():i])
        else:
            ergebnis.append(f'<{tag}{attrs}>{en}</{tag}>')
        pos = i
    ergebnis.append(s[pos:])
    s = ''.join(ergebnis)

    def attribut(name):
        def f(m):
            ganzes, key = m.group(0), m.group(1)
            en = d.get(key, {}).get('en')
            if en is None: return ganzes
            return re.sub(rf'{name}="[^"]*"', f'{name}="{html.escape(en, quote=True)}"', ganzes)
        return f

    s = re.sub(r'<[^>]*data-i18n-placeholder="([^"]+)"[^>]*>', attribut('placeholder'), s)
    s = re.sub(r'<[^>]*data-i18n-aria-label="([^"]+)"[^>]*>', attribut('aria-label'), s)
    return s


def entferne_i18n_technik(s):
    """Nimmt Tabelle, Umschaltlogik und die data-i18n-Marker heraus."""
    s = re.sub(r'\n  // Language selector \(DE/EN\)\n  var translations = \{.*?\};\n', '\n', s, flags=re.S)
    s = re.sub(r'\n  function applyLanguage\(lang\) \{.*?if \(initialLang === \'en\'\) applyLanguage\(\'en\'\);\n', '\n', s, flags=re.S)
    s = re.sub(r' data-i18n(?:-placeholder|-aria-label)?="[^"]*"', '', s)
    return s


def umschalter_tauschen(s, vorlage_desktop, vorlage_mobil, ziel_url):
    i = s.find('<div class="relative nav-dropdown hidden sm:block">')
    if i >= 0:
        j = s.index('</div>', s.index('data-lang="EN"', i))
        j = s.index('</div>', j + 6) + 6
        s = s[:i] + vorlage_desktop.format(de_url=ziel_url, en_url=ziel_url) + s[j:]
    k = s.find('<div class="flex items-center justify-between px-2 py-2.5">')
    if k >= 0 and 'data-lang="EN"' in s[k:k+700]:
        m = s.index('</div>', s.index('data-lang="EN"', k))
        m = s.index('</div>', m + 6) + 6
        s = s[:k] + vorlage_mobil.format(de_url=ziel_url, en_url=ziel_url) + s[m:]
    return s


def hreflang_block(datei):
    de = f'{DE_BASIS}/' + ('' if datei == 'index.html' else datei)
    en = f'{EN_BASIS}/' + ('' if datei == 'index.html' else datei)
    return (f'<link rel="alternate" hreflang="de" href="{de}">'
            f'<link rel="alternate" hreflang="en" href="{en}">'
            f'<link rel="alternate" hreflang="x-default" href="{de}">')


os.makedirs(f'{WT}/en', exist_ok=True)
gebaut = []

for pfad in sorted(glob.glob(f'{WT}/*.html')):
    datei = os.path.basename(pfad)
    if datei == 'TESTCHECKLISTE.md': continue
    s = open(pfad).read()
    d = tabelle(s)

    # ── englische Fassung ───────────────────────────────────
    if d and datei not in NUR_DEUTSCH:
        en_seite = uebersetze(s, d)
        en_seite = entferne_i18n_technik(en_seite)
        en_seite = en_seite.replace('<html lang="de">', '<html lang="en">')
        en_url_de = f'{DE_BASIS}/' + ('' if datei == 'index.html' else datei)
        en_seite = umschalter_tauschen(en_seite, UMSCHALTER_EN_DESKTOP, UMSCHALTER_EN_MOBIL, en_url_de)
        # Metaangaben
        besch = BESCHREIBUNG.get(datei)
        if besch:
            for feld in [r'(<meta name="description" content=")[^"]*',
                         r'(<meta property="og:description" content=")[^"]*',
                         r'(<meta name="twitter:description" content=")[^"]*']:
                en_seite = re.sub(feld, lambda m: m.group(1) + besch, en_seite)
        titel = d.get('meta.title', {}).get('en')
        if titel:
            for feld in [r'(<meta property="og:title" content=")[^"]*', r'(<meta name="twitter:title" content=")[^"]*']:
                en_seite = re.sub(feld, lambda m: m.group(1) + html.unescape(titel), en_seite)
        en_seite = re.sub(r'<link rel="canonical" href="[^"]*">',
                          f'<link rel="canonical" href="{EN_BASIS}/' + ('' if datei == 'index.html' else datei) + '">'
                          + hreflang_block(datei), en_seite)
        # Rechtstexte bleiben auf der deutschen Domain
        for rechtstext in NUR_DEUTSCH:
            en_seite = en_seite.replace(f'href="{rechtstext}"', f'href="{DE_BASIS}/{rechtstext}"')
        en_seite = en_seite.replace('href="/favicon', f'href="{EN_BASIS}/favicon').replace('href="/apple-touch-icon', f'href="{EN_BASIS}/apple-touch-icon')
        open(f'{WT}/en/{datei}', 'w').write(en_seite)
        gebaut.append(datei)

    # ── deutsche Seite: Umschalter wird zum Link ────────────
    if d:
        s = entferne_i18n_technik(s)
        ziel = f'{EN_BASIS}/' + ('' if datei == 'index.html' else datei)
        s = umschalter_tauschen(s, UMSCHALTER_DE_DESKTOP, UMSCHALTER_DE_MOBIL, ziel)
        s = re.sub(r'<link rel="canonical" href="([^"]*)">', lambda m: f'<link rel="canonical" href="{m.group(1)}">' + hreflang_block(datei), s)
        open(pfad, 'w').write(s)

print('englische Seiten gebaut:', len(gebaut))
for g in gebaut: print('  en/' + g)
