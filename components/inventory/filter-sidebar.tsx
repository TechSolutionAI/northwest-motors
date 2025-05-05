import { ChevronDown, Search } from "lucide-react"
import { Input } from "../ui/input"

export default function FilterSidebar() {
  return (
    <div className="w-full md:w-96 bg-[#E6E7E8] p-6 pt-16 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <h2 className="text-2xl text-gray-500 font-light mb-6">Browse Vehicles</h2>

      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Find Your
        <br />
        Dream Car
      </h1>

      <div className="flex flex-col-2 gap-2 mb-6">
        <button className="bg-gray-500 text-white px-4 py-2 text-sm font-medium w-full">Save My Search</button>
        <button className="bg-gray-500 text-white px-4 py-2 text-sm font-medium w-full">My Searches</button>
      </div>

      <div className="relative mb-6">
        <Input type="text" placeholder="Find your dream car now" className="w-full pr-10" />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Filter dropdowns */}
      <div className="space-y-4">
        {["Make", "Model", "Year", "Body"].map((filter) => (
          <div key={filter} className="relative">
            <button className="w-full flex items-center justify-between border border-gray-300 bg-white px-4 py-2 text-left">
              <span>{filter}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200">
        {["Price", "Location", "Odometer", "Transmission"].map((filter) => (
          <div key={filter} className="relative mb-4">
            <button className="w-full flex items-center justify-between border border-gray-300 bg-white px-4 py-2 text-left">
              <span>{filter}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
