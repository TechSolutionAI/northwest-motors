"use client"

import Link from "next/link"
import { Logo } from "./logo"
import { useTheme } from "next-themes"

export function Footer() {
  const { theme, resolvedTheme } = useTheme()
  const currentYear = new Date().getFullYear()


  return (
    <footer className="border-t border-border bg-dark">
      <div className="container py-8 md:py-12 text-white">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            {/* Pass isFooter prop to Logo component to ensure correct logo is used in footer */}
            <Logo size="md" isFooter={true} />
            <p className="text-sm">Your trusted source for quality vehicles.</p>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-bold">{"Quick Links"}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-700">
                  Browse Vehicles
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-700">
                  Sell you car
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-700">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-700">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-bold">{"Contact"}</p>
            <ul className="space-y-2 text-sm">
              <li>2459 S IL Route 83</li>
              <li>Mundelein, IL 60060</li>
              <li>+1 888-870-2148</li>
              <li>info@northwestmotors.com</li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-bold">{"Hours"}</p>
            <ul className="space-y-1 text-sm">
              {/* For simplicity, we'll use the direct values instead of translations for now */}
              {/* In a real app, you would update all language files with these new keys */}
              <li className="flex justify-between">
                <span>Monday:</span>
                <span>10:00 am - 7:00 pm</span>
              </li>
              <li className="flex justify-between">
                <span>Tuesday:</span>
                <span>10:00 am - 7:00 pm</span>
              </li>
              <li className="flex justify-between">
                <span>Wednesday:</span>
                <span>10:00 am - 7:00 pm</span>
              </li>
              <li className="flex justify-between">
                <span>Thursday:</span>
                <span>10:00 am - 7:00 pm</span>
              </li>
              <li className="flex justify-between">
                <span>Friday:</span>
                <span>10:00 am - 7:00 pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 am - 5:00 pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm">
          <p>
            {`© ${currentYear} Northwest Motors. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
