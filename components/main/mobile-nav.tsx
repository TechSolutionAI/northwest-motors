"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Close submenus when main menu is closed
    if (!isOpen === false) {
      setServicesOpen(false)
      setAboutOpen(false)
    }
  }

  const toggleServices = () => {
    setServicesOpen(!servicesOpen)
  }

  const toggleAbout = () => {
    setAboutOpen(!aboutOpen)
  }

  return (
    <div className="lg:hidden">
      {/* Hamburger button */}
      <button
        onClick={toggleMenu}
        className="text-white p-2 focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>}

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-dark z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <Image src="/logo-white.png" alt="NorthWest Motors" width={150} height={40} className="h-8 w-auto" />
          <button onClick={toggleMenu} className="text-white p-2 focus:outline-none" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <nav className="p-8 text-white text-2xl">
          <ul className="space-y-4">
            <li>
              <Link href="#" className="block py-2 hover:text-[#8E6F00]" onClick={toggleMenu}>
                Browse Vehicles
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 hover:text-[#8E6F00]" onClick={toggleMenu}>
                Sell your car
              </Link>
            </li>
            <li>
              <div className="">
                <button
                  onClick={toggleServices}
                  className="flex items-center justify-between w-full py-2 hover:text-[#8E6F00]"
                >
                  <span>Services</span>
                  {servicesOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {servicesOpen && (
                  <div className="pl-4 pb-2">
                    <Link href="#" className="block py-2 hover:text-[#8E6F00]" onClick={toggleMenu}>
                      Concierge
                    </Link>
                    <Link href="#" className="block py-2 hover:text-[#8E6F00]" onClick={toggleMenu}>
                      Finance
                    </Link>
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="">
                <button
                  onClick={toggleAbout}
                  className="flex items-center justify-between w-full py-2 hover:text-[#8E6F00]"
                >
                  <span>About</span>
                  {aboutOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {aboutOpen && (
                  <div className="pl-4 pb-2">
                    <Link href="#" className="block py-2 hover:text-[#8E6F00]" onClick={toggleMenu}>
                      Locations
                    </Link>
                    <Link href="#" className="block py-2 hover:text-[#8E6F00]" onClick={toggleMenu}>
                      Who we are
                    </Link>
                    <Link href="#" className="block py-2 hover:text-[#8E6F00]" onClick={toggleMenu}>
                      Media
                    </Link>
                    <Link href="#" className="block py-2 hover:text-[#8E6F00]" onClick={toggleMenu}>
                      Careers
                    </Link>
                  </div>
                )}
              </div>
            </li>
            <li>
              <Link href="#" className="block py-2 hover:text-[#8E6F00]" onClick={toggleMenu}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 hover:text-[#8E6F00]" onClick={toggleMenu}>
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
