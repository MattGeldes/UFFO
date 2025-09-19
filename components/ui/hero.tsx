"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  const [currentGreeting, setCurrentGreeting] = useState(0)
  const greetings = [
    "HOLA", // Español
    "HELLO", // Inglés
    "HALLO", // Alemán
    "CIAO", // Italiano
    "BONJOUR", // Francés
    "OLÁ", // Portugués
    "HOLA", // Catalán
    "こんにちは", // Japonés
    "ПРИВЕТ", // Ruso
    "مرحبا", // Árabe
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [greetings.length])

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative bg-white px-4 sm:px-6 lg:px-8 pt-20">
      <div className="absolute top-8 left-8 bg-[#bfe220] text-[#181818] px-4 py-2 rounded-full font-bold text-sm shadow-lg">
        INICIO
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative overflow-hidden h-24 sm:h-28 lg:h-32 mb-6 flex items-center justify-center lg:justify-start">
              {greetings.map((greeting, index) => (
                <div
                  key={`${greeting}-${index}`}
                  className={`absolute text-6xl sm:text-7xl lg:text-8xl font-bold text-[#181818] transition-all duration-1000 ${
                    index === currentGreeting
                      ? "opacity-100 transform translate-y-0 scale-100"
                      : "opacity-0 transform translate-y-4 scale-75"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                    transitionProperty: "opacity, transform",
                  }}
                >
                  {greeting}!
                </div>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#4e6e5d] mb-4 text-center lg:text-justify">
              Estudio creativo
            </h2>
          </div>

          {/* Divisor - mantener igual */}
          <div className="w-16 h-1 lg:w-1 lg:h-32 bg-[#bfe220] rounded-full shadow-lg"></div>

          {/* Lado derecho - mantener igual */}
          <div className="text-center lg:text-right">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] leading-tight text-center lg:text-justify">
              Personas
              <br />
              <span className="text-[#bfe220] drop-shadow-lg">creando</span>
              <br />
              tus ideas
            </p>
            <Link href="/formulario">
              <Button
                size="lg"
                className="mt-8 bg-[#181818] hover:bg-[#bfe220] text-white hover:text-[#181818] font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Comenzar Proyecto
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
