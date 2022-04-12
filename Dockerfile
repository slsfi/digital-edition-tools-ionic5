FROM node:12-alpine AS copiled

RUN apk update
RUN apk add --no-cache g++ gcc libgcc libstdc++ linux-headers make python3

RUN mkdir /app

WORKDIR /app

COPY . /app/

COPY ./src/environments/environment.prod.ts /app/src/environments/environment.ts

RUN npm install
RUN npm i -g @ionic/cli
RUN ionic build --prod
RUN find . -mindepth 1 -not -regex "^\./www.*" -delete

FROM nginx:alpine

ADD nginx.conf /etc/nginx/nginx.conf
ADD gzip.conf /etc/nginx/conf.d/gzip.conf
ADD nginx.default /etc/nginx/conf.d/default.conf

COPY --from=copiled /app/www /var/www/

ENTRYPOINT nginx
