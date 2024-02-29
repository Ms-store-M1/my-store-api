/*
  Warnings:

  - You are about to drop the column `adress` on the `User` table. All the data in the column will be lost.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isadmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("city", "firstname", "id", "isadmin", "lastname", "mail", "password", "phone", "zipcode") SELECT "city", "firstname", "id", "isadmin", "lastname", "mail", "password", "phone", "zipcode" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_mail_key" ON "User"("mail");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
