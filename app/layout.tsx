import type React from "react"
import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import "./globals.css"

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
})

export const metadata: Metadata = {
  title: "UFFO Studios",
  description: "Personas creando tus ideas. Diseñamos desde Mendoza para el mundo.",
  generator: "UFFO Studios",
  icons: {
    icon: "/logo-uffo.jpg",
    shortcut: "/logo-uffo.jpg",
    apple: "/logo-uffo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={rubik.variable}>
      <body className="font-sans antialiased text-justify">{children}</body>
    </html>
  )
}
