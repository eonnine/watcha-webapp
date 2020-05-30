FROM nginx:stable-alpine
COPY config/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]