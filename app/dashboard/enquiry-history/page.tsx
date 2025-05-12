import { EnquiryHistoryContent } from "@/components/dashboard/enquiry-history-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Enquiry History | RM Motors",
    description: "View your vehicle enquiry history",
}

export default function EnquiryHistoryPage() {
    return <EnquiryHistoryContent />
}
