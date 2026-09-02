import os
import json

from google import genai
from dotenv import load_dotenv


load_dotenv()


GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY"
)


if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY is not configured"
    )


client = genai.Client(
    api_key=GEMINI_API_KEY
)


MODEL_NAME = os.getenv(
    "GEMINI_MODEL",
    "gemini-2.5-flash"
)


def generate_learning_path(
    topic,
    videos
):
    """
    Generate a structured learning path
    using only the supplied YouTube videos.
    """

    if not topic:
        raise ValueError(
            "Topic is required"
        )

    if not videos:
        raise ValueError(
            "Videos are required"
        )

    video_data = []

    valid_video_ids = set()

    for video in videos:

        video_id = video.get(
            "videoId"
        )

        if not video_id:
            continue

        valid_video_ids.add(
            video_id
        )

        video_data.append({
            "videoId": video_id,

            "title": video.get(
                "title",
                ""
            ),

            "description": video.get(
                "description",
                ""
            ),

            "duration": video.get(
                "duration"
            ),

            "channelTitle": video.get(
                "channelTitle",
                ""
            )
        })

    if not video_data:
        raise ValueError(
            "No valid videos available "
            "for learning path generation"
        )

    prompt = f"""
Create a structured learning path for the
following predefined LearnOS topic.

Topic:
{topic.get("name", "")}

Description:
{topic.get("description") or ""}

Category:
{topic.get("category") or ""}

Difficulty:
{topic.get("difficulty") or ""}

Available YouTube videos:
{json.dumps(
    video_data,
    ensure_ascii=False
)}

Create a logical learning path from beginner
concepts toward advanced concepts.

IMPORTANT RULES:

- Create between 5 and 10 lessons.
- Do not create empty lessons.
- Lessons must follow a logical learning order.
- Each lesson must have a clear title.
- Each lesson must have a short description.
- Assign only relevant videos to lessons.
- A video can belong to only ONE lesson.
- Do not invent video IDs.
- Use ONLY the supplied video IDs.
- A lesson can contain multiple videos.
- Do not force irrelevant videos into lessons.
- Do not duplicate a video across lessons.
- Do not create videos that were not supplied.
- Prefer fewer meaningful lessons over empty or
  artificially created lessons.
- Every lesson must contain at least one video.
- Return ONLY valid JSON.

Return exactly this structure:

{{
    "title": "Learning path title",
    "description": "Learning path description",
    "lessons": [
        {{
            "title": "Lesson title",
            "description": "Lesson description",
            "order": 1,
            "videos": [
                {{
                    "videoId": "youtube_video_id"
                }}
            ]
        }}
    ]
}}
"""

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
            config={
                "response_mime_type": "application/json"
            }
        )

        if not response or not response.text:
            raise ValueError(
                "Gemini returned an empty response"
            )

        text = response.text.strip()

        if text.startswith("```"):

            text = text.replace(
                "```json",
                ""
            )

            text = text.replace(
                "```",
                ""
            )

            text = text.strip()

        result = json.loads(
            text
        )

        return validate_learning_path(
            result,
            valid_video_ids
        )

    except Exception as error:

        print(
            "\nLearning path generation failed:"
        )

        print(
            type(error).__name__
        )

        print(
            str(error)
        )

        raise


def validate_learning_path(
    result,
    valid_video_ids
):
    """
    Validate Gemini's generated learning path.

    Ensures that:
    - Required fields exist.
    - Lessons are not empty.
    - Video IDs come only from supplied videos.
    - A video is used only once.
    - Lesson order is unique.
    """

    if not isinstance(
        result,
        dict
    ):
        raise ValueError(
            "Learning path response must be a JSON object"
        )

    title = result.get(
        "title"
    )

    description = result.get(
        "description",
        ""
    )

    lessons = result.get(
        "lessons"
    )

    if not isinstance(
        title,
        str
    ) or not title.strip():

        raise ValueError(
            "Learning path title is missing"
        )

    if not isinstance(
        description,
        str
    ):

        description = str(
            description
        )

    if not isinstance(
        lessons,
        list
    ) or not lessons:

        raise ValueError(
            "Learning path must contain lessons"
        )

    validated_lessons = []

    used_video_ids = set()
    used_orders = set()

    for index, lesson in enumerate(
        lessons,
        start=1
    ):

        if not isinstance(
            lesson,
            dict
        ):
            continue

        lesson_title = lesson.get(
            "title"
        )

        lesson_description = lesson.get(
            "description",
            ""
        )

        lesson_order = lesson.get(
            "order",
            index
        )

        lesson_videos = lesson.get(
            "videos",
            []
        )

        if not isinstance(
            lesson_title,
            str
        ) or not lesson_title.strip():

            continue

        if not isinstance(
            lesson_description,
            str
        ):

            lesson_description = str(
                lesson_description
            )

        try:

            lesson_order = int(
                lesson_order
            )

        except (
            TypeError,
            ValueError
        ):

            lesson_order = index

        if lesson_order <= 0:
            lesson_order = index

        if lesson_order in used_orders:

            lesson_order = (
                max(
                    used_orders
                )
                + 1
                if used_orders
                else 1
            )

        if not isinstance(
            lesson_videos,
            list
        ):

            continue

        validated_videos = []

        for video in lesson_videos:

            if not isinstance(
                video,
                dict
            ):
                continue

            video_id = video.get(
                "videoId"
            )

            if not video_id:
                continue

            if video_id not in valid_video_ids:

                print(
                    "Ignoring unknown video ID:",
                    video_id
                )

                continue

            if video_id in used_video_ids:

                print(
                    "Ignoring duplicate video ID:",
                    video_id
                )

                continue

            validated_videos.append({
                "videoId": video_id
            })

            used_video_ids.add(
                video_id
            )

        if not validated_videos:
            continue

        used_orders.add(
            lesson_order
        )

        validated_lessons.append({
            "title": lesson_title.strip(),

            "description": lesson_description.strip(),

            "order": lesson_order,

            "videos": validated_videos
        })

    if not validated_lessons:

        raise ValueError(
            "Learning path contains no valid lessons"
        )

    validated_lessons.sort(
        key=lambda lesson:
            lesson["order"]
    )

    for index, lesson in enumerate(
        validated_lessons,
        start=1
    ):
        lesson["order"] = index

    return {
        "title": title.strip(),

        "description": description.strip(),

        "lessons": validated_lessons
    }