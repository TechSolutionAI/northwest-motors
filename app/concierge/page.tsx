"use client"

import HeroSection from "@/components/concierge/hero-section"
import FormConcierge from "@/components/concierge/form-concierge"

export default function Concierge() {
    return (
        <div className="flex min-h-screen flex-col bg-dark">
            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <HeroSection />

                <div className="border mt-10 mb-20"></div>

                {/* Concierge Form Section */}
                <section id="concierge-form" className="py-20 px-10">
                    <FormConcierge />
                </section>
            </main>
        </div>
    )
}
