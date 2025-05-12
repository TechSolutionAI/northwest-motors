"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { vehicles } from "@/lib/mock-data"
import WishlistItem from "./wishlist-item"

export default function Wishlists() {
    // In a real app, this would come from a database or local storage
    const [wishlistItems] = useState(vehicles.slice(0, 4))
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 3
    const totalPages = Math.ceil(wishlistItems.length / itemsPerPage)

    const paginatedItems = wishlistItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    return (
        <div className="px-10 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-5xl font-normal text-gray-700">Welcome to your wishlist</h1>
                <Button variant="outline" className="flex items-center gap-2 rounded-full">
                    Compare vehicles in your wishlist <ArrowRight className="h-4 w-4" />
                </Button>
            </div>

            {wishlistItems.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {paginatedItems.map((vehicle) => (
                            <WishlistItem key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mb-16">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="rounded-full"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2">{currentPage}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="rounded-full"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-16 mb-8">
                    <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-6">Browse our inventory and add vehicles to your wishlist</p>
                    <Button asChild>
                        <Link href="/inventory">Browse Inventory</Link>
                    </Button>
                </div>
            )}

        </div>
    )
}
