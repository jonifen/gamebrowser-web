FROM node AS packages
LABEL maintainer="jonifen (Jon Cain)"

WORKDIR /app
COPY ./package.json /app
RUN npm i

FROM packages AS builder
COPY . /app
RUN npm run build:ci


FROM nginx:alpine
LABEL maintainer="jonifen (Jon Cain)"
COPY --from=builder /app/dist /usr/share/nginx/html
