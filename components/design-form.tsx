"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ServiceSelection } from "./form-steps/service-selection"
import { GeneralQuestions } from "./form-steps/general-questions"
import { ConditionalQuestions } from "./form-steps/conditional-questions"
import { FinalStep } from "./form-steps/final-step"
import { SuccessMessage } from "./form-steps/success-message"
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaSave, 
  FaArrowLeft 
} from "react-icons/fa"
import { useToast } from "@/hooks/use-toast"

export type ServiceType = "logo" | "visual-identity" | "website" | "graphic-assets" | "subscription"

export interface FormData {
  // Service selection
  selectedService: ServiceType | null

  // General questions
  companyName: string
  contactName: string // Added contact name field
  email: string // Added email field
  phone: string // Added phone field
  industry: string
  websiteOrSocial: string
  companyDescription: string
  operatingTime: string
  uniqueSellingPoint: string
  budget: string
  deadline: string
  decisionMaker: string
  communicationMethod: string
  designExpectations: string
  contactSchedule: string
  contactFrequency: string
  businessLocation: string // "argentina" or "abroad"
  province: string
  city: string
  postalCode: string // Added postal code field

  // Conditional questions (will be populated based on service type)
  conditionalAnswers: Record<string, any>

  // Final step
  additionalComments: string
  consentGiven: boolean
  paymentPreference: string
  paymentInstallments: number
}

const initialFormData: FormData = {
  selectedService: null,
  companyName: "",
  contactName: "", // Added contact name to initial data
  email: "", // Added email to initial data
  phone: "", // Added phone to initial data
  industry: "",
  websiteOrSocial: "",
  companyDescription: "",
  operatingTime: "",
  uniqueSellingPoint: "",
  budget: "",
  deadline: "",
  decisionMaker: "",
  communicationMethod: "",
  designExpectations: "",
  contactSchedule: "",
  contactFrequency: "",
  businessLocation: "",
  province: "",
  city: "",
  postalCode: "", // Added postal code to initial data
  conditionalAnswers: {},
  additionalComments: "",
  consentGiven: false,
  paymentPreference: "",
  paymentInstallments: 2, // Changed default from 1 to 2
}

const STORAGE_KEY = "design-form-data"

