-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL DEFAULT '',
    "pageData" TEXT NOT NULL DEFAULT '',
    "fancy" BOOLEAN NOT NULL DEFAULT true,
    "rssVisibility" BOOLEAN NOT NULL DEFAULT false,
    "rssUrl" TEXT NOT NULL DEFAULT '',
    "rssApiKey" TEXT NOT NULL DEFAULT '',
    "backgroundVisibility" BOOLEAN NOT NULL DEFAULT true,
    "backgroundUrl" TEXT NOT NULL DEFAULT '',
    "backgroundColor" TEXT NOT NULL DEFAULT '#081118',
    "searchEngine" TEXT NOT NULL DEFAULT 'Duckduckgo'
);
INSERT INTO "new_User" ("backgroundColor", "backgroundUrl", "backgroundVisibility", "createdAt", "fancy", "id", "isAdmin", "name", "pageData", "password", "rssApiKey", "rssUrl", "rssVisibility", "updatedAt") SELECT "backgroundColor", "backgroundUrl", "backgroundVisibility", "createdAt", "fancy", "id", "isAdmin", "name", "pageData", "password", "rssApiKey", "rssUrl", "rssVisibility", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
