"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  isScrolled?: boolean
  isFooter?: boolean
}

export function Logo({ className, size = "md", isScrolled = false, isFooter = false }: LogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sizes = {
    sm: "h-8",
    md: "h-10",
    lg: "h-16",
  }

  // Use the appropriate logo based on the theme
  // When not scrolled and on the homepage, always use the white logo for better visibility
  // For footer, always use the appropriate theme-based logo
  const isDark = theme === "dark" || resolvedTheme === "dark"

  // Default to white logo until client-side rendering is complete
  let logoSrc = "/logo-white.webp"

  if (mounted) {
    // if (isFooter) {
    //   // In footer, use theme-appropriate logo
    //   logoSrc = isDark ? "/logo-white.webp" : "/logo.webp"
    // } else {
    //   // For header, use the existing logic
    //   logoSrc =
    //     !isScrolled && pathname === "/" ? "/logo-white.webp" : isDark ? "/logo-white.webp" : "/logo.webp"
    // }

    logoSrc = '/logo.webp';
  }

  return (
    <div className={cn(sizes[size], className)}>
      <Image
        src={logoSrc || "/car-placeholder.webp"}
        alt="Northwest Motors Logo"
        width={300}
        height={150}
        className="h-full w-auto"
      />
    </div>
  )
}
