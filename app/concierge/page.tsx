"use client"

import HeroSection from "@/components/concierge/hero-section"
import FormConcierge from "@/components/concierge/form-concierge"

export default function Concierge() {
    return (
        <div className="flex min-h-screen flex-col bg-dark">
            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <HeroSection />

                {/* Concierge Form Section */}
                <section className="py-12 px-4">
                    <FormConcierge />
                </section>
            </main>
        </div>
    )
}
