"use client"

import HeroSection from "@/components/finance/hero-section"
import LoanCalculator from "@/components/finance/loan-calculator"
import ServiceAccordion from "@/components/finance/service-accordion"

export default function Finance() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100">

            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <HeroSection />

                {/* Finance Solutions Section */}
                <ServiceAccordion />

                {/* Calculator Section */}
                <LoanCalculator />
            </main>

        </div>
    )
}
