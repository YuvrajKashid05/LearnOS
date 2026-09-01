from datetime import datetime

from database.connection import get_connection


def save_pipeline_candidates(
    pipeline_job_id,
    videos
):
    """
    Save final ranked videos into
    PipelineVideoCandidate table.
    """

    if not videos:
        print("No videos to save.")
        return 0

    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        for rank, video in enumerate(
            videos,
            start=1
        ):

            published_at = video.get(
                "publishedAt"
            )

            if published_at:

                try:
                    published_at = datetime.fromisoformat(
                        published_at.replace(
                            "Z",
                            "+00:00"
                        )
                    )

                except Exception:
                    published_at = None

            cursor.execute(
                """
                INSERT INTO "PipelineVideoCandidate" (
                    "id",
                    "pipelineJobId",
                    "youtubeVideoId",
                    "title",
                    "description",
                    "thumbnailUrl",
                    "channelName",
                    "channelId",
                    "publishedAt",
                    "durationSeconds",
                    "viewCount",
                    "likeCount",
                    "commentCount",
                    "metadataScore",
                    "aiScore",
                    "aiConfidence",
                    "finalScore",
                    "rank",
                    "transcriptAvailable",
                    "transcriptText",
                    "transcriptError",
                    "createdAt",
                    "updatedAt"
                )
                VALUES (
                    gen_random_uuid(),
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    NOW(),
                    NOW()
                )
                ON CONFLICT (
                    "pipelineJobId",
                    "youtubeVideoId"
                )
                DO UPDATE SET
                    "title" = EXCLUDED."title",
                    "description" = EXCLUDED."description",
                    "thumbnailUrl" = EXCLUDED."thumbnailUrl",
                    "channelName" = EXCLUDED."channelName",
                    "channelId" = EXCLUDED."channelId",
                    "publishedAt" = EXCLUDED."publishedAt",
                    "durationSeconds" = EXCLUDED."durationSeconds",
                    "viewCount" = EXCLUDED."viewCount",
                    "likeCount" = EXCLUDED."likeCount",
                    "commentCount" = EXCLUDED."commentCount",
                    "metadataScore" = EXCLUDED."metadataScore",
                    "aiScore" = EXCLUDED."aiScore",
                    "aiConfidence" = EXCLUDED."aiConfidence",
                    "finalScore" = EXCLUDED."finalScore",
                    "rank" = EXCLUDED."rank",
                    "transcriptAvailable" = EXCLUDED."transcriptAvailable",
                    "transcriptText" = EXCLUDED."transcriptText",
                    "transcriptError" = EXCLUDED."transcriptError",
                    "updatedAt" = NOW()
                """,
                (
                    pipeline_job_id,

                    video.get("videoId"),

                    video.get(
                        "title",
                        ""
                    ),

                    video.get(
                        "description"
                    ),

                    video.get(
                        "thumbnail"
                    ),

                    video.get(
                        "channelTitle"
                    ),

                    video.get(
                        "channelId"
                    ),

                    published_at,

                    video.get(
                        "durationSeconds",
                        0
                    ),

                    video.get(
                        "viewCount",
                        0
                    ),

                    video.get(
                        "likeCount",
                        0
                    ),

                    video.get(
                        "commentCount",
                        0
                    ),

                    video.get(
                        "metadataScore"
                    ),

                    video.get(
                        "aiScore"
                    ),

                    video.get(
                        "aiConfidence"
                    ),

                    video.get(
                        "finalScore"
                    ),

                    rank,

                    video.get(
                        "transcriptAvailable",
                        False
                    ),

                    video.get(
                        "transcriptText",
                        ""
                    ),

                    video.get(
                        "transcriptError"
                    )
                )
            )

        connection.commit()

        print(
            f"Saved {len(videos)} pipeline candidates."
        )

        return len(videos)

    except Exception as error:

        if connection:
            connection.rollback()

        print(
            "Failed to save pipeline candidates:"
        )

        print(
            type(error).__name__
        )

        print(
            str(error)
        )

        raise

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


def update_pipeline_job_status(
    pipeline_job_id,
    status,
    progress=None
):
    """
    Update PipelineJob status and progress.
    """

    connection = None
    cursor = None

    try:

        connection = get_connection()
        cursor = connection.cursor()

        if status == "COMPLETED":

            cursor.execute(
                """
                UPDATE "PipelineJob"
                SET
                    "status" = %s::"PipelineJobStatus",
                    "progress" = 100,
                    "completedAt" = NOW(),
                    "updatedAt" = NOW()
                WHERE "id" = %s
                """,
                (
                    status,
                    pipeline_job_id
                )
            )

        elif status == "PROCESSING":

            cursor.execute(
                """
                UPDATE "PipelineJob"
                SET
                    "status" = %s::"PipelineJobStatus",
                    "progress" = %s,
                    "startedAt" = COALESCE(
                        "startedAt",
                        NOW()
                    ),
                    "updatedAt" = NOW()
                WHERE "id" = %s
                """,
                (
                    status,
                    progress or 0,
                    pipeline_job_id
                )
            )

        elif status == "FAILED":

            cursor.execute(
                """
                UPDATE "PipelineJob"
                SET
                    "status" = %s::"PipelineJobStatus",
                    "updatedAt" = NOW()
                WHERE "id" = %s
                """,
                (
                    status,
                    pipeline_job_id
                )
            )

        else:

            cursor.execute(
                """
                UPDATE "PipelineJob"
                SET
                    "status" = %s::"PipelineJobStatus",
                    "progress" = COALESCE(
                        %s,
                        "progress"
                    ),
                    "updatedAt" = NOW()
                WHERE "id" = %s
                """,
                (
                    status,
                    progress,
                    pipeline_job_id
                )
            )

        connection.commit()

        print(
            f"Pipeline job updated: {status}"
        )

    except Exception as error:

        if connection:
            connection.rollback()

        print(
            "Failed to update pipeline job:"
        )

        print(
            type(error).__name__
        )

        print(
            str(error)
        )

        raise

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()

def save_learning_path(topic_id, learning_path):
    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO "LearningPath"
            (
                id,
                title,
                description,
                "topicId",
                status,
                "createdAt",
                "updatedAt"
            )
            VALUES
            (
                gen_random_uuid(),
                %s,
                %s,
                %s,
                'PUBLISHED',
                NOW(),
                NOW()
            )
            RETURNING id
            """,
            (
                learning_path["title"],
                learning_path.get("description"),
                topic_id,
            )
        )

        learning_path_id = cursor.fetchone()[0]

        for lesson in learning_path["lessons"]:

            cursor.execute(
                """
                INSERT INTO "LearningPathLesson"
                (
                    id,
                    "learningPathId",
                    title,
                    description,
                    "order",
                    "createdAt",
                    "updatedAt"
                )
                VALUES
                (
                    gen_random_uuid(),
                    %s,
                    %s,
                    %s,
                    %s,
                    NOW(),
                    NOW()
                )
                RETURNING id
                """,
                (
                    learning_path_id,
                    lesson["title"],
                    lesson.get("description"),
                    lesson["order"],
                )
            )

            lesson_id = cursor.fetchone()[0]

            for video in lesson.get("videos", []):

                cursor.execute(
                    """
                    UPDATE "LearningVideo"
                    SET
                        "lessonId" = %s,
                        "status" = 'APPROVED',
                        "updatedAt" = NOW()
                    WHERE "youtubeVideoId" = %s
                    """,
                    (
                        lesson_id,
                        video["videoId"],
                    )
                )

        connection.commit()

        return learning_path_id

    except Exception:
        connection.rollback()
        raise

    finally:
        cursor.close()
        connection.close()