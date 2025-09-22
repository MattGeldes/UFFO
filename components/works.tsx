"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function Works() {
  const [activeWork, setActiveWork] = useState(0)

  const works = [
    {
      title: "Diseño Web Completo",
      description:
        "Desarrollo de sitio web completo para bed & breakfast, incluyendo sistema de reservas y galería interactiva.",
      image: "diseño-web-completo.png",
      category: "Diseño Web",
    },
    {
      title: "Holística - Identidad de Marca",
      description:
        "Creación de identidad visual completa para centro holístico, incluyendo logo, paleta de colores y aplicaciones.",
      image: "holística-logo.png",
      category: "Branding",
    },
    {
      title: "Proyecto Creativo - UX/UI",
      description: "Diseño de experiencia de usuario para aplicación móvil, enfocado en usabilidad y diseño intuitivo.",
      image: "proyecto-creativo-uxui.png",
      category: "UX/UI",
    },
    {
      title: "Campaña Digital - Marketing",
      description: "Estrategia de marketing digital completa incluyendo redes sociales, contenido y publicidad online.",
      image: "campaña-digital-marketing.png",
      category: "Marketing",
    },
  ]

  return (
    <section id="works" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Nuestros Trabajos</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto text-justify">
            Cada proyecto es una oportunidad de crear algo extraordinario
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Work Content */}
          <div className="space-y-8 animate-fade-in-up">
            {works.map((work, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 ${activeWork === index
                    ? "bg-primary text-primary-foreground shadow-xl scale-105"
                    : "bg-card hover:bg-card/80 hover:shadow-lg"
                  }`}
                onClick={() => setActiveWork(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${activeWork === index
                          ? "bg-primary-foreground text-primary"
                          : "bg-primary text-primary-foreground"
                        }`}
                    >
                      {work.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{work.title}</h3>
                  <p
                    className={`leading-relaxed text-justify ${activeWork === index ? "text-primary-foreground/90" : "text-muted-foreground"
                      }`}
                  >
                    {work.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          
          {/* Work Image */}
          <div className="animate-fade-in-up">
            <div className="sticky top-24">
              <Card className="w-full max-w-lg shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={works[activeWork].image || "/placeholder.svg"}
                      alt={works[activeWork].title}
                      fill
                      className="object-cover transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
