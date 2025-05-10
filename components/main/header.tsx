"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { MobileNav } from "./mobile-nav"
import { Logo } from "./logo"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Check if we're on the homepage
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Call once to set initial state
    handleScroll()

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHomePage ? "bg-white shadow-md border-b border-dark" : "bg-transparent border-transparent"
        }`}
      style={{ transitionDelay: scrolled ? "var(--transition-closing-delay)" : "var(--transition-show-delay)" }}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo - only visible on large screens */}
        <div className="">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Empty div for spacing on smaller screens */}
        <div className="lg:hidden"></div>

        {/* Desktop Navigation - only visible on large screens */}
        <nav className="hidden lg:flex items-center justify-end space-x-6 text-black text-lg">
          <Link href="/inventory" className="hover:underline hover:underline-offset-8 hover:decoration-[#8E6F00]">
            Browse Vehicles
          </Link>
          <Link href="/sell" className="hover:underline hover:underline-offset-8 hover:decoration-[#8E6F00]">
            Sell your car
          </Link>

          <div className="relative group" ref={servicesRef}>
            <button className="flex items-center hover:underline hover:underline-offset-8 hover:decoration-[#8E6F00]">
              Services <ChevronDown className="ml-1 h-4 w-4" />
            </button>

            {/* Invisible area to prevent gap between button and dropdown */}
            <div className="absolute -bottom-2 left-0 h-2 w-full"></div>

            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white text-black py-1 z-50 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
              <Link href="/concierge" className="block px-4 py-2 hover:underline hover:underline-offset-8 hover:decoration-[#8E6F00]">
                Concierge
              </Link>
              <Link href="/finance" className="block px-4 py-2 hover:underline hover:underline-offset-8 hover:decoration-[#8E6F00]">
                Finance
              </Link>
            </div>
          </div>

          <div className="relative group" ref={aboutRef}>
            <button className="flex items-center hover:underline hover:underline-offset-8 hover:decoration-[#8E6F00]">
              About <ChevronDown className="ml-1 h-4 w-4" />
            </button>

            {/* Invisible area to prevent gap between button and dropdown */}
            <div className="absolute -bottom-2 left-0 h-2 w-full"></div>

            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white text-black py-1 z-50 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
              <Link href="/location" className="block px-4 py-2 hover:underline hover:underline-offset-8 hover:decoration-[#8E6F00]">
                Locations
              </Link>
              <Link href="#" className="block px-4 py-2 hover:underline hover:underline-offset-8 hover:decoration-[#8E6F00]">
                Who we are
              </Link>
              <Link href="#" className="block px-4 py-2 hover:underline hover:underline-offset-8 hover:decoration-[#8E6F00]">
                Media
              </Link>
              <Link href="#" className="block px-4 py-2 hover:underline hover:underline-offset-8 hover:decoration-[#8E6F00]">
                Careers
              </Link>
            </div>
          </div>

          <Link href="/contact" className="hover:underline hover:underline-offset-8 hover:decoration-[#8E6F00]">
            Contact
          </Link>
          <Link href="#" className="hover:underline hover:underline-offset-8 hover:decoration-[#8E6F00]">
            Blog
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  )
}
