#!/bin/bash
cd server/libs
wget https://github.com/richzhang/colorization/archive/master.zip
unzip master.zip
mv colorization-master/* .
rm -rf colorization-master master.zip
./models/fetch_release_models.sh
cp -f ../../colorize.py .