"use client"

import { useMemo, useState } from "react"
import { ChevronDown, Menu } from "lucide-react"
import { vehicles } from "@/lib/mock-data"
import FilterSidebar from "@/components/inventory/filter-sidebar"
import VehicleCard from "@/components/inventory/vehicle-card"
import Pagination from "@/components/main/pagination"
import SortDropdown from "@/components/inventory/sort-dropdown"


export default function BrowseVehicles() {

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const vehiclesPerPage = 9

  // Mobile filter sidebar state
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Sort state
  const [sortOption, setSortOption] = useState("year-high-to-low")
  // Sort vehicles based on selected option
  const sortedVehicles = useMemo(() => {
    const sorted = [...vehicles]

    switch (sortOption) {
      case "recently-added":
        // For demo purposes, we'll just return the original order
        return sorted
      case "price-high-to-low":
        return sorted.sort((a, b) => b.price - a.price)
      case "price-low-to-high":
        return sorted.sort((a, b) => a.price - b.price)
      case "odometer-high-to-low":
        return sorted.sort((a, b) => b.km - a.km)
      case "odometer-low-to-high":
        return sorted.sort((a, b) => a.km - b.km)
      case "year-high-to-low":
        return sorted.sort((a, b) => b.year - a.year)
      case "year-low-to-high":
        return sorted.sort((a, b) => a.year - b.year)
      default:
        return sorted
    }
  }, [sortOption])

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters)
    // When opening filters, prevent body scrolling
    if (!showMobileFilters) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  // Calculate total pages
  const totalPages = Math.ceil(sortedVehicles.length / vehiclesPerPage)

  // Get current vehicles
  const indexOfLastVehicle = currentPage * vehiclesPerPage
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage
  const currentVehicles = sortedVehicles.slice(indexOfFirstVehicle, indexOfLastVehicle)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Ensure the handler correctly updates the state
  const handleSortChange = (optionId: string) => {
    setSortOption(optionId)
    // Reset to page 1 when sorting changes
    setCurrentPage(1)
  }

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex flex-col md:flex-row">
        {/* Mobile filter toggle button */}
        <div className="md:hidden sticky mt-8 z-10 bg-white p-4  flex flex-col">
          <div className="mx-4">
            <h2 className="text-lg text-gray-500">Browse Vehicles</h2>
            <h1 className="text-2xl my-4">
              Find Your Dream Car
            </h1>
          </div>
          <div className="flex justify-between">
            <div
              onClick={toggleMobileFilters}
              className="cursor-pointer border text-dark px-8 py-2 rounded-md flex items-center"
            >
              <Menu className="h-4 w-4 text-[#8E6F00]" />
              <span className="ml-4">All Filters</span>
            </div>

            {/* Mobile sort - only visible on mobile */}
            <div className="">
              <SortDropdown selectedOption={sortOption} onOptionSelect={handleSortChange} />
            </div>

          </div>
        </div>
        {/* Sidebar */}
        <FilterSidebar showMobileFilters={showMobileFilters} toggleMobileFilters={toggleMobileFilters} />

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between md:my-8">
            <h2 className="text-2xl hidden md:block">Showing {sortedVehicles.length} Cars</h2>

            <div className="hidden md:flex items-center">
              <SortDropdown selectedOption={sortOption} onOptionSelect={handleSortChange} />
            </div>
          </div>

          {/* Vehicle grid */}
          <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </section>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
          </div>
        </div>
      </main>
    </div>
  )
}
