"use client"

import { MoveDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface DropdownOption {
    value: string
    label: string
}

interface DropdownSelectProps {
    options: DropdownOption[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export default function DropdownSelect({
    options,
    value,
    onChange,
    placeholder = "Select...",
    className = "",
}: DropdownSelectProps) {
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

    const selectedOption = options.find((option) => option.value === value)

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between border border-gray-300 bg-white px-3 py-2 text-left"
            >
                <span>{selectedOption ? selectedOption.label : placeholder}</span>
                <MoveDown className="h-5 w-5 text-[#8E6F00]" />
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onChange(option.value)
                                setIsOpen(false)
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
