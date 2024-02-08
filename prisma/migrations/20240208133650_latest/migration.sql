/*
  Warnings:

  - You are about to drop the `UserOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToUserOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserOrder";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProductToUserOrder";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_ProductUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductUser_AB_unique" ON "_ProductUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductUser_B_index" ON "_ProductUser"("B");
