#!/bin/bash

# TODO figure out why it is timing out

scp $CIRCLE_ARTIFACTS/pasteapi.tgz deploy@50.116.29.145:~
ssh deploy@50.116.29.145 bash -c "'
  mv pasteapi.tgz /var/www/vhosts/mysticpaste.com/api &&
  cd /var/www/vhosts/mysticpaste.com/api &&
  sudo service pasteapi stop
  tar xzvf pasteapi.tgz
  sudo service pasteapi start
  rm -rf pasteapi.tgz
'"
