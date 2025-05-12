"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SearchForm } from "./search-form"
import Link from "next/link"

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Only render translated content after mounting to avoid hydration mismatch
  useEffect(() => {
  }, [])

  // Define slides with image paths
  const heroSlides = [
    {
      id: 1,
      image: "https://imagescdn.dealercarsearch.com/DealerImages/19018/saved/770cb937.jpg",
    },
    {
      id: 2,
      image: "https://imagescdn.dealercarsearch.com/DealerImages/19018/saved/79215909.jpg",
    },
    {
      id: 3,
      image: "https://imagescdn.dealercarsearch.com/DealerImages/19018/saved/88a48cf5.jpg",
    },
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
  }, [heroSlides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
  }, [heroSlides.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds

      return () => clearInterval(interval)
    }
  }, [isPaused, nextSlide])

  return (
    <div
      className="relative h-[80vh] overflow-hidden -mt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0",
          )}
        >
          <Image
            src={slide.image || "/car-placeholder.png"}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80" />
        </div>
      ))}

      {/* Search Form Container */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-[80%] px-4">
          <div className="bg-[#231F20BF] px-8 py-12 rounded-lg shadow-lg">
            <h2 className="text-5xl text-center mb-8 text-white">
              {"Find your dream car"}
            </h2>
            <SearchForm simplified />
            <div className="text-white mt-4">
              <span>Not looking to buy? </span><Link href="#" className="underline underline-offset-4">Sell your car</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}
