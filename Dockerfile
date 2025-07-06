FROM php:8.2-apache

COPY . /var/www/html/

RUN apt-get update && apt-get install -y libsqlite3-dev \
    && docker-php-ext-install pdo_sqlite

EXPOSE 80
