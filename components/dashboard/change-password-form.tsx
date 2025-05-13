"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, Check } from "lucide-react"

export function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [success, setSuccess] = useState(false)

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!currentPassword) {
            newErrors.currentPassword = "Current password is required"
        }

        if (!newPassword) {
            newErrors.newPassword = "New password is required"
        } else if (newPassword.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters"
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your new password"
        } else if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            console.log("Password change submitted")
            // In a real app, you would call an API to change the password
            setSuccess(true)
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }
    }

    return (
        <div className="container mx-auto px-4 pt-32 pb-16 min-h-screen">
            <div className="max-w-2xl mx-auto">
                <Link href="/dashboard" className="flex items-center text-gray-600 mb-8 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Dashboard
                </Link>

                <h1 className="text-3xl font-medium text-gray-700 mb-8">Change Password</h1>

                {success ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
                        <div className="flex items-center">
                            <Check className="h-5 w-5 mr-2" />
                            <p>Your password has been successfully updated.</p>
                        </div>
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Current Password"
                                className={`w-full border-b ${errors.currentPassword ? "border-red-500" : "border-gray-300"} py-2 px-1 focus:outline-none focus:border-gray-500`}
                            />
                            <button
                                type="button"
                                aria-label="Show or hide password"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-2 top-2 text-gray-700"
                            >
                                {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>}
                    </div>

                    <div>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                                className={`w-full border-b ${errors.newPassword ? "border-red-500" : "border-gray-300"} py-2 px-1 focus:outline-none focus:border-gray-500`}
                            />
                            <button
                                type="button"
                                aria-label="Show or hide password"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-2 top-2 text-gray-700"
                            >
                                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
                    </div>

                    <div>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm New Password"
                                className={`w-full border-b ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} py-2 px-1 focus:outline-none focus:border-gray-500`}
                            />
                            <button
                                type="button"
                                aria-label="Show or hide password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-2 text-gray-700"
                            >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            aria-label="Submit"
                            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
