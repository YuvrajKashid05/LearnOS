import os
import json

from dotenv import load_dotenv
from google import genai

from ai.prompts import VIDEO_ANALYSIS_PROMPT


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


MODEL_NAME = "gemini-2.5-flash"


def build_video_context(topic, video):

    transcript_available = video.get(
        "transcriptAvailable",
        False
    )

    transcript_text = video.get(
        "transcriptText",
        ""
    )

    # Avoid sending extremely large transcripts
    if transcript_text:
        transcript_text = transcript_text[:30000]

    if not transcript_available:
        transcript_text = (
            "Transcript unavailable. "
            "Evaluate using metadata only."
        )

    context = f"""
LEARNOS TOPIC

Name:
{topic.get("name", "")}

Description:
{topic.get("description", "")}

Difficulty:
{topic.get("difficulty", "")}


YOUTUBE VIDEO

Title:
{video.get("title", "")}

Description:
{video.get("description", "")}

Duration:
{video.get("duration", "")}

Views:
{video.get("viewCount", 0)}

Likes:
{video.get("likeCount", 0)}

Comments:
{video.get("commentCount", 0)}

Published:
{video.get("publishedAt", "")}


TRANSCRIPT

{transcript_text}
"""

    return context


def analyze_video(topic, video):

    context = build_video_context(
        topic,
        video
    )

    prompt = (
        VIDEO_ANALYSIS_PROMPT
        + "\n\n"
        + context
    )

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
            config={
                "response_mime_type": "application/json"
            }
        )

        raw_text = response.text

        result = json.loads(
            raw_text
        )

        return validate_ai_result(
            result
        )

    except Exception as error:

        print(
            "\nAI analysis failed:"
        )

        print(
            type(error).__name__
        )

        print(
            str(error)
        )

        return get_fallback_result(
            str(error)
        )


def validate_ai_result(result):

    return {
        "relevanceScore": clamp_score(
            result.get(
                "relevanceScore",
                0
            )
        ),

        "educationalScore": clamp_score(
            result.get(
                "educationalScore",
                0
            )
        ),

        "completenessScore": clamp_score(
            result.get(
                "completenessScore",
                0
            )
        ),

        "difficultyMatch": clamp_score(
            result.get(
                "difficultyMatch",
                0
            )
        ),

        "contentQualityScore": clamp_score(
            result.get(
                "contentQualityScore",
                0
            )
        ),

        "topicsCovered": safe_list(
            result.get(
                "topicsCovered",
                []
            )
        ),

        "missingTopics": safe_list(
            result.get(
                "missingTopics",
                []
            )
        ),

        "summary": str(
            result.get(
                "summary",
                ""
            )
        ),

        "confidence": clamp_confidence(
            result.get(
                "confidence",
                0
            )
        ),
    }


def clamp_score(value):

    try:

        value = float(value)

        return round(
            max(
                0,
                min(
                    100,
                    value
                )
            ),
            2
        )

    except (
        TypeError,
        ValueError
    ):

        return 0


def clamp_confidence(value):

    try:

        value = float(value)

        return round(
            max(
                0,
                min(
                    1,
                    value
                )
            ),
            2
        )

    except (
        TypeError,
        ValueError
    ):

        return 0


def safe_list(value):

    if not isinstance(
        value,
        list
    ):
        return []

    return [
        str(item)
        for item in value
    ]


def get_fallback_result(error):

    return {
        "relevanceScore": 0,
        "educationalScore": 0,
        "completenessScore": 0,
        "difficultyMatch": 0,
        "contentQualityScore": 0,
        "topicsCovered": [],
        "missingTopics": [],
        "summary": "",
        "confidence": 0,
        "error": error,
    }