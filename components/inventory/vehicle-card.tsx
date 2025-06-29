"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { CarFront, CircleGauge, Fuel, MapPinned, MoveRight, Store } from "lucide-react"


type VehicleCardProps = {
  vehicle: Vehicle
  isInWishlist?: boolean
  onWishlistClick?: (e: React.MouseEvent) => void
}

export default function VehicleCard({ vehicle, isInWishlist, onWishlistClick }: VehicleCardProps) {
  return (
    <div className="bg-[#F3F3F3] overflow-hidden">
      <div className="relative h-64">
        <Link href={`/inventory/${vehicle.id}`}>
          <Image
            src={vehicle.image || "/car-placeholder.webp"}
            alt={`${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw,
                  (max-width: 1024px) 50vw,
                  (max-width: 1280px) 33vw,
                  25vw"
            quality={80}
          />
        </Link>

        {/* Wishlist button */}
        {onWishlistClick && (
          <button
            onClick={onWishlistClick}
            className={`absolute bottom-2 right-2 p-2 rounded-full ${isInWishlist ? "bg-[#8E6F00] text-white" : "bg-white text-[#8E6F00]"
              } hover:bg-[#8E6F00] hover:text-white transition-colors duration-300 shadow-md`}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Store className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-baseline">
          <p className="text-xl font-bold text-dark">
            {vehicle.make} <span className="text-[#8E6F00]">{vehicle.model}</span>{" "}
            <span className="text-gray-700 text-sm">{vehicle.year}</span>
          </p>
        </div>
        <p className="text-sm text-gray-700">{vehicle.trim}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-fullflex items-center justify-center mr-2">
              <CircleGauge />
            </div>
            <div className="text-sm">
              {vehicle.km.toLocaleString()} km
              <br />
              <span className="text-xs text-gray-700">Kilometers</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-fullflex items-center justify-center mr-2">
              <CarFront />
            </div>
            <div className="text-sm">
              {vehicle.transmission}
              <br />
              <span className="text-xs text-gray-700">Transmission</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <MapPinned />
            </div>
            <div className="text-sm">
              {vehicle.location}
              <br />
              <span className="text-xs text-gray-700">Location</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <Fuel />
            </div>
            <div className="text-sm">
              {vehicle.fuel}
              <br />
              <span className="text-xs text-gray-700">Fuel</span>
            </div>
          </div>
        </div>

        <div className="border my-8"></div>

        <div className="">
          <span className="text-2xl font-bold">${vehicle.price.toLocaleString()}</span>
          <span className="text-xs ml-2 text-gray-700">*Exc. Gov. Charges</span>
        </div>

        <div className="items-center justify-between mt-8 text-sm bg-white px-4 py-4">
          <div>${vehicle.weeklyPayment} Per Week</div>
          <div className="border my-4"></div>
          <div>{vehicle.comparisonRate}% p.a Comparison Rate</div>
        </div>

        <div className="grid grid-cols-2 gap-0 h-16 mt-4 -m-4 border-b-4 border-b-[#8E6F00]">
          <Link
            href={`/inventory/${vehicle.id}`}
            className="flex items-center justify-center py-2 bg-[#E6E7E8] hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
          >
            VIEW <MoveRight className="ml-2 h-6 w-6" />
          </Link>
          <Link
            href={`/enquire/${vehicle.id}`}
            className="flex items-center justify-center py-2 bg-[#414042] text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
          >
            ENQUIRE <MoveRight className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </div>
    </div >
  )
}
