import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
    title: "Forgot Password | RM Motors",
    description: "Reset your RM Motors account password.",
}

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-dark pt-20">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto bg-white p-8">
                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    )
}
