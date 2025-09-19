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
    const { generatePDFAndSendEmail } = await import("@/lib/actions/email-actions")

    try {
      const result = await generatePDFAndSendEmail(formData)

      if (result.success) {
        // Download PDF for user
        const pdfBlob = new Blob([Uint8Array.from(atob(result.pdfBase64), (c) => c.charCodeAt(0))], {
          type: "application/pdf",
        })
        const url = URL.createObjectURL(pdfBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = result.filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        toast({
          title: "¡Formulario enviado exitosamente!",
          description: "El PDF se ha generado y descargado correctamente.",
        })
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

  if (isSubmitted) {
    return <SuccessMessage />
  }

  const stepTitles = [
    "Selección de Servicio",
    "Detalles de la Empresa",
    "Especificaciones del Proyecto",
    "Revisar y Enviar",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-4 md:py-8 px-4">
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
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground touch-manipulation"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Volver al sitio web</span>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Creemos Algo Increíble Juntos
          </h1>
          <p className="text-base md:text-lg text-muted-foreground text-pretty">
            Cuéntanos sobre tu proyecto y te proporcionaremos una propuesta detallada
          </p>
        </div>

        {/* Enhanced Step Indicators */}
        <div className="mb-6 md:mb-8">
          {/* Mobile Progress Bar */}
          <div className="md:hidden mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Paso {currentStep} de {totalSteps}
              </span>
              <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}% Completado</span>
            </div>
            <Progress value={progress} className="h-2" />
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
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                      isAccessible ? "cursor-pointer hover:bg-muted/50" : "cursor-not-allowed opacity-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? "✓" : stepNumber}
                    </div>
                    <div className="text-left">
                      <div className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {title}
                      </div>
                    </div>
                  </button>
                  {index < stepTitles.length - 1 && (
                    <div className={`flex-1 h-px mx-4 ${isCompleted ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Steps */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-4 md:p-6 lg:p-8">
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
          </CardContent>
        </Card>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 bg-transparent"
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
                className="flex items-center space-x-2"
              >
                <FaSave className="w-4 h-4" />
                <span>{isSaving ? "Guardando..." : "Guardar"}</span>
              </Button>

              <span className="text-sm text-muted-foreground">
                {currentStep}/{totalSteps}
              </span>
            </div>

            <Button
              size="sm"
              onClick={currentStep === totalSteps ? handleSubmit : nextStep}
              disabled={!isCurrentStepValid()}
              className="flex items-center space-x-2"
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
          <p className="text-xs text-muted-foreground">Usa las teclas ← → para navegar entre pasos</p>
        </div>
      </div>
    </div>
  )
}
