"use client"

import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import { Card, CardContent } from "@/components/ui/card"

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  const faqItems = [
    {
      question: "¿En qué tipos de proyectos trabajan?",
      answer:
        "Trabajamos en una variedad de proyectos que incluyen desde diseño gráfico, fotografía, diseño web personalizado, desarrollo de sitios web, soluciones de comercio electrónico, rediseños de sitios web existentes y mucho más.",
    },
    {
      question: "¿Cómo se organizan para hacer los trabajos?",
      answer:
        "En Uffo studios trabajamos de manera colaborativa y estructurada. Iniciamos con una reunión de briefing para entender tus necesidades y objetivos. Posteriormente, diseñamos un plan de trabajo y cronograma detallado que incluye entregas parciales y revisiones en cada etapa del proceso. Nuestro objetivo es mantener una comunicación fluida y transparente para que el resultado final refleje fielmente lo que buscas.",
    },
    {
      question: "¿Qué pasa si al cliente no le gusta el sitio web/trabajo?",
      answer:
        "Nos importa tu satisfacción. Si el resultado no cumple con tus expectativas, ofrecemos revisiones y ajustes dentro de los términos pactados previamente. Trabajamos contigo para afinar cada detalle hasta lograr el diseño ideal. En situaciones excepcionales, evaluamos alternativas que puedan incluir revisiones adicionales o, en casos muy particulares, acuerdos específicos en función de lo establecido en el contrato.",
    },
    {
      question: "¿Cuánto cuesta el diseño de un proyecto?",
      answer:
        "El costo de un proyecto varía según su alcance, complejidad y requerimientos específicos. Por ello, en Uffo studios realizamos una cotización personalizada para cada cliente. Te invitamos a contactarnos para analizar en detalle tus necesidades y brindarte una propuesta a medida.",
    },
    {
      question: "¿Cuándo y cómo pago?",
      answer:
        "Para facilitar la planificación y garantizar el compromiso, solicitamos un adelanto del 40% del costo total al inicio del proyecto. El restante se abona al finalizar y aprobar el trabajo. Aceptamos transferencias bancarias y otros métodos de pago digitales, y todos estos detalles se especifican en el contrato.",
    },
    {
      question: "¿Cuánto tiempo tarda el proyecto?",
      answer:
        "El plazo de entrega depende de la complejidad y alcance del proyecto. En la fase inicial, definimos un cronograma que puede variar desde unas semanas hasta un par de meses. Nos esforzamos por cumplir con los tiempos establecidos sin comprometer la calidad del diseño.",
    },
    {
      question: "¿Qué tipo de revisiones se incluyen?",
      answer:
        "Incluimos un número determinado de revisiones dentro del proceso de diseño para asegurarnos de que el resultado se ajuste a tus expectativas. Estos ajustes están contemplados en la propuesta inicial. Si se requieren modificaciones adicionales, te informaremos de las condiciones y costos extra para adaptarnos a tus necesidades.",
    },
  ]

  return (
    <section id="faq" className="pt-12 sm:pt-16 lg:pt-20 pb-24 sm:pb-32 lg:pb-40 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Preguntas Frecuentes</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-lg sm:text-xl text-muted-foreground mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
            Resolvemos las dudas más comunes sobre nuestros servicios
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 mb-12">
          {faqItems.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up mx-2 sm:mx-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-300 min-h-[60px] touch-manipulation"
                  style={{ touchAction: 'manipulation' }}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-foreground pr-3 sm:pr-4">{item.question}</h3>
                  <div className="flex-shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center">
                    {openItems.includes(index) ? (
                      <FaChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    ) : (
                      <FaChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openItems.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="w-full h-px bg-border mb-3 sm:mb-4"></div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-justify">{item.answer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
