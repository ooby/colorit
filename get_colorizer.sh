#!/bin/bash
cd /opt
wget https://github.com/richzhang/colorization/archive/master.zip
unzip master.zip
mv colorization-master col_distr
rm -rf colorization-master master.zip
cd col_distr
./models/fetch_release_models.sh