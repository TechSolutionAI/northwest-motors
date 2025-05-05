"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { CarFront, ChevronLeft, ChevronRight, CircleGauge, Fuel, MapPinned, MoveLeft, MoveRight } from "lucide-react"
import { vehicles } from "@/lib/mock-data"


export default function FeaturedVehicles() {
  // Add this useEffect for auto-sliding
  useEffect(() => {
    const slider = document.getElementById("vehicle-slider")
    let scrollInterval: NodeJS.Timeout

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (slider) {
          // If we're near the end, go back to start
          if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 100) {
            slider.scrollTo({ left: 0, behavior: "smooth" })
          } else {
            slider.scrollBy({ left: 300, behavior: "smooth" })
          }
        }
      }, 5000) // Auto-scroll every 5 seconds
    }

    startAutoScroll()

    // Pause auto-scroll when user interacts with the slider
    const handleMouseEnter = () => clearInterval(scrollInterval)
    const handleMouseLeave = () => startAutoScroll()

    if (slider) {
      slider.addEventListener("mouseenter", handleMouseEnter)
      slider.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      clearInterval(scrollInterval)
      if (slider) {
        slider.removeEventListener("mouseenter", handleMouseEnter)
        slider.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // CSS for hiding scrollbars
  const scrollbarHideStyles = `
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `

  return (
    <div className="bg-white overflow-hidden">
      <style jsx global>
        {scrollbarHideStyles}
      </style>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold">Explore our newest vehicles in stock</h2>
          <div className="flex space-x-2">
            <button
              className="px-8 py-4 border rounded-md group border-[#414042] hover:bg-[#414042] transition-colors ease-in duration-450"
              onClick={() => {
                const slider = document.getElementById("vehicle-slider")
                if (slider) slider.scrollLeft -= 300
              }}
            >
              <MoveLeft className="h-8 w-8 group-hover:text-white" />
            </button>
            <button
              className="px-8 py-4 border rounded-md group border-[#414042] hover:bg-[#414042] transition-colors ease-in duration-450"
              onClick={() => {
                const slider = document.getElementById("vehicle-slider")
                if (slider) slider.scrollLeft += 300
              }}
            >
              <MoveRight className="h-8 w-8 group-hover:text-white" />
            </button>
          </div>
        </div>

        <div
          id="vehicle-slider"
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth bg-whie"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="flex-none w-full sm:w-1/2 lg:w-1/4 px-3 snap-start"
              style={{ minWidth: "280px" }}
            >
              <div className="border rounded-md overflow-hidden mb-6 bg-[#F3F3F3] border-b-4 border-b-[#8E6F00]">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={'/suzuki-jimny-offroad.png'}
                    alt={`${vehicle.make} ${index + 1}`}
                    fill
                    className="object-cover cursor-pointer"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-baseline">
                    <h3 className="text-xl font-bold text-dark">
                      {vehicle.make} <span className="text-[#8E6F00]">{vehicle.model}</span>{" "}
                      <span className="text-gray-500 text-sm">{vehicle.year}</span>
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">{vehicle.trim}</p>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-fullflex items-center justify-center mr-2">
                        <CircleGauge />
                      </div>
                      <div className="text-sm">
                        {vehicle.km.toLocaleString()} km
                        <br />
                        <span className="text-xs text-gray-500">Kilometers</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-fullflex items-center justify-center mr-2">
                        <CarFront />
                      </div>
                      <div className="text-sm">
                        {vehicle.transmission}
                        <br />
                        <span className="text-xs text-gray-500">Transmission</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        <MapPinned />
                      </div>
                      <div className="text-sm">
                        {vehicle.location}
                        <br />
                        <span className="text-xs text-gray-500">Location</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        <Fuel />
                      </div>
                      <div className="text-sm">
                        {vehicle.fuel}
                        <br />
                        <span className="text-xs text-gray-500">Fuel</span>
                      </div>
                    </div>
                  </div>

                  <div className="border mt-4"></div>

                  <div className="mt-4">
                    <p className="font-bold text-lg">
                      ${vehicle.price.toLocaleString()}{" "}
                      <span className="text-xs font-normal text-gray-500">Inc. Gov. Charges</span>
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-center items-center">
                  <Link href="#" className="flex w-full py-2 justify-center group bg-[#E6E7E8] hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
                    <span className="self-center font-medium group-hover:text-white">VIEW</span> <MoveRight className="h-8 w-8 ml-4 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
