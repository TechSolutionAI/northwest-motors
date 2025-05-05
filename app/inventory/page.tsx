"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { vehicles } from "@/lib/mock-data"
import FilterSidebar from "@/components/inventory/filter-sidebar"
import VehicleCard from "@/components/inventory/vehicle-card"
import Pagination from "@/components/main/pagination"


export default function BrowseVehicles() {

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const vehiclesPerPage = 9

  // Calculate total pages
  const totalPages = Math.ceil(vehicles.length / vehiclesPerPage)

  // Get current vehicles
  const indexOfLastVehicle = currentPage * vehiclesPerPage
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex flex-col md:flex-row pt-16">
        {/* Sidebar */}
        <FilterSidebar />

        {/* Main content */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Showing {vehicles.length} Cars</h2>

            <div className="flex items-center">
              <span className="mr-2 text-sm">Sort By:</span>
              <button className="flex items-center border border-gray-300 px-3 py-1 text-sm">
                Year, high to low
                <ChevronDown className="ml-2 h-4 w-4 text-gold-500" />
              </button>
            </div>
          </div>

          {/* Vehicle grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
