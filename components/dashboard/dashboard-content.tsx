"use client"

import Link from "next/link"
import { ArrowRight, LogOut, LockKeyhole, Search, MessageSquare } from "lucide-react"

export function DashboardContent() {
    // In a real application, you would fetch user data here
    const handleLogout = () => {
        console.log("Logging out...")
        // In a real application, you would implement actual logout logic here
    }

    return (
        <div className="container mx-auto px-4 pt-32 pb-16 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    <div className="absolute -top-4 left-0 right-0 h-px bg-gray-300"></div>
                    <h1 className="text-4xl font-medium text-gray-700 mb-12">
                        Welcome to
                        <br />
                        your Account
                    </h1>
                </div>

                <div className="space-y-6 mb-12">
                    <Link
                        href="/dashboard/change-password"
                        className="flex items-center justify-between p-4 border-b border-gray-200 group"
                    >
                        <div className="flex items-center">
                            <LockKeyhole className="h-5 w-5 text-gray-500 mr-4" />
                            <span className="text-lg">Change my password</span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </Link>

                    <Link
                        href="/dashboard/saved-searches"
                        className="flex items-center justify-between p-4 border-b border-gray-200 group"
                    >
                        <div className="flex items-center">
                            <Search className="h-5 w-5 text-gray-500 mr-4" />
                            <span className="text-lg">Saved Searches</span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </Link>

                    <Link
                        href="/dashboard/enquiry-history"
                        className="flex items-center justify-between p-4 border-b border-gray-200 group"
                    >
                        <div className="flex items-center">
                            <MessageSquare className="h-5 w-5 text-gray-500 mr-4" />
                            <span className="text-lg">Enquiry History</span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </Link>
                </div>

                <div className="relative">
                    <Link
                        href="/"
                        onClick={handleLogout}
                        className="flex items-center text-lg text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                    </Link>
                </div>

                <div className="mt-16 text-right text-gray-400">
                    <p className="text-lg">info@duttonone.com.au</p>
                    <p className="text-3xl font-light">+1300 341 911</p>
                </div>
            </div>
        </div>
    )
}
