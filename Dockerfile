FROM node:12-alpine

RUN apk update
RUN apk add --no-cache g++ gcc libgcc libstdc++ linux-headers make python3

RUN mkdir /app

WORKDIR /app

COPY . /app/

RUN npm install
RUN npm i -g @ionic/cli
RUN ionic build --prod
