#!/bin/bash

scp $CIRCLE_ARTIFACTS/pasteapi.tgz deploy@$HOST_IP:~
ssh deploy@$HOST_IP bash -c "'
  mv pasteapi.tgz /var/www/vhosts/mysticpaste.com/api &&
  cd /var/www/vhosts/mysticpaste.com/api &&
  sudo service pasteapi stop
  tar xzvf pasteapi.tgz
  sudo service pasteapi start
  rm -rf pasteapi.tgz
'"
