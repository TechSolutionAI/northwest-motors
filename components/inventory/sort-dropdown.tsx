"use client"

import { useState, useRef, useEffect } from "react"
import { Check, MoveDown, MoveUp } from "lucide-react"

type SortOption = {
    id: string
    label: string
}

type SortCategory = {
    name: string
    options: SortOption[]
}

interface SortDropdownProps {
    selectedOption: string
    onOptionSelect: (optionId: string) => void
}

export default function SortDropdown({ selectedOption, onOptionSelect }: SortDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Sort categories and options
    const sortCategories: SortCategory[] = [
        {
            name: "",
            options: [{ id: "recently-added", label: "Recently Added" }],
        },
        {
            name: "Price",
            options: [
                { id: "price-high-to-low", label: "High to low" },
                { id: "price-low-to-high", label: "Low to high" },
            ],
        },
        {
            name: "Odometer",
            options: [
                { id: "odometer-high-to-low", label: "High to low" },
                { id: "odometer-low-to-high", label: "Low to high" },
            ],
        },
        {
            name: "Year",
            options: [
                { id: "year-high-to-low", label: "High to low" },
                { id: "year-low-to-high", label: "Low to high" },
            ],
        },
    ]

    // Find the selected option label
    const getSelectedOptionLabel = (): string => {
        for (const category of sortCategories) {
            const option = category.options.find((opt) => opt.id === selectedOption)
            if (option) {
                return category.name ? `${category.name}, ${option.label}` : option.label
            }
        }
        return "Sort By"
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    // Update the handleOptionSelect function to make it more explicit and ensure it works correctly
    const handleOptionSelect = (optionId: string) => {
        // Call the parent component's handler with the selected option ID
        onOptionSelect(optionId)
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-between border border-gray-300 bg-white px-3 py-2 text-sm min-w-[180px]"
            >
                <span>Sort By: {getSelectedOptionLabel()}</span>
                {isOpen ? (
                    <MoveUp className="ml-2 h-4 w-4 text-[#8E6F00]" />
                ) : (
                    <MoveDown className="ml-2 h-4 w-4 text-[#8E6F00]" />
                )}
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 z-10 mt-1 w-64 bg-white border border-gray-300 shadow-lg">
                    <div className="py-1">
                        {sortCategories.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="px-2 py-1">
                                {category.name && <div className="font-medium text-sm px-2 py-1">{category.name}</div>}
                                {/* Update the dropdown menu options to use onClick instead of relying on label behavior */}
                                {category.options.map((option) => (
                                    <div
                                        key={option.id}
                                        className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleOptionSelect(option.id)}
                                    >
                                        <div className="w-5 h-5 border border-gray-300 rounded-sm flex items-center justify-center mr-2 relative">
                                            {selectedOption === option.id && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-dark text-white">
                                                    <Check className="h-3 w-3" />
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-sm">{option.label}</span>
                                    </div>
                                ))}
                                {categoryIndex < sortCategories.length - 1 && <hr className="my-1 border-gray-200" />}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
