"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

export function ForgotPasswordForm() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)
    const [touched, setTouched] = useState(false)
    const [isValid, setIsValid] = useState(false)

    // Validate email
    useEffect(() => {
        if (!touched) return

        if (!email) {
            setError("Email is required")
            setIsValid(false)
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address")
            setIsValid(false)
            return
        }

        setError(undefined)
        setIsValid(true)
    }, [email, touched])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setTouched(true)

        if (isValid) {
            // In a real app, you would call an API to send a reset email
            console.log("Password reset requested for:", email)
            setIsSubmitted(true)
        }
    }

    if (isSubmitted) {
        return (
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
                    <h2 className="text-2xl font-medium mb-2">Check your email</h2>
                    <p className="text-gray-600 mb-6">
                        We've sent a password reset link to <strong>{email}</strong>
                    </p>
                    <p className="text-sm text-gray-500 mb-6">If you don't see it, please check your spam folder.</p>
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Return to login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium mb-2">Forgot your password?</h2>
            <p className="text-gray-600 mb-6">Enter your email address and we'll send you a link to reset your password.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                    <div className="relative">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched(true)}
                            className={`border  border-t-0 border-l-0 border-r-0 rounded-none px-4 py-2 w-full ${touched && (error ? "border-red-500" : "border-green-500")
                                }`}
                            required
                        />
                        {touched && (
                            <div className="absolute right-3 top-3">
                                {error ? (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                ) : (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                )}
                            </div>
                        )}
                    </div>
                    {touched && error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>

                <button
                    type="submit"
                    aria-label="Submit"
                    className="w-full mt-4 p-4 mb-4 flex items-center justify-center bg-[#414042] text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in cursor-pointer" disabled={!isValid && touched}
                >
                    Send Reset Link <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <div className="text-center">
                    <Link href="/login" className="text-sm text-gray-600 hover:underline">
                        Back to login
                    </Link>
                </div>
            </form>
        </div>
    )
}
