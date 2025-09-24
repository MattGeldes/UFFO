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
        "Trabajamos en proyectos muy variados, siempre con un enfoque creativo y funcional. Podemos ayudarte con el rebranding de tu marca, fotografía de producto, piezas gráficas para redes y animaciones. También diseñamos y prototipamos sitios web personalizados, desarrollamos soluciones de e-commerce y renovamos páginas ya existentes. En resumen: cualquier proyecto donde la creatividad y la comunicación visual hagan crecer tu marca.",
    },
    {
      question: "¿Cómo se organizan para hacer los trabajos?",
      answer:
        "En Uffo Studios trabajamos de forma colaborativa y organizada. El primer paso es completar nuestro formulario de contacto, que nos ayuda a conocer mejor tus necesidades y objetivos. Con esa información preparamos una propuesta y presupuesto a medida. Luego coordinamos una reunión o videollamada para profundizar en los detalles, ajustar lo necesario y definir juntos el plan de trabajo. Así aseguramos claridad desde el inicio y un proceso transparente en cada etapa.",
    },
    {
      question: "¿Cómo sé cuánto voy a invertir en mi proyecto?",
      answer:
      "El costo de cada proyecto depende de su alcance, complejidad y necesidades específicas. Para darte un presupuesto adecuado, primero te pedimos que completes nuestro formulario de contacto y luego mantenemos una breve reunión para profundizar en tus objetivos. Con esa información elaboramos una propuesta a medida, para que tu inversión se traduzca en un proyecto sólido y con verdadero impacto en tu marca.",
    },
    {
      question: "Formas de pago y financiación disponibles",
      answer:
      "Cada proyecto y cliente es único, por eso ofrecemos distintas opciones de pago para que elijas la que mejor se adapte a vos: podés abonar el 60% al inicio y el 40% al finalizar, cancelar todo al comienzo con un descuento especial, o financiarlo en 2 o 3 cuotas. Queremos que el proceso sea transparente y cómodo, por eso dejamos todos los detalles claros en el contrato.",
    },
    {
      question: "¿Qué pasa si al cliente no le gusta el sitio web/trabajo?",
      answer:
        "En cada proyecto incluimos hasta 3 rondas de revisiones sin costo adicional, para que puedas darnos tu feedback y afinar cada detalle. Si necesitás más cambios después de esas instancias, podemos realizarlos con un costo extra, pero siempre con la misma disposición de escucharte, entenderte y acompañarte en el proceso. Lo importante para nosotros es que el resultado final refleje lo que buscás.",
    },
    {
      question: "¿Qué es y cómo funciona una revisión?",
      answer:
      "Una revisión es un momento dentro del trabajo en el que podés indicarnos cambios, ajustes o mejoras sobre lo que te hemos entregado hasta ese momento. Es un espacio de feedback en el que revisamos juntos lo realizado, hacemos los ajustes necesarios y afinamos cada detalle para lograr el resultado que buscás.",
    },
    {
      question: "¿Puedo cancelar o cambiar algo una vez iniciado el trabajo?",
      answer:
      "Entendemos que pueden surgir cambios. Hasta cierto punto, se pueden realizar ajustes o incluso cancelar partes del trabajo, según lo que hayamos acordado en el contrato. Siempre buscamos soluciones que sean justas y claras, y te acompañamos durante todo el proceso para que no haya sorpresas.",
    },
    {
      question: "¿Qué pasa si necesito algo urgente o fuera de los tiempos habituales?",
      answer:
      "Si necesitás que el trabajo se entregue antes de lo previsto, evaluamos la factibilidad según la complejidad y el calendario de nuestro equipo. En algunos casos podemos priorizar entregas urgentes, siempre comunicando claramente los tiempos y costos adicionales si corresponden.",
    },
    {
      question: "¿Cómo recibo el trabajo final y qué incluye?",
      answer:
      "El trabajo final se entrega según lo que acordemos y lo que necesites: archivos digitales listos para usar, como imágenes, videos, animaciones o prototipos web. Te los enviamos de manera segura y organizada, y si necesitás algún formato adicional o soporte especial, lo coordinamos para que tengas todo lo que necesitás para usar tu trabajo sin problemas.",
    },
    {
      question: "¿En cuánto tiempo puedo recibir el resultado final?",
      answer:
        "El tiempo de entrega depende del alcance y la complejidad de cada proyecto. En la etapa inicial definimos un cronograma junto con vos, que puede ir desde unos pocos días hasta varias semanas o un par de meses, según lo que se necesite. Nuestro objetivo es cumplir los plazos acordados sin comprometer la calidad del diseño.",
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
                  className={`overflow-hidden transition-all duration-300 ${openItems.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
