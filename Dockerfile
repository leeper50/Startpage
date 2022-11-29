FROM node:latest as build
WORKDIR /app
COPY package.json .
COPY *config* .
COPY src/ src/
COPY static/ static/
RUN yarn install
RUN yarn build

FROM node:alpine as main
COPY --from=build /app /
EXPOSE 3000
CMD ["node", "build/index.js"]
