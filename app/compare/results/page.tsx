import { CompareResults } from "@/components/compare/compare-results"

export const metadata = {
    title: "Vehicle Comparison Results | RM Motors",
    description: "Detailed side-by-side comparison of your selected vehicles.",
}

export default function CompareResultsPage({
    searchParams,
}: {
    searchParams: { v1: string; v2: string }
}) {
    return <CompareResults vehicleIds={{ v1: searchParams.v1, v2: searchParams.v2 }} />
}
