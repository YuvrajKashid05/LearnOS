from datetime import datetime, timezone
import math
import re


def normalize_text(text):

    if text is None:
        return ""

    if not isinstance(text, str):
        text = str(text)

    text = text.lower()

    text = re.sub(
        r"[^a-z0-9\s]",
        " ",
        text
    )

    return " ".join(
        text.split()
    )

def calculate_text_relevance(
    topic_name,
    video_title,
    video_description
):

    topic_words = set(
        normalize_text(
            topic_name
        ).split()
    )

    video_text = normalize_text(
        f"{video_title} {video_description}"
    )

    video_words = set(
        video_text.split()
    )

    if not topic_words:
        return 0

    if not video_words:
        return 0

    matched_words = (
        topic_words &
        video_words
    )

    return (
        len(matched_words)
        /
        len(topic_words)
    ) * 100

def calculate_popularity_score(view_count):

    try:
        view_count = int(
            view_count or 0
        )
    except (ValueError, TypeError):
        view_count = 0

    if view_count <= 0:
        return 0

    score = (
        math.log10(
            view_count + 1
        ) * 10
    )

    return min(
        score,
        100
    )

def calculate_engagement_score(
    view_count,
    like_count,
    comment_count
):

    try:
        view_count = int(
            view_count or 0
        )

        like_count = int(
            like_count or 0
        )

        comment_count = int(
            comment_count or 0
        )

    except (ValueError, TypeError):

        return 0

    if view_count <= 0:
        return 0

    engagement = (
        like_count +
        comment_count
    ) / view_count

    score = engagement * 100

    return min(
        score,
        100
    )


def calculate_freshness_score(
    published_at
):

    if not published_at:
        return 0

    try:

        published = datetime.fromisoformat(
            published_at.replace(
                "Z",
                "+00:00"
            )
        )

        now = datetime.now(
            timezone.utc
        )

        age_days = (
            now - published
        ).days

        if age_days <= 365:
            return 100

        if age_days <= 730:
            return 80

        if age_days <= 1095:
            return 60

        if age_days <= 1825:
            return 40

        return 20

    except Exception:

        return 0


def parse_duration(duration):

    if not duration:
        return 0

    hours = 0
    minutes = 0
    seconds = 0

    hour_match = re.search(
        r"(\d+)H",
        duration
    )

    minute_match = re.search(
        r"(\d+)M",
        duration
    )

    second_match = re.search(
        r"(\d+)S",
        duration
    )

    if hour_match:
        hours = int(
            hour_match.group(1)
        )

    if minute_match:
        minutes = int(
            minute_match.group(1)
        )

    if second_match:
        seconds = int(
            second_match.group(1)
        )

    return (
        hours * 3600
        +
        minutes * 60
        +
        seconds
    )


def calculate_duration_score(
    duration
):

    seconds = parse_duration(
        duration
    )

    if seconds <= 0:
        return 0

    minutes = seconds / 60

    if 15 <= minutes <= 240:
        return 100

    if minutes < 15:
        return 60

    return 70

def calculate_metadata_score(
    topic,
    video
):

    relevance = calculate_text_relevance(
        topic.get("name", ""),
        video.get("title", ""),
        video.get("description", "")
    )

    popularity = calculate_popularity_score(
        video.get(
            "viewCount",
            0
        )
    )

    engagement = calculate_engagement_score(
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
        )
    )

    freshness = calculate_freshness_score(
        video.get(
            "publishedAt"
        )
    )

    duration = calculate_duration_score(
        video.get(
            "duration"
        )
    )

    score = (
        relevance * 0.40
        +
        popularity * 0.20
        +
        engagement * 0.15
        +
        duration * 0.15
        +
        freshness * 0.10
    )

    return round(
        score,
        2
    )

def filter_candidates(
    topic,
    videos,
    max_candidates=10
):

    scored_videos = []

    for video in videos:

        score = calculate_metadata_score(
            topic,
            video
        )

        video["metadataScore"] = score

        scored_videos.append(
            video
        )

    scored_videos.sort(
        key=lambda video:
            video.get(
                "metadataScore",
                0
            ),
        reverse=True
    )

    return scored_videos[
        :max_candidates
    ]