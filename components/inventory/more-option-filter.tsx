"use client"

import { MoveDown, MoveUp } from "lucide-react"
import { useState } from "react"
import DropdownMultiSelect from "../main/dropdown-multi-select"
import { colourOptions, cylinderOptions, doorsOptions, engineSizeOptions, fuelEconomyOptions, lifestyleOptions, seatsOptions, torqueOptions, towOptions } from "@/lib/mock-data"
import DropdownSelect from "../main/dropdown-select"

export default function MoreOptionsFilter() {
    // State for multi-select dropdowns
    const [selectedCylinders, setSelectedCylinders] = useState<string[]>([])
    const [selectedEngineSizes, setSelectedEngineSizes] = useState<string[]>([])
    const [selectedFuelEconomy, setSelectedFuelEconomy] = useState<string[]>([])
    const [selectedDoors, setSelectedDoors] = useState<string[]>([])
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])
    const [selectedLifestyles, setSelectedLifestyles] = useState<string[]>([])
    const [selectedColours, setSelectedColours] = useState<string[]>([])

    // State for single-select dropdowns
    const [minTow, setMinTow] = useState("")
    const [maxTow, setMaxTow] = useState("")

    const [minTorque, setMinTorque] = useState("")
    const [maxTorque, setMaxTorque] = useState("")


    // State for collapsible section
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="mb-6">
            {/* More Options header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full py-2 mb-4"
            >
                <h3 className="font-medium text-lg">More Options</h3>
                {isExpanded ? (
                    <MoveUp className="h-4 w-4 text-gray-700" />
                ) : (
                    <MoveDown className="h-4 w-4 text-gray-700" />
                )}
            </button>

            {/* Collapsible content */}
            {isExpanded && (
                <div className="space-y-6">
                    {/* Engine section */}
                    <div>
                        <h4 className="font-bold mb-4">Engine</h4>
                        <div className="space-y-4">
                            <DropdownMultiSelect
                                title="Cylinder"
                                options={cylinderOptions}
                                selectedValues={selectedCylinders}
                                onChange={setSelectedCylinders}
                            />

                            <DropdownMultiSelect
                                title="Engine Size (cc)"
                                options={engineSizeOptions}
                                selectedValues={selectedEngineSizes}
                                onChange={setSelectedEngineSizes}
                            />

                            <DropdownMultiSelect
                                title="Fuel Economy"
                                options={fuelEconomyOptions}
                                selectedValues={selectedFuelEconomy}
                                onChange={setSelectedFuelEconomy}
                            />

                            {/* Tow capacity */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Tow (braked)</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs mb-1">Min</label>
                                        <DropdownSelect
                                            options={towOptions}
                                            value={minTow}
                                            onChange={setMinTow}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs mb-1">Max</label>
                                        <DropdownSelect
                                            options={towOptions}
                                            value={maxTow}
                                            onChange={setMaxTow}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Torque */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Torque (Nm)</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs mb-1">Min</label>
                                        <DropdownSelect
                                            options={torqueOptions}
                                            value={minTorque}
                                            onChange={setMinTorque}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs mb-1">Max</label>
                                        <DropdownSelect
                                            options={torqueOptions}
                                            value={maxTorque}
                                            onChange={setMaxTorque}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Style section */}
                    <div>
                        <h4 className="font-bold mb-4">Style</h4>
                        <div className="space-y-4">
                            <DropdownMultiSelect
                                title="Doors"
                                options={doorsOptions}
                                selectedValues={selectedDoors}
                                onChange={setSelectedDoors}
                            />

                            <DropdownMultiSelect
                                title="Seats"
                                options={seatsOptions}
                                selectedValues={selectedSeats}
                                onChange={setSelectedSeats}
                            />

                            <DropdownMultiSelect
                                title="Lifestyle"
                                options={lifestyleOptions}
                                selectedValues={selectedLifestyles}
                                onChange={setSelectedLifestyles}
                            />

                            <DropdownMultiSelect
                                title="Colour"
                                options={colourOptions}
                                selectedValues={selectedColours}
                                onChange={setSelectedColours}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
