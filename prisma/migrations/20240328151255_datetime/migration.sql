/*
  Warnings:

  - You are about to drop the column `date_column` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderDate` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "deliveryAddress" TEXT,
    "deliveryMode" TEXT NOT NULL,
    "paymentToken" TEXT,
    "orderNumber" TEXT NOT NULL,
    "totalAmount" DECIMAL NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "orderDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("deliveryAddress", "deliveryMode", "id", "orderNumber", "paymentToken", "status", "totalAmount", "totalItems", "userId") SELECT "deliveryAddress", "deliveryMode", "id", "orderNumber", "paymentToken", "status", "totalAmount", "totalItems", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
