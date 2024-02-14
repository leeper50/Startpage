-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Search" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "searchable" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id", "userId"),
    CONSTRAINT "Search_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Search_key_key" ON "Search"("key");
