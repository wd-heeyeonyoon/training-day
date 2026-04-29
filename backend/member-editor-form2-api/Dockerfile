FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org
RUN npm install

COPY . .

EXPOSE 3003 
CMD ['npm', 'run', 'dev']