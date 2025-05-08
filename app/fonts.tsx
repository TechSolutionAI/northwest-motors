import { Exo, Krona_One } from "next/font/google"

export const exo = Exo({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-exo",
    display: "swap",
})

export const kronaOne = Krona_One({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-krona-one",
    display: "swap",
})
