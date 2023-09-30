FROM node:lts-alpine

WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install

CMD ["npm", "run", "dev"]