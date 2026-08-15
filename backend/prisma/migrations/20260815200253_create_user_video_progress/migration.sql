-- CreateTable
CREATE TABLE "public"."UserVideoProgress" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "videoId" TEXT NOT NULL,
    "watchedSeconds" INTEGER NOT NULL DEFAULT 0,
    "progressPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "lastWatchedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserVideoProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserVideoProgress_userId_idx" ON "public"."UserVideoProgress"("userId");

-- CreateIndex
CREATE INDEX "UserVideoProgress_videoId_idx" ON "public"."UserVideoProgress"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "UserVideoProgress_userId_videoId_key" ON "public"."UserVideoProgress"("userId", "videoId");

-- AddForeignKey
ALTER TABLE "public"."UserVideoProgress" ADD CONSTRAINT "UserVideoProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserVideoProgress" ADD CONSTRAINT "UserVideoProgress_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "public"."LearningVideo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
