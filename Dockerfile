FROM node:16-alpine
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build:prod

FROM nginx:1.22.1-alpine
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY doc/nginx.conf /etc/nginx/nginx.conf
