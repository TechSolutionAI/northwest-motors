"use client"

import { useState } from "react"
import type { Video } from "@/lib/video-data"
import { PlayCircle } from "lucide-react"

interface FeaturedVideoProps {
    video: Video
}

export default function FeaturedVideo({ video }: FeaturedVideoProps) {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
                <h2 className="text-5xl my-6">Explore the world of Dutton One</h2>

                <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                    {isPlaying ? (
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div className="relative w-full h-full">
                            <img
                                src={video.thumbnail || "/placeholder.svg"}
                                alt={video.title}
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer"
                                onClick={() => setIsPlaying(true)}
                            >
                                <PlayCircle className="w-16 h-16 text-white opacity-80 hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:col-span-4">
                <p className="text-gray-700 mt-8 lg:mt-24">
                    Explore the world of Dutton One and discover the One for you. Catering to every lifestyle and preference, see
                    how we capture attainable aspiration for every individual. Follow us on our socials to keep up to date with
                    the latest photography, video and stock updates.
                </p>
            </div>
        </div>
    )
}
