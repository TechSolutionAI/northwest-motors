"use client"

import type { Video } from "@/lib/video-data"
import VideoCard from "./video-card"

interface VideoGalleryProps {
    videos: Video[]
    onVideoClick: (video: Video) => void
}

export default function VideoGallery({ videos, onVideoClick }: VideoGalleryProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} onClick={() => onVideoClick(video)} />
            ))}
        </div>
    )
}
