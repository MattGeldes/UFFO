"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import type { ServiceType } from "../design-form"
import { FaArrowLeft, FaCheck } from "react-icons/fa"

interface ConditionalQuestionsProps {
  serviceType: ServiceType
  answers: Record<string, any>
  onUpdate: (answers: Record<string, any>) => void
  onNext: () => void
  onPrev: () => void
}

export function ConditionalQuestions({ serviceType, answers, onUpdate, onNext, onPrev }: ConditionalQuestionsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateAnswer = (field: string, value: any) => {
    const newAnswers = { ...answers, [field]: value }
    onUpdate(newAnswers)
    // Clear error when user provides input
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    switch (serviceType) {
      case "subscription":
        if (!answers.subscriptionPlan) newErrors.subscriptionPlan = "Debes seleccionar un plan de suscripción"
        if (!answers.monthlyNeeds?.trim()) newErrors.monthlyNeeds = "Describe tus necesidades mensuales"
        break
      case "logo":
        if (!answers.emotions?.trim()) newErrors.emotions = "Las emociones/percepciones son requeridas"
        if (!answers.colors?.trim()) newErrors.colors = "Las preferencias de color son requeridas"
        if (!answers.useCases?.trim()) newErrors.useCases = "Los casos de uso son requeridos"
        if (!answers.revisions) newErrors.revisions = "El número de revisiones es requerido"
        if (answers.revisions && answers.revisions > 3) newErrors.revisions = "Máximo 3 revisiones permitidas"
        break
      case "visual-identity":
        if (!answers.emotions?.trim()) newErrors.emotions = "Las emociones/percepciones son requeridas"
        if (!answers.colors?.trim()) newErrors.colors = "Las preferencias de color son requeridas"
        if (!answers.applications?.trim()) newErrors.applications = "Al menos una aplicación es requerida"
        if (!answers.communicationTone?.trim()) newErrors.communicationTone = "El tono de comunicación es requerido"
        if (!answers.revisions) newErrors.revisions = "El número de revisiones es requerido"
        if (answers.revisions && answers.revisions > 3) newErrors.revisions = "Máximo 3 revisiones permitidas"
        break
      case "website":
        if (!answers.mainObjective?.trim()) newErrors.mainObjective = "El objetivo principal es requerido"
        if (!answers.requiredSections?.trim()) newErrors.requiredSections = "Las secciones requeridas son necesarias"
        if (!answers.contentProvider?.trim()) newErrors.contentProvider = "El proveedor de contenido es requerido"
        if (!answers.revisions) newErrors.revisions = "El número de revisiones es requerido"
        if (answers.revisions && answers.revisions > 3) newErrors.revisions = "Máximo 3 revisiones permitidas"
        break
      case "graphic-assets":
        if (!answers.specificPieces?.trim()) newErrors.specificPieces = "Al menos una pieza es requerida"
        if (!answers.distributionChannels?.trim())
          newErrors.distributionChannels = "Los canales de distribución son requeridos"
        if (!answers.objectives?.trim()) newErrors.objectives = "Los objetivos son requeridos"
        if (!answers.revisions) newErrors.revisions = "El número de revisiones es requerido"
        if (answers.revisions && answers.revisions > 3) newErrors.revisions = "Máximo 3 revisiones permitidas"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  const renderSubscriptionQuestions = () => {
    const subscriptionPlans = [
      {
        id: "base",
        name: "Base",
        price: "$75,000",
        description: "Perfecto para emprendedores que necesitan diseño básico",
        features: [
          "5 piezas gráficas por mes (3 historias y 2 posts)",
          "1 revisión por pieza",
          "Formatos: PNG, JPG, PDF",
          "Soporte por email",
          "Tiempo de entrega: 5-7 días",
        ],
      },
      {
        id: "emprendedor",
        name: "Emprendedor",
        price: "$100,000",
        description: "Ideal para pequeñas empresas en crecimiento",
        features: [
          "10 piezas gráficas por mes (5 historias y 5 posts)",
          "1 revisiones por pieza",
          "Formatos: PNG, JPG, PDF",
          "Soporte prioritario",
          "Tiempo de entrega: 3-5 días",
          "1 sesión de consultoría mensual",
        ],
        popular: true,
      },
      {
        id: "premium",
        name: "Premium",
        price: "$250,000",
        description: "Para empresas establecidas con necesidades complejas",
        features: [
          "10 piezas gráficas por mes a elección",
          "2 revisiones por pieza",
          "Formatos: PNG, JPG, PDF",
          "Soporte en horario laboral (9:00 - 20:00)",
          "Tiempo de entrega: 1-3 días",
          "2 sesiones de consultoría mensual",
          "Estrategia de marca incluida (CM by @moniquitalorca)",
        ],
      },
    ]

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-['Rubik',sans-serif]">Planes de Suscripción Mensual</h2>
          <p className="text-gray-600 font-['Rubik',sans-serif] font-light">Elige el plan que mejor se adapte a tus necesidades de diseño</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-[1.02] border-2 relative min-h-[400px] flex flex-col rounded-2xl animate-fade-in ${
                plan.popular 
                  ? "bg-gradient-to-br from-[#BFE220]/10 to-[#BFE220]/5 border-[#BFE220] ring-4 ring-[#BFE220]/20 shadow-xl shadow-[#BFE220]/25" 
                  : "bg-white border-gray-300 hover:shadow-lg"
              } ${
                answers.subscriptionPlan === plan.id
                  ? "border-[#BFE220] bg-[#BFE220]/15 shadow-xl shadow-[#BFE220]/30 scale-[1.02] ring-2 ring-[#BFE220]/30"
                  : "hover:border-gray-400"
              }`}
              onClick={() => updateAnswer("subscriptionPlan", plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-[#BFE220] to-[#a8cc1d] text-[#181818] px-4 py-2 rounded-full text-sm font-bold shadow-lg ring-2 ring-white font-['Rubik',sans-serif] whitespace-nowrap">
                    ⭐ Más Popular
                  </span>
                </div>
              )}
              <div className="text-center pb-4 p-6">
                <h3 className="text-xl font-bold text-gray-900 font-['Rubik',sans-serif]">{plan.name}</h3>
                <div className="text-3xl font-bold text-[#BFE220] font-['Rubik',sans-serif]">{plan.price}</div>
                <p className="text-sm text-gray-600 font-['Rubik',sans-serif] font-light">{plan.description}</p>
              </div>
              <div className="flex-1 flex flex-col justify-between p-6 pt-0">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <FaCheck className="w-4 h-4 text-[#BFE220] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 font-['Rubik',sans-serif] font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
                {answers.subscriptionPlan === plan.id && (
                  <div className="mt-4 flex justify-center">
                    <div className="w-6 h-6 bg-[#BFE220] rounded-full flex items-center justify-center">
                      <FaCheck className="w-4 h-4 text-[#181818]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {errors.subscriptionPlan && <p className="text-sm text-red-400 text-center font-['Rubik',sans-serif]">{errors.subscriptionPlan}</p>}

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border-l-4 border-amber-400 shadow-sm mt-6">
          <h3 className="flex items-center font-medium text-amber-800 mb-3 font-['Rubik',sans-serif] text-sm">
            <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-xs">⚠</span>
            </div>
            Información importante:
          </h3>
          <div className="space-y-2 text-amber-700 font-['Rubik',sans-serif] leading-relaxed text-xs">
            <p className="flex items-start">
              <span className="text-amber-500 mr-2 mt-0.5 text-xs">•</span>
              <span>
                <strong className="text-amber-800">Logo:</strong> Debe ser proporcionado por el cliente en formato vectorial (AI, SVG, EPS). En
                caso contrario, se cobrará un redibujo adicional.
              </span>
            </p>
            <p className="flex items-start">
              <span className="text-amber-500 mr-2 mt-0.5 text-xs">•</span>
              <span>
                <strong className="text-amber-800">Fotografías:</strong> Este presupuesto no contempla fotografías. Deben ser proporcionadas por el
                cliente o solicitar cotización adicional.
              </span>
            </p>
            <p className="flex items-start">
              <span className="text-amber-500 mr-2 mt-0.5 text-xs">•</span>
              <span>
                <strong className="text-amber-800">Formatos de entrega:</strong> Solo se entregan archivos en PNG, JPG y PDF. No se incluyen
                archivos vectoriales editables.
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyNeeds" className="text-sm font-medium">
              Describe tus necesidades mensuales de diseño *
            </Label>
            <Textarea
              id="monthlyNeeds"
              value={answers.monthlyNeeds || ""}
              onChange={(e) => updateAnswer("monthlyNeeds", e.target.value)}
              placeholder="ej., Posts para redes sociales, material promocional, actualizaciones de marca, etc."
              className={`min-h-[100px] resize-none ${errors.monthlyNeeds ? "border-destructive" : ""}`}
            />
            {errors.monthlyNeeds && <p className="text-sm text-destructive">{errors.monthlyNeeds}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="references" className="text-sm font-medium">
              Referencias de estilo o inspiración *
            </Label>
            <Textarea
              id="references"
              value={answers.references || ""}
              onChange={(e) => updateAnswer("references", e.target.value)}
              placeholder="Comparte enlaces, describe estilos que te gusten, o menciona marcas que admires"
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priorities" className="text-sm font-medium">
              ¿Cuáles son tus prioridades principales?
            </Label>
            <Textarea
              id="priorities"
              value={answers.priorities || ""}
              onChange={(e) => updateAnswer("priorities", e.target.value)}
              placeholder="ej., Velocidad de entrega, calidad premium, variedad de formatos, soporte constante"
              className="min-h-[80px] resize-none"
            />
          </div>
        </div>
      </div>
    )
  }

  const renderLogoQuestions = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Diseño de Logotipo</h2>
          <p className="text-muted-foreground">Describe tus necesidades para el logotipo</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emotions" className="text-sm font-medium">
              Emociones/Percepciones *
            </Label>
            <Textarea
              id="emotions"
              value={answers.emotions || ""}
              onChange={(e) => updateAnswer("emotions", e.target.value)}
              placeholder="Describe las emociones o percepciones que quieres transmitir con tu logotipo"
              className={`min-h-[100px] resize-none ${errors.emotions ? "border-destructive" : ""}`}
            />
            {errors.emotions && <p className="text-sm text-destructive">{errors.emotions}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="colors" className="text-sm font-medium">
              Preferencias de Color *
            </Label>
            <Textarea
              id="colors"
              value={answers.colors || ""}
              onChange={(e) => updateAnswer("colors", e.target.value)}
              placeholder="Describe tus preferencias de color para el logotipo"
              className={`min-h-[100px] resize-none ${errors.colors ? "border-destructive" : ""}`}
            />
            {errors.colors && <p className="text-sm text-destructive">{errors.colors}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="useCases" className="text-sm font-medium">
              Casos de Uso *
            </Label>
            <Textarea
              id="useCases"
              value={answers.useCases || ""}
              onChange={(e) => updateAnswer("useCases", e.target.value)}
              placeholder="Describe dónde se utilizará el logotipo"
              className={`min-h-[100px] resize-none ${errors.useCases ? "border-destructive" : ""}`}
            />
            {errors.useCases && <p className="text-sm text-destructive">{errors.useCases}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="revisions" className="text-sm font-medium">
              Número de Revisiones (máximo 3) *
            </Label>
            <Input
              type="number"
              id="revisions"
              value={answers.revisions || ""}
              onChange={(e) => {const value = Math.max(1, Number.parseInt(e.target.value) || 0); updateAnswer("revisions", value);}}
              className="h-12"
              min="1"
              max="3"
            />
            <p className="text-xs text-muted-foreground">Las revisiones adicionales tienen un costo extra</p>
            {errors.revisions && <p className="text-sm text-destructive">{errors.revisions}</p>}
          </div>
        </div>
      </div>
    )
  }

  const renderVisualIdentityQuestions = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Identidad Visual</h2>
          <p className="text-muted-foreground">Describe tus necesidades para la identidad visual</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emotions" className="text-sm font-medium">
              Emociones/Percepciones *
            </Label>
            <Textarea
              id="emotions"
              value={answers.emotions || ""}
              onChange={(e) => updateAnswer("emotions", e.target.value)}
              placeholder="Describe las emociones o percepciones que quieres transmitir con tu identidad visual"
              className={`min-h-[100px] resize-none ${errors.emotions ? "border-destructive" : ""}`}
            />
            {errors.emotions && <p className="text-sm text-destructive">{errors.emotions}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="colors" className="text-sm font-medium">
              Preferencias de Color *
            </Label>
            <Textarea
              id="colors"
              value={answers.colors || ""}
              onChange={(e) => updateAnswer("colors", e.target.value)}
              placeholder="Describe tus preferencias de color para la identidad visual"
              className={`min-h-[100px] resize-none ${errors.colors ? "border-destructive" : ""}`}
            />
            {errors.colors && <p className="text-sm text-destructive">{errors.colors}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="applications" className="text-sm font-medium">
              Aplicaciones *
            </Label>
            <Textarea
              id="applications"
              value={answers.applications || ""}
              onChange={(e) => updateAnswer("applications", e.target.value)}
              placeholder="Describe dónde se utilizará la identidad visual"
              className={`min-h-[100px] resize-none ${errors.applications ? "border-destructive" : ""}`}
            />
            {errors.applications && <p className="text-sm text-destructive">{errors.applications}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="communicationTone" className="text-sm font-medium">
              Tono de Comunicación *
            </Label>
            <Textarea
              id="communicationTone"
              value={answers.communicationTone || ""}
              onChange={(e) => updateAnswer("communicationTone", e.target.value)}
              placeholder="Describe el tono de comunicación que quieres para tu identidad visual"
              className={`min-h-[100px] resize-none ${errors.communicationTone ? "border-destructive" : ""}`}
            />
            {errors.communicationTone && <p className="text-sm text-destructive">{errors.communicationTone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="revisions" className="text-sm font-medium">
              Número de Revisiones (máximo 3) *
            </Label>
            <Input
              type="number"
              id="revisions"
              value={answers.revisions || ""}
              onChange={(e) => updateAnswer("revisions", Number.parseInt(e.target.value) || 0)}
              className="h-12"
              min="1"
              max="3"
            />
            <p className="text-xs text-muted-foreground">Las revisiones adicionales tienen un costo extra</p>
            {errors.revisions && <p className="text-sm text-destructive">{errors.revisions}</p>}
          </div>
        </div>
      </div>
    )
  }

  const renderWebsiteQuestions = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Diseño de Sitio Web</h2>
          <p className="text-muted-foreground">Describe tus necesidades para el sitio web</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mainObjective" className="text-sm font-medium">
              Objetivo Principal *
            </Label>
            <Textarea
              id="mainObjective"
              value={answers.mainObjective || ""}
              onChange={(e) => updateAnswer("mainObjective", e.target.value)}
              placeholder="Describe el objetivo principal de tu sitio web"
              className={`min-h-[100px] resize-none ${errors.mainObjective ? "border-destructive" : ""}`}
            />
            {errors.mainObjective && <p className="text-sm text-destructive">{errors.mainObjective}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requiredSections" className="text-sm font-medium">
              Secciones Requeridas *
            </Label>
            <Textarea
              id="requiredSections"
              value={answers.requiredSections || ""}
              onChange={(e) => updateAnswer("requiredSections", e.target.value)}
              placeholder="Describe las secciones que necesitas en tu sitio web"
              className={`min-h-[100px] resize-none ${errors.requiredSections ? "border-destructive" : ""}`}
            />
            {errors.requiredSections && <p className="text-sm text-destructive">{errors.requiredSections}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contentProvider" className="text-sm font-medium">
              Proveedor de Contenido *
            </Label>
            <Textarea
              id="contentProvider"
              value={answers.contentProvider || ""}
              onChange={(e) => updateAnswer("contentProvider", e.target.value)}
              placeholder="Describe quién proporcionará el contenido para tu sitio web"
              className={`min-h-[100px] resize-none ${errors.contentProvider ? "border-destructive" : ""}`}
            />
            {errors.contentProvider && <p className="text-sm text-destructive">{errors.contentProvider}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="revisions" className="text-sm font-medium">
              Número de Revisiones (máximo 3) *
            </Label>
            <Input
              type="number"
              id="revisions"
              value={answers.revisions || ""}
              onChange={(e) => updateAnswer("revisions", Number.parseInt(e.target.value) || 0)}
              className="h-12"
              min="1"
              max="3"
            />
            <p className="text-xs text-muted-foreground">Las revisiones adicionales tienen un costo extra</p>
            {errors.revisions && <p className="text-sm text-destructive">{errors.revisions}</p>}
          </div>
        </div>
      </div>
    )
  }

  const renderGraphicAssetsQuestions = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Asuntos Gráficos</h2>
          <p className="text-muted-foreground">Describe tus necesidades para los asuntos gráficos</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="specificPieces" className="text-sm font-medium">
              Piezas Específicas *
            </Label>
            <Textarea
              id="specificPieces"
              value={answers.specificPieces || ""}
              onChange={(e) => updateAnswer("specificPieces", e.target.value)}
              placeholder="Describe las piezas específicas que necesitas"
              className={`min-h-[100px] resize-none ${errors.specificPieces ? "border-destructive" : ""}`}
            />
            {errors.specificPieces && <p className="text-sm text-destructive">{errors.specificPieces}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="distributionChannels" className="text-sm font-medium">
              Canales de Distribución *
            </Label>
            <Textarea
              id="distributionChannels"
              value={answers.distributionChannels || ""}
              onChange={(e) => updateAnswer("distributionChannels", e.target.value)}
              placeholder="Describe los canales de distribución para tus asuntos gráficos"
              className={`min-h-[100px] resize-none ${errors.distributionChannels ? "border-destructive" : ""}`}
            />
            {errors.distributionChannels && <p className="text-sm text-destructive">{errors.distributionChannels}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectives" className="text-sm font-medium">
              Objetivos *
            </Label>
            <Textarea
              id="objectives"
              value={answers.objectives || ""}
              onChange={(e) => updateAnswer("objectives", e.target.value)}
              placeholder="Describe tus objetivos para los asuntos gráficos"
              className={`min-h-[100px] resize-none ${errors.objectives ? "border-destructive" : ""}`}
            />
            {errors.objectives && <p className="text-sm text-destructive">{errors.objectives}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="revisions" className="text-sm font-medium">
              Número de Revisiones (máximo 3) *
            </Label>
            <Input
              type="number"
              id="revisions"
              value={answers.revisions || ""}
              onChange={(e) => updateAnswer("revisions", Number.parseInt(e.target.value) || 0)}
              className="h-12"
              min="1"
              max="3"
            />
            <p className="text-xs text-muted-foreground">Las revisiones adicionales tienen un costo extra</p>
            {errors.revisions && <p className="text-sm text-destructive">{errors.revisions}</p>}
          </div>
        </div>
      </div>
    )
  }

  const renderQuestions = () => {
    switch (serviceType) {
      case "subscription":
        return renderSubscriptionQuestions()
      case "logo":
        return renderLogoQuestions()
      case "visual-identity":
        return renderVisualIdentityQuestions()
      case "website":
        return renderWebsiteQuestions()
      case "graphic-assets":
        return renderGraphicAssetsQuestions()
      default:
        return <div>Tipo de servicio no encontrado</div>
    }
  }

  return (
    <div className="space-y-6">
      {renderQuestions()}

      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onPrev} 
          size="lg" 
          className="min-w-[120px] bg-transparent border-gray-600 text-gray-900 hover:bg-white hover:border-gray-500 font-['Rubik',sans-serif]"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Atrás
        </Button>
        <Button 
          onClick={handleNext} 
          size="lg" 
          className="min-w-[120px] bg-[#BFE220] hover:bg-[#a8cc1d] text-[#181818] font-bold font-['Rubik',sans-serif]"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
