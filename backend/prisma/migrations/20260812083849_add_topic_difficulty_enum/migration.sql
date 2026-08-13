/*
  Warnings:

  - The `difficulty` column on the `LearningTopic` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."TopicDifficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "public"."LearningTopic" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "public"."TopicDifficulty";
