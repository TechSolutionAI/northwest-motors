"use client"

import { MoveRight, Phone } from "lucide-react"
import { Logo } from "../main/logo"
import Link from "next/link"
import LoanCalculator from "../main/loan-calculator"
import { useState } from "react"

interface VehicleLoanCalculatorProps {
    vehicle: Vehicle
}

export default function VehicleLoanCalculator({ vehicle }: VehicleLoanCalculatorProps) {

    const [rate, setRate] = useState("10.0");
    const [payment, setPayment] = useState(0);
    const [frequency, setFrequency] = useState("weekly");

    function handleLoanCalculation(
        loan: string,
        rate: string,
        payment: number,
        frequency: string
    ) {
        console.log("Loan details:", loan, rate, payment, frequency);
        setRate(rate);
        setPayment(payment);
        setFrequency(frequency);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10">
            <div className="bg-white col-span-1 px-10 py-8 flex flex-col justify-center">
                <Logo size="lg" />
                <p className="text-xl my-2 pt-8 text-[#8E6F00]">PAY IN FULL</p>
                <div>
                    <span className="text-xl font-bold">
                        ${vehicle.price.toLocaleString()}{" "}
                    </span>
                    <span className="">Exc. Gov. Charges</span>
                </div>
                <div className="border mt-4"></div>
                <p className="text-xl mt-4 text-[#8E6F00]">OR SEE FINANCE OPTIONS</p>
                <div className="mt-4 text-sm flex justify-between border-b pb-2">
                    <span>${payment.toFixed(2).toLocaleString()} {frequency}</span>
                    <p><span className="font-bold"> {rate}% p.a</span> Comparison Rate</p>
                </div>
                <p className="mt-4">5 Year Term 10.00% Deposit 0.0% Final Payment</p>
                <Link
                    href="tel:+1300341911"
                    className="border border-gray-300 mt-8 p-4 mb-4 flex items-center justify-center hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in">
                    <Phone className="h-5 w-5 mr-4" />
                    <span>CALL 1300 341 911</span>
                </Link>
                <Link
                    href=""
                    className="flex items-center justify-center p-4 bg-[#414042] 
                    text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                >
                    ENQUIRE <MoveRight className="ml-2 h-6 w-6" />
                </Link>
            </div>
            <div className="col-span-2 ml-10 lg:ml-0 mr-10">
                <LoanCalculator
                    vehicle={vehicle}
                    onCalcLoan={handleLoanCalculation}
                />
            </div>
        </div>

    )
}
