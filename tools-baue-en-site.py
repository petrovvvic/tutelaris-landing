#!/usr/bin/env python3
"""Build the English deployment in a new or empty directory; never erase a checkout."""
from pathlib import Path
import argparse
import shutil

SOURCE = Path(__file__).resolve().parent
SHARED = ('styles-tailwind.css', 'site-refinements.css', 'analytics.js', 'cookie-consent.js',
          'tutelaris-logo.svg', 'tutelaris-logo-black.png', 'favicon.ico', 'favicon.svg',
          'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'og-image.png', 'script.js')

def build(destination):
    destination = Path(destination).resolve()
    if destination == SOURCE or SOURCE in destination.parents:
        raise SystemExit('Choose an output directory outside the source checkout.')
    if destination.exists() and any(destination.iterdir()):
        raise SystemExit('Output directory must be empty; existing files are never deleted.')
    for name in SHARED:
        if not (SOURCE / name).is_file():
            raise SystemExit(f'Missing shared asset: {name}')
    destination.mkdir(parents=True, exist_ok=True)
    shutil.copytree(SOURCE / 'en', destination, dirs_exist_ok=True)
    for name in SHARED:
        shutil.copy2(SOURCE / name, destination / name)
    shutil.copytree(SOURCE / 'assets/fonts', destination / 'assets/fonts', dirs_exist_ok=True)
    print(f'English site built in {destination}')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('destination')
    build(parser.parse_args().destination)
