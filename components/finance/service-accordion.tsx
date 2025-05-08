"use client"

import { useState } from "react"
import { ChevronDown, MoveDown } from "lucide-react"

interface AccordionItem {
    id: string
    number: string
    title: string
    content: string
}

export default function ServiceAccordion() {
    const [openItem, setOpenItem] = useState<string | null>(null)

    const toggleItem = (id: string) => {
        setOpenItem(openItem === id ? null : id)
    }

    const accordionItems: AccordionItem[] = [
        {
            id: "wide-range",
            number: "01",
            title: "Wide Range of Finance Products",
            content:
                "We offer a comprehensive range of finance products to suit your needs, including consumer loans, commercial loans, novated leases, and chattel mortgages. Our finance specialists will help you find the right product for your specific situation.",
        },
        {
            id: "loan-structure",
            number: "02",
            title: "Right Loan Structure",
            content:
                "Getting the loan structure right is crucial for your financial wellbeing. Our experts will work with you to determine the optimal loan term, deposit amount, and repayment schedule that aligns with your budget and financial goals.",
        },
        {
            id: "pre-approval",
            number: "03",
            title: "Pre-approval Option",
            content:
                "Get pre-approved for your car loan before you start shopping. This gives you a clear budget and stronger negotiating position. Our pre-approval process is quick and straightforward, giving you peace of mind when browsing our vehicles.",
        },
        {
            id: "approval-time",
            number: "04",
            title: "How long does it take to get approved for a car loan",
            content:
                "The approval process can vary depending on your circumstances, but we strive to make it as quick as possible. Simple applications can be approved within hours, while more complex situations might take 1-2 business days. Our finance team will keep you updated throughout the process.",
        },
        {
            id: "application-process",
            number: "05",
            title: "What happens with my application?",
            content:
                "Once you submit your application, our finance team will review it and contact you to discuss any additional information needed. We'll then submit it to the most suitable lenders based on your needs. After approval, we'll guide you through the final paperwork and get you on the road in your new vehicle as quickly as possible.",
        },
    ]

    return (
        <section className="py-12 border-t border-b border-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-[40px] font-bold text-center mb-8">Our Financial Services</h2>

                <div className="max-w-3xl mx-auto">
                    {accordionItems.map((item) => (
                        <div key={item.id} className="border-b border-gray-200">
                            <button
                                className="py-6 w-full flex items-center justify-between text-left"
                                onClick={() => toggleItem(item.id)}
                                aria-expanded={openItem === item.id}
                                aria-controls={`content-${item.id}`}
                            >
                                <div className="flex items-center">
                                    <span className="text-[32px] mr-4 font-medium">{item.number}</span>
                                    <h3 className="text-[32px] font-bold">{item.title}</h3>
                                </div>
                                <MoveDown
                                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${openItem === item.id ? "transform rotate-180" : ""
                                        }`}
                                />
                            </button>
                            <div
                                id={`content-${item.id}`}
                                className={`overflow-hidden transition-all duration-300 px-8 ${openItem === item.id ? "max-h-40 pb-8" : "max-h-0"
                                    }`}
                            >
                                <p className="text-gray-700">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
