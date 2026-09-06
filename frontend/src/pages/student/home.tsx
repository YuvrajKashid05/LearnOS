import { motion } from "framer-motion";
import { Bookmark, MoreVertical, Play } from "lucide-react";

import PageContainer from "@/components/shared/page-container";
import SectionHeader from "@/components/shared/section-header";

const categories = [
  "All",
  "Programming",
  "AI & ML",
  "Data Science",
  "Web Development",
  "Cloud",
  "DevOps",
  "Cyber Security",
  "Interview Prep",
];

const videos = [
  {
    title: "Complete React JS Course for Beginners",
    category: "Web Development",
    views: "1.2M views",
    time: "2 days ago",
    duration: "18:42",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Python Programming Full Course",
    category: "Programming",
    views: "842K views",
    time: "5 days ago",
    duration: "32:18",
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Machine Learning Explained Simply",
    category: "AI & ML",
    views: "624K views",
    time: "1 week ago",
    duration: "24:15",
    thumbnail:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "SQL Complete Course for Beginners",
    category: "Data Science",
    views: "451K views",
    time: "3 days ago",
    duration: "21:34",
    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Node.js Backend Development",
    category: "Programming",
    views: "386K views",
    time: "4 days ago",
    duration: "27:41",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Data Science Roadmap 2026",
    category: "Data Science",
    views: "298K views",
    time: "6 days ago",
    duration: "15:28",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Docker & Kubernetes for Beginners",
    category: "DevOps",
    views: "215K views",
    time: "1 week ago",
    duration: "29:52",
    thumbnail:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "AWS Cloud Computing Full Course",
    category: "Cloud",
    views: "182K views",
    time: "2 weeks ago",
    duration: "35:20",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "JavaScript Advanced Concepts",
    category: "Programming",
    views: "164K views",
    time: "3 days ago",
    duration: "22:48",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Deep Learning Fundamentals",
    category: "AI & ML",
    views: "143K views",
    time: "4 days ago",
    duration: "26:11",
    thumbnail:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Git & GitHub Complete Guide",
    category: "DevOps",
    views: "121K views",
    time: "1 week ago",
    duration: "19:37",
    thumbnail:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cyber Security Fundamentals",
    category: "Cyber Security",
    views: "98K views",
    time: "2 weeks ago",
    duration: "28:05",
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HomePage() {
  return (
    <PageContainer className="max-w-[1600px] py-4 sm:py-5 lg:py-6">
      {/* Categories */}
      <div className="sticky top-0 z-10 -mx-4 mb-7 overflow-x-auto bg-background/95 px-4 py-2 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex min-w-max gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              aria-pressed={index === 0}
              className={[
                "h-9 rounded-lg px-4 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                index === 0
                  ? "bg-foreground text-background"
                  : "bg-muted text-foreground hover:bg-muted/70",
              ].join(" ")}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Video feed */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        aria-labelledby="recommended-learning"
      >
        <SectionHeader
          title="Recommended for You"
          description="Discover videos selected to help you learn and improve your skills."
          className="mb-6"
        />

        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video, index) => (
            <VideoCard key={video.title} video={video} index={index} />
          ))}
        </div>
      </motion.section>
    </PageContainer>
  );
}

function VideoCard({
  video,
  index,
}: {
  video: (typeof videos)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        delay: index * 0.025,
      }}
      className="group min-w-0 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        <img
          src={video.thumbnail}
          alt={`${video.title} thumbnail`}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-black/5" />

        {/* Duration */}
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium text-white">
          {video.duration}
        </span>

        {/* Hover play */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <div className="flex size-12 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm">
            <Play className="ml-0.5 size-5 fill-current" />
          </div>
        </div>
      </div>

      {/* Video information */}
      <div className="mt-3 flex gap-3">
        {/* Channel/avatar placeholder */}
        <div className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-muted sm:flex">
          <span className="text-xs font-semibold">L_</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex gap-2">
            <h3 className="line-clamp-2 text-sm font-semibold leading-5">
              {video.title}
            </h3>

            <button
              type="button"
              className="shrink-0 rounded-md opacity-0 transition-opacity hover:bg-muted focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100"
              aria-label={`More options for ${video.title}`}
            >
              <MoreVertical className="size-4" />
            </button>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">{video.category}</p>

          <p className="mt-0.5 text-xs text-muted-foreground">
            {video.views} · {video.time}
          </p>
        </div>

        <button
          type="button"
          className="hidden shrink-0 self-start rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:block"
          aria-label={`Bookmark ${video.title}`}
        >
          <Bookmark className="size-4" />
        </button>
      </div>
    </motion.article>
  );
}
