FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm i

ENV DEBUG=playground:*

USER node

CMD npm start