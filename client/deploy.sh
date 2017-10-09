#!/bin/bash

# TODO extract these host IP's into environment variables
scp $CIRCLE_ARTIFACTS/client.tgz deploy@$HOST_IP:~
ssh deploy@$HOST_IP bash -c "'
  cd /var/www/vhosts/mysticpaste.com/httpdocs &&
  tar czvf pastebin.tgz * &&
  mv pastebin.tgz ../archive &&
  rm -rf * &&
  mv ~/client.tgz /var/www/vhosts/mysticpaste.com/httpdocs &&
  tar xzvf client.tgz
  rm -rf client.tgz
'"
