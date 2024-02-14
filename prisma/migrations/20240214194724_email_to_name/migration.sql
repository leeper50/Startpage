/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
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
    "backgroundColor" TEXT NOT NULL DEFAULT '#081118'
);
INSERT INTO "new_User" ("backgroundColor", "backgroundUrl", "backgroundVisibility", "createdAt", "fancy", "id", "isAdmin", "pageData", "password", "rssApiKey", "rssUrl", "rssVisibility", "updatedAt") SELECT "backgroundColor", "backgroundUrl", "backgroundVisibility", "createdAt", "fancy", "id", "isAdmin", "pageData", "password", "rssApiKey", "rssUrl", "rssVisibility", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
