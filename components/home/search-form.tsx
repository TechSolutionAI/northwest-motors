"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUp, ArrowDown, MoveRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { locationOptions, makeOptions, modelOptions } from "@/lib/mock-data"

interface SearchFormProps {
  simplified?: boolean
}

export function SearchForm({ simplified = false }: SearchFormProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

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

  // Helper function to toggle selection in an array
  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  // Helper function to get labels for selected values
  const getSelectedLabels = (
    selected: string[],
    options: { value: string; label: string; stock: number }[],
  ): string => {
    if (selected.length === 0) return ""
    return selected.map((value) => options.find((option) => option.value === value)?.label || value).join(", ")
  }

  // Helper function to get all selected labels for display
  const getSelectedLabelsForDisplay = (
    selected: string[],
    options: { value: string; label: string; stock: number }[],
  ): string => {
    if (selected.length === 0) return ""
    return selected.map((value) => options.find((option) => option.value === value)?.label || value).join(", ")
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-4">
      <div className="space-y-2">
        <Popover open={openDropdown === "make"} onOpenChange={(open: any) => setOpenDropdown(open ? "make" : null)}>
          <PopoverTrigger asChild>
            <div className="relative">
              <div className="border border-input rounded-md  bg-white h-16 px-4 flex items-center justify-between cursor-pointer">
                <div className="flex flex-col w-full overflow-hidden">
                  <span className="text-black">Make</span>
                  {selectedMakes.length > 0 ? (
                    <span className="font-medium text-xs truncate">
                      {getSelectedLabelsForDisplay(selectedMakes, makeOptions)}
                    </span>
                  ) : null}
                </div>
                {openDropdown === "make" ? (
                  <ArrowUp className="h-5 w-5 text-[#8E6F00] flex-shrink-0 ml-2" />
                ) : (
                  <ArrowDown className="h-5 w-5 text-[#8E6F00] flex-shrink-0 ml-2" />
                )}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 border border-input" align="start">
            <div className="max-h-60 overflow-y-auto">
              {makeOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center justify-between px-4 py-2 hover:bg-muted border-b border-input last:border-0"
                >
                  <div className="flex items-center">
                    <Checkbox
                      id={`make-${option.value}`}
                      checked={selectedMakes.includes(option.value)}
                      onCheckedChange={() => toggleSelection(option.value, selectedMakes, setSelectedMakes)}
                      className="mr-3"
                    />
                    <label htmlFor={`make-${option.value}`} className="cursor-pointer text-sm">
                      {option.label}
                    </label>
                  </div>
                  <span className="text-muted-foreground text-sm">({option.stock})</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Popover open={openDropdown === "model"} onOpenChange={(open: any) => setOpenDropdown(open ? "model" : null)}>
          <PopoverTrigger asChild>
            <div className="relative">
              <div className="border border-input rounded-md  bg-white h-16 px-4 flex items-center justify-between cursor-pointer">
                <div className="flex flex-col w-full overflow-hidden">
                  <span className="text-black">Model</span>
                  {selectedModels.length > 0 ? (
                    <span className="font-medium text-xs truncate">
                      {getSelectedLabelsForDisplay(selectedModels, modelOptions)}
                    </span>
                  ) : null}
                </div>
                {openDropdown === "model" ? (
                  <ArrowUp className="h-5 w-5 text-[#8E6F00] flex-shrink-0 ml-2" />
                ) : (
                  <ArrowDown className="h-5 w-5 text-[#8E6F00] flex-shrink-0 ml-2" />
                )}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 border border-input" align="start">
            <div className="max-h-60 overflow-y-auto">
              {modelOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center justify-between px-4 py-2 hover:bg-muted border-b border-input last:border-0"
                >
                  <div className="flex items-center">
                    <Checkbox
                      id={`model-${option.value}`}
                      checked={selectedModels.includes(option.value)}
                      onCheckedChange={() => toggleSelection(option.value, selectedModels, setSelectedModels)}
                      className="mr-3"
                    />
                    <label htmlFor={`model-${option.value}`} className="cursor-pointer text-sm">
                      {option.label}
                    </label>
                  </div>
                  <span className="text-muted-foreground text-sm">({option.stock})</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Popover open={openDropdown === "location"} onOpenChange={(open: any) => setOpenDropdown(open ? "location" : null)}>
          <PopoverTrigger asChild>
            <div className="relative">
              <div className="border border-input rounded-md  bg-white h-16 px-4 flex items-center justify-between cursor-pointer">
                <div className="flex flex-col w-full overflow-hidden">
                  <span className="text-black">Location</span>
                  {selectedLocations.length > 0 ? (
                    <span className="font-medium text-xs truncate">
                      {getSelectedLabelsForDisplay(selectedLocations, locationOptions)}
                    </span>
                  ) : null}
                </div>
                {openDropdown === "location" ? (
                  <ArrowUp className="h-5 w-5 text-[#8E6F00] flex-shrink-0 ml-2" />
                ) : (
                  <ArrowDown className="h-5 w-5 text-[#8E6F00] flex-shrink-0 ml-2" />
                )}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 border border-input" align="start">
            <div className="max-h-60 overflow-y-auto">
              {locationOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center justify-between px-4 py-2 hover:bg-muted border-b border-input last:border-0"
                >
                  <div className="flex items-center">
                    <Checkbox
                      id={`location-${option.value}`}
                      checked={selectedLocations.includes(option.value)}
                      onCheckedChange={() => toggleSelection(option.value, selectedLocations, setSelectedLocations)}
                      className="mr-3"
                    />
                    <label htmlFor={`location-${option.value}`} className="cursor-pointer text-sm">
                      {option.label}
                    </label>
                  </div>
                  <span className="text-muted-foreground text-sm">({option.stock})</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Button type="submit" className="w-full h-16 text-base flex items-center justify-center bg-[#414042] hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
          <span>{"Show me 100 Cars"}</span>
          <MoveRight className="h-10 w-10"/>
        </Button>
      </div>
    </form>
  )
}
