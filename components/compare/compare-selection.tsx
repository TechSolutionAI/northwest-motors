"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MoveRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { vehicles } from "@/lib/mock-data"

export function CompareSelection() {
    const [wishlistVehicles, setWishlistVehicles] = useState<typeof vehicles>([])
    const [selectedVehicles, setSelectedVehicles] = useState<number[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const vehiclesPerPage = 3

    // Load wishlist from localStorage
    useEffect(() => {
        const loadWishlist = () => {
            try {
                if (typeof window !== "undefined") {
                    const wishlistJson = localStorage.getItem("wishlist")
                    if (wishlistJson) {
                        const wishlistIds = JSON.parse(wishlistJson) as number[]

                        // Find vehicles that match wishlist IDs
                        const wishlistItems = vehicles.filter((vehicle) => wishlistIds.includes(vehicle.id))

                        setWishlistVehicles(wishlistItems)
                    } else {
                        setWishlistVehicles([])
                    }
                }
            } catch (error) {
                console.error("Error loading wishlist:", error)
                setWishlistVehicles([])
            }
        }

        loadWishlist()

        // Listen for storage events to update when wishlist changes in other tabs
        window.addEventListener("storage", loadWishlist)
        return () => {
            window.removeEventListener("storage", loadWishlist)
        }
    }, [])

    const pageCount = Math.max(1, Math.ceil(wishlistVehicles.length / vehiclesPerPage))
    const displayedVehicles = wishlistVehicles.slice(currentPage * vehiclesPerPage, (currentPage + 1) * vehiclesPerPage)

    const handlePrevious = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : pageCount - 1))
    }

    const handleNext = () => {
        setCurrentPage((prev) => (prev < pageCount - 1 ? prev + 1 : 0))
    }

    const toggleVehicleSelection = (vehicleId: number) => {
        if (selectedVehicles.includes(vehicleId)) {
            setSelectedVehicles(selectedVehicles.filter((id) => id !== vehicleId))
        } else {
            if (selectedVehicles.length < 2) {
                setSelectedVehicles([...selectedVehicles, vehicleId])
            } else {
                // If already 2 vehicles selected, replace the first one
                setSelectedVehicles([selectedVehicles[1], vehicleId])
            }
        }
    }

    const isCompareDisabled = selectedVehicles.length !== 2

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left side - Title and button */}
                <div className="md:w-1/4">
                    <h1 className="text-4xl font-normal text-gray-700 mb-2">Compare two vehicles</h1>
                    <p className="text-lg mb-8">
                        Choose two vehicles from your{" "}
                        <Link href="/wishlist" className="text-[#8E6F00] hover:underline">
                            wishlist
                        </Link>{" "}
                        to compare.
                    </p>

                    <button
                        className="text-white bg-[#414042] hover:bg-[#8E6F00] px-8 py-4 rounded-none disabled:bg-gray-300"
                        disabled={isCompareDisabled}
                    >
                        {!isCompareDisabled ? (
                            <Link
                                href={`/compare/results?v1=${selectedVehicles[0]}&v2=${selectedVehicles[1]}`}
                                className="flex items-center gap-2"
                            >
                                COMPARE <MoveRight className="" />
                            </Link>
                        ) : (
                            <span className="flex items-center gap-2">
                                COMPARE <MoveRight className="" />
                            </span>
                        )}
                    </button>
                </div>

                {/* Right side - Vehicle placeholders */}
                <div className="md:w-3/4 flex">
                    {/* First vehicle column */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="relative h-80 bg-gray-100 flex items-center justify-center border border-gray-200">
                            {selectedVehicles[0] !== undefined ? (
                                <Image
                                    src={wishlistVehicles.find((v) => v.id === selectedVehicles[0])?.image || "/car-placeholder.webp"}
                                    alt="Selected vehicle 1"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <p className="text-gray-700">Press + on the vehicle to compare</p>
                            )}
                        </div>
                        <div className="h-32 bg-gray-100 border border-gray-200">
                            {selectedVehicles[0] !== undefined && (
                                <div className="p-4">
                                    {(() => {
                                        const vehicle = wishlistVehicles.find((v) => v.id === selectedVehicles[0])
                                        return vehicle ? (
                                            <>
                                                <h2 className="text-xl">
                                                    <span className="text-amber-600">
                                                        {vehicle.year} {vehicle.make}
                                                    </span>{" "}
                                                    <span className="font-medium">{vehicle.model}</span>
                                                </h2>
                                                <p className="text-gray-600">{vehicle.trim}</p>
                                            </>
                                        ) : null
                                    })()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mx-4 border-l border-gray-300"></div>

                    {/* Second vehicle column */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="relative h-80 bg-gray-100 flex items-center justify-center border border-gray-200">
                            {selectedVehicles[1] !== undefined ? (
                                <Image
                                    src={wishlistVehicles.find((v) => v.id === selectedVehicles[1])?.image || "/car-placeholder.webp"}
                                    alt="Selected vehicle 2"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <p className="text-gray-700">Press + on the vehicle to compare</p>
                            )}
                        </div>
                        <div className="h-32 bg-gray-100 border border-gray-200">
                            {selectedVehicles[1] !== undefined && (
                                <div className="p-4">
                                    {(() => {
                                        const vehicle = wishlistVehicles.find((v) => v.id === selectedVehicles[1])
                                        return vehicle ? (
                                            <>
                                                <h2 className="text-xl">
                                                    <span className="text-amber-600">
                                                        {vehicle.year} {vehicle.make}
                                                    </span>{" "}
                                                    <span className="font-medium">{vehicle.model}</span>
                                                </h2>
                                                <p className="text-gray-600">{vehicle.trim}</p>
                                            </>
                                        ) : null
                                    })()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="my-8" />

            {wishlistVehicles.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        {displayedVehicles.map((vehicle) => (
                            <div key={vehicle.id} className="relative border border-gray-200">
                                <div className="relative h-48">
                                    <Image
                                        src={vehicle.image || "/car-placeholder.webp"}
                                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        className={`absolute top-2 right-2 p-1 rounded-full ${selectedVehicles.includes(vehicle.id)
                                            ? "bg-amber-600 text-white"
                                            : "bg-white text-gray-800 border border-gray-300"
                                            }`}
                                        onClick={() => toggleVehicleSelection(vehicle.id)}
                                        aria-label={selectedVehicles.includes(vehicle.id) ? "Remove from comparison" : "Add to comparison"}
                                    >
                                        <Plus className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-medium">
                                        {vehicle.year} {vehicle.make} {vehicle.model}
                                    </h3>
                                    <p className="text-sm text-gray-600">{vehicle.trim}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {wishlistVehicles.length > vehiclesPerPage && (
                        <div className="flex justify-center gap-4">
                            <Button variant="outline" className="border-gray-300 rounded-none" onClick={handlePrevious}>
                                <ArrowLeft className="" />
                            </Button>
                            <Button variant="outline" className="border-gray-300 rounded-none" onClick={handleNext}>
                                <MoveRight className="" />
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-6">Add vehicles to your wishlist to compare them.</p>
                    <Button asChild>
                        <Link href="/inventory">Browse Inventory</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}
