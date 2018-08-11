FROM kkarczmarczyk/node-yarn:latest

WORKDIR /opt/

ADD ./assets/ ./assets/
ADD ./views/ ./views/
ADD ./greetings.json/ ./
ADD ./index.js ./
ADD ./package.json ./
ADD ./yarn.lock ./

ENV NODE_ENV production

RUN yarn install

EXPOSE 3000

ENTRYPOINT [ "node", "/opt/index.js" ]