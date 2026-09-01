import os
import json
import redis

from dotenv import load_dotenv

from pipeline.processor import process_topic


load_dotenv()


REDIS_HOST = os.getenv(
    "REDIS_HOST",
    "localhost"
)

REDIS_PORT = int(
    os.getenv(
        "REDIS_PORT",
        6379
    )
)

redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    decode_responses=True,
    socket_connect_timeout=5,
    socket_timeout=10,
)

QUEUE_NAME = "learnos:pipeline:jobs"


def connect_to_redis():

    try:

        redis_client.ping()

        print(
            "Redis connection successful."
        )

    except redis.RedisError as error:

        print(
            "Redis connection failed:"
        )

        print(error)

        raise


def wait_for_jobs():

    print(
        "Python worker started."
    )

    print(
        "Waiting for pipeline jobs..."
    )

    while True:

        result = redis_client.blpop(
            QUEUE_NAME,
            timeout=5
        )

        if result is None:
            continue

        _, message = result

        pipeline_job_id = None

        try:

            job = json.loads(
                message
            )

            pipeline_job_id = job[
                "pipelineJobId"
            ]

            topic_id = job[
                "topicId"
            ]

            print(
                "\nPipeline Job Id:",
                pipeline_job_id
            )

            print(
                "Topic Id:",
                topic_id
            )

            videos = process_topic(
                topic_id,
                pipeline_job_id
            )

            print(
                "\nPipeline completed"
            )

            print(
                "Candidates videos:",
                len(videos)
            )

        except Exception as error:

            print(
                "\nPipeline failed"
            )

            print(
                type(error).__name__
            )

            print(
                error
            )

            import traceback

            traceback.print_exc()


if __name__ == "__main__":

    connect_to_redis()

    wait_for_jobs()