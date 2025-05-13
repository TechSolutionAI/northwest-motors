"use client"

import { CarFront, CircleGauge, MessageCircleCode, MoveDown, MoveLeft, MoveRight, MoveUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { lifestyleOptions, vehicles } from "@/lib/mock-data";


interface CategoryProps {
    category: any,
    onClicked: (category: any) => void
}

export function Category({ category, onClicked }: CategoryProps) {

    const handleCategorySelect = (category: any) => {
        onClicked(category)
    }

    return (

        <div >
            {lifestyleOptions.map((cat) => (
                <div key={cat.value}
                    className={cn(
                        "flex py-4 items-center cursor-pointer text-gray-700 hover:text-gray-900 px-4",
                        cat.value === category.value ? "border-l-2 border-[#8E6F00]" : "border-none",
                    )}
                    onClick={() => { handleCategorySelect(cat) }}>
                    <span>{cat.label}</span>
                    {cat.value === category.value && <MoveRight className="ml-2 h-4 w-4" />}
                </div>
            ))}
        </div>


    );
}

export function MobileCategory({ category, onClicked }: CategoryProps) {

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleCategorySelect = (category: any) => {
        onClicked(category)
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown header */}
            <button
                aria-label="Toggle"
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none"
            >
                <span className="font-medium">Choose a Lifestyle : {category.name}</span>
                {isOpen ? <MoveUp className="h-5 w-5 text-[#8E6F00]" /> : <MoveDown className="h-5 w-5 text-[#8E6F00]" />}
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="py-1">
                        {lifestyleOptions.map((cat) => (
                            <button
                                aria-label={cat.label}
                                key={cat.value}
                                onClick={() => handleCategorySelect(cat)}
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${cat.value === category.value ? "font-medium text-dark" : "text-gray-700"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

interface CardProps {
    vehicles: Vehicle[],
    index: number;
}

export function Card({ vehicles, index }: CardProps) {


    return (
        <div>
            <div className="relative overflow-hidden">
                <div
                    className="flex h-auto transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {vehicles.map((vehicle) => {
                        return (
                            <div key={vehicle.id} className="w-full flex-shrink-0">
                                <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
                                    <div className="lg:col-span-6">
                                        <div className="h-full rounded-md overflow-hidden">
                                            <Image
                                                src={vehicle.image}
                                                alt="Mercedes-Benz GLC"
                                                width={600}
                                                height={400}
                                                className="w-full h-full object-cover"
                                                sizes="(max-width: 640px) 100vw,
                                                (max-width: 1024px) 50vw,
                                                (max-width: 1280px) 33vw,
                                                25vw"
                                                quality={80}
                                            />
                                        </div>
                                    </div>

                                    <div className="lg:col-span-4">
                                        <div className="h-full">
                                            <div className="flex items-baseline">
                                                <p className="text-[28px] font-bold text-dark">
                                                    {vehicle.make} <span className="text-[#8E6F00]">{vehicle.model}</span>{" "}
                                                </p>
                                            </div>

                                            <p className="text-gray-700 mt-1">X253 GLC300 Wagon 5dr 9G-TRONIC 9sp 4MATIC 2.0T</p>
                                            <p className="text-gray-700 mt-4">YEAR: {vehicle.year}</p>
                                            <p className="font-bold text-xl mt-1">$74,950</p>

                                            <div className="grid grid-cols-2 gap-0 mt-4 border-b border-b-gray-400 pb-8">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-fullflex items-center justify-center mr-2">
                                                        <CircleGauge />
                                                    </div>
                                                    <div className="">
                                                        {vehicle.km.toLocaleString()} km
                                                        <br />
                                                        <span className="text-gray-700">Kilometers</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-fullflex items-center justify-center mr-2">
                                                        <CarFront />
                                                    </div>
                                                    <div className="">
                                                        {vehicle.transmission}
                                                        <br />
                                                        <span className=" text-gray-700">Transmission</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-center w-full border-[1px] border-black mt-8 p-4 cursor-pointer text-center">
                                                <MessageCircleCode /> <span className="ml-4">Call 03 9832 2345</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-0 h-16 mt-8 border-b-4 border-b-[#8E6F00]">
                                                <Link
                                                    href="#"
                                                    className="flex items-center justify-center py-2 bg-[#E6E7E8] hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                                                >
                                                    VIEW <MoveRight className="ml-2 h-6 w-6" />
                                                </Link>
                                                <Link
                                                    href={`/inventory/enquire/${vehicle.id}`}
                                                    className="flex items-center justify-center py-2 bg-[#414042] text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
                                                >
                                                    ENQUIRE <MoveRight className="ml-2 h-6 w-6" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
            {/* Progress line */}
            <div className="mt-4 flex space-x-1">
                {[0, 1, 2, 3, 4].map((ixd) => (
                    <div
                        key={ixd}
                        className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${ixd === index ? "bg-[#8E6F00]" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export function ChooseLifeStyle() {

    const [selectedCategory, setSelectedCategory] = useState(lifestyleOptions[0]);
    const [slideIndex, setSlideIndex] = useState(0);

    const slideVihcles = vehicles.slice(0, 5);

    const handleCategorySelect = (category: any) => {
        setSelectedCategory(category)
    }

    const handleNextSlide = () => {
        setSlideIndex((prev) => (prev === 4 ? 0 : prev + 1))
    }

    const handlePrevSlide = () => {
        setSlideIndex((prev) => (prev === 0 ? 4 : prev - 1))
    }


    return (
        <div className="container mx-auto px-4">
            <p className="text-3xl text-gray-00">Let's find your dream car</p>
            <h2 className="text-5xl font-krona mt-4">CHOOSE YOUR LIFESTYLE</h2>

            <div className="grid grid-cols-1 lg:grid-cols-8 gap-0 lg:gap-8 mt-16 lg:border-l-2 border-none items-center">
                <div className="col-span-2 space-y-6 text-2xl hidden lg:block">
                    <Category category={selectedCategory} onClicked={handleCategorySelect} />
                </div>

                <div className="col-span-2 space-y-6 text-2xl lg:hidden block">
                    <MobileCategory category={selectedCategory} onClicked={handleCategorySelect} />
                </div>
                <div className="col-span-6 mt-8 lg:mt-0">
                    <Card vehicles={slideVihcles} index={slideIndex} />
                </div>
            </div>

            <div className="mt-6 flex justify-end items-center">
                <div className="mr-4">{slideIndex + 1} | 5</div>
                <div className="flex space-x-2">
                    <button
                        aria-label="Previous"
                        className="px-4  py-2 border rounded-md group border-[#414042] hover:bg-[#414042] transition-colors ease-in duration-450"
                        onClick={() => {
                            handlePrevSlide();
                        }}
                    >
                        <MoveLeft className="h-8 w-8 group-hover:text-white" />
                    </button>
                    <button
                        aria-label="Next"
                        className="px-4 py-2 border rounded-md group border-[#414042] hover:bg-[#414042] transition-colors ease-in duration-450"
                        onClick={() => {
                            handleNextSlide();
                        }}
                    >
                        <MoveRight className="h-8 w-8 group-hover:text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
