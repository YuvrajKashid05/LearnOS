from ai.learning_path_generator import generate_learning_path


topic = {
    "name": "Backend Development",
    "description": "Learn backend development from beginner to advanced",
    "category": "backend",
    "difficulty": "BEGINNER"
}

videos = [
    {
        "videoId": "XBu54nfzxAQ",
        "title": "Backend web development - a complete overview",
        "description": "Backend technologies overview",
        "duration": "PT12M58S",
        "channelTitle": "SuperSimpleDev"
    },
    {
        "videoId": "rOpEN1JDaD0",
        "title": "Complete Backend Course",
        "description": "Complete backend course",
        "duration": "PT5H",
        "channelTitle": "Example"
    }
]


result = generate_learning_path(
    topic,
    videos
)

print(result)