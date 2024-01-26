#!/usr/bin/env sh
# Build out prisma db
mkdir -p prisma &&\
mv schema.prisma prisma &&\
cd prisma &&\
npm run prisma
rm schema.prisma &&\
cd /app &&\
# Start server
node index.js
