"use client"

import { Button } from "@/components/ui/button"
import type { ServiceType } from "../design-form"
import { FaPalette, FaGlobe, FaStar, FaFileAlt } from "react-icons/fa"

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
    icon: FaFileAlt,
    color: "bg-white",
    featured: true,
  },
  {
    id: "logo" as ServiceType,
    title: "Diseño de Logo",
    description: "Crea una identidad de marca memorable con un logo profesional",
    icon: FaStar,
    color: "bg-white",
  },
  {
    id: "visual-identity" as ServiceType,
    title: "Identidad Visual / Manual de Marca",
    description: "Paquete completo de branding con guías y recursos",
    icon: FaPalette,
    color: "bg-white",
  },
  {
    id: "website" as ServiceType,
    title: "Diseño de Sitio Web",
    description: "Sitio web moderno y responsivo adaptado a tu negocio",
    icon: FaGlobe,
    color: "bg-white",
  },
]

export function ServiceSelection({ selectedService, onServiceSelect, onNext }: ServiceSelectionProps) {
  const handleNext = () => {
    if (selectedService) {
      onNext()
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
      <div className="text-center animate-in fade-in-50 slide-in-from-top-4 duration-500 delay-150">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-['Rubik',sans-serif]">¿Qué necesitas primero?</h2>
        <p className="text-gray-600 font-['Rubik',sans-serif] font-light">Selecciona el servicio principal que estás buscando</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-300">
        {services.map((service) => {
          const Icon = service.icon
          const isSelected = selectedService === service.id

          return (
            <div
              key={service.id}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl border-2 relative min-h-[240px] flex flex-col rounded-2xl group ${
                service.featured
                  ? "ring-2 ring-[#BFE220]/20 bg-gradient-to-r from-[#BFE220]/5 to-[#BFE220]/10 border-[#BFE220]/30"
                  : ""
              } ${isSelected ? "border-[#BFE220] bg-[#BFE220]/5 shadow-xl shadow-[#BFE220]/25 scale-[1.02] ring-4 ring-[#BFE220]/20" : "border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50"}`}
              onClick={() => onServiceSelect(service.id)}
            >
              <div className="p-6 min-h-[240px] flex flex-col justify-center">
                {service.featured && (
                  <div className="mb-4 flex justify-center">
                    <div className="bg-gradient-to-r from-[#BFE220] to-[#a8cc1d] text-[#181818] px-6 py-2 rounded-full text-sm font-bold shadow-lg ring-2 ring-[#BFE220]/20 font-['Rubik',sans-serif]">
                      ⭐ ¡NUEVO! Planes desde $75,000/mes
                    </div>
                  </div>
                )}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-[#181818] shadow-md group-hover:bg-[#181818]/90 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                    <Icon className="h-6 w-6 text-[#BFE220] group-hover:text-[#BFE220] transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-2 text-balance text-center font-['Rubik',sans-serif] group-hover:text-gray-800 transition-colors duration-300">{service.title}</h3>
                    <p className="text-sm text-gray-600 text-pretty text-center font-['Rubik',sans-serif] font-light group-hover:text-gray-700 transition-colors duration-300">{service.description}</p>
                  </div>
                  {isSelected && (
                    <div className="flex-shrink-0 animate-bounce">
                      <div className="w-5 h-5 bg-[#BFE220] rounded-full flex items-center justify-center shadow-md">
                        <div className="w-2 h-2 bg-[#181818] rounded-full" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-end pt-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-500">
        <Button 
          onClick={handleNext} 
          disabled={!selectedService} 
          size="lg" 
          className="min-w-[120px] bg-[#BFE220] hover:bg-[#a8cc1d] text-[#181818] font-bold rounded-xl transition-all duration-300 font-['Rubik',sans-serif] disabled:bg-gray-300 disabled:text-gray-500 hover:shadow-lg transform hover:scale-105"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
