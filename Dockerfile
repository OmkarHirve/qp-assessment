FROM node:21-alpine

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/

RUN npm install --production

COPY . /usr/src/app/

CMD [ "node", "app.js"]

EXPOSE 8121