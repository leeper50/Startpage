FROM node:lts as build
WORKDIR /app
COPY package.json .
COPY *config* .
COPY prisma/ prisma/
COPY src/ src/
COPY static/ static/
RUN npm install
RUN npx prisma generate
RUN npx prisma db push
RUN npm run build

FROM node:lts-alpine as main
WORKDIR /app
COPY package.json .
COPY --from=build /app/build .
COPY --from=build /app/prisma prisma
RUN npm i --omit dev
RUN rm prisma/schema.prisma
ARG JWT_ACCESS_SECRET
EXPOSE 3000
CMD ["node", "index.js"]
