import { MapPinned, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactInfo() {
    return (
        <div className="px-10 py-20">
            <h1 className="text-3xl">Contact</h1>
            <h2 className="text-5xl mt-8">Let's make dreams come true</h2>
            <div className="mt-8 grid">
                <Link
                    href=""
                    className="border border-gray-300 mt-8 p-4 mb-4 flex items-center justify-center hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
                    <MapPinned className="h-5 w-5 mr-4" /> VIEW DEALER LOCATIONS
                </Link>
                <Link
                    href="tel:+1300341911"
                    className="border border-gray-300 mt-4 p-4 mb-4 flex items-center justify-center hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
                    <Phone className="h-5 w-5 mr-4" />
                    <span>CALL 1300 341 911</span>
                </Link>
            </div></div>
    )
}