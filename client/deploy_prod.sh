#!/bin/bash

# TODO figure out why it is timing out
# scp $CIRCLE_ARTIFACTS/client.tgz deploy@50.116.29.145:~
# ssh deploy@173.255.217.67 bash -c "'
#   cd /var/www/vhosts/scholarbee.net/httpdocs/spelling &&
#   tar czvf spelling.tgz * &&
#   mv spelling.tgz ../../archive &&
#   rm -rf * &&
#   mv ~/client.tgz /var/www/vhosts/scholarbee.net/httpdocs/spelling &&
#   tar xzvf client.tgz
# '"
