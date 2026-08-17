#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
NAME="${1:-cv}"

if [[ "$NAME" == "all" ]]; then
  "$0" cv
  "$0" cv-en
  exit 0
fi

if [[ "$NAME" == "cv" ]]; then
  HTML="$ROOT/index.html"
  PDF="$ROOT/cv.pdf"
else
  HTML="$ROOT/${NAME}.html"
  PDF="$ROOT/${NAME}.pdf"
fi

if [[ ! -f "$HTML" ]]; then
  echo "File not found: $HTML" >&2
  exit 1
fi

if [[ ! -x "$CHROME" ]]; then
  echo "Google Chrome not found: $CHROME" >&2
  exit 1
fi

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --no-margins \
  --virtual-time-budget=5000 \
  --print-to-pdf="$PDF" \
  "file://$HTML"

echo "PDF written: $PDF"
