"use client"

import { Card, CardContent } from "@/components/ui/card"
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
- Expectativas de diseño: ${formData.designExpectations}

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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8 px-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Image src="/logo-uffo.svg" alt="UFFO Studios Logo" width={64} height={64} className="object-contain" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">¡Gracias!</h1>
              <p className="text-lg text-muted-foreground">
                Tu solicitud de propuesta de diseño ha sido enviada exitosamente
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <FaEnvelope className="w-4 h-4" />
                <span>Tu solicitud ha sido enviada a nuestro equipo de diseño</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-foreground mb-2">¿Qué sigue?</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Revisaremos tus requerimientos en las próximas 24 horas</li>
                <li>• Recibirás una propuesta detallada con precios y cronograma</li>
                <li>• Programaremos una llamada de consulta para discutir tu proyecto</li>
                <li>• Una vez aprobado, comenzaremos a crear tu increíble diseño</li>
              </ul>
            </div>

            {/* Botón destacado para descargar PDF */}
            <div className="bg-[#BFE220]/10 border border-[#BFE220]/30 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-2">📄 Guarda una copia de tu consulta</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Descarga un documento con todos los detalles de tu solicitud para tus registros
              </p>
              <Button 
                onClick={handleDownloadPDF}
                className="bg-[#BFE220] hover:bg-[#a8cc1d] text-[#181818] font-semibold min-w-[200px]"
              >
                <FaDownload className="w-4 h-4 mr-2" />
                Descargar Resumen PDF
              </Button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                ¿Tienes preguntas o necesitas hacer cambios a tu solicitud?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={handleBackToHome} className="min-w-[160px] bg-transparent">
                  <FaHome className="w-4 h-4 mr-2" />
                  Volver al Menú
                </Button>
                <Button variant="outline" onClick={handleNewSubmission} className="min-w-[160px] bg-transparent">
                  <FaArrowLeft className="w-4 h-4 mr-2" />
                  Enviar otra solicitud
                </Button>
                <Button
                  onClick={handleWhatsAppContact}
                  className="min-w-[160px] bg-[#181818] hover:bg-[#2a2a2a] text-[#BFE220]"
                >
                  <FaComments className="w-4 h-4 mr-2" />
                  Contáctanos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
