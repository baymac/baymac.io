#!/bin/bash

# Check if a commit message was provided
if [ -z "$1" ]; then
  echo "Usage: $0 <commit-message>"
  exit 1
fi

COMMIT_MESSAGE="$1"

# Change to the 'content' directory
cd content

# Commit and push changes in the 'content' directory
git add .
git commit -m "$COMMIT_MESSAGE"
git push

# Change back to the parent directory
cd ..

# Commit and push changes in the parent directory
git add .
git commit -m "$COMMIT_MESSAGE"
git push

echo "Changes committed and pushed in both 'content' and parent directory."
