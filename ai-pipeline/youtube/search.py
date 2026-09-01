import os
import requests

from dotenv import load_dotenv


load_dotenv()


YOUTUBE_API_KEY = os.getenv(
    "YOUTUBE_API_KEY"
)

YOUTUBE_SEARCH_URL = (
    "https://www.googleapis.com/youtube/v3/search"
)

YOUTUBE_VIDEOS_URL = (
    "https://www.googleapis.com/youtube/v3/videos"
)


def search_videos(
    query,
    max_results=10
):

    if not YOUTUBE_API_KEY:
        raise ValueError(
            "YouTube API key is not configured"
        )

    params = {
        "part": "snippet",
        "q": query,
        "type": "video",
        "maxResults": max_results,
        "key": YOUTUBE_API_KEY,
    }

    response = requests.get(
        YOUTUBE_SEARCH_URL,
        params=params,
        timeout=30,
    )

    response.raise_for_status()

    data = response.json()

    videos = []

    for item in data.get(
        "items",
        []
    ):

        video_id = (
            item
            .get("id", {})
            .get("videoId")
        )

        if not video_id:
            continue

        snippet = item.get(
            "snippet",
            {}
        )

        videos.append({
            "videoId": video_id,

            "title": snippet.get(
                "title",
                ""
            ),

            "description": snippet.get(
                "description",
                ""
            ),

            "channelId": snippet.get(
                "channelId",
                ""
            ),

            "channelTitle": snippet.get(
                "channelTitle",
                ""
            ),

            "publishedAt": snippet.get(
                "publishedAt"
            ),

            "thumbnail": (
                snippet
                .get(
                    "thumbnails",
                    {}
                )
                .get(
                    "high",
                    {}
                )
                .get(
                    "url"
                )
            ),
        })

    return videos


def get_videos_details(
    video_ids
):

    if not YOUTUBE_API_KEY:
        raise ValueError(
            "YouTube API key is not configured"
        )

    if not video_ids:
        return []

    params = {
        "part": (
            "snippet,"
            "contentDetails,"
            "statistics"
        ),

        "id": ",".join(
            video_ids
        ),

        "key": YOUTUBE_API_KEY,
    }

    response = requests.get(
        YOUTUBE_VIDEOS_URL,
        params=params,
        timeout=30
    )

    response.raise_for_status()

    data = response.json()

    videos = []

    for item in data.get(
        "items",
        []
    ):

        snippet = item.get(
            "snippet",
            {}
        )

        content_details = item.get(
            "contentDetails",
            {}
        )

        statistics = item.get(
            "statistics",
            {}
        )

        video = {

            "videoId": item.get(
                "id"
            ),

            "title": snippet.get(
                "title",
                ""
            ),

            "description": snippet.get(
                "description",
                ""
            ),

            "channelId": snippet.get(
                "channelId",
                ""
            ),

            "channelTitle": snippet.get(
                "channelTitle",
                ""
            ),

            "publishedAt": snippet.get(
                "publishedAt"
            ),

            "thumbnail": (
                snippet
                .get(
                    "thumbnails",
                    {}
                )
                .get(
                    "high",
                    {}
                )
                .get(
                    "url"
                )
            ),

            "duration": content_details.get(
                "duration"
            ),

            "viewCount": int(
                statistics.get(
                    "viewCount",
                    0
                )
            ),

            "likeCount": int(
                statistics.get(
                    "likeCount",
                    0
                )
            ),

            "commentCount": int(
                statistics.get(
                    "commentCount",
                    0
                )
            ),
        }

        videos.append(
            video
        )

    return videos