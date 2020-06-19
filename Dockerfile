FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY public ./
COPY src ./
COPY tsconfig.json ./
COPY webpack.common.ts ./
COPY webpack.dev.ts ./

CMD ["npm", "start"]
