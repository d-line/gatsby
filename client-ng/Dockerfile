# stage 1
FROM node:18-alpine as base

WORKDIR /usr/src/app

COPY . .

RUN npm install 

RUN npm run build --prod

# stage 2

FROM nginx:alpine

COPY --from=base /usr/src/app/dist/toro /usr/share/nginx/html

