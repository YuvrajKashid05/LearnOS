from topics.repository import get_topic_by_id

from youtube.search import (
    search_videos,
    get_videos_details
)

from youtube.utils import duplicate_videos

from transcripts.service import get_transcript

from scoring.metadata_scorer import (
    filter_candidates
)

from ai.analyzer import analyze_video

from database.result_repository import (
    save_pipeline_candidates,
    update_pipeline_job_status,
    save_learning_path
)

from ai.learning_path_generator import (
    generate_learning_path
)


def generate_search_queries(topic):
    """
    Generate YouTube search queries for a predefined topic.
    """

    name = topic.get(
        "name",
        ""
    ).strip()

    if not name:
        return []

    description = topic.get(
        "description"
    )

    queries = [
        name,
        f"{name} tutorial",
        f"{name} full course",
        f"{name} for beginners"
    ]

    if description:

        description = str(
            description
        ).strip()

        if description:

            queries.append(
                f"{name} {description}"
            )

    return queries


def process_topic(
    topic_id,
    pipeline_job_id
):
    """
    Execute the complete LearnOS AI pipeline.

    Pipeline:

    Topic
      ↓
    YouTube Search
      ↓
    Deduplication
      ↓
    Video Details
      ↓
    Metadata Ranking
      ↓
    Transcript Extraction
      ↓
    Gemini AI Analysis
      ↓
    Final Ranking
      ↓
    Save Pipeline Candidates
      ↓
    Generate Learning Path
      ↓
    Save Learning Path
      ↓
    Complete Pipeline Job
    """

    print("\n========================")
    print("Starting topic pipeline")
    print("Topic Id:", topic_id)
    print("========================")

    try:

        update_pipeline_job_status(
            pipeline_job_id,
            "PROCESSING",
            5
        )

        topic = get_topic_by_id(
            topic_id
        )

        if not topic:
            raise ValueError(
                "Topic not found"
            )

        print("\nTopic:")
        print(
            topic.get(
                "name",
                ""
            )
        )

        queries = generate_search_queries(
            topic
        )

        if not queries:
            raise ValueError(
                "No search queries generated"
            )

        print("\nSearch queries")

        for query in queries:

            print(
                "-",
                query
            )

        update_pipeline_job_status(
            pipeline_job_id,
            "PROCESSING",
            10
        )

        # ==================================================
        # YOUTUBE SEARCH
        # ==================================================

        all_videos = []

        for query in queries:

            print(
                f"\nSearching YouTube for: {query}"
            )

            try:

                videos = search_videos(
                    query,
                    max_results=10
                )

                if videos:
                    all_videos.extend(
                        videos
                    )

            except Exception as error:

                print(
                    "\nYouTube search failed:"
                )

                print(
                    "Type:",
                    type(error).__name__
                )

                print(
                    "Message:",
                    str(error)
                )

                continue

        print(
            "\nVideos before deduplication:",
            len(all_videos)
        )

        if not all_videos:

            raise ValueError(
                "No YouTube videos found"
            )

        # ==================================================
        # DEDUPLICATION
        # ==================================================

        all_videos = duplicate_videos(
            all_videos
        )

        print(
            "Videos after deduplication:",
            len(all_videos)
        )

        video_ids = [
            video.get(
                "videoId"
            )
            for video in all_videos
            if video.get(
                "videoId"
            )
        ]

        if not video_ids:

            raise ValueError(
                "No valid YouTube video IDs found"
            )

        # ==================================================
        # YOUTUBE VIDEO DETAILS
        # ==================================================

        detailed_videos = []

        for i in range(
            0,
            len(video_ids),
            50
        ):

            batch = video_ids[
                i:i + 50
            ]

            try:

                details = get_videos_details(
                    batch
                )

                if details:
                    detailed_videos.extend(
                        details
                    )

            except Exception as error:

                print(
                    "\nYouTube details request failed:"
                )

                print(
                    "Type:",
                    type(error).__name__
                )

                print(
                    "Message:",
                    str(error)
                )

                continue

        print(
            "\nDetailed videos received:",
            len(detailed_videos)
        )

        if not detailed_videos:

            raise ValueError(
                "No detailed YouTube videos received"
            )

        update_pipeline_job_status(
            pipeline_job_id,
            "PROCESSING",
            25
        )

        # ==================================================
        # METADATA RANKING
        # ==================================================

        filtered_videos = filter_candidates(
            topic,
            detailed_videos,
            max_candidates=10
        )

        print(
            "\nVideos after metadata ranking:",
            len(filtered_videos)
        )

        if not filtered_videos:

            raise ValueError(
                "No videos passed metadata ranking"
            )

        # ==================================================
        # TRANSCRIPT EXTRACTION
        # ==================================================

        print("\n========================")
        print("Starting transcript extraction")
        print("========================")

        for video in filtered_videos:

            video_id = video.get(
                "videoId"
            )

            title = video.get(
                "title",
                ""
            )

            print(
                f"\nExtracting transcript: {title}"
            )

            try:

                transcript_result = get_transcript(
                    video_id
                )

                if not transcript_result:

                    transcript_result = {
                        "available": False,
                        "entries": [],
                        "text": "",
                        "error": (
                            "Empty transcript response"
                        ),
                        "errorType": (
                            "EmptyResponse"
                        )
                    }

                video["transcriptAvailable"] = bool(
                    transcript_result.get(
                        "available",
                        False
                    )
                )

                video["transcript"] = (
                    transcript_result.get(
                        "entries",
                        []
                    )
                )

                video["transcriptText"] = (
                    transcript_result.get(
                        "text",
                        ""
                    )
                )

                video["transcriptError"] = (
                    transcript_result.get(
                        "error"
                    )
                )

                video["transcriptErrorType"] = (
                    transcript_result.get(
                        "errorType"
                    )
                )

                if video["transcriptAvailable"]:

                    print(
                        "Transcript available"
                    )

                    print(
                        "Transcript characters:",
                        len(
                            video["transcriptText"]
                        )
                    )

                else:

                    print(
                        "Transcript unavailable"
                    )

                    print(
                        "Reason:",
                        video["transcriptError"]
                    )

            except Exception as error:

                print(
                    "\nTranscript extraction failed:"
                )

                print(
                    "Type:",
                    type(error).__name__
                )

                print(
                    "Message:",
                    str(error)
                )

                video["transcriptAvailable"] = False
                video["transcript"] = []
                video["transcriptText"] = ""
                video["transcriptError"] = str(
                    error
                )
                video["transcriptErrorType"] = (
                    type(error).__name__
                )

        update_pipeline_job_status(
            pipeline_job_id,
            "PROCESSING",
            50
        )

        # ==================================================
        # AI VIDEO ANALYSIS
        # ==================================================

        print("\n========================")
        print("Starting AI video analysis")
        print("========================")

        for video in filtered_videos:

            print(
                f"\nAnalyzing video: "
                f"{video.get('title', '')}"
            )

            try:

                ai_result = analyze_video(
                    topic,
                    video
                )

                if not ai_result:

                    ai_result = {
                        "relevanceScore": 0,
                        "educationalScore": 0,
                        "completenessScore": 0,
                        "difficultyMatch": 0,
                        "contentQualityScore": 0,
                        "topicsCovered": [],
                        "missingTopics": [],
                        "summary": "",
                        "confidence": 0,
                        "aiScore": 0
                    }

                relevance = float(
                    ai_result.get(
                        "relevanceScore",
                        0
                    )
                )

                educational = float(
                    ai_result.get(
                        "educationalScore",
                        0
                    )
                )

                completeness = float(
                    ai_result.get(
                        "completenessScore",
                        0
                    )
                )

                difficulty = float(
                    ai_result.get(
                        "difficultyMatch",
                        0
                    )
                )

                quality = float(
                    ai_result.get(
                        "contentQualityScore",
                        0
                    )
                )

                # Weighted AI score.
                ai_score = (
                    relevance * 0.30
                    + educational * 0.25
                    + completeness * 0.20
                    + difficulty * 0.10
                    + quality * 0.15
                )

                ai_result["aiScore"] = round(
                    ai_score,
                    2
                )

                video["aiAnalysis"] = ai_result

                print(
                    "AI Score:",
                    ai_result["aiScore"]
                )

                print(
                    "AI Confidence:",
                    ai_result.get(
                        "confidence",
                        0
                    )
                )

            except Exception as error:

                print(
                    "\nAI analysis failed:"
                )

                print(
                    "Type:",
                    type(error).__name__
                )

                print(
                    "Message:",
                    str(error)
                )

                video["aiAnalysis"] = {
                    "relevanceScore": 0,
                    "educationalScore": 0,
                    "completenessScore": 0,
                    "difficultyMatch": 0,
                    "contentQualityScore": 0,
                    "topicsCovered": [],
                    "missingTopics": [],
                    "summary": "",
                    "confidence": 0,
                    "aiScore": 0,
                    "error": str(error)
                }

        update_pipeline_job_status(
            pipeline_job_id,
            "PROCESSING",
            75
        )

        # ==================================================
        # FINAL SCORE
        # ==================================================

        print("\n========================")
        print("Calculating final scores")
        print("========================")

        for video in filtered_videos:

            metadata_score = float(
                video.get(
                    "metadataScore",
                    0
                )
            )

            ai_analysis = video.get(
                "aiAnalysis",
                {}
            )

            ai_score = float(
                ai_analysis.get(
                    "aiScore",
                    0
                )
            )

            final_score = (
                metadata_score * 0.40
                + ai_score * 0.60
            )

            video["finalScore"] = round(
                final_score,
                2
            )

        filtered_videos.sort(
            key=lambda video:
                video.get(
                    "finalScore",
                    0
                ),
            reverse=True
        )

        print("\n========================")
        print("FINAL VIDEO RANKING")
        print("========================")

        for index, video in enumerate(
            filtered_videos,
            start=1
        ):

            print(
                f"\n{index}. "
                f"{video.get('title', '')}"
            )

            print(
                "Video ID:",
                video.get(
                    "videoId"
                )
            )

            print(
                "Metadata Score:",
                video.get(
                    "metadataScore",
                    0
                )
            )

            print(
                "AI Score:",
                video.get(
                    "aiAnalysis",
                    {}
                ).get(
                    "aiScore",
                    0
                )
            )

            print(
                "Final Score:",
                video.get(
                    "finalScore",
                    0
                )
            )

            print(
                "Transcript:",
                "Available"
                if video.get(
                    "transcriptAvailable",
                    False
                )
                else "Unavailable"
            )

        # ==================================================
        # SAVE PIPELINE CANDIDATES
        # ==================================================

        print("\n========================")
        print("Saving pipeline results")
        print("========================")

        saved_count = save_pipeline_candidates(
            pipeline_job_id,
            filtered_videos
        )

        print(
            "Results saved:",
            saved_count
        )

        update_pipeline_job_status(
            pipeline_job_id,
            "PROCESSING",
            85
        )

        # ==================================================
        # LEARNING PATH GENERATION
        # ==================================================

        print("\n========================")
        print("Generating learning path")
        print("========================")

        learning_path = generate_learning_path(
            topic,
            filtered_videos
        )

        if not learning_path:

            raise ValueError(
                "Learning path generation failed"
            )

        print(
            "Learning path generated:"
        )

        print(
            learning_path.get(
                "title",
                ""
            )
        )

        # ==================================================
        # SAVE LEARNING PATH
        # ==================================================

        learning_path_id = save_learning_path(
            topic_id,
            learning_path,
            filtered_videos
        )

        print(
            "Learning path saved:",
            learning_path_id
        )

        # ==================================================
        # COMPLETE PIPELINE
        # ==================================================

        update_pipeline_job_status(
            pipeline_job_id,
            "COMPLETED",
            100
        )

        print("\n========================")
        print("PIPELINE COMPLETED")
        print("========================")

        return filtered_videos

    except Exception as error:

        print("\n========================")
        print("PIPELINE FAILED")
        print("========================")

        print(
            "Type:",
            type(error).__name__
        )

        print(
            "Message:",
            str(error)
        )

        try:

            update_pipeline_job_status(
                pipeline_job_id,
                "FAILED",
                0
            )

        except Exception as status_error:

            print(
                "\nFailed to update PipelineJob status:"
            )

            print(
                type(status_error).__name__
            )

            print(
                str(status_error)
            )

        raise