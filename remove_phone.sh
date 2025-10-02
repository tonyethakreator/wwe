#!/bin/bash

# Find all HTML files in the pages directory
for file in pages/*.html; do
  # Replace the phone number line with an empty string
  sed -i 's/<li><i class="fas fa-phone"><\/i> (123) 456-7890<\/li>//g' "$file"
done

echo "Phone numbers removed from all HTML files in pages directory."