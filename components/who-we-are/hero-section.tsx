"use client"

import Image from "next/image"
import { MoveDown } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
    return (
        <section className="p-10">
            <h1 className="text-3xl md:text-4xl mt-4">Sell your car</h1>
            <h2 className="text-4xl md:text-5xl mt-8">A history dating back to 1985</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="relative h-[500px] overflow-hidden">
                    <Image
                        src="/modern-car-dealership.webp"
                        alt="NorthWest Motors Building"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        (max-width: 1280px) 33vw,
                        25vw"
                        quality={80} />
                </div>

                <div className="flex flex-col justify-center">
                    <p className="mb-6">
                        At NorthWest Motors, we believe selling your car should be simple and hassle-free. That's why we've
                        streamlined our process to make it as easy as possible for you to sell your car to us.
                    </p>

                    <p className="mb-6">
                        Here's how it works. First, simply fill out our online form to get started. We'll ask you a few basic
                        questions about your car, including its make, model, and year. Based on this information, we'll provide you
                        with a competitive and fair quote for your car.
                    </p>

                    <p className="mb-6">
                        If you accept our offer, we'll come to you to pick up your car. You don't need to worry about a thing -
                        we'll take care of everything from start to finish.
                    </p>

                    <p className="mb-8">
                        At NorthWest Motors, we're committed to making the car selling process as easy and stress-free as possible.
                        So why wait? Sell your car to us today, quick and hassle-free!
                    </p>

                    <Link
                        href="/sell#sell-form"
                        className="flex items-center justify-center bg-white text-dark hover:bg-[#8E6F00] hover:text-white w-full py-4 text-lg"
                        onClick={() => document.getElementById("sell-form")?.scrollIntoView({ behavior: "smooth" })}
                    >
                        FILL OUT OUR FORM BELOW
                        <MoveDown className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
