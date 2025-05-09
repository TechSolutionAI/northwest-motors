import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image"


interface VehicleGalleryProps {
    vehicle: Vehicle
}

export default function VehicleGallery({ vehicle }: VehicleGalleryProps) {
    return (
        <div className="relative col-span-2">
            {/* Main Image */}
            <div className="relative h-[500px] mb-4 bg-gray-100 rounded-md overflow-hidden">
                <Image
                    src={
                        vehicle.image
                            ? vehicle.image
                            : "/placeholder.svg?height=400&width=600&query=car"
                    }
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute bottom-4 left-4 bg-white p-2 rounded-md">
                    <span className="text-sm font-medium">1/36</span>
                </div>
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                    <ChevronRight className="h-5 w-5" />
                </button>
                <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                    <ChevronLeft className="h-5 w-5" />
                </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                            src={
                                vehicle.image
                                    ? vehicle.image
                                    : `/placeholder.svg?height=80&width=100&query=car+angle+${i + 1}`
                            }
                            alt={`${vehicle.make} ${vehicle.model} view ${i + 1}`}
                            width={100}
                            height={80}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
            </div>
        </div>

    );
}