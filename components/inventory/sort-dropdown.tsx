"use client"

import { useState, useRef, useEffect } from "react"
import { MoveDown, MoveUp, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

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

    const handleOptionSelect = (optionId: string) => {
        // Call the parent component's handler with the selected option ID
        onOptionSelect(optionId)
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown button - same for both mobile and desktop */}
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-between border px-8 py-2 rounded-md min-w-[180px]"
            >
                <span>Sort By: {getSelectedOptionLabel()}</span>
                {isOpen ? (
                    <MoveUp className="ml-2 h-4 w-4 text-[#8E6F00]" />
                ) : (
                    <MoveDown className="ml-2 h-4 w-4 text-[#8E6F00]" />
                )}
            </button>

            {/* Mobile overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>
            )}

            {/* Desktop dropdown - only visible on desktop when open */}
            {isOpen && (
                <div className="absolute right-0 z-10 mt-1 w-64 bg-white border border-gray-300 shadow-lg hidden md:block">
                    <div className="py-1">
                        {sortCategories.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="px-2 py-1">
                                {category.name && <div className="font-bold px-2 py-1">{category.name}</div>}
                                {category.options.map((option) => (
                                    <div
                                        key={option.id}
                                        className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleOptionSelect(option.id)}
                                    >
                                        <Checkbox
                                            id={`desktop-${option.id}`}
                                            checked={selectedOption === option.id}
                                            className="mr-2"
                                            onCheckedChange={() => handleOptionSelect(option.id)}
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </div>
                                ))}
                                {categoryIndex < sortCategories.length - 1 && <hr className="my-1 border-gray-200" />}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Mobile dropdown - slides up from bottom, only visible on mobile */}
            <div
                className={`fixed inset-x-0 bottom-0 z-50 bg-white border-t border-gray-300 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                {/* Mobile header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="font-bold text-3xl">Sort By</h3>
                    <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Mobile content */}
                <div className="py-1 max-h-[70vh] overflow-auto">
                    {sortCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="px-2 py-1">
                            {category.name && <div className="font-bold px-2 py-1">{category.name}</div>}
                            {category.options.map((option) => (
                                <div
                                    key={option.id}
                                    className="flex items-center px-2 py-3 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleOptionSelect(option.id)}
                                >
                                    <Checkbox
                                        id={`mobile-${option.id}`}
                                        checked={selectedOption === option.id}
                                        className="mr-2"
                                        onCheckedChange={() => handleOptionSelect(option.id)}
                                    />
                                    <span className="text-sm">{option.label}</span>
                                </div>
                            ))}
                            {categoryIndex < sortCategories.length - 1 && <hr className="my-1 border-gray-200" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
