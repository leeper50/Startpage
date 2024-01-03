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
RUN npm i --omit dev
ARG search_api_key
ARG rss_api_key
ARG rss_url
ARG redis_host
ARG redis_port
ARG redis_pass
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG POSTGRES_DB
ARG POSTGRES_USER
ARG POSTGRES_PASS
EXPOSE 3000
CMD ["node", "index.js"]
