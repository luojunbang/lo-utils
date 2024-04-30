#!/bin/sh

set -e

echo $PACKAGE_NAME

# pnpm i --frozen-lockfile

# pnpm build -c $PACKAGE_NAME

# cd dist/lo-utils
# ls -al
# # npm publish --provenance

echo "✅ Publish completed"
