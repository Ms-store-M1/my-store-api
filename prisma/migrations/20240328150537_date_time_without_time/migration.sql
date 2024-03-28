/*
  Warnings:

  - You are about to drop the column `orderDate` on the `Order` table. All the data in the column will be lost.

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
    "date_column" DATETIME NOT NULL DEFAULT CURRENT_DATE,
    "status" TEXT NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("deliveryAddress", "deliveryMode", "id", "orderNumber", "paymentToken", "status", "totalAmount", "totalItems", "userId") SELECT "deliveryAddress", "deliveryMode", "id", "orderNumber", "paymentToken", "status", "totalAmount", "totalItems", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
