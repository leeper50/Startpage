#!/usr/bin/env sh

# move files for prisma workflow
mkdir -p prisma
mv schema.prisma prisma
mv migrations prisma

if test -f "prisma/prisma.db"; then
    echo "Found prisma.db"
    migration_needed="$(npx prisma migrate diff \
        --from-url 'file:./prisma/prisma.db' \
        --to-migrations prisma/migrations)"
    if [ "$migration_needed" = "No difference detected." ]; then
        echo "No migration needed"
    else
        echo "Changes detected in database schema"
        echo "Backing up prisma.db"
        cp "prisma/prisma.db" "prisma/prisma.$(date -u +%Y-%m-%dT%H-%M-%S%Z).db"
        echo "Beginning migration"
        npx prisma migrate deploy
    fi
else
    echo "Generating prisma.db"
fi
npx prisma db push

# return files to container
mv prisma/schema.prisma .
mv prisma/migrations .

# Start server
node index.js
