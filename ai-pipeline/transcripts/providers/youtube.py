from youtube_transcript_api import YouTubeTranscriptApi


def fetch_youtube_transcript(video_id):
    """
    Fetch a YouTube transcript.

    Returns a consistent result object even when
    YouTube blocks the request or a transcript
    is unavailable.
    """

    try:
        api = YouTubeTranscriptApi()

        transcript = api.fetch(video_id)

        entries = []

        for item in transcript:
            entries.append({
                "text": item.text,
                "start": item.start,
                "duration": item.duration,
            })

        text = transcript_to_text(entries)

        return {
            "available": True,
            "entries": entries,
            "text": text,
            "error": None,
            "errorType": None,
            "provider": "youtube_transcript_api",
        }

    except Exception as error:

        error_type = type(error).__name__
        error_message = str(error)

        print(
            f"\nTranscript error for {video_id}:"
        )

        print(
            f"Type: {error_type}"
        )

        print(
            f"Message: {error_message}"
        )

        return {
            "available": False,
            "entries": [],
            "text": "",
            "error": error_message,
            "errorType": error_type,
            "provider": "youtube_transcript_api",
        }


def transcript_to_text(entries):
    """
    Convert transcript entries into one text string.
    """

    return " ".join(
        item["text"]
        for item in entries
        if item.get("text")
    )