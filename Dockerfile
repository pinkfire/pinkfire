FROM node:latest

COPY ./ /usr/src/

WORKDIR /usr/src/

RUN ls -l

RUN npm install --ignore-scripts && ./node_modules/bower/bin/bower install --allow-root --config.interactive=false

EXPOSE 3000

ENTRYPOINT ["node", "/usr/src/app.js"]