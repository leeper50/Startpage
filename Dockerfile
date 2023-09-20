FROM node:lts as build
WORKDIR /app
COPY package.json .
COPY *config* .
COPY src/ src/
COPY static/ static/
RUN npm install
RUN npm run build

FROM node:lts-alpine as main
WORKDIR /app
COPY package.json .
COPY --from=build /app/build .
ARG search_api_key
ARG rss_api_key
ARG rss_url
ARG redis_host
ARG redis_port
EXPOSE 3000
CMD ["node", "index.js"]
