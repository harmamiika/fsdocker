FROM node:20

WORKDIR /usr/src

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=playground:*

USER node

CMD npm start
