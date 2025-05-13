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
                <p className="font-bold">{title}</p>
                {isOpen ?
                    <MoveUp className="h-4 w-4 text-gray-700" /> :
                    <MoveDown className="h-4 w-4 text-gray-700" />}
            </div>

            {isOpen && <div className="mt-3">{children}</div>}

            <div className="mt-4 border-t border-gray-200"></div>
        </div >
    )
}
