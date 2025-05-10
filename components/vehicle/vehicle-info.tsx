import { Car, CarFront, CircleGauge, Fuel, MoveRight, Phone, Share } from "lucide-react";
import Link from "next/link";

interface VehicleInfoProps {
    vehicle: Vehicle
}

export default function VehicleInfo({ vehicle }: VehicleInfoProps) {

    return (
        <div className="col-span-1">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    <span className="text-black">{vehicle.make}</span>{" "}
                    <span className="text-[#8E6F00]">{vehicle.model}</span>{" "}
                    <span className="text-gray-500 text-xl">{vehicle.year}</span>
                </h1>
                <p className="text-lg font-medium mt-1">{vehicle.trim}</p>
                <div className="mt-2">
                    <p className="text-2xl font-bold">
                        ${vehicle.price.toLocaleString()}{" "}
                        <span className="text-sm font-normal text-gray-500">Exc. Gov. Charges</span>
                    </p>
                </div>
            </div>

            <div className="border mb-4"></div>

            {/* Vehicle Specs */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                    <CircleGauge className="mr-3" />
                    <div>
                        <p className="text-lg font-bold">{vehicle.km.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">KILOMETERS</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <CarFront className="mr-3" />
                    <div>
                        <p className="text-lg font-bold">{vehicle.transmission}</p>
                        <p className="text-xs text-gray-500">TRANSMISSION</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Fuel className="mr-3" />
                    <div>
                        <p className="text-lg font-bold">{vehicle.fuel}</p>
                        <p className="text-xs text-gray-500">FUEL</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Car className="mr-3" />
                    <div>
                        <p className="text-lg font-bold">Wagon</p>
                        <p className="text-xs text-gray-500">BODY TYPE</p>
                    </div>
                </div>
            </div>

            <div className="border mb-4"></div>

            {/* Finance Estimates */}
            <div className="mb-6">
                <h2 className="text-xl text-[#8E6F00] mb-4">FINANCE ESTIMATES</h2>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-lg font-bold">${vehicle.weeklyPayment.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Per Week</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold">{vehicle.comparisonRate}%</p>
                        <p className="text-xs text-gray-500">p.a Comparison Rate</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold">5 Year Term</p>
                        <p className="text-xs text-gray-500"></p>
                    </div>
                </div>
                <Link
                    href="tel:+1300341911"
                    className="border border-gray-300 p-4 my-8 flex items-center justify-center 
                                        hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
                    <Phone className="h-5 w-5 mr-4" />
                    <span>CALL 1300 341 911</span>
                </Link>
                <div className="grid grid-cols-2 border-b-4 border-[#8E6F00]">
                    <Link
                        href=""
                        className="flex items-center justify-center p-4 bg-gray-200 text-dark 
                                        hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                    >
                        ADD TO WISHLIST <MoveRight className="ml-2 h-6 w-6" />
                    </Link>
                    <Link
                        href={`/inventory/enquire/${vehicle.id}`}
                        className="flex items-center justify-center p-4 bg-[#414042] 
                                        text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                    >
                        ENQUIRE <MoveRight className="ml-2 h-6 w-6" />
                    </Link>
                </div>
            </div>

            {/* Location */}
            <div className="">
                <div className="bg-gray-200 p-4 flex flex-col justify-center items-center">
                    <p className="text-lg font-bold text-gray-500">THIS VEHICLE IS LOCATED AT</p>
                    <p className="text-lg font-bold">Dutton One Box Hill</p>

                </div>
                <div className="flex flex-row justify-between mt-1">
                    <button className="flex items-center text-gray-600 mt-2">
                        <Share className="h-4 w-4 mr-2" />
                        <span className="underline underline-offset-2">Share this vehicle</span>
                    </button>
                    <button className="flex items-center text-gray-600 mt-2">
                        <span className="underline underline-offset-2">Show VIN</span>
                    </button>

                </div>
            </div>
        </div>
    );
}