"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import { locationOptions, makeOptions, modelOptions } from "@/lib/mock-data"
import DropdownMultiSelect from "../main/dropdown-multi-select"

interface SearchFormProps {
  simplified?: boolean
}

export function SearchForm({ simplified = false }: SearchFormProps) {
  const router = useRouter()

  // Update state to handle multiple selections
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])

  // Only render translated content after mounting to avoid hydration mismatch
  useEffect(() => {
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()

    // Join selected values with commas for URL parameters
    if (selectedMakes.length > 0) {
      params.append("make", selectedMakes.join(","))
    }
    if (selectedModels.length > 0) {
      params.append("model", selectedModels.join(","))
    }
    if (selectedLocations.length > 0) {
      params.append("location", selectedLocations.join(","))
    }

    router.push(`/inventory?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-4">
      {/* Filter dropdowns */}
      <div className="space-y-2">
        <DropdownMultiSelect
          title="Make"
          options={makeOptions}
          selectedValues={selectedMakes}
          onChange={setSelectedMakes} />
      </div>
      <div className="space-y-2">
        <DropdownMultiSelect
          title="Model"
          options={modelOptions}
          selectedValues={selectedModels}
          onChange={setSelectedModels}
        />
      </div>
      <div className="space-y-2">
        <DropdownMultiSelect
          title="Location"
          options={locationOptions}
          selectedValues={selectedLocations}
          onChange={setSelectedLocations}
        />
      </div>

      <div className="space-y-2">
        <Button aria-label="Submit" type="submit" className="w-full h-16 text-base flex items-center justify-center bg-[#414042] hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
          <span>{"Show me 100 Cars"}</span>
          <MoveRight className="h-10 w-10" />
        </Button>
      </div>
    </form>
  )
}
