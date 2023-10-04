FROM node:lts-alpine

RUN apk add --no-cache bash

WORKDIR /home/node/app

COPY package*.json /home/node/app/

RUN chown -R node:node /home/node/app

RUN npm install

USER node
