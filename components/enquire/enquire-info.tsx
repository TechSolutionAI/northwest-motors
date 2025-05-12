import { MoveRight, MoveUpRight, Phone, Share } from "lucide-react";
import Link from "next/link";

interface EnquireInfoProps {
    vehicle: Vehicle
}

export default function EnquireInfo({ vehicle }: EnquireInfoProps) {
    return (
        <div className="px-10 py-16 bg-gray-100">
            <div>
                <span className="text-3xl font-bold">{vehicle.make}</span>{" "}
                <span className="text-[#8E6F00] text-3xl font-bold ml-3">{vehicle.model}</span>{" "}
            </div>
            <p className="mt-4 font-bold">{vehicle.trim}</p>
            <p className="mt-8 font-bold"><span>YEAR: </span>{vehicle.year}</p>
            <div className="mt-4">
                <span className="text-xl font-bold">
                    ${vehicle.price.toLocaleString()}{" "}
                </span>
                <span className="">Exc. Gov. Charges</span>
            </div>
            <div className="border mt-8"></div>
            <div className="flex justify-between">
                <p className="text-xl mt-4 text-[#8E6F00]">FINANCE ESTIMATES</p>
                <button className="flex items-center text-gray-600 mt-2" aria-label="DISCLAIMER">
                    <span className="">DISCLAIMER</span>
                    <MoveUpRight className="h-4 w-4 ml-2" />
                </button>            </div>
            <div className="mt-8 flex justify-between border-b pb-2">
                <p><span className="font-bold"> $123.34</span> Per Week</p>
                <p><span className="font-bold"> 10% p.a</span> Comparison Rate</p>
            </div>
            <p className="mt-4">5 Year Term</p>
            <Link
                href="tel:+1300341911"
                className="border border-gray-300 mt-8 p-4 mb-4 flex items-center justify-center hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
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
                    href=""
                    className="flex items-center justify-center p-4 bg-[#414042] 
                                        text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                >
                    VIEW <MoveRight className="ml-2 h-6 w-6" />
                </Link>
            </div>
            <button className="flex items-center text-gray-600 mt-2" aria-label="Share the vehicle">
                <Share className="h-4 w-4 mr-2" />
                <span className="underline underline-offset-2">Share this vehicle</span>
            </button>
        </div>
    );
}