-- CreateEnum
CREATE TYPE "public"."PipelineJobStatus" AS ENUM ('PENDING', 'QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "public"."PipelineJob" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "status" "public"."PipelineJobStatus" NOT NULL DEFAULT 'PENDING',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PipelineJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PipelineJob_topicId_idx" ON "public"."PipelineJob"("topicId");

-- CreateIndex
CREATE INDEX "PipelineJob_status_idx" ON "public"."PipelineJob"("status");

-- AddForeignKey
ALTER TABLE "public"."PipelineJob" ADD CONSTRAINT "PipelineJob_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "public"."LearningTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
