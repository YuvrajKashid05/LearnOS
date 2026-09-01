from topics.repository import get_topic_by_id


topic_id = input("Enter topic ID: ")

topic = get_topic_by_id(topic_id)

if not topic:
    print("Topic not found.")
else:
    print("\nTopic found:")
    print("ID:", topic["id"])
    print("Name:", topic["name"])
    print("Slug:", topic["slug"])
    print("Description:", topic["description"])
    print("Category:", topic["category"])
    print("Difficulty:", topic["difficulty"])
    print("Status:", topic["status"])