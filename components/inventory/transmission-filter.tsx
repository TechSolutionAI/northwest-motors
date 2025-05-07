"use client"

interface TransmissionOption {
    value: string
    label: string
}

interface TransmissionFilterProps {
    transmissions: TransmissionOption[]
    selectedTransmissions: string[]
    onTransmissionChange: (transmissions: string[]) => void
}

export default function TransmissionFilter({
    transmissions,
    selectedTransmissions,
    onTransmissionChange,
}: TransmissionFilterProps) {
    const toggleLocation = (value: string) => {
        if (selectedTransmissions.includes(value)) {
            onTransmissionChange(selectedTransmissions.filter((loc) => loc !== value))
        } else {
            onTransmissionChange([...selectedTransmissions, value])
        }
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-3">
                {transmissions.map((transmission) => (
                    <div
                        key={transmission.value}
                        onClick={() => toggleLocation(transmission.value)}
                        className={`py-3 px-2 text-center cursor-pointer rounded-sm ${selectedTransmissions.includes(transmission.value)
                            ? "bg-dark text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                    >
                        {transmission.label}
                    </div>
                ))}
            </div>
        </div>
    )
}
