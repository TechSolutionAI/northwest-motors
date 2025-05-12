"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Heart, MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { vehicles } from "@/lib/mock-data"
import WishlistItem from "./wishlist-item"

export default function Wishlists() {
    // State to store wishlist vehicles
    const [wishlistItems, setWishlistItems] = useState<typeof vehicles>([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 3
    const totalPages = Math.ceil(wishlistItems.length / itemsPerPage)

    // Load wishlist from localStorage on component mount
    useEffect(() => {
        loadWishlist()

        // Listen for storage events to update wishlist when changed in another tab
        window.addEventListener("storage", loadWishlist)

        return () => {
            window.removeEventListener("storage", loadWishlist)
        }
    }, [])

    const loadWishlist = () => {
        try {
            // Get wishlist IDs from localStorage
            const savedWishlist = localStorage.getItem("wishlist")
            if (!savedWishlist) {
                setWishlistItems([])
                return
            }

            const wishlistIds = JSON.parse(savedWishlist) as number[]

            // Find vehicles that match the wishlist IDs
            const wishlistVehicles = vehicles.filter((vehicle) => wishlistIds.includes(Number(vehicle.id)))

            setWishlistItems(wishlistVehicles)

            // Adjust current page if needed after items are removed
            if (currentPage > 1 && (currentPage - 1) * itemsPerPage >= wishlistVehicles.length) {
                setCurrentPage(Math.max(1, Math.ceil(wishlistVehicles.length / itemsPerPage)))
            }
        } catch (error) {
            console.error("Error loading wishlist:", error)
            setWishlistItems([])
        }
    }

    const handleRemoveFromWishlist = (id: number) => {
        try {
            // Get current wishlist
            const savedWishlist = localStorage.getItem("wishlist")
            if (!savedWishlist) return

            // Parse and filter out the removed item
            const wishlistIds = JSON.parse(savedWishlist) as number[]
            const updatedWishlist = wishlistIds.filter((itemId) => itemId !== id)

            // Save updated wishlist back to localStorage
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

            // Update state
            const updatedItems = wishlistItems.filter((item) => Number(item.id) !== id)
            setWishlistItems(updatedItems)

            // Dispatch storage event to notify other tabs
            window.dispatchEvent(new Event("storage"))

            // Adjust current page if needed
            if (currentPage > 1 && (currentPage - 1) * itemsPerPage >= updatedItems.length) {
                setCurrentPage(Math.max(1, Math.ceil(updatedItems.length / itemsPerPage)))
            }
        } catch (error) {
            console.error("Error removing item from wishlist:", error)
        }
    }

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
                <Link href="/compare" className="flex items-center gap-2 rounded-full">
                    Compare vehicles in your wishlist <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            {wishlistItems.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {paginatedItems.map((vehicle) => (
                            <WishlistItem key={vehicle.id} vehicle={vehicle} onRemove={handleRemoveFromWishlist} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mb-16">
                            <Button
                                aria-label="Previous"
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
                                aria-label="Next"
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
                    <p className="text-gray-700 mb-6">Browse our inventory and add vehicles to your wishlist</p>
                    <Link
                        href="/inventory"
                        className="inline-block px-8 py-3 bg-[#414042] 
                                  text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                    >
                        BROWSE VEHICLES <MoveRight className="ml-2 h-6 w-6 inline" />
                    </Link>
                </div>
            )}
        </div>
    )
}
