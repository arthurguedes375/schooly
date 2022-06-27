FROM node:16.13.1-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

EXPOSE 3333

ENTRYPOINT [ "yarn" ]
CMD ["start"]