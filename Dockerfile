FROM node:lts-slim

# ENV ENV=${ENV}
# ENV PORT=${PORT}
# ENV DB_URL=${DB_URL}

# RUN apt-get update && apt-get install --no-install-recommends --yes openssl

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

RUN echo "ayn"

CMD [ "yarn", "dev" ]
