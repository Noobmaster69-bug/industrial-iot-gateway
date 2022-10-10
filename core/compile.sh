#!/bin/bash
ARCH=$(cat package.json | grep -A 3 "targets" | grep node | cut -d '-' -f 3| cut -d '"' -f1)
echo $ARCH
if [ $ARCH = "armv7" ] ;
then   
    echo true
    npm run setup_armhf ;
else
    npm run setup ;
fi
pkg . --no-bytecode --public-packages "*" --public 