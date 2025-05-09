import type React from "react"
import { exo, kronaOne } from "./fonts"
import "./globals.css"
import { Header } from "@/components/main/header"
import { Footer } from "@/components/main/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { ScrollToTop } from "@/components/main/scroll-to-top"

export const metadata = {
  title: "Northwest Motors - Premium Vehicles",
  description: "Find your perfect vehicle with Northwest Motors",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${exo.variable} ${kronaOne.variable} font-sans`}>
        {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}> */}
        {/* <LanguageProvider> */}
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <ScrollToTop />
        {/* <AccessibilityWidget size="medium" /> */}
        {/* <UserwayStyles /> */}
        {/* </LanguageProvider> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
