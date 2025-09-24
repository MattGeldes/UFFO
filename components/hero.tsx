"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  const greetings = ["HOLA!","HALLO!", "HI!", "BONJOUR!", "OLÁ!", "CIAO!", "こんにちは!", "안녕하세요!", "你好!", "مرحبا!"]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [text, setText] = useState("")

  useEffect(() => {
    const typingSpeed = 150
    const deletingSpeed = 100
    const pauseDuration = 2000
    let currentText = ""
    let currentWordIndex = 0
    let isDeleting = false
    let timeoutId: NodeJS.Timeout

    const typeWriter = () => {
      const currentWord = greetings[currentWordIndex]

      if (!isDeleting && currentText.length < currentWord.length) {
        // Escribiendo
        currentText = currentWord.slice(0, currentText.length + 1)
        setText(currentText)
        timeoutId = setTimeout(typeWriter, typingSpeed)
      } else if (!isDeleting && currentText.length === currentWord.length) {
        // Palabra completa, comenzar a borrar
        isDeleting = true
        timeoutId = setTimeout(typeWriter, pauseDuration)
      } else if (isDeleting && currentText.length > 0) {
        // Borrando
        currentText = currentWord.slice(0, currentText.length - 1)
        setText(currentText)
        timeoutId = setTimeout(typeWriter, deletingSpeed)
      } else {
        // Palabra borrada, pasar a la siguiente
        isDeleting = false
        currentWordIndex = (currentWordIndex + 1) % greetings.length
        timeoutId = setTimeout(typeWriter, typingSpeed)
      }
    }

    typeWriter()
    return () => {
      clearTimeout(timeoutId)
      currentText = ""
      setText("")
    }
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative bg-white px-4 sm:px-6 lg:px-8 pt-20">
      <div className="absolute top-8 left-8 bg-[#bfe220] text-[#181818] px-4 py-2 rounded-full font-bold text-sm shadow-lg">
        INICIO
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="h-24 sm:h-28 lg:h-32 mb-6 flex items-center justify-center lg:justify-start">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[#181818]">
                {text}
                <span className="animate-blink">|</span>
              </h1>
            </div>
          </div>

          {/* Lado derecho - mantener igual */}
          <div className="text-center lg:text-right">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] leading-tight text-justify">
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