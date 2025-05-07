"use client"

import { ChevronDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import FilterDropdown from "../main/filter-dropdown"
import { bodyOptions, makeOptions, modelOptions, yearOptions } from "@/lib/mock-data"

interface FilterSidebarProps {
  showMobileFilters: boolean
  toggleMobileFilters: () => void
}

export default function FilterSidebar({ showMobileFilters, toggleMobileFilters }: FilterSidebarProps) {

  // Filter Dropdown
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([])

  return (
    <div
      className={`${showMobileFilters ? "block" : "hidden"
        } lg:block w-[80] bg-gray-50 p-6 border-r border-gray-200 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 overflow-y-auto z-20`}
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

      <h2 className="text-[28px] mt-8 text-gray-500 font-light mb-4">Browse Vehicles</h2>

      <h1 className="text-[40px] mb-6">
        Find Your Dream Car
      </h1>

      <div className="grid grid-cols-2 gap-2">
        <button className="bg-gray-300 px-3 py-2">Save My Search</button>
        <button className="bg-gray-300 px-3 py-2">My Searches</button>
      </div>

      <div className="relative my-8">
        <Input type="text" placeholder="Find your dream car now" className="w-full pr-10" />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Filter dropdowns */}
      <div className="space-y-4">
        <FilterDropdown
          title="Make"
          options={makeOptions}
          selectedValues={selectedMakes}
          onChange={setSelectedMakes} />

        <FilterDropdown
          title="Model"
          options={modelOptions}
          selectedValues={selectedModels}
          onChange={setSelectedModels}
        />

        <FilterDropdown
          title="Year"
          options={yearOptions}
          selectedValues={selectedYears}
          onChange={setSelectedYears} />

        <FilterDropdown
          title="Body"
          options={bodyOptions}
          selectedValues={selectedBodyTypes}
          onChange={setSelectedBodyTypes}
        />
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
