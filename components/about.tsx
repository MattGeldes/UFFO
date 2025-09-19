import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#181818]">Nosotros</h2>
              <div className="w-16 h-1 bg-[#bfe220] rounded-full"></div>
            </div>

            <div className="space-y-4 text-lg text-[#4e6e5d] leading-relaxed">
              <p>
                Diseñamos desde Mendoza para el mundo. Impulsamos el potencial de tu marca con diseño y creatividad,
                entregándote resultados de calidad que aportan valor a tu empresa.
              </p>

              <p>
                Seguimos un proceso de trabajo efectivo que nos permite optimizar el tiempo, brindando soluciones
                profesionales a las marcas con las que colaboramos.
              </p>

              <p>
                Entendemos que cada persona tiene su propio desafío. Por eso, nos involucramos profundamente en cada
                proyecto, asegurándonos de entregar soluciones originales y efectivas que realmente sumen valor,
                trabajando codo a codo con vos.
              </p>

              <p>
                Y no importa dónde estés, desde nuestro estudio estamos listos para ayudar a personas de todo el mundo.
              </p>

              <p className="font-semibold text-[#181818]">
                Te invitamos a unirte a nosotros y hacer de tu idea algo realmente
                <span className="text-[#bfe220]"> out of this world</span>.
              </p>
            </div>
          </div>

          <div className="flex justify-center animate-fade-in-up">
            <Card className="w-full max-w-md shadow-2xl bg-white border-[#bfe220]/20">
              <CardContent className="p-8 flex justify-center">
                <Image
                  src="/images/UFFO_64.svg"
                  alt="UFFO Studios Logo"
                  width={200}
                  height={200}
                  className="w-48 h-48"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(9%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)",
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-[#f8f9fa] rounded-3xl p-8 sm:p-12 lg:p-16 text-center animate-fade-in-up border border-[#bfe220]/20">
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] leading-tight">
            "Creemos que cada marca tiene una historia única que contar. Nuestro trabajo es encontrar la manera más
            creativa y efectiva de contarla al mundo."
          </blockquote>
          <div className="mt-6 w-24 h-1 bg-[#bfe220] mx-auto rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
