FROM node:18.7.0-buster-slim
#FROM node:16.19.0-buster-slim

WORKDIR /app
COPY package*.json ./
USER root

# A minimal Docker image with Node and Puppeteer
#
# Initially based upon:
# https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker

RUN npm cache clean --force
RUN npm install
COPY . .

RUN chgrp -R 0 /app && \
    chmod -R g=u /app

EXPOSE 8686
CMD [ "npm", "start"]