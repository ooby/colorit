# [Colorit project](https://colorit.gross-tech.ru/)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## How it works?

Simple Demo web-service powered with [Colorful Image Colorization](http://richzhang.github.io/colorization)

Tested in Ubuntu 16.04, 16.10

## Dependencies

To build and run first install these packages:
1. [Caffe](http://caffe.berkeleyvision.org/), very detailed `how-to` for installing in Ubuntu located [here](https://github.com/BVLC/caffe/wiki/Ubuntu-16.04-or-15.10-Installation-Guide)
2. [node.js](https://nodejs.org/)
3. nginx
```bash
sudo apt-get install nginx
```
4. python-tk
```bash
sudo apt-get install python-tk
```

## Building

1. Download npm packages
```bash
npm install
```
2. Download colorizer. Will be installed in `/opt/col_distr`
```bash
sudo bash get_colorizer.sh
```
3. Frontend building and nginx configs copying. In `nginx/application.conf` SSL certificates location needed
```bash
sudo bash deploy_client.sh
```
To deploy for development purposes:
```bash
sudo bash deploy_client.develop.sh
```
4. Start service
```bash
npm start
```
