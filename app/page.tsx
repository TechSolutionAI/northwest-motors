import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/home/hero-carousel"
import FeaturedVehicles from "@/components/home/featured-vehicles"
import { WhyChooseUs } from "@/components/home/why-choose-us"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">

      <main>
        {/* Hero Section */}
        <section>
          <HeroCarousel />
        </section>

        {/* Newest Vehicles Section */}
        <section className="py-12 bg-white">
          <FeaturedVehicles />
        </section>

        {/* Why NorthWest Motors Section */}
        <section className="py-16 bg-dark text-white">
          <WhyChooseUs />
        </section>

        {/* Choose Your Lifestyle Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <p className="text-sm text-gray-500 mb-2">Let's find your dream car</p>
            <h2 className="text-3xl font-bold mb-8">CHOOSE YOUR LIFESTYLE</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <Link href="#" className="flex items-center text-gray-700 hover:text-gray-900">
                  <span>Family</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="#" className="flex items-center text-gray-700 hover:text-gray-900">
                  <span>Trade</span>
                </Link>
                <Link href="#" className="flex items-center text-gray-700 hover:text-gray-900">
                  <span>Green</span>
                </Link>
                <Link href="#" className="flex items-center text-gray-700 hover:text-gray-900">
                  <span>Performance</span>
                </Link>
                <Link href="#" className="flex items-center text-gray-700 hover:text-gray-900">
                  <span>Midsize Cruisers</span>
                </Link>
              </div>

              <div className="md:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="h-80 bg-white rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?key=a0mld"
                        alt="Mercedes-Benz GLC"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="bg-white p-6 h-full">
                      <h3 className="font-bold">Mercedes-Benz GLC-Class</h3>
                      <p className="text-xs text-gray-500 mt-1">X253 GLC300 Wagon 5dr 9G-TRONIC 9sp 4MATIC 2.0T</p>

                      <div className="mt-6">
                        <p className="font-bold text-xl">$74,950</p>
                      </div>

                      <div className="mt-4 flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">45,293</span>

                        <div className="ml-6 px-3 py-1 bg-gray-100 text-xs">AUTOMATIC</div>
                      </div>

                      <div className="mt-6 flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">CALL 206-555-4878</span>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-2">
                        <Button variant="outline" className="w-full border-gray-300 text-dark">
                          VIEW
                        </Button>
                        <Button className="w-full bg-dark hover:bg-dark/90 text-white">ENQUIRE</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-500">1/5</div>
                  <div className="flex space-x-2">
                    <button className="p-2 border rounded-md">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button className="p-2 border rounded-md">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
                <p className="text-sm text-gray-600 mb-4">
                  As part of the respected NorthWest Group, we have a well-established history that dates back to 1985.
                  NorthWest Motors is the automotive sales component — our group also consists of leading prestige car
                  dealerships across the United States. We have a team of experienced professionals who understand the
                  market and can provide expert advice. American owned and operated, NorthWest Motors is the premier
                  destination for quality pre-owned vehicles.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Our Locations</h2>
                <p className="text-sm text-gray-600 mb-6">
                  With multiple locations across the United States, our experienced team offers a wide range of premium
                  prestige cars for sale in Seattle, Portland, and San Francisco.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="border p-3 text-center">
                    <p className="font-medium">Seattle</p>
                  </div>
                  <div className="border p-3 text-center">
                    <p className="font-medium">Portland</p>
                  </div>
                  <div className="border p-3 text-center">
                    <p className="font-medium">San Francisco</p>
                  </div>
                  <div className="border p-3 text-center">
                    <p className="font-medium">Los Angeles</p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="w-full bg-dark hover:bg-dark/90 text-white">VIEW ALL</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
