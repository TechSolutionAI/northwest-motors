"use client"
import { useState } from "react"
import { vehicles } from "@/lib/mock-data"
import RecentlyAddedItem from "./recently-added-item"

export default function RecentlyAdded() {
    const [recentlyAddedVehicles] = useState(vehicles.slice(0, 2))

    return (
        <div className="bg-gray-100 px-10 rounded-md  py-8">
            <div className="container">
                <h2 className="text-5xl font-normal mb-8">Recently Added</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentlyAddedVehicles.map((vehicle) => (
                        <RecentlyAddedItem key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            </div>
        </div>
    )
}
