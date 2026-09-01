import os
import json
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

MODEL_NAME = os.getenv(
    "GEMINI_MODEL",
    "gemini-2.5-flash"
)


def generate_learning_path(topic, videos):

    video_data = []

    for video in videos:
        video_data.append({
            "videoId": video.get("videoId"),
            "title": video.get("title"),
            "description": video.get("description"),
            "duration": video.get("duration"),
            "channelTitle": video.get("channelTitle")
        })

    prompt = f"""
        Create a structured learning path for the following topic.

        Topic:
        {topic["name"]}

        Description:
        {topic.get("description") or ""}

        Category:
        {topic.get("category") or ""}

        Difficulty:
        {topic.get("difficulty") or ""}

        Available YouTube videos:
        {json.dumps(video_data, ensure_ascii=False)}

        Create a logical learning path from beginner to advanced.

        Rules:
        - Create 5 to 10 lessons.
        - Lessons must follow a logical learning order.
        - Each lesson must have a clear title.
        - Each lesson must have a short description.
        - Assign only relevant videos to lessons.
        - A video can belong to only one lesson.
        - Do not invent video IDs.
        - Use only the supplied video IDs.
        - A lesson can contain multiple videos.
        - Do not force irrelevant videos into lessons.
        - Return only valid JSON.

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

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    text = response.text.strip()

    if text.startswith("```"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    result = json.loads(text)

    return result