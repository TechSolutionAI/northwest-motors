"use client"

import { odometerOptions } from "@/lib/mock-data"
import DropdownSelect from "../main/dropdown-select"

interface OdometerRangeFilterProps {
    minOdemeter: string
    maxOdometer: string
    onMinOdometerChange: (value: string) => void
    onMaxOdometerChange: (value: string) => void
}

export default function OdometerRangeFilter({
    minOdemeter,
    maxOdometer,
    onMinOdometerChange,
    onMaxOdometerChange,
}: OdometerRangeFilterProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm mb-1">Min</label>
                <DropdownSelect options={odometerOptions} value={minOdemeter} onChange={onMinOdometerChange} placeholder="$0" />
            </div>

            <div>
                <label className="block text-sm mb-1">Max</label>
                <DropdownSelect options={odometerOptions} value={maxOdometer} onChange={onMaxOdometerChange} placeholder="No limit" />
            </div>
        </div>
    )
}
