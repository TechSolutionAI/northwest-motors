"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MessageSquare, Car } from "lucide-react"
import { useState } from "react"

// Mock data for enquiry history
const initialEnquiries = [
    {
        id: 1,
        vehicleId: 101,
        vehicleName: "2022 BMW X5 xDrive40i",
        vehicleImage: "/car1.webp",
        date: "12 May 2023",
        status: "Responded",
        message: "I'm interested in this X5. Is it still available? Do you offer financing options?",
    },
    {
        id: 2,
        vehicleId: 102,
        vehicleName: "2021 Tesla Model 3 Long Range",
        vehicleImage: "/car2.webp",
        date: "28 Apr 2023",
        status: "Pending",
        message: "What's the battery health on this Model 3? Has it had any accidents?",
    },
    {
        id: 3,
        vehicleId: 103,
        vehicleName: "2023 Audi Q5 Sportback",
        vehicleImage: "/car3.webp",
        date: "15 Apr 2023",
        status: "Closed",
        message: "Can I schedule a test drive for this Q5 next weekend? I'm also curious about the warranty.",
    },
]

export function EnquiryHistoryContent() {
    const [enquiries] = useState(initialEnquiries)

    return (
        <div className="container mx-auto px-4 pt-32 pb-16 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link href="/dashboard" className="flex items-center text-gray-600 mb-8 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Dashboard
                </Link>

                <h1 className="text-3xl font-medium text-gray-700 mb-8">Enquiry History</h1>

                {enquiries.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <MessageSquare className="h-12 w-12 mx-auto text-gray-700 mb-4" />
                        <h2 className="text-xl font-medium text-gray-600 mb-2">No enquiries yet</h2>
                        <p className="text-gray-700 mb-6">You haven't made any vehicle enquiries.</p>
                        <Link
                            href="/inventory"
                            className="inline-flex items-center bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                        >
                            Browse Vehicles
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {enquiries.map((enquiry) => (
                            <div key={enquiry.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 h-48 relative">
                                        <Image
                                            src={enquiry.vehicleImage || "/car-placeholder.webp"}
                                            alt={enquiry.vehicleName}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw,
                                            (max-width: 1024px) 50vw,
                                            (max-width: 1280px) 33vw,
                                            25vw"
                                            quality={80}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <div className="flex justify-between items-start mb-2">
                                            <h2 className="text-xl font-medium">{enquiry.vehicleName}</h2>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${enquiry.status === "Responded"
                                                    ? "bg-green-100 text-green-800"
                                                    : enquiry.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {enquiry.status}
                                            </span>
                                        </div>

                                        <p className="text-gray-700 text-sm mb-4">Enquiry date: {enquiry.date}</p>

                                        <div className="bg-gray-50 p-3 rounded-md mb-4">
                                            <p className="text-gray-600">{enquiry.message}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <Link
                                                href={`/inventory/${enquiry.vehicleId}`}
                                                className="inline-flex items-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                                            >
                                                <Car className="h-4 w-4 mr-2" />
                                                View Vehicle
                                            </Link>

                                            {enquiry.status !== "Closed" && (
                                                <Link
                                                    href={`/contact?enquiry=${enquiry.id}`}
                                                    className="inline-flex items-center border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
                                                >
                                                    <MessageSquare className="h-4 w-4 mr-2" />
                                                    Contact Dealer
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
