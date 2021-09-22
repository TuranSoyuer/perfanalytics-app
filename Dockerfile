# Stage 1
FROM node:14-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV GENERATE_SOURCEMAP=false
RUN npm run build --prod

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/perfanalytics-app /usr/share/nginx/html
