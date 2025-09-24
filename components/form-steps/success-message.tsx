"use client"

import { Button } from "@/components/ui/button"
import { FaEnvelope, FaArrowLeft, FaComments, FaHome, FaDownload } from "react-icons/fa"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface SuccessMessageProps {
  formData?: any
}

export function SuccessMessage({ formData }: SuccessMessageProps) {
  const { toast } = useToast()

  const handleNewSubmission = () => {
    window.location.reload()
  }

  const handleWhatsAppContact = () => {
    const phoneNumber = "5492604002739"
    const message = "Hola! Me gustaría contactarme con ustedes sobre mi solicitud de presupuesto."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleBackToHome = () => {
    window.location.href = "/"
  }

  const handleDownloadPDF = async () => {
    if (!formData) {
      toast({
        title: "Error",
        description: "No hay datos de formulario disponibles",
        variant: "destructive",
      })
      return
    }

    try {
      toast({
        title: "Generando PDF...",
        description: "Por favor espera mientras preparamos tu documento",
      })

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.contactName,
          email: formData.email,
          telefono: formData.phone,
          empresa: formData.companyName,
          servicio: formData.selectedService,
          presupuesto: formData.budget,
          mensaje: `CONSULTA COMPLETA DE ${formData.selectedService?.toUpperCase()}

INFORMACIÓN DE LA EMPRESA:
- Empresa: ${formData.companyName}
- Industria: ${formData.industry}
- Tiempo operando: ${formData.operatingTime}
- Ubicación: ${formData.city}, ${formData.province} (CP: ${formData.postalCode})
- Website/Redes: ${formData.websiteOrSocial}

DESCRIPCIÓN DEL NEGOCIO:
${formData.companyDescription}

PROPUESTA ÚNICA DE VALOR:
${formData.uniqueSellingPoint}

DETALLES DEL PROYECTO:
- Presupuesto: ${formData.budget}
- Timeline: ${formData.deadline}


COMUNICACIÓN:
- Responsable de decisiones: ${formData.decisionMaker}
- Método preferido: ${formData.communicationMethod}
- Horario: ${formData.contactSchedule}
- Frecuencia: ${formData.contactFrequency}

INFORMACIÓN DE PAGO:
- Método preferido: ${formData.paymentPreference}
- Cuotas: ${formData.paymentInstallments}

COMENTARIOS ADICIONALES:
${formData.additionalComments}`,
          acepta_terminos: formData.consentGiven,
        }),
      })

      if (!response.ok) {
        throw new Error('Error generando PDF')
      }

      const result = await response.json()
      
      if (result.success) {
        // Crear un blob con el contenido HTML y descargarlo
        const blob = new Blob([result.htmlContent], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        
        // Crear link de descarga
        const link = document.createElement('a')
        link.href = url
        link.download = result.fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        toast({
          title: "¡PDF Descargado!",
          description: "Tu documento se ha descargado correctamente. Puedes imprimirlo usando Ctrl+P",
        })
      } else {
        throw new Error(result.error || 'Error desconocido')
      }
    } catch (error) {
      console.error('Error descargando PDF:', error)
      toast({
        title: "Error",
        description: "Hubo un problema al generar el PDF. Inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <div className="shadow-2xl bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#BFE220]/10 rounded-full">
                <Image src="/logo-uffo.svg" alt="UFFO Studios Logo" width={64} height={64} className="object-contain" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Rubik',sans-serif]">¡Gracias!</h1>
              <p className="text-lg text-gray-600 font-['Rubik',sans-serif] font-light">
                Tu solicitud de propuesta de diseño ha sido enviada exitosamente
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 font-['Rubik',sans-serif]">
                <FaEnvelope className="w-4 h-4 text-[#BFE220]" />
                <span>Tu solicitud ha sido enviada a nuestro equipo de diseño</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2 font-['Rubik',sans-serif]">¿Qué sigue?</h3>
              <ul className="text-sm text-gray-700 space-y-2 text-left font-['Rubik',sans-serif] font-light">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Revisaremos tus requerimientos en las próximas 24 horas
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Recibirás una propuesta detallada con precios y cronograma
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Programaremos una llamada de consulta para discutir tu proyecto
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Una vez aprobado, comenzaremos a crear tu increíble diseño
                </li>
              </ul>
            </div>

            {/* Botón destacado para descargar PDF */}
            <div className="bg-gradient-to-r from-[#BFE220]/10 to-[#BFE220]/5 border border-[#BFE220]/30 rounded-xl p-6 mb-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2 font-['Rubik',sans-serif]">📄 Guarda una copia de tu consulta</h3>
              <p className="text-sm text-gray-600 mb-4 font-['Rubik',sans-serif] font-light">
                Descarga un documento con todos los detalles de tu solicitud para tus registros
              </p>
              <Button 
                onClick={handleDownloadPDF}
                className="bg-[#BFE220] hover:bg-[#a8cc1d] text-[#181818] font-semibold min-w-[200px] font-['Rubik',sans-serif] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaDownload className="w-4 h-4 mr-2" />
                Descargar Consulta
              </Button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600 font-['Rubik',sans-serif] font-light">
                ¿Tienes preguntas o necesitas hacer cambios a tu solicitud?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={handleBackToHome} 
                  className="min-w-[160px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 font-['Rubik',sans-serif] rounded-xl transition-all duration-300"
                >
                  <FaHome className="w-4 h-4 mr-2" />
                  Volver al Menú
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleNewSubmission} 
                  className="min-w-[160px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 font-['Rubik',sans-serif] rounded-xl transition-all duration-300"
                >
                  <FaArrowLeft className="w-4 h-4 mr-2" />
                  Enviar otra solicitud
                </Button>
                <Button
                  onClick={handleWhatsAppContact}
                  className="min-w-[160px] bg-[#BFE220] hover:bg-[#a8cc1d] text-[#181818] font-semibold font-['Rubik',sans-serif] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FaComments className="w-4 h-4 mr-2" />
                  Contáctanos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
