"use client"

import { GoogleMap } from "@/components/home/google-map";
import LocationDetailInfo from "@/components/location/location-detail-info";

export default function LocationPage() {

    return (
        <main className="min-h-full bg-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8 bg-gray-100">
                {/* Location Info */}
                <div className="col-span-1 bg-white">
                    <LocationDetailInfo />
                </div>
                {/* Location Map */}
                <div className="col-span-2 px-10">
                    <p className="text-4xl pt-8">Dutton One Moorabbin</p>
                    <div className="h-[500px] lg:h-full pt-8 pb-28">
                        <GoogleMap />
                    </div>
                </div>
            </div>

        </main>
    );
}