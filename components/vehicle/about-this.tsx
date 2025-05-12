"use client"

import { useState } from "react";

interface AboutThisPros {
    vehicle: Vehicle
}

export default function AboutThis({ vehicle }: AboutThisPros) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="py-8 px-10">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-bold pb-4">About This Car</h2>
                <p className="text-gray-700 pb-4 uppercase">SUZUKI JIMNY XC AUTOMATIC</p>
                <div className="text-gray-700 pb-4">
                    {isExpanded ? (
                        <>
                            <p className="mb-4">
                                UNPARALLELED JAPANESE QUALITY WITH EXCEPTIONAL FUEL EFFICIENCY AND INCREDIBLE PRACTICALITY
                            </p>
                            <p className="mb-4">KEI VERSION JIMNY EXCLUSIVE FOR JAPANESE MARKET and AUSTRALIAN COMPLIED</p>
                            <p className="mb-4">
                                Incredibly capable and practical, this JIMNY XC is more versatile than a Swiss Army knife!
                            </p>

                            <p className="font-bold mb-4">VERY LOW KMS!!</p>

                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>WARRANTY COVERED</li>
                                <li>LOADED WITH OPTIONS ! MINT CONDITION ! BE QUICK !</li>
                            </ul>

                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>FAST FLEXIBLE FINANCE (PICK UP CHEAPEST RATE FOR YOU OUT OF 60 FINANCIAL PARTNERS)</li>
                                <li>TOP TRADE-IN PRICES PAID</li>
                                <li>IMPORT TRADE - INS WELCOME</li>
                                <li>BEST PRICE ON MARKET</li>
                                <li>ALWAYS FRESH STOCK</li>
                                <li>NATION WIDE DELIVERY</li>
                                <li>110 YEARS ON MARKET, 150 SHOWROOMS AROUND THE WORLD, TRUST, RELIABILITY AND SINCERITY</li>
                            </ul>

                            <p className="font-bold mb-2">*** LOTS OF EXTRA FEATURES UNAVAILABLE IN AUSTRALIAN VERSION ***</p>

                            <p className="font-bold mb-2">OPTIONS :</p>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>APPLE CARPLAY / ANDROID AUTO WIRELESS CONNECTIVITY</li>
                                <li>REVERSE CAMERA</li>
                                <li>Part-time 4WD with low range transfer gear</li>
                                <li>3-link rigid axle suspension</li>
                                <li>Brake limited slip differential traction control</li>
                                <li>SUZUKI SAFETY SUPPORT preventive safety technology</li>
                                <li>HEATED SEATS (driver and passenger)</li>
                                <li>Keyless access</li>
                                <li>Keyless Start / Stop</li>
                                <li>Iso fix with anchor on rear seats</li>
                            </ul>

                            <p className="font-bold mb-2">*** EXTRA EQUIPMENT INCLUDED***</p>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>ROOF RACK</li>
                                <li>REAR BAR WITH RETRO STYLE REAR LIGHTS</li>
                                <li>RETRO STYLE WHEEL COVER</li>
                            </ul>

                            <p className="mb-4">
                                *** This EXCLUSIVE JDM SPEC vehicle is one of our stunning HAND-SELECTED examples from our team in
                                JAPAN ***
                            </p>
                            <p className="mb-4">AUSTRALIAN COMPLIED, WARRANTY CERTIFIED and includes RWC.</p>

                            <p className="mb-4">
                                ~ Great alternative to: JEEP WRANGLER, JIMNY XL, PAJERO MINI, Toyota Hilux, 4x4, Kei Car, small car,
                                city car, ~
                            </p>

                            <p className="mb-4">
                                We have specialists on site who can assist you with all your warranty, finance, and motor vehicle
                                insurance needs.
                            </p>
                            <p className="mb-4">
                                We understand that you demand the best, our cars have all undergone an extensive 100-point
                                inspection by factory-trained technicians 00301, A video of every vehicle is available on request
                                providing you with absolute confidence in your purchase.
                            </p>

                            <p className="mb-4">
                                Mon-Fri: 8.30am - 5.30pm
                                <br />
                                Sat: 9.00am - 4.00pm
                                <br />
                                Sun: Closed
                            </p>
                        </>
                    ) : (
                        <p>
                            UNPARALLELED JAPANESE QUALITY WITH EXCEPTIONAL FUEL EFFICIENCY AND INCREDIBLE PRACTICALITY. KEY DESIGN
                            SAFETY FEATURES FOR JAPANESE MARKET AND AUSTRALIAN COMPLIANCE. Incredible capable and practical, the
                            JIMNY XC is more versatile than it looks. Jimny style!
                        </p>
                    )}
                </div>
                <button aria-label={isExpanded ? "Show Less" : "Show More"} className="text-[#8E6F00] font-medium flex items-center" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Show Less" : "Show More"}
                </button>
            </div>

        </div>
    );
}