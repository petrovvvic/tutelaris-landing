#!/usr/bin/env python3
"""Stellt den Inhalt für das englische Repository zusammen (tutelarisapp.com).

Aufruf:  python3 baue_en_site.py <zielordner>
Der Zielordner wird geleert und neu gefüllt: englische Seiten im Wurzelverzeichnis
plus alle gemeinsam genutzten Dateien.
"""
import os, shutil, sys, glob

QUELLE = '/private/tmp/claude-501/-Users-andreipiatrouski-Documents-Projects-Ventures-tutelaris-landingpage/890259db-6b5a-4fe2-92c9-0967502007f0/scratchpad/landing-new'

# Dateien, die beide Sprachfassungen brauchen
GEMEINSAM = [
    'styles-tailwind.css', 'tailwind-input.css', 'tailwind.config.js',
    'tutelaris-logo.svg', 'tutelaris-logo-black.png',
    'favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png',
    'og-image.png', 'gefahrenmeldung-foto.jpg',
    'andrei-piatrouski.jpg', 'yehor-prokhorenko.jpg', 'bryan-stoltzenburg.jpg',
    'script.js',
]
ORDNER = ['fonts']


def baue(ziel):
    if os.path.exists(ziel):
        for eintrag in os.listdir(ziel):
            if eintrag == '.git':
                continue
            pfad = os.path.join(ziel, eintrag)
            shutil.rmtree(pfad) if os.path.isdir(pfad) else os.remove(pfad)
    os.makedirs(ziel, exist_ok=True)

    seiten = 0
    for pfad in sorted(glob.glob(f'{QUELLE}/en/*')):
        shutil.copy2(pfad, os.path.join(ziel, os.path.basename(pfad)))
        seiten += 1

    kopiert, fehlt = 0, []
    for datei in GEMEINSAM:
        quelle = os.path.join(QUELLE, datei)
        if os.path.exists(quelle):
            shutil.copy2(quelle, os.path.join(ziel, datei)); kopiert += 1
        else:
            fehlt.append(datei)
    for ordner in ORDNER:
        quelle = os.path.join(QUELLE, ordner)
        if os.path.isdir(quelle):
            shutil.copytree(quelle, os.path.join(ziel, ordner)); kopiert += 1

    print(f'Seiten und Metadateien: {seiten}')
    print(f'gemeinsame Dateien:     {kopiert}')
    if fehlt:
        print('nicht gefunden:', fehlt)
    print(f'\nFertig in: {ziel}')
    print('Darin liegen CNAME (tutelarisapp.com), robots.txt und sitemap.xml bereits richtig.')


if __name__ == '__main__':
    baue(sys.argv[1] if len(sys.argv) > 1 else '/tmp/tutelaris-en')
