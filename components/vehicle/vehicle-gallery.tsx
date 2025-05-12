"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "radix-ui"

interface VehicleGalleryProps {
    vehicle: Vehicle
    images?: string[] // Optional array of image URLs
}

export default function VehicleGallery({ vehicle, images = [] }: VehicleGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Use provided images or fallback to vehicle.image or placeholder
    const galleryImages = images.length > 0 ? images : [vehicle.image || "/car-placeholder.webp"]

    const totalImages = galleryImages.length

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % totalImages)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages)
    }

    const selectImage = (index: number) => {
        setCurrentImageIndex(index)
    }

    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return

        isDragging.current = true
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft
        scrollLeft.current = scrollContainerRef.current.scrollLeft

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)

        // Prevent text selection during drag
        e.preventDefault()
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current || !scrollContainerRef.current) return

        const x = e.pageX - scrollContainerRef.current.offsetLeft
        const walk = (x - startX.current) * 1.5 // Scroll speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk
    }

    const handleMouseUp = () => {
        isDragging.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    // Clean up event listeners
    useEffect(() => {
        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }
    }, [])

    return (
        <div className="relative col-span-2">
            {/* Main Image */}
            <div className="relative h-[500px] lg:h-[600px] xl:h-[700px] mb-4 bg-gray-100 rounded-md overflow-hidden">
                <Image
                    src={galleryImages[currentImageIndex] || "/car-placeholder.webp"}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-white p-2 rounded-md">
                    <span className="text-sm font-medium">
                        {currentImageIndex + 1} | {totalImages}
                    </span>
                </div>

                {/* Fullscreen Button */}
                <button
                    onClick={() => setIsFullscreen(true)}
                    className="absolute bottom-4 left-20 bg-white p-2 rounded-md"
                    aria-label="View fullscreen"
                >
                    <Maximize2 className="h-5 w-5" />
                </button>

                {/* Navigation Buttons */}
                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label="Next image"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
            </div>

            {/* Thumbnails */}
            <div
                className="relative w-full overflow-x-auto pb-2 scrollbar-hide cursor-grab active:cursor-grabbing"
                style={{
                    scrollbarWidth: "none" /* Firefox */,
                    msOverflowStyle: "none" /* IE and Edge */,
                }}
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
            >
                <style jsx global>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
                <div className="flex space-x-2 min-w-max">
                    {galleryImages.map((image, i) => (
                        <div
                            key={i}
                            className={`flex-shrink-0 m-1 rounded overflow-hidden cursor-pointer transition-all ${i === currentImageIndex ? "ring-2 ring-[#8E6F00]" : "opacity-80 hover:opacity-100"
                                }`}
                            onClick={() => selectImage(i)}
                        >
                            <Image
                                src={image || "/car-placeholder.webp"}
                                alt={`${vehicle.make} ${vehicle.model} view ${i + 1}`}
                                width={150}
                                height={100}
                                className="object-cover w-[120px] h-20"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Dialog */}
            <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                <VisuallyHidden.Root>
                    <DialogTitle>{`${vehicle.make} ${vehicle.model}`}</DialogTitle>
                </VisuallyHidden.Root>
                <DialogContent className="w-[95vw] h-[90vh] p-0 bg-black">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={galleryImages[currentImageIndex] || "/car-placeholder.webp"}
                            alt={`${vehicle.make} ${vehicle.model}`}
                            fill
                            className="object-contain"
                        />

                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors z-10"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-6 w-6 text-white" />
                        </button>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors z-10"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-6 w-6 text-white" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 px-4 py-2 rounded-full">
                            <span className="text-white font-medium">
                                {currentImageIndex + 1} / {totalImages}
                            </span>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
