"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ComparisonTable } from "@/components/compare/comparison-table"
import { vehicles } from "@/lib/mock-data"

interface CompareResultsProps {
    vehicleIds: {
        v1: string
        v2: string
    }
}

export function CompareResults({ vehicleIds }: CompareResultsProps) {
    // In a real app, you would fetch these based on the IDs
    const vehicleA = vehicles.find((v) => v.id.toString() === vehicleIds.v1) || vehicles[0]
    const vehicleB = vehicles.find((v) => v.id.toString() === vehicleIds.v2) || vehicles[1]

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
                <Link href="/compare" className="flex items-center gap-2 mr-4">
                    <ArrowLeft className="h-4 w-4" /> Back to selection
                </Link>
                <h1 className="text-3xl font-normal text-gray-700">Vehicle Comparison</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {[vehicleA, vehicleB].map((vehicle, index) => (
                    <div key={index} className="border border-gray-200">
                        <div className="relative h-64">
                            <Image
                                src={vehicle.image || "/car-placeholder.png"}
                                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-2xl">
                                <span className="text-amber-600">
                                    {vehicle.year} {vehicle.make}
                                </span>{" "}
                                <span className="font-medium">{vehicle.model}</span>
                            </h2>
                            <p className="text-gray-600 mb-4">{vehicle.trim}</p>

                        </div>
                        <div className="grid grid-cols-2 gap-0 h-16 mt-4 border-b-4 border-b-[#8E6F00]">
                            <Link
                                href={`/inventory/${vehicle.id}`}
                                className="flex items-center justify-center py-2 bg-[#E6E7E8] hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                            >
                                VIEW <MoveRight className="ml-2 h-6 w-6" />
                            </Link>
                            <Link
                                href={`/inventory/enquire/${vehicle.id}`}
                                className="flex items-center justify-center py-2 bg-[#414042] text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                            >
                                ENQUIRE <MoveRight className="ml-2 h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <ComparisonTable vehicleA={vehicleA} vehicleB={vehicleB} />

            <div className="flex justify-center mt-12">
                <Link href="/wishlist" className="flex items-center gap-2 bg-[#414042]  hover:bg-[#8E6F00] text-white px-8 py-4 rounded-none">
                    Return to Wishlist <ExternalLink className="" />
                </Link>
            </div>
        </div>
    )
}
