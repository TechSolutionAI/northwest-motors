import { MoveRight } from "lucide-react";
import Link from "next/link";

interface VehicleInfoNavProps {
    vehicle: Vehicle
}

export default function VehicleInfoNav({ vehicle }: VehicleInfoNavProps) {
    return (
        <div className="mt-12 border-b-2 border-b-gray-600 bg-white z-100">
            <div className="flex space-x-8 justify-between">
                <div className="py-4 pl-10">
                    <span className="text-black lg:text-3xl font-bold font-krona">{vehicle.make}</span>{" "}
                    <span className="text-[#8E6F00] lg:text-3xl font-bold font-krona ml-3">{vehicle.model}</span>{" "}
                    <span className="lg:text-2xl font-bold ml-3">
                        ${vehicle.price.toLocaleString()}{" "}
                    </span>
                    <span className="">Exc. Gov. Charges</span>

                </div>
                <div className="flex items-center">
                    <Link href="#about" className="px-4 py-2">ABOUT THE CAR</Link>
                    <Link href="#finance" className="px-4 py-2">FINANCE</Link>
                    <Link href="#location" className="px-4 py-2">LOCATION</Link>
                    <Link
                        href=""
                        className="flex items-center justify-center bg-[#414042] px-16 h-full
                                        text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                    >
                        ENQUIRE <MoveRight className="ml-2 h-6 w-6" />
                    </Link>
                </div>

            </div>
        </div>
    );
}