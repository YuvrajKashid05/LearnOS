/*
  Warnings:

  - You are about to drop the `LearningPathLessons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."LearningPathLessons" DROP CONSTRAINT "LearningPathLessons_learningPathId_fkey";

-- DropTable
DROP TABLE "public"."LearningPathLessons";

-- CreateTable
CREATE TABLE "public"."LearningPathLesson" (
    "id" TEXT NOT NULL,
    "learningPathId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningPathLesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LearningPathLesson_learningPathId_idx" ON "public"."LearningPathLesson"("learningPathId");

-- CreateIndex
CREATE UNIQUE INDEX "LearningPathLesson_learningPathId_order_key" ON "public"."LearningPathLesson"("learningPathId", "order");

-- AddForeignKey
ALTER TABLE "public"."LearningPathLesson" ADD CONSTRAINT "LearningPathLesson_learningPathId_fkey" FOREIGN KEY ("learningPathId") REFERENCES "public"."LearningPath"("id") ON DELETE CASCADE ON UPDATE CASCADE;
