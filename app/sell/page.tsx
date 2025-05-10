"use client"

import HeroSection from "@/components/sell/hero-section"
import ProcessSteps from "@/components/sell/process-steps"
import { SellForm } from "@/components/sell/sell-form"

export default function SellPage() {
    return (
        <main className="flex flex-col bg-dark text-white">

            <div className="flex-1 pt-16">
                {/* Hero Section */}
                <HeroSection />

                {/* Process Steps */}
                <ProcessSteps />

                {/* Form Section */}
                <section id="sell-form" className="py-16 text-white">
                    <div className="container">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold uppercase mb-4">Sell Your Car</h2>
                            <p className="">First, just tell us a little bit about your car through our online form</p>
                        </div>
                        <SellForm />
                    </div>
                </section>
            </div>
        </main>
    )
}
