FROM node:20.10.0

COPY package*.json /app/
COPY . /app/

WORKDIR /app

RUN npm install

RUN npm run build
CMD ["npm", "run", "start"]
