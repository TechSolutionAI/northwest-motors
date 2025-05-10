import { notFound } from "next/navigation"

import { carGallery, vehicles } from "@/lib/mock-data"
import VehicleInfo from "@/components/vehicle/vehicle-info"
import VehicleGallery from "@/components/vehicle/vehicle-gallery"
import VehicleInfoNav from "@/components/vehicle/vehicle-info-nav"
import AboutThis from "@/components/vehicle/about-this"
import VehicleLoanCalculator from "@/components/vehicle/vehicle-loan-calculator"
import VehicleLocation from "@/components/vehicle/vehicle-location"

export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
    const vehicleId = Number.parseInt(params.id)
    const vehicle = vehicles.find((v) => v.id === vehicleId)

    if (!vehicle) {
        notFound()
    }

    return (
        <main className="bg-gray-100">
            {/* Vehicle Detail Section */}
            <div className="pt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
                    {/* Left Column - Images */}
                    <VehicleGallery vehicle={vehicle} images={carGallery} />
                    {/* Right Column - Vehicle Info */}
                    <VehicleInfo vehicle={vehicle} />
                </div>

                {/* Tabs Navigation */}
                <div className="sticky top-20 z-100">
                    <VehicleInfoNav vehicle={vehicle} />
                </div>

                {/* About Section */}
                <div id="about" className="bg-white">
                    <AboutThis vehicle={vehicle} />
                </div>

                <div className="border border-black"></div>

                {/* Finance Calculator Section */}
                <div id="finance" className="">
                    <VehicleLoanCalculator vehicle={vehicle} />
                </div>

                <div className="border border-black"></div>

                {/* Location Section */}
                <div id="location">
                    <VehicleLocation vehicle={vehicle} />
                </div>
            </div>
        </main>
    )
}
