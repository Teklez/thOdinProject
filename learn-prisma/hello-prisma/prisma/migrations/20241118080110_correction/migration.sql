/*
  Warnings:

  - You are about to drop the column `pusblished` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `titlte` on the `Post` table. All the data in the column will be lost.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "pusblished",
DROP COLUMN "titlte",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" VARCHAR(255) NOT NULL;
