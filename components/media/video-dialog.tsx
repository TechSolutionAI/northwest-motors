"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"
import type { Video } from "@/lib/video-data"

interface VideoDialogProps {
    video: Video | null
    isOpen: boolean
    onClose: () => void
}

export default function VideoDialog({ video, isOpen, onClose }: VideoDialogProps) {
    if (!video) return null

    const youtubeUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] px-0 bg-dark">
                <DialogHeader className="p-4 flex flex-row items-center justify-between">
                    <DialogTitle className="text-white">{video.title}</DialogTitle>
                    <DialogClose className="h-6 w-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <X className="text-white" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </DialogHeader>
                <div className="aspect-video w-full">
                    <iframe
                        src={youtubeUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
                {video.description && (
                    <div className="p-4 text-gray-700 text-sm">
                        <p>{video.description}</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
