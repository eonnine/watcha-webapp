# builder image
FROM node:10.20.1 as builder
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# runner image
FROM nginx:stable-alpine
COPY --from=builder /app/config/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
