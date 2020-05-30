# builder image
# FROM node:10.20.1 as builder

# 작업 폴더를 만들고 npm 설치
# WORKDIR /usr/src/app
# COPY package.json /usr/src/app/package.json
# COPY yarn.lock /usr/src/app/yarn.lock

# RUN yarn install

# 소스를 작업폴더로 복사하고 빌드
# COPY . /usr/src/app
# RUN yarn build

FROM nginx:stable-alpine
# 앱에서 설정한 nginx 설정 파일을 복사
COPY config/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

# 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY build /usr/share/nginx/html


# 80포트 오픈하고 nginx 실행
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]