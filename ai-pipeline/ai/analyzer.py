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


MODEL_NAME = os.getenv(
    "GEMINI_MODEL",
    "gemini-2.5-flash"
)


def build_video_context(topic, video):
    """
    Build the context sent to Gemini for video analysis.
    """

    transcript_available = video.get(
        "transcriptAvailable",
        False
    )

    transcript_text = video.get(
        "transcriptText",
        ""
    )

    if not isinstance(
        transcript_text,
        str
    ):
        transcript_text = str(
            transcript_text or ""
        )

    # Avoid sending extremely large transcripts.
    transcript_text = transcript_text[:30000]

    if (
        not transcript_available
        or not transcript_text.strip()
    ):
        transcript_text = (
            "Transcript unavailable. "
            "Evaluate using metadata only."
        )

    context = f"""
LEARNOS TOPIC

Name:
{topic.get("name", "")}

Description:
{topic.get("description") or ""}

Category:
{topic.get("category") or ""}

Difficulty:
{topic.get("difficulty") or ""}


YOUTUBE VIDEO

Video ID:
{video.get("videoId", "")}

Title:
{video.get("title", "")}

Description:
{video.get("description") or ""}

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
    """
    Analyze a YouTube video using Gemini.

    Returns a validated AI analysis result.
    If Gemini fails, a safe fallback result is returned.
    """

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

        if not response:
            raise ValueError(
                "Gemini returned no response"
            )

        raw_text = response.text

        if not raw_text:
            raise ValueError(
                "Gemini returned an empty response"
            )

        raw_text = raw_text.strip()

        # Defensive handling in case the model
        # still returns Markdown code fences.
        if raw_text.startswith("```"):

            raw_text = raw_text.replace(
                "```json",
                ""
            )

            raw_text = raw_text.replace(
                "```",
                ""
            )

            raw_text = raw_text.strip()

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
            f"Type: {type(error).__name__}"
        )

        print(
            f"Message: {str(error)}"
        )

        return get_fallback_result(
            str(error)
        )


def validate_ai_result(result):
    """
    Validate and normalize Gemini's AI result.
    """

    if not isinstance(
        result,
        dict
    ):
        return get_fallback_result(
            "AI response is not a JSON object"
        )

    summary = result.get(
        "summary",
        ""
    )

    if summary is None:
        summary = ""

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
            summary
        ).strip(),

        "confidence": clamp_confidence(
            result.get(
                "confidence",
                0
            )
        ),
    }


def clamp_score(value):
    """
    Keep AI score between 0 and 100.
    """

    try:

        value = float(
            value
        )

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
    """
    Keep confidence between 0 and 1.
    """

    try:

        value = float(
            value
        )

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
    """
    Ensure AI list fields always contain strings.
    """

    if not isinstance(
        value,
        list
    ):
        return []

    return [
        str(item).strip()
        for item in value
        if item is not None
        and str(item).strip()
    ]


def get_fallback_result(error):
    """
    Safe fallback when Gemini analysis fails.

    The processor can still continue processing
    the remaining videos.
    """

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