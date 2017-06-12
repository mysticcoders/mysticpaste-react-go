#!/bin/bash

scp $CIRCLE_ARTIFACTS/client.tgz deploy@173.255.217.67:~
# ssh deploy@173.255.217.67 bash -c "'
#   cd /var/www/vhosts/scholarbee.net/httpdocs/spelling &&
#   tar czvf spelling.tgz * &&
#   mv spelling.tgz ../../archive &&
#   rm -rf * &&
#   mv ~/client.tgz /var/www/vhosts/scholarbee.net/httpdocs/spelling &&
#   tar xzvf client.tgz
# '"
