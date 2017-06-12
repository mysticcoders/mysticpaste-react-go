#!/bin/bash

echo "Installing any dependencies for the project"

yarn

echo "Building the Mystic Paste React app"

yarn run build

cd build && tar cvzf client.tgz .

mv client.tgz $CIRCLE_ARTIFACTS
