-- CreateEnum
CREATE TYPE "public"."VideoStatus" AS ENUM ('PENDING', 'ANALYZING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."LearningVideo" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "youtubevideoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnailUrl" TEXT,
    "channelName" TEXT,
    "channelId" TEXT,
    "aiSummary" TEXT,
    "status" "public"."VideoStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LearningVideo_youtubevideoId_key" ON "public"."LearningVideo"("youtubevideoId");

-- CreateIndex
CREATE INDEX "LearningVideo_lessonId_idx" ON "public"."LearningVideo"("lessonId");

-- CreateIndex
CREATE INDEX "LearningVideo_status_idx" ON "public"."LearningVideo"("status");

-- AddForeignKey
ALTER TABLE "public"."LearningVideo" ADD CONSTRAINT "LearningVideo_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "public"."LearningPathLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
