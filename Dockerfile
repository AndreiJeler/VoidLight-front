### STAGE 1: Build ###
FROM node:12.7-alpine AS build-env
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-env /usr/src/app/dist/web-app /usr/share/nginx/html
EXPOSE 80
