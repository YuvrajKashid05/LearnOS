import os
import json
import traceback

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
        "6379"
    )
)

REDIS_PASSWORD = os.getenv(
    "REDIS_PASSWORD"
)

QUEUE_NAME = "learnos:pipeline:jobs"


redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=REDIS_PASSWORD or None,
    decode_responses=True,
    socket_connect_timeout=5,
    socket_timeout=10,
)


def connect_to_redis():
    """
    Verify Redis connectivity before starting the worker.
    """

    try:
        redis_client.ping()

        print(
            "Redis connection successful."
        )

    except redis.RedisError as error:

        print(
            "Redis connection failed:"
        )

        print(
            type(error).__name__
        )

        print(
            str(error)
        )

        raise


def process_job_message(message):
    """
    Parse and process one Redis queue message.
    """

    try:

        job = json.loads(
            message
        )

    except json.JSONDecodeError as error:

        print(
            "\nInvalid pipeline job JSON:"
        )

        print(
            str(error)
        )

        return True

    if not isinstance(
        job,
        dict
    ):

        print(
            "\nInvalid pipeline job:"
        )

        print(
            "Expected JSON object."
        )

        return True

    pipeline_job_id = job.get(
        "pipelineJobId"
    )

    topic_id = job.get(
        "topicId"
    )

    if not pipeline_job_id:

        print(
            "\nPipeline job is missing pipelineJobId."
        )

        return True

    if not topic_id:

        print(
            "\nPipeline job is missing topicId."
        )

        return True

    print(
        "\n================================"
    )

    print(
        "Processing pipeline job"
    )

    print(
        "Pipeline Job Id:",
        pipeline_job_id
    )

    print(
        "Topic Id:",
        topic_id
    )

    print(
        "================================"
    )

    try:

        videos = process_topic(
            topic_id,
            pipeline_job_id
        )

        print(
            "\nPipeline completed successfully."
        )

        print(
            "Candidate videos:",
            len(videos)
            if videos
            else 0
        )

        return True

    except Exception as error:

        print(
            "\nPipeline processing failed."
        )

        print(
            "Type:",
            type(error).__name__
        )

        print(
            "Message:",
            str(error)
        )

        traceback.print_exc()

        return False


def wait_for_jobs():
    """
    Continuously consume pipeline jobs from Redis.
    """

    print(
        "\nPython worker started."
    )

    print(
        "Queue:",
        QUEUE_NAME
    )

    print(
        "Waiting for pipeline jobs..."
    )

    while True:

        try:

            result = redis_client.blpop(
                QUEUE_NAME,
                timeout=5
            )

            if result is None:
                continue

            _, message = result

            success = process_job_message(
                message
            )

            if not success:

                print(
                    "\nJob processing failed."
                )

                print(
                    "PipelineJob status should be FAILED."
                )

                print(
                    "The failed Redis message will not "
                    "be automatically retried."
                )

        except redis.RedisError as error:

            print(
                "\nRedis error:"
            )

            print(
                "Type:",
                type(error).__name__
            )

            print(
                "Message:",
                str(error)
            )

            print(
                "Attempting to reconnect..."
            )

            try:

                redis_client.ping()

                print(
                    "Redis connection restored."
                )

            except redis.RedisError:

                print(
                    "Redis still unavailable."
                )

        except KeyboardInterrupt:

            print(
                "\nPython worker stopped."
            )

            break

        except Exception as error:

            print(
                "\nUnexpected worker error:"
            )

            print(
                "Type:",
                type(error).__name__
            )

            print(
                "Message:",
                str(error)
            )

            traceback.print_exc()


if __name__ == "__main__":

    connect_to_redis()

    wait_for_jobs()