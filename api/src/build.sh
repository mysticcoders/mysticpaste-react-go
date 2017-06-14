#!/bin/bash
#
# echo "Installing any dependencies for the project"
#
# yarn

echo "Building the Mystic Paste Go app"

cd pasteapi

go build

chmod a+x pasteapi

mv pasteapi $CIRCLE_ARTIFACTS
