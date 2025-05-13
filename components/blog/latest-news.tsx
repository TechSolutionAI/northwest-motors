"use client"

import { useState, useRef, useEffect } from "react"
import { MoveLeft, MoveRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"
import { BlogCard } from "./blog-card"
import { useIsMobile } from "@/hooks/use-mobile"

interface LatestNewsProps {
    posts: BlogPost[]
}

export function LatestNews({ posts }: LatestNewsProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [cardWidth, setCardWidth] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const cardsContainerRef = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()

    // Number of posts to show based on screen size
    const visiblePosts = isMobile ? 1 : 3

    // Calculate card width on mount and resize
    useEffect(() => {
        const calculateCardWidth = () => {
            if (containerRef.current) {
                // Calculate the width of one card based on visible posts
                const containerWidth = containerRef.current.offsetWidth
                const gap = 24 // 1.5rem = 24px (gap-6)
                const totalGaps = visiblePosts - 1
                const width = (containerWidth - totalGaps * gap) / visiblePosts
                setCardWidth(width)
            }
        }

        calculateCardWidth()
        window.addEventListener("resize", calculateCardWidth)
        return () => window.removeEventListener("resize", calculateCardWidth)
    }, [visiblePosts])

    // Reset index when switching between mobile and desktop
    useEffect(() => {
        setCurrentIndex(0)
    }, [isMobile])

    const handlePrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(posts.length - visiblePosts, prev + 1))
    }

    // Calculate progress percentage
    const maxIndex = Math.max(0, posts.length - visiblePosts)
    const progressPercentage = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 100

    return (
        <section className="mb-16 px-10">
            <div className="mb-8">
                <h1 className="text-2xl font-normal text-gray-600">Our Blog</h1>
                <h2 className="text-4xl font-medium">Latest News</h2>
            </div>

            {/* Container with fixed width for cards */}
            <div ref={containerRef} className="relative overflow-hidden">
                <div
                    ref={cardsContainerRef}
                    className="flex gap-6 pb-6 transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (cardWidth + 24)}px)`,
                    }}
                >
                    {posts.map((post) => (
                        <div key={post.id} className="flex-shrink-0" style={{ width: `${cardWidth}px` }}>
                            <BlogCard post={post} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Controls and Progress Bar */}
            <div className="mt-6 flex items-center">
                <button
                    className="mr-2 rounded-full border border-gray-300 p-2"
                    aria-label="Previous"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                >
                    <MoveLeft size={16} className={currentIndex === 0 ? "text-gray-700" : "text-black"} />
                </button>
                <button
                    className="rounded-full border border-gray-300 p-2"
                    aria-label="Next"
                    onClick={handleNext}
                    disabled={currentIndex >= posts.length - visiblePosts}
                >
                    <MoveRight
                        size={16}
                        className={currentIndex >= posts.length - visiblePosts ? "text-gray-700" : "text-black"}
                    />
                </button>
                <div className="ml-6 h-1 flex-grow bg-gray-200">
                    <div
                        className="h-full bg-black transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
        </section>
    )
}
