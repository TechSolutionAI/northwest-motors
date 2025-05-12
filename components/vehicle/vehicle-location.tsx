import { Car, Clock, MapPin, Phone } from "lucide-react"
import Image from "next/image";
import { GoogleMap } from "../home/google-map";
import Link from "next/link";

interface VehicleLocationProps {
    vehicle: Vehicle
}

export default function VehicleLocation({ vehicle }: VehicleLocationProps) {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10">
            <div className="col-span-1 flex flex-col justify-center p-10 bg-white">
                <h2 className="text-4xl mt-8">Location</h2>
                <div className="my-4">
                    <h3 className="text-lg font-bold text-[#8E6F00]">THIS VEHICLE IS LOCATED AT</h3>
                    <p className="text-xl font-bold">NorthWest Motors</p>
                </div>

                <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 mr-2 mt-1" />
                    <Link href="#" className="underline underline-offset-2">301 Middleborough Road Box Hill South VIC 3128</Link>
                </div>

                <div className="flex items-start mb-6">
                    <Clock className="h-5 w-5 mr-2" />
                    <div>
                        <p>Mon - Fri: 8:30am - 5:30pm</p>
                        <p>Sat: 8:30am - 4:00pm</p>
                        <p>Sun: Closed</p>
                    </div>
                </div>

                <div className="h-48 bg-gray-200 mb-6">
                    {/* Dealership image would go here */}
                    <Image
                        src="/modern-car-dealership.webp"
                        alt="NorthWest Motors Dealership"
                        width={384}
                        height={192}
                        className="w-full h-full object-cover"
                    />
                </div>

                <Link
                    href="tel:+1300341911"
                    className="border border-gray-300 mt-2 p-4 flex items-center justify-center hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
                    <Phone className="h-5 w-5 mr-4" />
                    <span>CALL 1300 341 911</span>
                </Link>

                <Link
                    href="/inventory"
                    className="border border-gray-300 mt-2 p-4 flex items-center justify-center hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
                    <Car className="h-5 w-5 mr-4" />
                    <span>VIEW 55 VEHICLES</span>
                </Link>
            </div>

            <div className="col-span-2 flex flex-col justify-center ml-10 lg:ml-0 my-8">
                <h2 className="text-3xl text-black"> NorthWest Motors </h2>
                <div className="pr-10 pt-10 h-full">
                    <GoogleMap />
                </div>
            </div>
        </div>
    )
}