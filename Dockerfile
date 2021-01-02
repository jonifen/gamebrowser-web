FROM node AS builder
LABEL maintainer="jonifen (Jon Cain)"

WORKDIR /app
COPY . /app
RUN npm i
RUN npm run build:ci


FROM nginx:alpine
LABEL maintainer="jonifen (Jon Cain)"
COPY --from=builder /app/dist /usr/share/nginx/html
