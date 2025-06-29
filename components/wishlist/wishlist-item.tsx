"use client"

import Image from "next/image"
import Link from "next/link"
import { MoveRight, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Vehicle } from "@/lib/mock-data"

interface WishlistItemProps {
    vehicle: Vehicle
    onRemove: (id: number) => void
}

export default function WishlistItem({ vehicle, onRemove }: WishlistItemProps) {
    const handleRemoveFromWishlist = () => {
        onRemove(Number(vehicle.id))
    }

    return (
        <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="px-8 py-4">
                <h2 className="text-3xl font-medium">
                    {vehicle.year} {vehicle.make} <span className="text-[#8E6F00]">{vehicle.model}</span>
                </h2>
                <p className="text-gray-600 mt-2">XC</p>
            </div>
            <div className="relative">
                <Image
                    src={vehicle.image || "/car-placeholder.webp"}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                    sizes="(max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        (max-width: 1280px) 33vw,
                        25vw"
                    quality={80}
                />
                <Button
                    aria-label="Remove from wishlist"
                    className="absolute bottom-2 right-2 bg-[#8E6F00] text-white hover:bg-[#6b5300]"
                    onClick={handleRemoveFromWishlist}
                >
                    Remove from Wishlist
                    <Store className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <div className="bg-gray-100">
                <div className="px-8 py-4">
                    <p className="flex items-center gap-2 font-bold text-gray-600 mb-2">Year: {vehicle.year}</p>
                    <p className="text-xl font-bold mb-4">${vehicle.price.toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-2 border-b-4 border-[#8E6F00]">
                    <Link
                        href={`/inventory/${vehicle.id}`}
                        className="flex items-center justify-center p-4 bg-gray-200 text-dark 
                                    hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                    >
                        VIEW <MoveRight className="ml-2 h-6 w-6" />
                    </Link>
                    <Link
                        href={`/inventory/enquire/${vehicle.id}`}
                        className="flex items-center justify-center p-4 bg-[#414042] 
                                    text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                    >
                        ENQUIRE <MoveRight className="ml-2 h-6 w-6" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
