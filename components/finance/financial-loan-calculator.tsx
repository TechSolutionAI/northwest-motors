"use client"

import { MoveRight, Phone } from "lucide-react"
import { Logo } from "../main/logo"
import Link from "next/link"
import LoanCalculator from "../main/loan-calculator"

export default function FinancialLoanCalculator() {

    return (
        <section className="py-12 md:py-16">
            <div className="px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="p-6 lg:p-8 rounded-md shadow-sm">
                        <div className="mb-8">
                            <Logo size="lg" />
                            <h2 className="text-5xl font-bold mt-16 mb-8">Finance</h2>
                            <Link href="tel:+1300341911" className="border border-gray-300 p-4 mb-4 flex items-center justify-center hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
                                <Phone className="h-5 w-5 mr-4" />
                                <span>CALL 1300 341 911</span>
                            </Link>
                            <Link
                                href=""
                                className="flex items-center justify-center p-4 bg-[#414042] text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                            >
                                ENQUIRE <MoveRight className="ml-2 h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <LoanCalculator />
                    </div>

                </div>
            </div>

        </section>
    )
}
