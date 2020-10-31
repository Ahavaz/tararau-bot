FROM node:10.4.0-slim

ENV ENV=${ENV}
ENV PORT=${PORT}
ENV MONGO_URL=${MONGO_URL}

WORKDIR /usr/src/tararau_api

COPY package.json ./

RUN npm install --production

COPY . .

EXPOSE 8080

RUN echo "ayn"

CMD [ "npm", "start" ] 