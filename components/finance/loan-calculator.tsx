"use client"

import { useEffect, useState } from "react"
import { MoveRight, Phone } from "lucide-react"
import { Logo } from "../main/logo"
import Link from "next/link"
import DropdownSelect from "../main/dropdown-select"
import { loanYearOptions } from "@/lib/mock-data"

export default function LoanCalculator() {
    // State for loan calculator
    const [loanAmount, setLoanAmount] = useState("50000")
    const [interestRate, setInterestRate] = useState("12.1")
    const [frequency, setFrequency] = useState("weekly")
    const [loanTerm, setLoanTerm] = useState("4 Years")
    const [payment, setPayment] = useState(0)


    const [loanError, setLoanError] = useState("")
    const [interestError, setInterestError] = useState("")

    // Calculate payment whenever inputs change
    useEffect(() => {
        const calculatedPayment = calculatePayment()
        setPayment(calculatedPayment)
    }, [loanAmount, interestRate, frequency, loanTerm])

    // Calculate payment based on all inputs
    const calculatePayment = () => {
        const principal = parseFloat(loanAmount);
        const years = Number.parseInt(loanTerm.split(" ")[0])
        const monthlyRate = parseFloat(interestRate) / 100 / 12
        const numberOfPayments = years * 12 // Convert years to months

        if (parseFloat(interestRate) === 0) {
            return principal / numberOfPayments
        }

        const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments))

        // Convert to weekly or fortnightly if needed
        if (frequency === "weekly") {
            return (monthlyPayment * 12) / 52
        } else if (frequency === "fortnightly") {
            return (monthlyPayment * 12) / 26
        }

        return monthlyPayment
    }



    // Handle loan amount input change - permissive during typing
    const handleLoanAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numValue = e.target.value;
        if (parseFloat(numValue) > 600000) numValue = "600000";
        setLoanAmount(numValue);

        if (parseFloat(e.target.value) < 5000) {
            setLoanError("You have to enter more than $5000 value.")
        } else {
            setLoanError("")
        }

    }


    // Handle loan amount slider change
    const handleLoanAmountSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoanAmount(e.target.value)

        if (parseFloat(e.target.value) < 5000) {
            setLoanError("You have to enter more than $5000 value.")
        } else {
            setLoanError("")
        }
    }

    // Handle interest rate input change - permissive during typing
    const handleInterestRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numValue = e.target.value;
        if (parseFloat(numValue) > 25) numValue = "25";
        setInterestRate(numValue);

        if (parseFloat(e.target.value) < 0) {
            setInterestError("You have to enter more than 0% value.")
        } else if (parseFloat(e.target.value) > 25) {
            setInterestError("You have to enter less than 25% value.")
        } else {
            setInterestError("")
        }
    }

    // Handle interest rate slider change
    const handleInterestRateSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInterestRate(e.target.value)

        if (parseFloat(e.target.value) < 0) {
            setInterestError("You have to enter more than 0% value.")
        } else if (parseFloat(e.target.value) > 25) {
            setInterestError("You have to enter less than 25% value.")
        } else {
            setInterestError("")
        }
    }

    return (
        <section className="py-12 md:py-16">
            <style jsx>{`
                        input[type=range]::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            appearance: none;
                            width: 20px;
                            height: 20px;
                            background: #8E6F00;
                            border-radius: 2px; /* small radius for slightly rounded corners */
                            cursor: pointer;
                        }
                        
                        input[type=range]::-moz-range-thumb {
                            width: 20px;
                            height: 20px;
                            background: #8E6F00;
                            border-radius: 2px;
                            cursor: pointer;
                            border: none;
                        }
                        
                        input[type=range]::-ms-thumb {
                            width: 20px;
                            height: 20px;
                            background: #8E6F00;
                            border-radius: 2px;
                            cursor: pointer;
                        }

                        input[type=number]::-webkit-inner-spin-button, 
                        input[type=number]::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                        }

                        /* Firefox */
                        input[type=number] {
                        -moz-appearance: textfield;
                        }
            `}</style>
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

                    <div className="lg:col-span-2 rounded-md shadow-sm">
                        <h2 className="text-3xl font-bold mb-6 px-6">Calculator</h2>

                        <div className="space-y-8 bg-white p-8 lg:p-8 ">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Frequency</h3>
                                <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-md">
                                    <button
                                        className={`py-2 rounded-sm ${frequency === "weekly" ? "bg-white shadow-sm" : "text-gray-700"
                                            }`}
                                        onClick={() => setFrequency("weekly")}
                                    >
                                        Weekly
                                    </button>
                                    <button
                                        className={`py-2 rounded-sm ${frequency === "fortnightly" ? "bg-white shadow-sm" : "text-gray-700"
                                            }`}
                                        onClick={() => setFrequency("fortnightly")}
                                    >
                                        Fortnightly
                                    </button>
                                    <button
                                        className={`py-2 rounded-sm ${frequency === "monthly" ? "bg-white shadow-sm" : "text-gray-700"
                                            }`}
                                        onClick={() => setFrequency("monthly")}
                                    >
                                        Monthly
                                    </button>
                                </div>
                            </div>

                            {/* Loan Amount */}
                            <div className="mb-8">
                                <div className="flex items-center mb-2">
                                    <h3 className="text-2xl font-bold mr-2">Loan Amount</h3>
                                    <div className="flex items-center bg-gray-300 py-1">
                                        <span className="text-[#8E6F00] text-2xl font-bold pl-2">$</span>
                                        <input
                                            type="number"
                                            value={loanAmount}
                                            onChange={handleLoanAmountInputChange}
                                            onBlur={handleLoanAmountInputChange}
                                            className="text-[#8E6F00] text-2xl font-bold text-left w-28 bg-transparent focus:outline-none"
                                            aria-label="Loan amount"
                                        />
                                    </div>
                                </div>

                                {loanError && (
                                    <div className="text-red-500 text-sm mb-2" role="alert">
                                        {loanError}
                                    </div>
                                )}

                                <div className="relative mb-2">
                                    <input
                                        type="range"
                                        min="5000"
                                        max="600000"
                                        step="1"
                                        value={loanAmount}
                                        onChange={handleLoanAmountSliderChange}
                                        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <span>$5,000</span>
                                    <span>$600,000</span>
                                </div>

                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                {/* Max Repayments */}
                                <div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-2xl font-bold">Max Repayments ($)</h3>
                                        <span className="text-gray-500 cursor-help" title="The maximum repayment amount based on your loan details">
                                            ⓘ
                                        </span>
                                    </div>
                                    <div className="bg-gray-100 p-2 mt-4">
                                        <span className="text-lg">{payment.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Loan Terms */}
                                <div>
                                    <h3 className="text-2xl font-bold">Loan Terms</h3>
                                    <DropdownSelect
                                        options={loanYearOptions}
                                        value={loanTerm}
                                        onChange={setLoanTerm}
                                        placeholder="Select loan term"
                                        className="py-4 "
                                    />
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div>
                                <div className="flex items-center">
                                    <h3 className="text-2xl font-bold mr-2">Interest Rate</h3>
                                    <div className="flex items-center bg-gray-300 py-1">
                                        <span className="text-[#8E6F00] text-2xl font-bold pl-2">%</span>
                                        <input
                                            type="text"
                                            value={interestRate}
                                            onChange={handleInterestRateInputChange}
                                            onBlur={handleInterestRateInputChange}
                                            className="text-[#8E6F00] text-2xl font-bold text-left w-16 bg-transparent focus:outline-none"
                                            aria-label="Interest rate"
                                        />
                                    </div>
                                </div>

                                {interestError && (
                                    <div className="text-red-500 text-sm mb-2" role="alert">
                                        {interestError}
                                    </div>
                                )}

                                <div className="relative mb-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="25"
                                        step="0.1"
                                        value={interestRate}
                                        onChange={handleInterestRateSliderChange}
                                        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <span>0%</span>
                                    <span>25%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
