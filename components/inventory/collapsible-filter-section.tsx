"use client"

import { MoveDown, MoveUp } from "lucide-react"
import type React from "react"

import { useState } from "react"

interface CollapsibleFilterSectionProps {
    title: string
    children: React.ReactNode
    defaultOpen?: boolean
}

export default function CollapsibleFilterSection({
    title,
    children,
    defaultOpen = false,
}: CollapsibleFilterSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between cursor-pointer py-2" onClick={() => setIsOpen(!isOpen)}>
                <h3 className="font-bold">{title}</h3>
                {isOpen ?
                    <MoveUp className="h-4 w-4 text-gray-500" /> :
                    <MoveDown className="h-4 w-4 text-gray-500" />}
            </div>

            {isOpen && <div className="mt-3">{children}</div>}

            <div className="mt-4 border-t border-gray-200"></div>
        </div>
    )
}
