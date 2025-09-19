import type React from "react"
import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import "./globals.css"

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  fallback: ["system-ui", "arial"],
})

export const metadata: Metadata = {
  title: "UFFO Studios - Diseño y Creatividad",
  description: "Personas creando tus ideas. Diseñamos desde Mendoza para el mundo.",
  generator: "UFFO Studios",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
