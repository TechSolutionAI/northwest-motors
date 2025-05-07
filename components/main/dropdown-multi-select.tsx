"use client"

import { MoveDown, MoveUp } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Checkbox } from "../ui/checkbox"

interface OptionType {
    value: string
    label: string
    stock?: number
}

interface DropdownMultiSelectProps {
    title: string
    options: OptionType[]
    selectedValues: string[]
    onChange: (values: string[]) => void
}

export default function DropdownMultiSelect({ title, options, selectedValues, onChange }: DropdownMultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

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

    const handleSelect = (optionValue: string) => {
        if (selectedValues.includes(optionValue)) {
            onChange(selectedValues.filter((value) => value !== optionValue))
        } else {
            onChange([...selectedValues, optionValue])
        }
    }

    // Get selected options for display
    const selectedOptions = options.filter((option) => selectedValues.includes(option.value))

    // Create a display string for selected options
    const selectedDisplay = selectedOptions.length > 0 ? selectedOptions.map((option) => option.label).join(", ") : ""

    return (
        <div className="relative mb-4" ref={dropdownRef}>
            <div
                onClick={toggleDropdown}
                className="border border-input rounded-md  bg-white h-16 px-4 flex items-center justify-between cursor-pointer"
            >
                <div className="flex flex-col w-full overflow-hidden">
                    <span className="font-medium text-gray-700">{title}</span>
                    {selectedOptions.length > 0 && (
                        <span className="text-xs text-gray-500 mt-1 truncate" title={selectedDisplay}>
                            {selectedDisplay}
                        </span>
                    )}
                </div>
                {isOpen ? <MoveUp className="h-4 w-4 flex-shrink-0 text-[#8E6F00]" /> : <MoveDown className="h-4 w-4 flex-shrink-0 text-[#8E6F00]" />}
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <div className="flex items-center">
                                <Checkbox
                                    id={`make-${option.value}`}
                                    checked={selectedValues.includes(option.value)}
                                    onCheckedChange={() => handleSelect(option.value)}
                                    className="mr-3"
                                />
                                <span className="ml-2">{option.label}</span>
                            </div>
                            {option.stock !== undefined && <span className="text-xs text-gray-500">({option.stock})</span>}
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}
