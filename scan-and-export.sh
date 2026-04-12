#!/usr/bin/env bash

set -e

# -----------------------------
# CONFIG
# -----------------------------

ROCKSMITH_PATH="$1"
OUTPUT_FILE="./output/rocksmith-library.catalog.json"
TARGET_PUBLIC_DIR="../rocksmith-viewer/public"
TARGET_FILE_NAME="catalog.json"

# -----------------------------
# CHECKS
# -----------------------------

if [ -z "$ROCKSMITH_PATH" ]; then
  echo "❌ Missing Rocksmith path"
  echo "Usage: ./scan-and-export.sh \"/path/to/Rocksmith2014\""
  exit 1
fi

if [ ! -d "$ROCKSMITH_PATH" ]; then
  echo "❌ Rocksmith folder not found: $ROCKSMITH_PATH"
  exit 1
fi

# -----------------------------
# RUN SCAN
# -----------------------------

echo "🚀 Scanning Rocksmith library..."
node scan-rocksmith-library.js "$ROCKSMITH_PATH" --output "$OUTPUT_FILE"

# -----------------------------
# COPY RESULT
# -----------------------------

if [ ! -f "$OUTPUT_FILE" ]; then
  echo "❌ Output file not found: $OUTPUT_FILE"
  exit 1
fi

mkdir -p "$TARGET_PUBLIC_DIR"

echo "📦 Copying catalog to frontend..."
cp "$OUTPUT_FILE" "$TARGET_PUBLIC_DIR/$TARGET_FILE_NAME"

echo "✅ Done!"
echo "👉 Catalog available at: $TARGET_PUBLIC_DIR/$TARGET_FILE_NAME"