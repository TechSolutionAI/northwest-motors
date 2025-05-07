"use client"

interface TransmissionOption {
    value: string
    label: string
}

interface FuelFilterProps {
    fuels: TransmissionOption[]
    selectedFuels: string[]
    onFuelChange: (transmissions: string[]) => void
}

export default function FuelFilter({
    fuels,
    selectedFuels,
    onFuelChange,
}: FuelFilterProps) {
    const toggleLocation = (value: string) => {
        if (selectedFuels.includes(value)) {
            onFuelChange(selectedFuels.filter((loc) => loc !== value))
        } else {
            onFuelChange([...selectedFuels, value])
        }
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-3">
                {fuels.map((fuel) => (
                    <div
                        key={fuel.value}
                        onClick={() => toggleLocation(fuel.value)}
                        className={`py-3 px-2 text-center cursor-pointer rounded-sm ${selectedFuels.includes(fuel.value)
                            ? "bg-dark text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                    >
                        {fuel.label}
                    </div>
                ))}
            </div>
        </div>
    )
}
