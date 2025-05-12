"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

interface ProcessStepData {
    number: string
    title: string
    description: string
}

export default function ProcessSteps() {
    const stepsRef = useRef<HTMLDivElement>(null)

    // Process steps data
    const processSteps: ProcessStepData[] = [
        {
            number: "01",
            title: "Submit your details",
            description:
                "So, you're thinking I want to sell my car? No fuss and easy, quick, you've come to the right place! We've got a bit of what to know when selling a car. First tell us a little about your car using the online form on this website. Just the basics such as the make and model, how old it is, and how many kilometers it's been driven. We buy cars and make it easier than ever for you.",
        },
        {
            number: "02",
            title: "Get your quote",
            description:
                "Once we have your details, our team of experts will evaluate your car based on its make, model, year, condition, and market value. We'll provide you with a competitive quote that reflects the true value of your vehicle. Our quotes are transparent and fair, with no hidden fees or surprises.",
        },
        {
            number: "03",
            title: "Accept our offer",
            description:
                "If you're happy with our quote, simply accept our offer and we'll arrange a convenient time to complete the transaction. We'll handle all the paperwork and make the process as smooth as possible. You'll receive payment promptly, with options for bank transfer or check.",
        },
        {
            number: "04",
            title: "We pick up your car",
            description:
                "Once everything is agreed upon, we'll come to you to pick up the car at a time that suits you. Our team will handle the collection professionally and efficiently. You don't need to worry about delivering the car to us - we take care of everything to make the process as convenient as possible for you.",
        },
    ]

    // Add scroll highlighting effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100")
                        entry.target.classList.remove("opacity-50")
                    } else {
                        entry.target.classList.add("opacity-50")
                        entry.target.classList.remove("opacity-100")
                    }
                })
            },
            {
                root: stepsRef.current,
                threshold: 0.7,
            },
        )

        const stepElements = document.querySelectorAll(".process-step")
        stepElements.forEach((el) => observer.observe(el))

        return () => {
            stepElements.forEach((el) => observer.unobserve(el))
        }
    }, [])

    return (
        <section className="p-10">
            <div className="mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left column - Fixed image */}
                    <div className="relative h-[600px] md::sticky md::top-20 self-start">
                        <Image src="/white-luxury-suv.webp" alt="Luxury SUV" fill className="object-cover rounded-md:" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
                    </div>

                    {/* Right column - Scrollable steps */}
                    <div ref={stepsRef} className="h-[600px] overflow-y-auto pr-4 scrollbar-hide">
                        {processSteps.map((step, index) => (
                            <div key={step.number} className="process-step px-16 mb-12 pb-12 transition-opacity duration-300 opacity-50">
                                <div className="flex items-center mb-8">
                                    <div className="h-[1px] flex-grow bg-gray-700"></div>
                                    <span className="text-4xl font-bold px-4 text-gray-400">{step.number}</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-6">{step.title}</h3>
                                <p className="text-gray-300">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
