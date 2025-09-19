"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Mail, ArrowLeft } from "lucide-react"

export function SuccessMessage() {
  const handleNewSubmission = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8 px-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">¡Gracias!</h1>
              <p className="text-lg text-muted-foreground">
                Tu solicitud de propuesta de diseño ha sido enviada exitosamente
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Download className="w-4 h-4" />
                <span>La solicitud de propuesta en PDF ha sido generada y descargada</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
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

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                ¿Tienes preguntas o necesitas hacer cambios a tu solicitud?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={handleNewSubmission} className="min-w-[160px] bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Enviar otra solicitud
                </Button>
                <Button
                  onClick={() => window.open("mailto:hello@yourdesignagency.com", "_blank")}
                  className="min-w-[160px]"
                >
                  <Mail className="w-4 h-4 mr-2" />
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
