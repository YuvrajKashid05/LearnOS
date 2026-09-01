-- CreateTable
CREATE TABLE "public"."PipelineVideoCandidate" (
    "id" TEXT NOT NULL,
    "pipelineJobId" TEXT NOT NULL,
    "youtubeVideoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnailUrl" TEXT,
    "channelName" TEXT,
    "channelId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "durationSeconds" INTEGER,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "metadataScore" DOUBLE PRECISION,
    "aiScore" DOUBLE PRECISION,
    "aiConfidence" DOUBLE PRECISION,
    "finalScore" DOUBLE PRECISION,
    "rank" INTEGER,
    "transcriptAvailable" BOOLEAN NOT NULL DEFAULT false,
    "transcriptText" TEXT,
    "transcriptError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PipelineVideoCandidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PipelineVideoCandidate_pipelineJobId_idx" ON "public"."PipelineVideoCandidate"("pipelineJobId");

-- CreateIndex
CREATE INDEX "PipelineVideoCandidate_finalScore_idx" ON "public"."PipelineVideoCandidate"("finalScore");

-- CreateIndex
CREATE UNIQUE INDEX "PipelineVideoCandidate_pipelineJobId_youtubeVideoId_key" ON "public"."PipelineVideoCandidate"("pipelineJobId", "youtubeVideoId");

-- AddForeignKey
ALTER TABLE "public"."PipelineVideoCandidate" ADD CONSTRAINT "PipelineVideoCandidate_pipelineJobId_fkey" FOREIGN KEY ("pipelineJobId") REFERENCES "public"."PipelineJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;
