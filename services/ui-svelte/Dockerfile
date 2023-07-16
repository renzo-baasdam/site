FROM node:lts-alpine
RUN npm install -g pnpm

WORKDIR /app
COPY . .
RUN pnpm install

CMD ["npm", "run", "dev"]