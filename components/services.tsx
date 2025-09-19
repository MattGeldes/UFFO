"use client"

import { useState } from "react"
import { ArrowRight, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Services() {
  const [expandedService, setExpandedService] = useState<number | null>(null)

  const services = [
    {
      name: "Diseño Gráfico",
      description:
        "Creamos identidades visuales únicas que comunican la esencia de tu marca. Desde logos hasta material publicitario, cada diseño cuenta tu historia de manera impactante y memorable.",
    },
    {
      name: "Diseño Web",
      description:
        "Desarrollamos sitios web modernos, responsivos y optimizados que reflejan tu marca y convierten visitantes en clientes. Experiencias digitales que funcionan perfectamente en todos los dispositivos.",
    },
    {
      name: "Diseño UX UI",
      description:
        "Diseñamos experiencias digitales intuitivas y atractivas. Interfaces que no solo se ven bien, sino que funcionan perfectamente para tus usuarios y objetivos de negocio.",
    },
    {
      name: "Foto Producto",
      description:
        "Fotografía profesional que resalta las mejores características de tus productos. Imágenes de alta calidad que aumentan las ventas y mejoran la percepción de tu marca en el mercado.",
    },
    {
      name: "Impresión 3D",
      description:
        "Transformamos ideas digitales en objetos físicos tangibles. Prototipado rápido, piezas personalizadas y soluciones innovadoras para proyectos únicos y creativos.",
    },
    {
      name: "SEO SEM",
      description:
        "Optimizamos tu presencia online y gestionamos campañas publicitarias efectivas. Estrategias de posicionamiento orgánico y pago que aumentan tu visibilidad y atraen más clientes potenciales.",
    },
    {
      name: "Marketing Digital",
      description:
        "Estrategias integrales que conectan tu marca con tu audiencia. Desde redes sociales hasta campañas publicitarias, maximizamos tu alcance y conversiones.",
    },
  ]

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index)
  }

  const scrollToFooter = () => {
    const footer = document.getElementById("footer")
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Side - Call to Action */}
          <div className="space-y-6">
            {/* Upper Card */}
            <Card className="bg-[#bfe220] text-[#181818] p-8 rounded-3xl shadow-xl animate-fade-in-up">
              <CardContent className="space-y-6 p-0">
                <h3 className="text-3xl sm:text-4xl font-bold leading-tight text-justify">
                  Responsive para cada dispositivo y navegador!
                </h3>
                <p className="text-lg opacity-90 text-justify">
                  Nos aseguramos de que tu sitio web esté disponible para usuarios de todos los dispositivos!
                </p>
                <Button
                  size="lg"
                  onClick={scrollToFooter}
                  className="bg-[#181818] hover:bg-[#bfe220] hover:text-[#181818] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Contáctanos
                </Button>
              </CardContent>
            </Card>

            {/* Lower Card */}
            <Card className="bg-[#4e6e5d] text-white p-8 rounded-3xl shadow-xl animate-fade-in-up">
              <CardContent className="flex items-center gap-6 p-0">
                <div className="flex-shrink-0">
                  <Image
                    src="/logo-uffo.svg"
                    alt="UFFO Studios"
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20"
                  />
                </div>
                <blockquote className="text-lg sm:text-xl font-medium italic text-justify">
                  "Transformamos ideas en experiencias digitales memorables que conectan con tu audiencia y generan
                  resultados reales."
                </blockquote>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Services List */}
          <Card className="bg-[#181818] text-white rounded-3xl shadow-xl animate-fade-in-up">
            <CardContent className="p-8 sm:p-12 h-full flex flex-col">
              <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">Servicios</h2>

              <div className="space-y-4 flex-grow">
                {services.map((service, index) => (
                  <div key={service.name} className="border-b border-white/10 last:border-b-0">
                    <div
                      className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => toggleService(index)}
                    >
                      <span className="text-xl font-semibold group-hover:text-[#bfe220] transition-colors duration-300">
                        {service.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        {expandedService === index ? (
                          <ChevronUp className="w-6 h-6 group-hover:text-[#bfe220] transition-all duration-300" />
                        ) : (
                          <ArrowRight className="w-6 h-6 group-hover:text-[#bfe220] group-hover:translate-x-2 transition-all duration-300" />
                        )}
                      </div>
                    </div>

                    {/* Descripción desplegable */}
                    {expandedService === index && (
                      <div className="px-4 pb-4 animate-fade-in-up">
                        <p className="text-gray-300 text-justify leading-relaxed">{service.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
