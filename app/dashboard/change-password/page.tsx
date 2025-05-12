import { ChangePasswordForm } from "@/components/dashboard/change-password-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Change Password | RM Motors",
    description: "Update your account password",
}

export default function ChangePasswordPage() {
    return <ChangePasswordForm />
}
