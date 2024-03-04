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
    echo "found prisma.db"
    migration_needed="$(npx prisma migrate diff --from-schema-datasource prisma/prisma.db --to-migrations migrations)"
    echo "$migration_needed"
    if [ "$migration_needed" = "No difference detected." ]; then
        echo "No migration needed."
    else
        echo "Backing up prisma.db"
        cp "prisma/prisma.db" "prisma/prisma.$(date -u +%Y-%m-%dT%H-%M-%S%Z).db"
        echo "Beginning migration."
        migrate
    fi
else
    echo "prisma.db not found"
    migrate
fi

# Start server
node index.js
