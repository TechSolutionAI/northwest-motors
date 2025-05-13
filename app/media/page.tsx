"use client"

import { useState } from "react"
import { videos } from "@/lib/video-data"
import FeaturedVideo from "@/components/media/featured-video"
import VideoGallery from "@/components/media/video-gallery"
import VideoDialog from "@/components/media/video-dialog"
import type { Video } from "@/lib/video-data"
import MediaConcierge from "@/components/media/media-concierge"

export default function MediaPage() {
    const [selectedVideo, setSelectedVideo] = useState(videos[0])
    const [dialogVideo, setDialogVideo] = useState<Video | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleVideoClick = (video: Video) => {
        setDialogVideo(video)
        setIsDialogOpen(true)
    }

    return (
        <div className="bg-dark text-white min-h-screen pb-16">
            <div className="container mx-auto px-10 pt-8">
                <h1 className="text-5xl mb-2">Media</h1>

                <FeaturedVideo video={selectedVideo} />

                <div className="mt-16">
                    <h2 className="text-xl font-semibold mb-6">Video Gallery</h2>
                    <VideoGallery videos={videos} onVideoClick={handleVideoClick} />
                </div>

                <VideoDialog video={dialogVideo} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
            </div>
            <div className="border mt-8"></div>
            <MediaConcierge />
        </div>
    )
}
