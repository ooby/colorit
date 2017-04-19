# [Проект КОЛОРИТ](https://colorit.gross-tech.ru/)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Что это и как работает?

Простой веб-сервис для колоризации черно-белых фотографий на основе алгоритмов нейронной сети [Colorful Image Colorizarion](http://richzhang.github.io/colorization)
Протестировано на Ubuntu 16.04, 16.10

## Зависимости

Чтобы собрать и запустить надо установить и настроить следующие пакеты:
1. [Caffe](http://caffe.berkeleyvision.org/), есть очень подробная пошаговая инструкция по установке на Ubuntu [здесь](https://github.com/BVLC/caffe/wiki/Ubuntu-16.04-or-15.10-Installation-Guide)
2. [node.js](https://nodejs.org/)
3. nginx
```bash
sudo apt-get install nginx
```
4. [mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-ubuntu/)
5. python-tk
```bash
sudo apt-get install python-tk
```

## Сборка

1. Скачивание и установка компонентов веб-сервиса
```bash
npm install
```
2. Создать файл конфигурации `server/config/config.json`
```json
{
  "mongoose": {
    "uri": "mongodb://localhost:27017/colorit",
    "options": {
      "server": {
        "socketOptions": {
          "keepAlive": 1
        }
      }
    }
  },
  "delay": 600
}
```
3. Скачивание и установка колоризатора. Будет установлен в `/opt/col_distr`
```bash
sudo bash get_colorizer.sh
```
4. Сборка файлов фронтенда и копирование конфигурации nginx. В файле `nginx/application.conf` необходимо указать верное расположение сертификатов SSL
```bash
sudo bash deploy_client.sh
```
Чтобы собрать и запустить для разработки и отладки:
```bash
sudo bash deploy_client.develop.sh
```
5. Запуск сервиса
```bash
npm start
```
