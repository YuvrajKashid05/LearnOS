-- CreateTable
CREATE TABLE "public"."LearningPathLessons" (
    "id" TEXT NOT NULL,
    "learningPathId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningPathLessons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LearningPathLessons_learningPathId_idx" ON "public"."LearningPathLessons"("learningPathId");

-- CreateIndex
CREATE UNIQUE INDEX "LearningPathLessons_learningPathId_order_key" ON "public"."LearningPathLessons"("learningPathId", "order");

-- AddForeignKey
ALTER TABLE "public"."LearningPathLessons" ADD CONSTRAINT "LearningPathLessons_learningPathId_fkey" FOREIGN KEY ("learningPathId") REFERENCES "public"."LearningPath"("id") ON DELETE CASCADE ON UPDATE CASCADE;
