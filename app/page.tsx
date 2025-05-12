import { HeroCarousel } from "@/components/home/hero-carousel"
import FeaturedVehicles from "@/components/home/featured-vehicles"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { GoogleMap } from "@/components/home/google-map"
import { ChooseLifeStyle } from "@/components/home/choose-lifestyle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MoveRight } from "lucide-react"

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
          <ChooseLifeStyle />
        </section>

        {/* Who we are and Our Location Section */}
        <section className="bg-white">
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="hover:bg-[#404241] p-10 group cursor-pointer">
                <h2 className="text-[32px] mb-4 group-hover:text-white">Who We Are</h2>
                <p className="text-gray-600 group-hover:text-white">
                  As part of the respected NorthWest Group, we have a well-established history that dates back to 1985.
                  NorthWest Motors is the automotive sales component — our group also consists of leading prestige car
                  dealerships across the United States. We have a team of experienced professionals who understand the
                  market and can provide expert advice. American owned and operated, NorthWest Motors is the premier
                  destination for quality pre-owned vehicles.
                </p>
              </div>

              <div className="p-10">
                <h2 className="text-[32px] mb-4">Our Locations</h2>
                <p className="text text-gray-600 mb-6">
                  With multiple locations across the United States, our experienced team offers a wide range of premium
                  prestige cars for sale in Seattle, Portland, and San Francisco.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/location?name=adelaide" className="border-b p-3 flex justify-between group">
                    Adelaide <MoveRight className="h-5 w-5 hidden group-hover:block" />
                  </Link>
                  <Link href="/location?name=sydeny" className="border-b p-3 flex justify-between group">
                    Sydeny                  <MoveRight className="h-5 w-5 hidden group-hover:block" />
                  </Link>
                  <Link href="/location?name=brisbane" className="border-b p-3 flex justify-between group">
                    Brisbane                  <MoveRight className="h-5 w-5 hidden group-hover:block" />
                  </Link>
                  <Link href="/location?name=melbourne" className="border-b p-3 flex justify-between group">
                    Melbourne                  <MoveRight className="h-5 w-5 hidden group-hover:block" />
                  </Link>
                </div>

                <div className="mt-8">
                  <Button className="w-full h-16 bg-[#404241] hover:bg-[#8E6F00]  text-white" aria-label="VIEW ALL">
                    VIEW ALL
                    <MoveRight className="h-4 w-4 ml-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
