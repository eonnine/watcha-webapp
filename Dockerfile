# builder image
FROM node:10.20.1 as builder
WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN npm install
# COPY . .
# RUN npm run build
CMD ["npm", "start"]

# runner image
# FROM nginx:stable-alpine
# COPY --from=builder /app/config/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
# COPY --from=builder /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]