FROM node:lts-alpine AS build
RUN npm install -g pnpm

WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install
COPY . .
RUN pnpm run build
RUN pnpm prune --prod

FROM node:lts-alpine AS production
WORKDIR /app
COPY --from=build /app/build ./build/
COPY --from=build /app/node_modules ./node_modules
COPY package.json .

EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production
CMD [ "node", "build" ]