import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
    title: "Login | RM Motors",
    description: "Sign in to your RM Motors account or create a new account.",
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-dark pt-20">
            <div className="container mx-auto px-4 py-16">
                <LoginForm />
            </div>
        </div>
    )
}
