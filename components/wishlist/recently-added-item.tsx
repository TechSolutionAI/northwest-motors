"use client"

import Image from "next/image"
import Link from "next/link"
import { MoveRight } from "lucide-react"
import type { Vehicle } from "@/lib/mock-data"

interface RecentlyAddedItemProps {
    vehicle: Vehicle
}

export default function RecentlyAddedItem({ vehicle }: RecentlyAddedItemProps) {

    return (
        <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="relative">
                <Image
                    src={vehicle.image || "/placeholder.svg"}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                />
            </div>
            <div className="px-8 py-4">
                <h2 className="text-3xl font-medium">
                    <span className="text-[#8E6F00]">{vehicle.year}</span> {vehicle.make} <span className="text-[#8E6F00]">{vehicle.model}</span>
                </h2>
                <p className="text-gray-600 mt-2">XC</p>
            </div>
            <div className="bg-gray-100">
                <div className="px-8 py-2">
                    <p className="flex items-center gap-2 font-bold text-gray-600 mb-2">
                        Year: {vehicle.year}
                    </p>
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
