# development stage
FROM node:18-alpine as base

WORKDIR /usr/src/app

COPY package.json package-lock.json tsconfig.json ecosystem.config.json ./

COPY src ./src

RUN ls -a

RUN npm install -g husky

RUN npm install && npm run compile

# production stage

FROM base as production

WORKDIR /usr/prod/app

ENV NODE_ENV=production

COPY package.json package-lock.json ecosystem.config.json ./

RUN npm install 

COPY --from=base /usr/src/app/dist ./dist
