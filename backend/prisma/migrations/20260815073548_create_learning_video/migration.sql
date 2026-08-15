-- AlterTable
ALTER TABLE "public"."LearningVideo" ADD COLUMN     "difficultyScore" DOUBLE PRECISION,
ADD COLUMN     "durationSeconds" INTEGER,
ADD COLUMN     "qualityScore" DOUBLE PRECISION,
ADD COLUMN     "relevanceScore" DOUBLE PRECISION,
ADD COLUMN     "transcriptUrl" TEXT;
