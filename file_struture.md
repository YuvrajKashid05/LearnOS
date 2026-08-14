LearnOS/
│
├── backend/
│   │
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── src/
│   │   │
│   │   ├── config/
│   │   │   ├── prisma.js
│   │   │   ├── redis.js
│   │   │   └── cloudinary.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── upload.middleware.js
│   │   │
│   │   ├── utils/
│   │   │   ├── tokens.js
│   │   │   ├── cookies.js
│   │   │   ├── response.js
│   │   │   └── logger.js
│   │   │
│   │   └── modules/
│   │       │
│   │       ├── auth/
│   │       │   ├── auth.controller.js
│   │       │   ├── auth.repository.js
│   │       │   ├── auth.routes.js
│   │       │   └── auth.service.js
│   │       │
│   │       ├── users/
│   │       │   ├── user.controller.js
│   │       │   ├── user.repository.js
│   │       │   ├── user.routes.js
│   │       │   └── user.service.js
│   │       │
│   │       ├── topics/
│   │       │   ├── topic.controller.js
│   │       │   ├── topic.repository.js
│   │       │   ├── topic.routes.js
│   │       │   └── topic.service.js
│   │       │
│   │       ├── learningPaths/
│   │       │   ├── learningPath.controller.js
│   │       │   ├── learningPath.repository.js
│   │       │   ├── learningPath.routes.js
│   │       │   └── learningPath.service.js
│   │       │
│   │       ├── learningPathLessons/
│   │       │   ├── learningPathLesson.controller.js
│   │       │   ├── learningPathLesson.repository.js
│   │       │   ├── learningPathLesson.routes.js
│   │       │   └── learningPathLesson.service.js
│   │       │
│   │       ├── videos/
│   │       │   ├── video.controller.js
│   │       │   ├── video.repository.js
│   │       │   ├── video.routes.js
│   │       │   └── video.service.js
│   │       │
│   │       ├── progress/
│   │       │   ├── progress.controller.js
│   │       │   ├── progress.repository.js
│   │       │   ├── progress.routes.js
│   │       │   └── progress.service.js
│   │       │
│   │       ├── content/
│   │       │   ├── content.controller.js
│   │       │   ├── content.repository.js
│   │       │   ├── content.routes.js
│   │       │   └── content.service.js
│   │       │
│   │       ├── search/
│   │       │   ├── search.controller.js
│   │       │   ├── search.repository.js
│   │       │   ├── search.routes.js
│   │       │   └── search.service.js
│   │       │
│   │       └── jobs/
│   │           ├── job.controller.js
│   │           ├── job.repository.js
│   │           ├── job.routes.js
│   │           └── job.service.js
│   │
│   └── tests/
│       ├── unit/
│       └── integration/
│
│
├── ai-engine/
│   │
│   ├── requirements.txt
│   ├── .env
│   │
│   ├── agents/
│   │   ├── supervisor/
│   │   ├── topic/
│   │   ├── discovery/
│   │   ├── analysis/
│   │   ├── ranking/
│   │   ├── planning/
│   │   └── validation/
│   │
│   ├── pipelines/
│   │   ├── topic_pipeline.py
│   │   ├── youtube_pipeline.py
│   │   ├── transcript_pipeline.py
│   │   ├── analysis_pipeline.py
│   │   ├── ranking_pipeline.py
│   │   └── learning_path_pipeline.py
│   │
│   ├── workers/
│   │   ├── topic_worker.py
│   │   ├── video_worker.py
│   │   └── learning_path_worker.py
│   │
│   ├── services/
│   │   ├── youtube_service.py
│   │   ├── llm_service.py
│   │   ├── transcript_service.py
│   │   ├── embedding_service.py
│   │   └── ranking_service.py
│   │
│   ├── models/
│   │
│   ├── prompts/
│   │   ├── topic_analysis.txt
│   │   ├── video_analysis.txt
│   │   └── learning_path.txt
│   │
│   └── utils/
│       ├── logger.py
│       └── config.py
│
│
├── frontend/                 # Later
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── docker/
│   ├── backend.Dockerfile
│   ├── ai-engine.Dockerfile
│   └── nginx.conf
│
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       └── ai-engine-ci.yml
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   ├── ai-pipeline.md
│   └── database.md
│
├── docker-compose.yml
├── .gitignore
└── README.md