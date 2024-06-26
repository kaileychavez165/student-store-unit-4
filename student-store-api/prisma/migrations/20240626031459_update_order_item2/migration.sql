/*
  Warnings:

  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
CREATE SEQUENCE orderitem_order_item_id_seq;
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_pkey",
ALTER COLUMN "order_item_id" SET DEFAULT nextval('orderitem_order_item_id_seq'),
ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("order_item_id");
ALTER SEQUENCE orderitem_order_item_id_seq OWNED BY "OrderItem"."order_item_id";
