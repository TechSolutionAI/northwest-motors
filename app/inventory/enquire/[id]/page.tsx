import { notFound } from "next/navigation"

import { vehicles } from "@/lib/mock-data"
import EnquireInfo from "@/components/enquire/enquire-info"
import EnquireForm from "@/components/enquire/enquire-form"


export default async function EnquirePage({ params }: { params: { id: string } }) {
    const vehicleId = Number.parseInt(params.id)
    const vehicle = vehicles.find((v) => v.id === vehicleId)

    if (!vehicle) {
        notFound()
    }

    return (
        <main className="">

            <div className="grid grid-cols-1  lg:grid-cols-3 gap-0 lg:gap-8">
                {/* Enquire Info */}
                <section className="col-span-1">
                    <EnquireInfo vehicle={vehicle} />
                </section>
                {/* Enquire Form */}
                <section className="col-span-2">
                    <EnquireForm vehicle={vehicle} />
                </section>
            </div>

        </main>
    )
}
