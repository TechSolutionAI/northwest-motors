import { Car, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LocationCard() {
    return (
        <div className="bg-gray-100 px-10 py-8">
            <p className="text-3xl font-bold">Dutton One Moorabbin</p>
            <Link
                href="/inventory"
                className="border border-gray-300 mt-8 p-4 mb-4 flex items-center justify-center hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
                <Car className="h-5 w-5 mr-4" /> VIEW DEALER LOCATIONS
            </Link>
            <Link
                href="/location/details/1"
                className="mt-4 p-4 mb-4 flex items-center justify-center bg-[#414042] text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
                <span>LOCATION DETAILS</span>   <MoveRight className="h-5 w-5 ml-4" />
            </Link>
            <Image
                src="/modern-car-dealership.png"
                alt="Dutton One Moorabbin"
                height={300}
                width={300}
                className="w-full h-[300px] object-cover mt-16"
                priority
            />
        </div>
    );
}