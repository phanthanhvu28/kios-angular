# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18.12-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=docker
RUN npm run build --
#RUN npm run build -- --output-path=./dist/out

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.23
#Copy ci-dashboard-dist
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
#Copy default nginx configuration
# COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf