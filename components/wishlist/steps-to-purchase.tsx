import { MoveRight } from "lucide-react"
import Link from "next/link"

export default function StepsToPurchase() {
    return (
        <div className="my-20 px-10">
            <h2 className="text-5xl font-normal text-center mb-12">Steps To Purchase</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                    <div className="flex justify-center items-center pb-6">
                        <div className="border-t-4 border-gray-300 w-full mr-4 "></div>
                        <h3 className="text-5xl font-light text-gray-400">01</h3>
                    </div>
                    <p className="text-gray-700">
                        Start your engine and speed on over; find your dream car within our extensive range of pre-owned vehicles.
                        Catering to all lifestyles, you'll find the ONE with us.
                    </p>
                </div>

                <div className="text-center">
                    <div className="flex justify-center items-center pb-6">
                        <div className="border-t-4 border-gray-300 w-full mr-4 "></div>
                        <h3 className="text-5xl font-light text-gray-400">02</h3>
                    </div>
                    <p className="text-gray-700">
                        Our helpful and passionate specialists are here to help you through any enquiries you have. We will help you
                        find your dream car and our Finance team is ready to assist you. Our number one goal is to give you a
                        smooth, hassle-free experience during your car buying journey.
                    </p>
                </div>

                <div className="text-center">
                    <div className="flex justify-center items-center pb-6">
                        <div className="border-t-4 border-gray-300 w-full mr-4 "></div>
                        <h3 className="text-5xl font-light text-gray-400">03</h3>
                    </div>
                    <p className="text-gray-700">You've found the ONE, now it's time to enjoy it. It's time to hit the road.</p>
                </div>
            </div>

            <div className="mt-12">
                <Link
                    href="/concierge#concierge-form"
                    className="w-full lg:w-1/2 mx-auto flex items-center justify-center p-4 bg-[#414042] 
                                        text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                >
                    SPEAK WITH OUR SPECIALISTS <MoveRight className="ml-2" />
                </Link>
            </div>
        </div>
    )
}
