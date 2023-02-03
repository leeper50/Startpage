FROM node:19.1 as build
WORKDIR /app
COPY package.json .
COPY *config* .
COPY src/ src/
COPY static/ static/
RUN npm install
RUN npm run build

FROM node:19.1-alpine as main
WORKDIR /app
COPY package.json .
COPY --from=build /app/build .
ARG api_key
EXPOSE 3000
CMD ["node", "index.js"]
