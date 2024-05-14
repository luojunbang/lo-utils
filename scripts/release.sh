#!/bin/sh
set -e

if [ -z "$PACKAGE_NAME" ]; then
    PACKAGE_NAME="utils"
fi

echo "Token: $GITHUB_REPOSITORY"

echo "\n Current release package is $PACKAGE_NAME \n"

git fetch --tags

last_version=$(git tag -l "$PACKAGE_NAME/*" | sort -rV | head -n 1)

major_minor_version=${last_version%.*}
revision_number=${last_version##*.}

new_revision_number=$((revision_number + 1))

next_version="${major_minor_version}.${new_revision_number}"

echo "\n Generate next version $next_version \n"

git tag "$next_version"

git push origin "$next_version"
