FROM node:9-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm start