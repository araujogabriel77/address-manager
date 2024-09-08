FROM node:20.15.1-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm update -g npm

RUN npm ci --no-audit --maxsockets 1

RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run migration:run && cd dist && node main.js"]
