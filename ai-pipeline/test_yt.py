from youtube.search import search_videos

videos = search_videos(
    "Backend Development",
    max_results=5
)

for index, video in enumerate(videos, start=1):
    print(f"\nVideo {index}")
    print("Title:", video["title"])
    print("Channel:", video["channelTitle"])
    print("Video ID:", video["videoId"])
    print("Thumbnail:", video["thumbnail"])