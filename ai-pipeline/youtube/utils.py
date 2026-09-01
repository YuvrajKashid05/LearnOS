def duplicate_videos(videos):
    unique_videos = {}

    for video in videos:

        if not isinstance(video, dict):
            print(
                "Skipping invalid video:",
                video
            )
            continue

        video_id = video.get("videoId")

        if not video_id:
            continue

        if video_id not in unique_videos:
            unique_videos[video_id] = video

    return list(unique_videos.values())