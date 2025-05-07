"use client"

import { dealershipOptions } from "@/lib/mock-data"
import FilterDropdown from "../main/dropdown-multi-select"

interface LocationOption {
    value: string
    label: string
}

interface LocationFilterProps {
    locations: LocationOption[]
    selectedLocations: string[]
    onLocationChange: (locations: string[]) => void
    selectedDealerships: string[]
    onDealershipChange: (dealerships: string[]) => void
}

export default function LocationFilter({
    locations,
    selectedLocations,
    onLocationChange,
    selectedDealerships,
    onDealershipChange,
}: LocationFilterProps) {
    const toggleLocation = (value: string) => {
        if (selectedLocations.includes(value)) {
            onLocationChange(selectedLocations.filter((loc) => loc !== value))
        } else {
            onLocationChange([...selectedLocations, value])
        }
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-3">
                {locations.map((location) => (
                    <div
                        key={location.value}
                        onClick={() => toggleLocation(location.value)}
                        className={`py-3 px-2 text-center cursor-pointer rounded-sm ${selectedLocations.includes(location.value)
                            ? "bg-dark text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                    >
                        {location.label}
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <FilterDropdown
                    title="DEALERSHIP"
                    options={dealershipOptions}
                    selectedValues={selectedDealerships}
                    onChange={onDealershipChange}
                />
            </div>
        </div>
    )
}
