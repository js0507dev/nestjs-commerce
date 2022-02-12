FROM node:16
COPY package.json .
COPY yarn.lock .
COPY . /nestjs-commerce
WORKDIR /nestjs-commerce
CMD yarn
CMD yarn build
CMD yarn start
