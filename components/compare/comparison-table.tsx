import type { Vehicle } from "@/lib/mock-data"

interface ComparisonTableProps {
    vehicleA: Vehicle
    vehicleB: Vehicle
}

export function ComparisonTable({ vehicleA, vehicleB }: ComparisonTableProps) {
    // These would come from the actual vehicle data in a real app
    const specs = [
        {
            category: "Engine & Performance",
            items: [
                { name: "Engine", valueA: "1.5L 4-Cylinder", valueB: "1.5L 4-Cylinder" },
                { name: "Horsepower", valueA: "100 hp", valueB: "100 hp" },
                { name: "Torque", valueA: "130 Nm", valueB: "130 Nm" },
                { name: "Transmission", valueA: vehicleA.transmission, valueB: vehicleB.transmission },
                { name: "Fuel Type", valueA: vehicleA.fuel, valueB: vehicleB.fuel },
            ],
        },
        {
            category: "Dimensions & Capacity",
            items: [
                { name: "Length", valueA: "3,645 mm", valueB: "3,645 mm" },
                { name: "Width", valueA: "1,645 mm", valueB: "1,645 mm" },
                { name: "Height", valueA: "1,725 mm", valueB: "1,725 mm" },
                { name: "Ground Clearance", valueA: "210 mm", valueB: "210 mm" },
                { name: "Seating Capacity", valueA: "4", valueB: "4" },
            ],
        },
        {
            category: "Features & Technology",
            items: [
                { name: "Infotainment", valueA: "7-inch Touchscreen", valueB: "7-inch Touchscreen" },
                {
                    name: "Smartphone Integration",
                    valueA: "Apple CarPlay & Android Auto",
                    valueB: "Apple CarPlay & Android Auto",
                },
                { name: "Climate Control", valueA: "Manual AC", valueB: "Manual AC" },
                { name: "Navigation", valueA: "Available", valueB: "Not Available", highlight: true },
                { name: "Premium Audio", valueA: "No", valueB: "Yes", highlight: true },
            ],
        },
        {
            category: "Safety & Security",
            items: [
                { name: "Airbags", valueA: "6", valueB: "6" },
                { name: "ABS", valueA: "Yes", valueB: "Yes" },
                { name: "Stability Control", valueA: "Yes", valueB: "Yes" },
                { name: "Parking Sensors", valueA: "Rear", valueB: "Front & Rear", highlight: true },
                { name: "Backup Camera", valueA: "Yes", valueB: "Yes" },
            ],
        },
        {
            category: "Pricing & Warranty",
            items: [
                {
                    name: "Base Price",
                    valueA: `$${vehicleA.price.toLocaleString()}`,
                    valueB: `$${vehicleB.price.toLocaleString()}`,
                    highlight: true,
                },
                { name: "Destination Fee", valueA: "$995", valueB: "$995" },
                { name: "Basic Warranty", valueA: "3 years/36,000 km", valueB: "3 years/36,000 km" },
                { name: "Powertrain Warranty", valueA: "5 years/60,000 km", valueB: "5 years/60,000 km" },
                { name: "Roadside Assistance", valueA: "3 years", valueB: "3 years" },
            ],
        },
    ]

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-medium mb-6">Detailed Comparison</h2>

            {specs.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                    <p className="text-xl font-medium mb-4">{section.category}</p>
                    <div className="border border-gray-200">
                        <div className="grid grid-cols-3 bg-gray-100 p-4">
                            <div className="font-medium">Specification</div>
                            <div className="font-medium text-center">
                                {vehicleA.year} {vehicleA.make} {vehicleA.model}
                            </div>
                            <div className="font-medium text-center">
                                {vehicleB.year} {vehicleB.make} {vehicleB.model}
                            </div>
                        </div>

                        {section.items.map((item, itemIndex) => (
                            <div key={itemIndex}>
                                <div
                                    className={`grid grid-cols-3 p-4 ${item.highlight ? "bg-amber-50" : ""
                                        } ${itemIndex !== section.items.length - 1 ? "border-b border-gray-200" : ""}`}
                                >
                                    <div>{item.name}</div>
                                    <div className="text-center">{item.valueA}</div>
                                    <div className="text-center">{item.valueB}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
