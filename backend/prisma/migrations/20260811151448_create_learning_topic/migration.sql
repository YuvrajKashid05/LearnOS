-- CreateEnum
CREATE TYPE "public"."TopicStatus" AS ENUM ('DRAFT', 'PROCESSING', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "public"."LearningTopic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "category" TEXT NOT NULL,
    "difficulty" TEXT,
    "status" "public"."TopicStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "LearningTopic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LearningTopic_slug_key" ON "public"."LearningTopic"("slug");

-- CreateIndex
CREATE INDEX "LearningTopic_category_idx" ON "public"."LearningTopic"("category");

-- CreateIndex
CREATE INDEX "LearningTopic_status_idx" ON "public"."LearningTopic"("status");

-- CreateIndex
CREATE INDEX "LearningTopic_name_idx" ON "public"."LearningTopic"("name");
