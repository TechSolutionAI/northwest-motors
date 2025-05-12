import { SavedSearchesContent } from "@/components/dashboard/saved-searches-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Saved Searches | RM Motors",
    description: "View and manage your saved vehicle searches",
}

export default function SavedSearchesPage() {
    return <SavedSearchesContent />
}
