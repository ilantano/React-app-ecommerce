# build environment
FROM node:12-alpine as build
WORKDIR /
COPY . .
RUN yarn
RUN yarn build:testing

# production environment
FROM nginx:stable-alpine
COPY --from=build build /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
