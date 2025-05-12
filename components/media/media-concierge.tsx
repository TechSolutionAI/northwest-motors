import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function MediaConcierge() {
    return (
        <div className="px-10 py-10">
            <div className="flex justify-between flex-col md:flex-row">
                <p className="text-3xl mr-16">
                    Explore the world of Dutton One, and discover the One for you.
                </p>
                <p className="mt-8 md:mt-0">Catering to every lifestyle and preference, there's always something new at Dutton One. Follow us on our socials to keep up to date with the latest photography, video and stock.</p>
            </div>

            <div className="mt-24 container grid justify-center items-center text-center">
                <p className="text-5xl font-krona">OUR CONCIERGE SERVICE</p>
                <p className="mt-8 max-w-3xl mx-auto">Let the Dutton One team create an exclusive offering just for you. Once we understand your needs and tastes, we can customise a viewing list to expedite your purchasing journey for a smoother experience.</p>
                <Link
                    href="/concierge#concierge-form"
                    className="w-full max-w-3xl mx-auto flex items-center justify-center mt-8 p-4 bg-[#414042] 
                                        text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                >
                    SPEAK WITH OUR SPECIALISTS <MoveRight className="ml-2" />
                </Link>
            </div>


            <div className="flex flex-col items-center mt-24">
                <Link href="tel:+1300341911" className="mt-2 text-2xl font-krona text-gray-500">
                    <span>+1300 341 911</span>
                </Link>
                <Link href="mailto:info@duttonone.com.au" className="text-2xl mt-2 text-gray-500">
                    <span>info@duttonone.com.au</span>
                </Link>
            </div>
        </div>
    );
}