"use client"

import { useMemo, useState } from "react"
import { ChevronDown } from "lucide-react"
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

      <main className="flex flex-col lg:flex-row">
        {/* Mobile filter toggle button */}
        <div className="lg:hidden sticky mt-8 z-10 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Showing {sortedVehicles.length} Cars</h2>
          <button
            onClick={toggleMobileFilters}
            className="bg-dark text-white px-4 py-2 rounded-md flex items-center text-sm"
          >
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showMobileFilters ? "rotate-180" : ""}`} />
          </button>
        </div>
        {/* Sidebar */}
        <FilterSidebar showMobileFilters={showMobileFilters} toggleMobileFilters={toggleMobileFilters} />

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between my-8">
            <h2 className="text-2xl font-semibold">Showing {sortedVehicles.length} Cars</h2>

            <div className="flex items-center">
              <SortDropdown selectedOption={sortOption} onOptionSelect={handleSortChange} />
            </div>
          </div>

          {/* Mobile sort - only visible on mobile */}
          <div className="flex lg:hidden items-center justify-end mb-4">
            <SortDropdown selectedOption={sortOption} onOptionSelect={handleSortChange} />
          </div>

          {/* Vehicle grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
          </div>
        </div>
      </main>
    </div>
  )
}
