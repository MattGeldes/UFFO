"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Captcha } from "@/components/captcha"
import type { FormData } from "../design-form"
import { FaArrowLeft, FaPaperPlane, FaComments } from "react-icons/fa"

interface FinalStepProps {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
  onSubmit: () => void
  onPrev: () => void
}

export function FinalStep({ formData, onUpdate, onSubmit, onPrev }: FinalStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.consentGiven) {
      newErrors.consent = "Debes autorizar el almacenamiento de tus respuestas para continuar"
    }

    if (!formData.paymentPreference) {
      newErrors.paymentPreference = "Debes seleccionar una opción de pago"
    }

    if (!isCaptchaVerified) {
      newErrors.captcha = "Debes completar la verificación de seguridad"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Usar la función onSubmit del componente padre que tiene la lógica correcta
      await onSubmit()
    } catch (error) {
      console.error("Error enviando formulario:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCaptchaVerify = (isVerified: boolean) => {
    setIsCaptchaVerified(isVerified)
    if (isVerified && errors.captcha) {
      setErrors((prev) => ({ ...prev, captcha: "" }))
    }
  }

  const getServiceName = (serviceType: string | null): string => {
    if (!serviceType) return "Servicio no especificado"
    
    const serviceNames: Record<string, string> = {
      subscription: "Suscripción Mensual",
      logo: "Diseño de Logo",
      "visual-identity": "Identidad Visual",
      website: "Diseño de Sitio Web",
      "graphic-assets": "Activos Gráficos",
    }
    return serviceNames[serviceType] || serviceType
  }



  const getServiceTitle = (service: string) => {
    const titles = {
      logo: "Diseño de Logo",
      "visual-identity": "Identidad Visual / Manual de Marca",
      website: "Diseño de Sitio Web",
      "graphic-assets": "Recursos Gráficos",
      subscription: "Suscripción Mensual",
      "corporate-gifts": "Regalos Corporativos",
    }
    return titles[service as keyof typeof titles] || service
  }

  const getBudgetLabel = (budget: string) => {
    const budgetLabels = {
      "30k-50k": "$30,000 - $50,000",
      "50k-100k": "$50,000 - $100,000",
      "100k-200k": "$100,000 - $200,000",
      "200k-300k": "$200,000 - $300,000",
      "300k-500k": "$300,000 - $500,000",
      discuss: "Hablemos al respecto",
    }
    return budgetLabels[budget as keyof typeof budgetLabels] || budget
  }

  const getCommunicationLabel = (method: string) => {
    const methodLabels = {
      email: "Correo electrónico",
      phone: "Llamadas",
      video: "Videollamadas",
      whatsapp: "WhatsApp",
      mixed: "Combinación de métodos",
    }
    return methodLabels[method as keyof typeof methodLabels] || method
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Revisar y Enviar</h2>
        <p className="text-muted-foreground">Por favor revisa tu información y agrega cualquier comentario final</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-black border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-[#BFE220]">Servicio Seleccionado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-[#BFE220]">
              {formData.selectedService ? getServiceTitle(formData.selectedService) : "No seleccionado"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{formData.companyName || "No proporcionado"}</p>
            <p className="text-sm text-muted-foreground">{formData.industry || "Industria no especificada"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{formData.contactName || "No proporcionado"}</p>
            <p className="text-sm text-muted-foreground">{formData.email || "Email no proporcionado"}</p>
            <p className="text-sm text-muted-foreground">{formData.phone || "Teléfono no proporcionado"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {formData.selectedService === "subscription" ? "Plan y Cronograma" : "Presupuesto y Cronograma"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formData.selectedService === "subscription" ? (
              <p className="font-medium">
                {formData.conditionalAnswers?.subscriptionPlan === "base" && "Plan Base - $75,000"}
                {formData.conditionalAnswers?.subscriptionPlan === "emprendedor" && "Plan Emprendedor - $135,000"}
                {formData.conditionalAnswers?.subscriptionPlan === "premium" && "Plan Premium - $250,000"}
                {!formData.conditionalAnswers?.subscriptionPlan && "Plan no seleccionado"}
              </p>
            ) : (
              <p className="font-medium">{formData.budget ? getBudgetLabel(formData.budget) : "No especificado"}</p>
            )}
            <p className="text-sm text-muted-foreground">Fecha límite: {formData.deadline || "No especificada"}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#181818]">
                <FaComments className="w-5 h-5 text-[#BFE220]" />
              </div>
              Comunicación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              {formData.communicationMethod ? getCommunicationLabel(formData.communicationMethod) : "No especificado"}
            </p>
            <p className="text-sm text-muted-foreground">
              Responsable de decisiones: {formData.decisionMaker || "No especificado"}
            </p>
            <p className="text-sm text-muted-foreground">
              Horario de contacto:{" "}
              {formData.contactSchedule === "morning"
                ? "Mañana (9:00 - 12:00)"
                : formData.contactSchedule === "afternoon"
                  ? "Tarde (13:00 - 18:00)"
                  : formData.contactSchedule === "flexible"
                    ? "Flexible"
                    : "No especificado"}
            </p>
            <p className="text-sm text-muted-foreground">
              Frecuencia de contacto:{" "}
              {formData.contactFrequency === "daily"
                ? "Diariamente"
                : formData.contactFrequency === "weekly"
                  ? "Semanalmente"
                  : formData.contactFrequency === "biweekly"
                    ? "Cada dos semanas"
                    : formData.contactFrequency === "monthly"
                      ? "Mensualmente"
                      : formData.contactFrequency === "as-needed"
                        ? "Solo cuando sea necesario"
                        : "No especificado"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Opciones de Pago</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Información importante sobre pagos:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Trabajamos con un pago por adelantado del 60% del presupuesto</li>
              <li>• El presupuesto que recibirás es válido por 10 días</li>
              <li>• Las revisiones extra tienen un costo adicional</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentPreference" className="text-sm font-medium">
              Preferencia de pago *
            </Label>
            <Select
              value={formData.paymentPreference}
              onValueChange={(value) => {
                onUpdate({ paymentPreference: value })
                if (errors.paymentPreference) {
                  setErrors((prev) => ({ ...prev, paymentPreference: "" }))
                }
              }}
            >
              <SelectTrigger className={`h-12 ${errors.paymentPreference ? "border-destructive" : ""}`}>
                <SelectValue placeholder="Selecciona opción de pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="advance-60">Pago adelantado 60% + 40% al finalizar</SelectItem>
                <SelectItem value="installments">Pago en cuotas (2 o 3)</SelectItem>
                <SelectItem value="full-discount">Pago completo (con descuento)</SelectItem>
              </SelectContent>
            </Select>
            {errors.paymentPreference && <p className="text-sm text-destructive">{errors.paymentPreference}</p>}
          </div>

          {formData.paymentPreference === "installments" && (
            <div className="space-y-2">
              <Label htmlFor="paymentInstallments" className="text-sm font-medium">
                Número de cuotas (2 o 3)
              </Label>
              <Select
                value={formData.paymentInstallments?.toString() || "2"}
                onValueChange={(value) => onUpdate({ paymentInstallments: Number.parseInt(value) })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecciona número de cuotas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 cuotas</SelectItem>
                  <SelectItem value="3">3 cuotas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label htmlFor="additionalComments" className="text-sm font-medium">
          ¿Algo más que te gustaría contarme sobre tu proyecto?
        </Label>
        <Textarea
          id="additionalComments"
          value={formData.additionalComments}
          onChange={(e) => onUpdate({ additionalComments: e.target.value })}
          placeholder="Comparte cualquier detalle adicional, requisitos especiales o preguntas que tengas"
          className="min-h-[120px] resize-none"
        />
      </div>

      <div className="space-y-2">
        <Captcha onVerify={handleCaptchaVerify} isVerified={isCaptchaVerified} />
        {errors.captcha && <p className="text-sm text-destructive">{errors.captcha}</p>}
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            checked={formData.consentGiven}
            onCheckedChange={(checked) => {
              onUpdate({ consentGiven: !!checked })
              if (errors.consent) {
                setErrors((prev) => ({ ...prev, consent: "" }))
              }
            }}
            className="mt-1"
          />
          <div className="space-y-1">
            <Label htmlFor="consent" className="text-sm font-medium cursor-pointer text-foreground">
              Autorizo el almacenamiento de mis respuestas únicamente para la propuesta *
            </Label>
            <p className="text-xs text-muted-foreground">
              Tu información será utilizada únicamente para crear tu propuesta de diseño y no será compartida con
              terceros.
            </p>
          </div>
        </div>
        {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}
      </div>

      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onPrev}
          size="lg"
          className="min-w-[120px] bg-transparent"
          disabled={isSubmitting}
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Atrás
        </Button>
        <Button onClick={handleSubmit} size="lg" className="min-w-[200px]" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Procesando...
            </>
          ) : (
            <>
              <FaPaperPlane className="w-4 h-4 mr-2" />
              Enviar
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
