"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ServiceType } from "../design-form"
import { Palette, Globe, ImageIcon, Sparkles, Calendar, Gift } from "lucide-react"

interface ServiceSelectionProps {
  selectedService: ServiceType | null
  onServiceSelect: (service: ServiceType) => void
  onNext: () => void
}

const services = [
  {
    id: "subscription" as ServiceType,
    title: "Suscripción Mensual",
    description: "Servicios de diseño continuos con planes flexibles adaptados a tu crecimiento",
    icon: Calendar,
    color: "bg-[#181818]",
    featured: true,
  },
  {
    id: "corporate-gifts" as ServiceType,
    title: "Regalos Corporativos",
    description: "Remeras, pins, calendarios, stickers, llaveros y más productos personalizados",
    icon: Gift,
    color: "bg-[#181818]",
  },
  {
    id: "logo" as ServiceType,
    title: "Diseño de Logo",
    description: "Crea una identidad de marca memorable con un logo profesional",
    icon: Sparkles,
    color: "bg-[#181818]",
  },
  {
    id: "visual-identity" as ServiceType,
    title: "Identidad Visual / Manual de Marca",
    description: "Paquete completo de branding con guías y recursos",
    icon: Palette,
    color: "bg-[#181818]",
  },
  {
    id: "website" as ServiceType,
    title: "Diseño de Sitio Web",
    description: "Sitio web moderno y responsivo adaptado a tu negocio",
    icon: Globe,
    color: "bg-[#181818]",
  },
  {
    id: "graphic-assets" as ServiceType,
    title: "Recursos Gráficos",
    description: "Materiales de marketing, contenido para redes sociales y más",
    icon: ImageIcon,
    color: "bg-[#181818]",
  },
]

export function ServiceSelection({ selectedService, onServiceSelect, onNext }: ServiceSelectionProps) {
  const handleNext = () => {
    if (selectedService) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">¿Qué necesitas primero?</h2>
        <p className="text-muted-foreground">Selecciona el servicio principal que estás buscando</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon
          const isSelected = selectedService === service.id

          return (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                service.featured
                  ? "md:col-span-2 ring-2 ring-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/30"
                  : ""
              } ${isSelected ? "border-primary bg-primary/5 shadow-lg" : "border-border hover:border-primary/50"}`}
              onClick={() => onServiceSelect(service.id)}
            >
              <CardContent className="p-6">
                {service.featured && (
                  <div className="mb-4 flex justify-center">
                    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-2 rounded-full text-sm font-bold shadow-lg ring-2 ring-primary/20">
                      ⭐ ¡NUEVO! Planes desde $75,000/mes
                    </div>
                  </div>
                )}
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${service.color} shadow-md`}>
                    <Icon className="h-6 w-6 text-[#BFE220]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-2 text-balance">{service.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{service.description}</p>
                  </div>
                  {isSelected && (
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleNext} disabled={!selectedService} size="lg" className="min-w-[120px]">
          Continuar
        </Button>
      </div>
    </div>
  )
}
