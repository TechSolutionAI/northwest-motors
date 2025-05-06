import { HeroCarousel } from "@/components/home/hero-carousel"
import FeaturedVehicles from "@/components/home/featured-vehicles"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { GoogleMap } from "@/components/home/google-map"
import { ChooseLifeStyle } from "@/components/home/choose-lifestyle"

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

        <section className="bg-white">
          <h3 className="text-3xl font-bold text-center my-16">Our Location</h3>
          <GoogleMap />
        </section>
      </main>
    </div>
  )
}
