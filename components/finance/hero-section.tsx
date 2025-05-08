"use client"

import Image from "next/image"
import { MoveDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
    return (
        <section className="p-10">
            <h1 className="text-3xl md:text-4xl mt-4">Finance</h1>
            <h2 className="text-4xl md:text-5xl mt-8">
                There's a better way to get a better rate
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
                <div className="col-span-3 relative h-[500px] overflow-hidden">
                    <Image src="/finance.jpg" alt="Car finance consultation" fill className="object-cover" />
                </div>

                <div className="flex flex-col col-span-2 md:px-10 justify-center">
                    <p className="mb-6 text-[24px]">
                        Providing Flexible Car Finance Solutions
                    </p>

                    <p className="mb-6">
                        NorthWest Financial Services provides a range of smart, competitive finance options which are tailored to
                        meet your needs and objectives.                    </p>

                    <p className="mb-6">
                        Our on-site finance and insurance managers have a wealth of experience and have access to over 50 lenders.
                        They will save you the time and hassle doing it yourself while helping you make an informed decision which
                        meets your fiscal interests.                    </p>
                </div>
            </div>
        </section>
    )
}
