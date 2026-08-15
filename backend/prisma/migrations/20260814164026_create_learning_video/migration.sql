/*
  Warnings:

  - You are about to drop the column `youtubevideoId` on the `LearningVideo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[youtubeVideoId]` on the table `LearningVideo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `youtubeVideoId` to the `LearningVideo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."LearningVideo_youtubevideoId_key";

-- AlterTable
ALTER TABLE "public"."LearningVideo" DROP COLUMN "youtubevideoId",
ADD COLUMN     "youtubeVideoId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LearningVideo_youtubeVideoId_key" ON "public"."LearningVideo"("youtubeVideoId");
