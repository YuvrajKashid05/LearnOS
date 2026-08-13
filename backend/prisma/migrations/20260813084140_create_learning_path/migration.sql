-- CreateEnum
CREATE TYPE "public"."LearningPathStatus" AS ENUM ('DRAFT', 'PROCESSING', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "public"."LearningPath" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "topicId" TEXT NOT NULL,
    "status" "public"."LearningPathStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "LearningPath_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LearningPath_topicId_idx" ON "public"."LearningPath"("topicId");

-- CreateIndex
CREATE INDEX "LearningPath_status_idx" ON "public"."LearningPath"("status");

-- AddForeignKey
ALTER TABLE "public"."LearningPath" ADD CONSTRAINT "LearningPath_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "public"."LearningTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
