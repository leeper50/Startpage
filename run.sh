#!/usr/bin/env sh

# apply migrations or build out db
function migrate() {
    mkdir -p prisma
    mv schema.prisma prisma
    mv migrations prisma
    npx prisma migrate deploy
    npx prisma db push
    mv prisma/schema.prisma .
    mv prisma/migrations .
}

if test -f "prisma/prisma.db"; then
    echo "Found prisma.db"
    migration_needed="$(npx prisma migrate diff --from-url 'file:./prisma/prisma.db' --to-migrations migrations)"
    if [ "$migration_needed" = "No difference detected." ]; then
        echo "No migration needed"
    else
        echo "Changes detected in database schema"
        echo "Backing up prisma.db"
        cp "prisma/prisma.db" "prisma/prisma.$(date -u +%Y-%m-%dT%H-%M-%S%Z).db"
        echo "Beginning migration"
        migrate
    fi
else
    echo "Generating prisma.db"
    migrate
fi

# Start server
node index.js
