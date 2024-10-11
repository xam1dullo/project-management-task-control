FROM node:20.9.0 AS builder

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:20.9-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist

COPY .env ./

EXPOSE 3000

CMD ["node", "./dist/src/main.js"]
