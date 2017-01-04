FROM node:7-alpine

COPY ./ /usr/src/

WORKDIR /usr/src/

RUN npm install --ignore-scripts && ./node_modules/bower/bin/bower install --allow-root --config.interactive=false

EXPOSE 3000

ENTRYPOINT ["node", "/usr/src/app.js"]