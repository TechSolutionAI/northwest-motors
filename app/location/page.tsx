"use client"

import { GoogleMap } from "@/components/home/google-map";
import LocationInfo from "@/components/location/location-info";
import LocationNavInfo from "@/components/location/location-nav-info";
import { useState } from "react";

export default function LocationPage() {
    const [tabIndex, setTabIndex] = useState(0);

    const tabClicked = (index: number) => {
        setTabIndex(index);

        // Scroll will be handled in useEffect after state update
        // Get the header height (assuming header has a fixed height or can be queried)
        const headerHeight = document.querySelector("header")?.offsetHeight || 80

        // Scroll to the tabs section, positioning it just below the header
        window.scrollTo({
            top:
                (document.querySelector("#location-tab")?.getBoundingClientRect()?.top ?? 0) + window.scrollY - headerHeight,
            behavior: "smooth",
        })

    }

    return (
        <main className="min-h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8 bg-gray-100">
                {/* Location Info */}
                <div className="col-span-1">
                    <LocationInfo tabClicked={tabClicked} />
                </div>
                {/* Location Map */}
                <div className="col-span-2 px-10 h-[500px] lg:h-full py-10">
                    <GoogleMap />
                </div>
            </div>
            <div>
                <LocationNavInfo index={tabIndex} tabClicked={tabClicked} />
            </div>
        </main>
    );
}