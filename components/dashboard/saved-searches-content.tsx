"use client"

import Link from "next/link"
import { ArrowLeft, Search, Trash2 } from "lucide-react"
import { useState } from "react"

// Mock data for saved searches
const initialSavedSearches = [
    {
        id: 1,
        name: "SUVs under $50,000",
        criteria: "Body Type: SUV, Price: $0-$50,000, Fuel Type: Any",
        date: "15 Apr 2023",
        results: 24,
    },
    {
        id: 2,
        name: "Tesla Models",
        criteria: "Make: Tesla, Model: Any, Year: 2020-2023",
        date: "03 Mar 2023",
        results: 8,
    },
    {
        id: 3,
        name: "Family Vehicles",
        criteria: "Body Type: Wagon/SUV, Seats: 5+, Price: $30,000-$80,000",
        date: "28 Feb 2023",
        results: 36,
    },
]

export function SavedSearchesContent() {
    const [savedSearches, setSavedSearches] = useState(initialSavedSearches)

    const handleDelete = (id: number) => {
        setSavedSearches(savedSearches.filter((search) => search.id !== id))
    }

    return (
        <div className="container mx-auto px-4 pt-32 pb-16 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link href="/dashboard" className="flex items-center text-gray-600 mb-8 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Dashboard
                </Link>

                <h1 className="text-3xl font-medium text-gray-700 mb-8">Saved Searches</h1>

                {savedSearches.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h2 className="text-xl font-medium text-gray-600 mb-2">No saved searches</h2>
                        <p className="text-gray-700 mb-6">You haven't saved any vehicle searches yet.</p>
                        <Link
                            href="/inventory"
                            className="inline-flex items-center bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                        >
                            Browse Vehicles
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {savedSearches.map((search) => (
                            <div key={search.id} className="border border-gray-200 rounded-lg p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-xl font-medium">{search.name}</h2>
                                        <p className="text-gray-700 text-sm">Saved on {search.date}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(search.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        aria-label="Delete saved search"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>

                                <p className="text-gray-600 mb-4">{search.criteria}</p>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">{search.results} vehicles match your criteria</span>
                                    <Link
                                        href={`/inventory?saved=${search.id}`}
                                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                                    >
                                        View Results
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
