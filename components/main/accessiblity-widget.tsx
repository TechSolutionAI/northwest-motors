"use client"

import { useEffect } from "react"

// Available sizes: "small", "medium", "large"
// We'll use "medium" as the default size
export function AccessibilityWidget({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  useEffect(() => {
    // Remove any existing UserWay scripts to avoid duplicates
    const existingScript = document.getElementById("userway-script")
    if (existingScript) {
      existingScript.remove()
    }

    // Add UserWay script with the specific configuration
    const script = document.createElement("script")
    script.id = "userway-script"
    script.src = "https://cdn.userway.org/widget.js"
    script.async = true
    script.dataset.account = "RKc9SJg9ce" // The specific account from the provided URL

    // Add specific UserWay configuration
    window.dispatchEvent(new Event("userway:ready"))

    // Update the widget_position value to ensure it's in the bottom left corner
    // In UserWay's positioning system:
    // 1 - Top Left
    // 2 - Bottom Left (what we want)
    // 3 - Top Right
    // 4 - Bottom Right

    window.userwaySettings = {
      siteId: 707430,
      userId: 20193,
      noManage: false,
      noLogo: false,
      paidAi: false,
      widget_language: null,
      widget_icon_type: "2",
      widget_icon_size: size, // Use the size prop to set the icon size
      widget_position: "2", // "2" corresponds to bottom left
      site_name: "nw-motors.com",
      widget_no_report: true,
      widget_position_nudge: null,
      widget_position_nudge_mobile: null,
    }

    document.body.appendChild(script)

    return () => {
      // Clean up script when component unmounts
      const scriptToRemove = document.getElementById("userway-script")
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [size]) // Add size to dependency array to re-run effect when size changes

  // No need to render our own button as UserWay will create its own
  return null
}
