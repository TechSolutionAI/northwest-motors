"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"

// Define available languages
export const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "ru", name: "Русский" },
  { code: "uk", name: "Українська" },
]

// Import translations
import en from "@/locales/en"
import es from "@/locales/es"
import ru from "@/locales/ru"
import uk from "@/locales/uk"

// Create a map of language codes to translation objects
const translations = {
  en,
  es,
  ru,
  uk,
}

type LanguageContextType = {
  language: string
  setLanguage: (language: string) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with default language (will be updated in useEffect)
  const [language, setLanguage] = useState("en")
  const [isClient, setIsClient] = useState(false)

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)

    // Get language from localStorage or browser settings
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      if (Object.keys(translations).includes(browserLang)) {
        setLanguage(browserLang)
      }
    }
  }, [])

  // Update localStorage when language changes (only on client)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("language", language)
      // Update HTML lang attribute
      document.documentElement.lang = language
    }
  }, [language, isClient])

  // Translation function
  const t = (key: string, params?: Record<string, string | number>): string => {
    // Split the key by dots to navigate the nested structure
    const keys = key.split(".")

    // Get the current language translations
    const langTranslations = translations[language as keyof typeof translations] || translations.en

    // Navigate through the nested structure
    let value = keys.reduce((obj, key) => {
      return obj?.[key] || null
    }, langTranslations as any)

    // If the key doesn't exist, return the key itself
    if (!value) return key

    // Replace parameters if they exist
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(`{${paramKey}}`, String(paramValue))
      })
    }

    return value
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
