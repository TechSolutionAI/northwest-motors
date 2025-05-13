import { Car, Clock, MapPinned, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LocationDetailInfo() {
    return (
        <div className="px-10 py-20">
            <h1 className="text-5xl">Location</h1>

            <p className="text-2xl mt-8 text-[#8E6F00]">THIS VEHICLE IS LOCATED AT</p>
            <p className="text-2xl mt-1 font-bold">Dutton One Moorabbin            </p>


            <Link href="https://www.google.com/maps" className="flex items-center mt-8 text-lg">
                <MapPinned className="h-5 w-5 mr-2" />
                <span className="underline underline-offset-2">Northwest Motors</span>
            </Link>

            <div className="flex items-start mt-8">
                <Clock className="h-5 w-5 mr-2" />
                <div>
                    <p>Mon - Fri: 8:30am - 5:30pm</p>
                    <p>Sat: 8:30am - 4:00pm</p>
                    <p>Sun: Closed</p>
                </div>
            </div>

            <Image
                src="/modern-car-dealership.webp"
                alt="Dutton One Moorabbin"
                height={300}
                width={300}
                className="w-full h-[300px] object-cover mt-16"
                priority
                sizes="(max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        (max-width: 1280px) 33vw,
                        25vw"
                quality={80}
            />
            <Link
                href="tel:+1300341911"
                className="border border-gray-300 mt-4 p-4 mb-4 flex items-center justify-center hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
                <Phone className="h-5 w-5 mr-4" />
                <span>CALL 1300 341 911</span>
            </Link>
            <Link
                href="/inventory"
                className="border border-gray-300 mt-4 p-4 mb-4 flex items-center justify-center hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
                <Car className="h-5 w-5 mr-4" /> VIEW 28 VEHICLES
            </Link>

        </div>
    )
}