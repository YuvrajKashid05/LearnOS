from transcripts.providers.youtube import fetch_youtube_transcript


def get_transcript(video_id):
    """
    Main transcript interface for LearnOS.

    The rest of the pipeline should call this
    function instead of calling a provider directly.
    """

    result = fetch_youtube_transcript(
        video_id
    )

    return result