"use client"

import Image from "next/image"

export default function HeroSection() {
    return (
        <section className="p-10">
            <h1 className="text-3xl lg:text-4xl mt-4 text-white">Concierge</h1>
            <h2 className="text-4xl lg:text-4xl mt-8 text-white max-w-xl">
                Can't find the ONE? Let our team help find it for you.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                <div className="col-span-3 relative h-[500px] overflow-hidden">
                    <Image
                        src="/finance.webp"
                        alt="Car finance consultation"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        (max-width: 1280px) 33vw,
                        25vw"
                        quality={80} />
                </div>

                <div className="flex flex-col col-span-2 lg:px-10 justify-center text-gray-300">
                    <p className="mb-6">
                        Northwest Motors is a premium pre-owned car dealership that prides itself on offering an exceptional concierge service to its customers. The concierge service is a unique aspect of Northwest Motors that helps ensure all of our customers can find their dream car. If a customer is unable to find the prestige car they desire on our website, Northwest Motors's experienced and knowledgeable team of experts will work tirelessly to locate the perfect car for them within our extensive network.                    </p>

                    <p className="mb-6">
                        Our concierge team has an extensive knowledge and expertise in the automotive industry. We have access to a wide network of resources and are dedicated to finding the best possible car for each individual customer. We take the time to understand each customer's specific requirements and preferences, ensuring that they find the perfect car that meets their needs.
                    </p>

                    <p className="mb-6">

                        The concierge service at Northwest Motors is highly personalised, with a focus on providing exceptional customer service. Customers can rest assured that they will receive the highest level of care and attention, with regular updates and communication throughout the process.                   </p>
                </div>
            </div>
        </section>
    )
}
