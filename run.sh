#!/usr/bin/env sh

if test -f "prisma/prisma.db"; then
    cp "prisma/prisma.db" "prisma/prisma.$(date -u +%Y-%m-%dT%H:%M:%S%Z).db"
    echo "Backing up prisma.db"
fi

# Build out prisma db
mkdir -p prisma
mv schema.prisma prisma
npx prisma migrate deploy
npx prisma db push
rm prisma/schema.prisma

# Start server
node index.js
