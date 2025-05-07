"use client"

import { priceOptions } from "@/lib/mock-data"
import DropdownSelect from "../main/dropdown-select"

interface PriceRangeFilterProps {
    minPrice: string
    maxPrice: string
    onMinPriceChange: (value: string) => void
    onMaxPriceChange: (value: string) => void
}

export default function PriceRangeFilter({
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange,
}: PriceRangeFilterProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm mb-1">Min</label>
                <DropdownSelect options={priceOptions} value={minPrice} onChange={onMinPriceChange} placeholder="$0" />
            </div>

            <div>
                <label className="block text-sm mb-1">Max</label>
                <DropdownSelect options={priceOptions} value={maxPrice} onChange={onMaxPriceChange} placeholder="No limit" />
            </div>
        </div>
    )
}
