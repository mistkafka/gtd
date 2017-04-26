FROM node:alpine

RUN mkdir -p /usr/src/app/src
WORKDIR /usr/src/app/src
COPY . /usr/src/app/src
RUN npm install && \
    npm run build && \
    mv dist/* ../ && \
    rm -rf *

WORKDIR /usr/src/app
RUN rm -rf src && \
    cnpm install

EXPOSE 3000
CMD ["npm", "run", "start"]