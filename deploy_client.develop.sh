#!/bin/bash
cp -v -f ./nginx/nginx.dev.conf /etc/nginx/nginx.conf
cp -v -f ./nginx/application.dev.conf /etc/nginx/sites-available/
ln -v -f -s /etc/nginx/sites-available/application.dev.conf /etc/nginx/sites-enabled/
nginx -t
service nginx restart

rm -rf /www/data/*
cp -v -f -r ./build/* /www/data/