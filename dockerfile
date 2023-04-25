FROM node:14

WORKDIR /winamaxTest

COPY ./common ./common
COPY app/package*.json ./

RUN npm install
# COPY ./app ./app

EXPOSE 3000
