"use client"

import { ChevronDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FilterSidebarProps {
  showMobileFilters: boolean
  toggleMobileFilters: () => void
}

export default function FilterSidebar({ showMobileFilters, toggleMobileFilters }: FilterSidebarProps) {
  return (
    <div
      className={`${showMobileFilters ? "block" : "hidden"
        } lg:block w-full lg:w-80 bg-gray-50 p-6 border-r border-gray-200 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 overflow-y-auto z-20`}
    >
      <div className="flex justify-between items-center lg:hidden mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button onClick={toggleMobileFilters} className="text-gray-500 p-2" aria-label="Close filters">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <h2 className="text-2xl text-gray-500 font-light mb-4">Browse Vehicles</h2>

      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
        Find Your
        <br />
        Dream Car
      </h1>

      <div className="flex mb-6">
        <button className="bg-gray-300 text-gray-700 px-3 py-2 text-sm font-medium">Save My Search</button>
        <button className="bg-gray-200 text-gray-700 px-3 py-2 text-sm font-medium ml-2">My Searches</button>
      </div>

      <div className="relative mb-6">
        <Input type="text" placeholder="Find your dream car now" className="w-full pr-10" />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Filter dropdowns */}
      <div className="space-y-4">
        {["Make", "Model", "Year", "Body"].map((filter) => (
          <div key={filter} className="relative">
            <button className="w-full flex items-center justify-between border border-gray-300 bg-white px-4 py-2 text-left">
              <span>{filter}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        {["Price", "Location", "Odometer", "Transmission"].map((filter) => (
          <div key={filter} className="relative mb-4">
            <button className="w-full flex items-center justify-between border border-gray-300 bg-white px-4 py-2 text-left">
              <span>{filter}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 lg:hidden">
        <button onClick={toggleMobileFilters} className="w-full bg-dark text-white py-3 rounded-md">
          Apply Filters
        </button>
      </div>
    </div>
  )
}
