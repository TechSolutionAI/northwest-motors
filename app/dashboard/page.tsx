import { DashboardContent } from "@/components/dashboard/dashboard-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Dashboard | RM Motors",
    description: "Manage your account, saved searches, and enquiry history",
}

export default function DashboardPage() {
    return <DashboardContent />
}
