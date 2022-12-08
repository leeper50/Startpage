FROM node:19.1 as build
WORKDIR /app
COPY package.json .
COPY *config* .
COPY src/ src/
COPY static/ static/
RUN yarn install
RUN yarn build

FROM node:19.1-alpine as main
WORKDIR /app
COPY --from=build /app/build .
EXPOSE 3000
CMD ["node", "index.js"]
