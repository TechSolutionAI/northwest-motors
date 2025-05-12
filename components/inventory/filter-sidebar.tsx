"use client"

import { ChevronDown, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import DropdownMultiSelect from "../main/dropdown-multi-select"
import { bodyOptions, fuelOptions, locationOptions, makeOptions, modelOptions, transmissionOptions, yearOptions } from "@/lib/mock-data"
import CollapsibleFilterSection from "./collapsible-filter-section"
import PriceRangeFilter from "./price-range-filter"
import LocationFilter from "./location-filter"
import OdometerRangeFilter from "./odometer-range-filter"
import TransmissionFilter from "./transmission-filter"
import FuelFilter from "./fuel-filter"
import MoreOptionsFilter from "./more-option-filter"

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
  const [minPrice, setMinPrice] = useState("50000")
  const [maxPrice, setMaxPrice] = useState("500000")
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedDealerships, setSelectedDealerships] = useState<string[]>([])
  const [minOdometer, setMinOdometer] = useState("0")
  const [maxOdometer, setMaxOdometer] = useState("10000")
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([])
  const [selectedFuels, setSelecteFuels] = useState<string[]>([])



  return (
    <>
      {/* Mobile filter overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileFilters}></div>
      )}

      {/* Desktop sidebar - always visible on desktop */}
      <div className="hidden md:block w-[400px] bg-gray-50 p-6 border-r border-gray-200 md:h-[calc(100vh-4rem)] md:sticky md:top-16 overflow-y-auto z-20">
        <div className="space-y-2 mt-8">
          <h2 className="text-2xl">Browse Vehicles</h2>

          <h1 className="text-[40px] mb-6">
            Find Your Dream Car
          </h1>

          <div className="grid grid-cols-2 gap-2">
            <button className="bg-gray-300 px-3 py-2" aria-label="Save my search">Save My Search</button>
            <button className="bg-gray-300 px-3 py-2" aria-label="My searches">My Searches</button>
          </div>

          <div className="relative my-8">
            <Input type="text" placeholder="Find your dream car now" className="w-full pr-10" />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Filter dropdowns */}
          <div className="space-y-4">
            <DropdownMultiSelect
              title="Make"
              options={makeOptions}
              selectedValues={selectedMakes}
              onChange={setSelectedMakes} />

            <DropdownMultiSelect
              title="Model"
              options={modelOptions}
              selectedValues={selectedModels}
              onChange={setSelectedModels}
            />

            <DropdownMultiSelect
              title="Year"
              options={yearOptions}
              selectedValues={selectedYears}
              onChange={setSelectedYears} />

            <DropdownMultiSelect
              title="Body"
              options={bodyOptions}
              selectedValues={selectedBodyTypes}
              onChange={setSelectedBodyTypes}
            />
          </div>

          {/* Collapsible Price Filter */}
          <div className="mt-8 mx-4">
            <CollapsibleFilterSection title="Price">
              <PriceRangeFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
              />
            </CollapsibleFilterSection>
          </div>

          {/* Collapsible Location Filter */}
          <div className="mt-8 mx-4">
            <CollapsibleFilterSection title="Location">
              <LocationFilter
                locations={locationOptions}
                selectedLocations={selectedLocations}
                onLocationChange={setSelectedLocations}
                selectedDealerships={selectedDealerships}
                onDealershipChange={setSelectedDealerships}
              />
            </CollapsibleFilterSection>
          </div>

          {/* Collapsible Odometer Filter */}
          <div className="mt-8 mx-4">
            <CollapsibleFilterSection title="Odometer">
              <OdometerRangeFilter
                minOdemeter={minOdometer}
                maxOdometer={maxOdometer}
                onMinOdometerChange={setMinOdometer}
                onMaxOdometerChange={setMaxOdometer}
              />
            </CollapsibleFilterSection>
          </div>

          {/* Collapsible Transmission Filter */}
          <div className="mt-8 mx-4">
            <CollapsibleFilterSection title="Transmission">
              <TransmissionFilter
                transmissions={transmissionOptions}
                selectedTransmissions={selectedTransmissions}
                onTransmissionChange={setSelectedTransmissions}
              />
            </CollapsibleFilterSection>
          </div>

          {/* Collapsible Fuel Filter */}
          <div className="mt-8 mx-4">
            <CollapsibleFilterSection title="Fuel">
              <FuelFilter
                fuels={fuelOptions}
                selectedFuels={selectedFuels}
                onFuelChange={setSelecteFuels}
              />
            </CollapsibleFilterSection>
          </div>

          {/* More Options Filter */}
          <div className="mt-8 mx-4">
            <MoreOptionsFilter />
          </div>
        </div>

      </div>

      {/* Mobile sidebar - slides in from top when active */}
      <div
        className={`fixed min-h-full top-0 left-0 right-0 bg-gray-50 p-6 z-50 md:hidden overflow-y-auto transition-transform duration-300 ease-in-out ${showMobileFilters ? "translate-y-0" : "-translate-y-full"
          }`}
        style={{ maxHeight: "85vh" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Filters</h2>
          <button onClick={toggleMobileFilters} className="text-gray-700 p-2" aria-label="Close filters">
            <X />
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative my-8">
            <Input type="text" placeholder="Find your dream car now" className="w-full pr-10" />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Filter dropdowns */}
          <div className="space-y-4">
            <DropdownMultiSelect
              title="Make"
              options={makeOptions}
              selectedValues={selectedMakes}
              onChange={setSelectedMakes} />

            <DropdownMultiSelect
              title="Model"
              options={modelOptions}
              selectedValues={selectedModels}
              onChange={setSelectedModels}
            />

            <DropdownMultiSelect
              title="Year"
              options={yearOptions}
              selectedValues={selectedYears}
              onChange={setSelectedYears} />

            <DropdownMultiSelect
              title="Body"
              options={bodyOptions}
              selectedValues={selectedBodyTypes}
              onChange={setSelectedBodyTypes}
            />
          </div>

          {/* Collapsible Price Filter */}
          <div className="mt-8 mx-4">
            <CollapsibleFilterSection title="Price">
              <PriceRangeFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
              />
            </CollapsibleFilterSection>
          </div>

          {/* Collapsible Location Filter */}
          <div className="mt-8 mx-4">
            <CollapsibleFilterSection title="Location">
              <LocationFilter
                locations={locationOptions}
                selectedLocations={selectedLocations}
                onLocationChange={setSelectedLocations}
                selectedDealerships={selectedDealerships}
                onDealershipChange={setSelectedDealerships}
              />
            </CollapsibleFilterSection>
          </div>

          {/* Collapsible Odometer Filter */}
          <div className="mt-8 mx-4">
            <CollapsibleFilterSection title="Odometer">
              <OdometerRangeFilter
                minOdemeter={minOdometer}
                maxOdometer={maxOdometer}
                onMinOdometerChange={setMinOdometer}
                onMaxOdometerChange={setMaxOdometer}
              />
            </CollapsibleFilterSection>
          </div>

          {/* Collapsible Transmission Filter */}
          <div className="mt-8 mx-4">
            <CollapsibleFilterSection title="Transmission">
              <TransmissionFilter
                transmissions={transmissionOptions}
                selectedTransmissions={selectedTransmissions}
                onTransmissionChange={setSelectedTransmissions}
              />
            </CollapsibleFilterSection>
          </div>

          {/* Collapsible Fuel Filter */}
          <div className="mt-8 mx-4">
            <CollapsibleFilterSection title="Fuel">
              <FuelFilter
                fuels={fuelOptions}
                selectedFuels={selectedFuels}
                onFuelChange={setSelecteFuels}
              />
            </CollapsibleFilterSection>
          </div>

          {/* More Options Filter */}
          <div className="mt-8 mx-4">
            <MoreOptionsFilter />
          </div>
          <div className="mt-6">
            <button onClick={toggleMobileFilters} aria-label="View all filters" className="w-full bg-dark text-white py-3 rounded-md">
              VIEW ALL
            </button>
          </div>
        </div>
      </div>
    </>

  )
}
