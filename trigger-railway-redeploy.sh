#!/bin/bash

# Trigger Railway backend redeploy by making a small change
echo "🔄 Triggering Railway backend redeploy..."

cd /Users/guym/Documents/d/paiting/backend

# Make a trivial change to trigger redeploy
echo "" >> README.md
git add README.md
git commit -m "Trigger backend redeploy to clear category cache"
git push

echo "✅ Push complete! Railway will auto-deploy in ~30 seconds"
echo "Then 'Fairy Tales' will appear in the categories list"



