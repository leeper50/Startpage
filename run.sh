#!/usr/bin/env sh

# Build out prisma db
mkdir -p prisma
mv schema.prisma prisma
npx prisma db push --force-reset
rm prisma/schema.prisma

# Start server
node index.js
