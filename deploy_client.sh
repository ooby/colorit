#!/bin/bash
cp -v -f ./nginx/nginx.conf /etc/nginx/
cp -v -f ./nginx/application.conf /etc/nginx/sites-available/
ln -v -f -s /etc/nginx/sites-available/application.conf /etc/nginx/sites-enabled/
nginx -t
service nginx restart

rm -rf /www/data/*
cp -v -f -r ./build/* /www/data/