import CareerForm from "@/components/careers/career-form";
import CareerSidebar from "@/components/careers/career-sidebar";

export default function CareerPage() {


    return (
        <main className="min-h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
                {/* Contact Info */}
                <section className="col-span-1">
                    <CareerSidebar />
                </section>
                {/* Contact Form + Dealer Info */}
                <section className="col-span-2 bg-gray-100">
                    <CareerForm />
                </section>
            </div>
        </main>
    )
}

