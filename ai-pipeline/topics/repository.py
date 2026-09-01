from database.connection import get_connection

def get_topic_by_id (topic_id):
    connection  = get_connection()

    try:
        cursor = connection.cursor()

        query = """ 
            SELECT
                "id",
                "slug",
                "name",
                "description",
                "thumbnail",
                "category",
                "difficulty",
                "status"
            FROM "LearningTopic"
            WHERE "id" = %s
        """
        cursor.execute(query, (topic_id,))

        row = cursor.fetchone()

        if not row:
            return None

        print("ROW:", row)
        print("COLUMN COUNT:", len(row))

        return {
            "id": row[0],
            "name": row[1],
            "slug": row[2],
            "description": row[3],
            "thumbnail": row[4],
            "category": row[5],
            "difficulty": row[6],
            "status": row[7],
        }
        
    finally:
        cursor.close()
        connection.close()