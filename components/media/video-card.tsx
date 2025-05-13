"use client"

import type { Video } from "@/lib/video-data"
import { PlayCircle } from "lucide-react"

interface VideoCardProps {
    video: Video
    onClick: () => void
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
    return (
        <div className="group cursor-pointer" onClick={onClick}>
            <div className="relative aspect-video bg-gray-800 rounded-md overflow-hidden mb-2">
                <img
                    src={video.thumbnail || "/car-placeholder.webp"}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-12 h-12 text-white" />
                </div>
            </div>
            <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{video.title}</p>
        </div>
    )
}
