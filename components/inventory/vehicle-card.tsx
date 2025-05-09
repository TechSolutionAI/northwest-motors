import Image from "next/image"
import Link from "next/link"
import { CarFront, CircleGauge, Fuel, MapPinned, MoveRight } from "lucide-react"

type VehicleCardProps = {
  vehicle: Vehicle
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="bg-[#F3F3F3] overflow-hidden">
      <div className="relative h-64">
        <Link href={`/inventory/${vehicle.id}`}>
          <Image
            src={vehicle.image || "/placeholder.svg"}
            alt={`${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover"
          />
        </Link>
      </div>


      <div className="p-4">
        <div className="flex items-baseline">
          <h3 className="text-xl font-bold text-dark">
            {vehicle.make} <span className="text-[#8E6F00]">{vehicle.model}</span>{" "}
            <span className="text-gray-500 text-sm">{vehicle.year}</span>
          </h3>
        </div>
        <p className="text-sm text-gray-500">{vehicle.trim}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-fullflex items-center justify-center mr-2">
              <CircleGauge />
            </div>
            <div className="text-sm">
              {vehicle.km.toLocaleString()} km
              <br />
              <span className="text-xs text-gray-500">Kilometers</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-fullflex items-center justify-center mr-2">
              <CarFront />
            </div>
            <div className="text-sm">
              {vehicle.transmission}
              <br />
              <span className="text-xs text-gray-500">Transmission</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <MapPinned />
            </div>
            <div className="text-sm">
              {vehicle.location}
              <br />
              <span className="text-xs text-gray-500">Location</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <Fuel />
            </div>
            <div className="text-sm">
              {vehicle.fuel}
              <br />
              <span className="text-xs text-gray-500">Fuel</span>
            </div>
          </div>
        </div>

        <div className="border my-8"></div>

        <div className="">
          <span className="text-2xl font-bold">${vehicle.price.toLocaleString()}</span>
          <span className="text-xs ml-2 text-gray-500">*Exc. Gov. Charges</span>
        </div>

        <div className="items-center justify-between mt-8 text-sm bg-white px-4 py-4">
          <div>${vehicle.weeklyPayment} Per Week</div>
          <div className="border my-4"></div>
          <div>{vehicle.comparisonRate}% p.a Comparison Rate</div>
        </div>

        <div className="grid grid-cols-2 gap-0 h-16 mt-4 -m-4 border-b-4 border-b-[#8E6F00]">
          <Link
            href={`/inventory/${vehicle.id}`}
            className="flex items-center justify-center py-2 bg-[#E6E7E8] hover:text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
          >
            VIEW <MoveRight className="ml-2 h-6 w-6" />
          </Link>
          <Link
            href={`/enquire/${vehicle.id}`}
            className="flex items-center justify-center py-2 bg-[#414042] text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in"
          >
            ENQUIRE <MoveRight className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}