export function DesignForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        const mergedFormData = { ...initialFormData, ...parsedData.formData }
        setFormData(mergedFormData)
        setCurrentStep(parsedData.currentStep || 1)
        toast({
          title: "Datos del formulario restaurados",
          description: "Tu progreso anterior ha sido restaurado.",
        })
      } catch (error) {
        console.error("Error cargando datos del formulario guardados:", error)
        setFormData(initialFormData)
      }
    }
  }, [toast])

  useEffect(() => {
    const saveData = {
      formData,
      currentStep,
      timestamp: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData))
  }, [formData, currentStep])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keyboard navigation if not typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }

      if (event.key === "ArrowLeft" && currentStep > 1) {
        event.preventDefault()
        prevStep()
      } else if (event.key === "ArrowRight" && currentStep < totalSteps) {
        event.preventDefault()
        // Only allow next step if current step is valid
        if (isCurrentStepValid()) {
          nextStep()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentStep])

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
      // Scroll to top on mobile
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      // Scroll to top on mobile
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps && step <= getMaxAccessibleStep()) {
      setCurrentStep(step)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const getMaxAccessibleStep = () => {
    if (!formData.selectedService) return 1
    if (!isGeneralQuestionsValid()) return 2
    if (!isConditionalQuestionsValid()) return 3
    return 4
  }

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!formData.selectedService
      case 2:
        return isGeneralQuestionsValid()
      case 3:
        return isConditionalQuestionsValid()
      case 4:
        return formData.consentGiven
      default:
        return false
    }
  }

  const isGeneralQuestionsValid = () => {
    const budgetRequired = formData.selectedService !== "subscription"

    return !!(
      formData.companyName?.trim() &&
      formData.contactName?.trim() &&
      formData.email?.trim() &&
      formData.phone?.trim() &&
      formData.industry?.trim() &&
      formData.companyDescription?.trim() &&
      formData.operatingTime?.trim() &&
      formData.uniqueSellingPoint?.trim() &&
      (budgetRequired ? formData.budget : true) &&
      formData.deadline?.trim() &&
      formData.decisionMaker?.trim() &&
      formData.communicationMethod &&
      formData.designExpectations?.trim() &&
      formData.contactSchedule &&
      formData.contactFrequency &&
      formData.businessLocation?.trim() &&
      formData.city?.trim() &&
      (formData.businessLocation === "argentina" ? formData.province?.trim() : true)
    )
  }

  const isConditionalQuestionsValid = () => {
    // Basic validation - at least some answers provided
    return Object.keys(formData.conditionalAnswers).length > 0
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSaving(false)
    toast({
      title: "Progreso guardado",
      description: "Los datos de tu formulario han sido guardados localmente.",
    })
  }

  const handleSubmit = async () => {
    try {
      // Preparar datos para el nuevo endpoint
      const emailData = {
        nombre: formData.contactName,
        email: formData.email,
        telefono: formData.phone,
        empresa: formData.companyName,
        servicio: getServiceName(formData.selectedService || ''),
        presupuesto: formData.budget,
        mensaje: generateFormSummary(formData),
        acepta_terminos: formData.consentGiven,
      }

      // Enviar al nuevo endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "¡Formulario enviado exitosamente!",
          description: `Tu consulta ha sido enviada correctamente.${result.clientEmailSent ? ' Se ha enviado una copia a tu email.' : ''}`,
          duration: 5000,
        })
      } else {
        throw new Error(result.error || 'Error al enviar el formulario')
      }
    } catch (error) {
      console.error("Error enviando formulario:", error)
      toast({
        title: "Error",
        description: "Hubo un problema procesando tu formulario. Por favor intenta de nuevo.",
        variant: "destructive",
      })
      return
    }

    localStorage.removeItem(STORAGE_KEY)
    setIsSubmitted(true)
  }

  // Función auxiliar para generar un resumen del formulario
  const generateFormSummary = (data: FormData): string => {
    return `CONSULTA DE ${getServiceName(data.selectedService || '')}

INFORMACIÓN DE LA EMPRESA:
- Empresa: ${data.companyName}
- Industria: ${data.industry}
- Tiempo operando: ${data.operatingTime}
- Ubicación: ${data.city}, ${data.province || 'Internacional'}${data.postalCode ? ` (CP: ${data.postalCode})` : ''}
- Website/Redes: ${data.websiteOrSocial}

DESCRIPCIÓN DEL NEGOCIO:
${data.companyDescription}

PROPUESTA ÚNICA DE VALOR:
${data.uniqueSellingPoint}

DETALLES DEL PROYECTO:
- Presupuesto: ${data.budget}
- Timeline: ${data.deadline}

ESPECIFICACIONES DEL SERVICIO:
${JSON.stringify(data.conditionalAnswers, null, 2)}

COMUNICACIÓN:
- Responsable de decisiones: ${data.decisionMaker}
- Método preferido: ${data.communicationMethod}
- Horario: ${data.contactSchedule}
- Frecuencia: ${data.contactFrequency}

INFORMACIÓN DE PAGO:
- Método preferido: ${data.paymentPreference}
- Cuotas: ${data.paymentInstallments}

COMENTARIOS ADICIONALES:
${data.additionalComments || 'Ninguno'}
    `
  }

  // Función auxiliar para obtener el nombre del servicio
  const getServiceName = (serviceType: string): string => {
    const serviceNames: Record<string, string> = {
      subscription: "Suscripción Mensual",
      logo: "Diseño de Logo",
      "visual-identity": "Identidad Visual",
      website: "Diseño de Sitio Web",
      "graphic-assets": "Activos Gráficos",
    }
    return serviceNames[serviceType] || serviceType
  }

  if (isSubmitted) {
    return <SuccessMessage formData={formData} />
  }

  const stepTitles = [
    "Selección de Servicio",
    "Detalles de la Empresa",
    "Especificaciones del Proyecto",
    "Revisar y Enviar",
  ]

  return (
    <div className="min-h-screen bg-white py-4 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => {
              // Usar window.location.href para navegación confiable en mobile
              if (typeof window !== "undefined") {
                window.location.href = "/"
              }
            }}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#BFE220] transition-colors touch-manipulation bg-transparent border-none"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="font-medium">Volver al sitio web</span>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance font-['Rubik',sans-serif]">
            Creemos Algo Increíble Juntos
          </h1>
          <p className="text-base md:text-lg text-gray-600 text-pretty font-['Rubik',sans-serif] font-light">
            Cuéntanos sobre tu proyecto y te proporcionaremos una propuesta detallada
          </p>
        </div>

        {/* Enhanced Step Indicators */}
        <div className="mb-6 md:mb-8">
          {/* Mobile Progress Bar */}
          <div className="md:hidden mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 font-['Rubik',sans-serif]">
                Paso {currentStep} de {totalSteps}
              </span>
              <span className="text-sm font-medium text-[#BFE220] font-['Rubik',sans-serif]">{Math.round(progress)}% Completado</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#BFE220] to-[#a8cc1d] h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Desktop Step Indicators */}
          <div className="hidden md:flex justify-between items-center mb-4">
            {stepTitles.map((title, index) => {
              const stepNumber = index + 1
              const isActive = currentStep === stepNumber
              const isCompleted = currentStep > stepNumber
              const isAccessible = stepNumber <= getMaxAccessibleStep()

              return (
                <div key={stepNumber} className="flex items-center flex-1">
                  <button
                    onClick={() => goToStep(stepNumber)}
                    disabled={!isAccessible}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                      isAccessible ? "cursor-pointer hover:bg-gray-100" : "cursor-not-allowed opacity-50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 font-['Rubik',sans-serif] ${
                        isCompleted
                          ? "bg-[#BFE220] text-[#181818] shadow-lg shadow-[#BFE220]/25"
                          : isActive
                            ? "bg-[#BFE220] text-[#181818] shadow-lg shadow-[#BFE220]/25"
                            : "bg-gray-200 text-gray-500 border border-gray-300"
                      }`}
                    >
                      {isCompleted ? "✓" : stepNumber}
                    </div>
                    <div className="text-left">
                      <div className={`text-sm font-medium font-['Rubik',sans-serif] ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                        {title}
                      </div>
                    </div>
                  </button>
                  {index < stepTitles.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 rounded-full transition-all duration-300 ${isCompleted ? "bg-[#BFE220]" : "bg-gray-300"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
          <div className="p-4 md:p-6 lg:p-8">
            {currentStep === 1 && (
              <ServiceSelection
                selectedService={formData.selectedService}
                onServiceSelect={(service) => updateFormData({ selectedService: service })}
                onNext={nextStep}
              />
            )}

            {currentStep === 2 && (
              <GeneralQuestions formData={formData} onUpdate={updateFormData} onNext={nextStep} onPrev={prevStep} />
            )}

            {currentStep === 3 && (
              <ConditionalQuestions
                serviceType={formData.selectedService!}
                answers={formData.conditionalAnswers}
                onUpdate={(answers) => updateFormData({ conditionalAnswers: answers })}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 4 && (
              <FinalStep formData={formData} onUpdate={updateFormData} onSubmit={handleSubmit} onPrev={prevStep} />
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 bg-transparent border-gray-600 text-gray-300 hover:text-white hover:border-[#BFE220] font-['Rubik',sans-serif]"
            >
              <FaChevronLeft className="w-4 h-4" />
              <span>Atrás</span>
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center space-x-2 text-gray-400 hover:text-[#BFE220] font-['Rubik',sans-serif]"
              >
                <FaSave className="w-4 h-4" />
                <span>{isSaving ? "Guardando..." : "Guardar"}</span>
              </Button>

              <span className="text-sm text-gray-400 font-['Rubik',sans-serif]">
                {currentStep}/{totalSteps}
              </span>
            </div>

            <Button
              size="sm"
              onClick={currentStep === totalSteps ? handleSubmit : nextStep}
              disabled={!isCurrentStepValid()}
              className="flex items-center space-x-2 bg-[#BFE220] hover:bg-[#a8cc1d] text-[#181818] font-bold font-['Rubik',sans-serif] transition-all duration-200"
            >
              <span>{currentStep === totalSteps ? "Enviar" : "Siguiente"}</span>
              {currentStep !== totalSteps && <FaChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Add bottom padding for mobile navigation */}
        <div className="md:hidden h-20" />

        {/* Keyboard Navigation Hint */}
        <div className="hidden md:block text-center mt-6">
          <p className="text-xs text-gray-500 font-['Rubik',sans-serif]">Usa las teclas ← → para navegar entre pasos</p>
        </div>
      </div>
    </div>
  )
}
