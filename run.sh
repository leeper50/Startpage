#!/usr/bin/env sh
# Build out prisma db
set -e
mkdir -p prisma
cp schema.prisma prisma
cd prisma
npm run prisma
rm schema.prisma
cd /app
# Start server
node index.js
