# builder image
FROM node:10.20.1 as builder

# 작업 폴더를 만들고 package 설치
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN yarn install

# 소스 빌드
COPY . .
RUN yarn build

FROM nginx:stable-alpine

# 설정한 nginx 파일을 복사
COPY --from=builder /usr/src/app/config/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
# 위에서 생성한 빌드 결과물을 nginx의 폴더로 이동
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# 3000포트 오픈하고 nginx 실행
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]