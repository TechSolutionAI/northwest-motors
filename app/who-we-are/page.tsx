import { GoogleMap } from "@/components/home/google-map";
import HeroSection from "@/components/who-we-are/hero-section";
import LocationInfo from "@/components/who-we-are/location-info";
import Testimonials from "@/components/who-we-are/testimonials";

export default function WhoWeArePage() {

    return (
        <main className="flex flex-col bg-dark text-white">
            <HeroSection />

            <div className="border"></div>

            <section className="px-10 py-16">
                <Testimonials />
            </section>

            <div className="border"></div>

            <section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
                    {/* Location Info */}
                    <section className="col-span-1">
                        <LocationInfo />
                    </section>
                    {/* Location Map */}
                    <section className="col-span-2 px-10 h-[500px] lg:h-full py-10">
                        <GoogleMap />
                    </section>
                </div>
            </section>

        </main>
    );
}