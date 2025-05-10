"use client"

import ContactDealerInfo from "@/components/contact/contact-dealer-info"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function ContactPage() {
    const searchParams = useSearchParams()
    const type = searchParams.get("type")

    useEffect(() => {
        if (type) {
            console.log('Query param "type":', type)
        }
    }, [type])

    return (
        <main className="min-h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
                {/* Contact Info */}
                <div className="col-span-1">
                    <ContactInfo />
                </div>
                {/* Contact Form */}
                <div className="col-span-2 bg-gray-100">
                    <ContactForm type={type} />
                    <ContactDealerInfo />
                </div>
            </div>
        </main>
    )
}
