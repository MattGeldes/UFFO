"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { ServiceType } from "../design-form"
import { ArrowLeft, Check, Plus, Minus, Camera } from "lucide-react"

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
      case "corporate-gifts":
        const selectedItems = answers.selectedItems || {}
        const hasSelectedItems =
          Object.keys(selectedItems).length > 0 && Object.values(selectedItems).some((qty: any) => qty > 0)
        if (!hasSelectedItems) newErrors.selectedItems = "Debes seleccionar al menos un producto"
        if (!answers.designPreferences?.trim())
          newErrors.designPreferences = "Las preferencias de diseño son requeridas"
        if (answers.deliveryDate && new Date(answers.deliveryDate) < new Date())
          newErrors.deliveryDate = "La fecha de entrega no puede ser en el pasado"
        break
      case "logo":
        if (!answers.emotions?.trim()) newErrors.emotions = "Las emociones/percepciones son requeridas"
        if (!answers.colors?.trim()) newErrors.colors = "Las preferencias de color son requeridas"
        if (!answers.useCases?.trim()) newErrors.useCases = "Los casos de uso son requeridos"
        if (!answers.revisions) newErrors.revisions = "El número de revisiones es requerido"
        break
      case "visual-identity":
        if (!answers.emotions?.trim()) newErrors.emotions = "Las emociones/percepciones son requeridas"
        if (!answers.colors?.trim()) newErrors.colors = "Las preferencias de color son requeridas"
        if (!answers.applications?.trim()) newErrors.applications = "Al menos una aplicación es requerida"
        if (!answers.communicationTone?.trim()) newErrors.communicationTone = "El tono de comunicación es requerido"
        if (!answers.revisions) newErrors.revisions = "El número de revisiones es requerido"
        break
      case "website":
        if (!answers.mainObjective?.trim()) newErrors.mainObjective = "El objetivo principal es requerido"
        if (!answers.requiredSections?.trim()) newErrors.requiredSections = "Las secciones requeridas son necesarias"
        if (!answers.contentProvider?.trim()) newErrors.contentProvider = "El proveedor de contenido es requerido"
        if (!answers.revisions) newErrors.revisions = "El número de revisiones es requerido"
        break
      case "graphic-assets":
        if (!answers.specificPieces?.trim()) newErrors.specificPieces = "Al menos una pieza es requerida"
        if (!answers.distributionChannels?.trim())
          newErrors.distributionChannels = "Los canales de distribución son requeridos"
        if (!answers.objectives?.trim()) newErrors.objectives = "Los objetivos son requeridos"
        if (!answers.revisions) newErrors.revisions = "El número de revisiones es requerido"
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

  const renderCorporateGiftsQuestions = () => {
    const corporateItems = [
      { id: "remeras", name: "Remeras", minQuantity: 10, needsPhoto: true },
      { id: "pins", name: "Pins", minQuantity: 10, needsPhoto: false },
      { id: "calendarios", name: "Calendarios", minQuantity: 10, needsPhoto: true },
      { id: "stickers", name: "Stickers", minQuantity: 10, needsPhoto: false },
      { id: "stickers3d", name: "Stickers 3D", minQuantity: 10, needsPhoto: false },
      { id: "llaveros", name: "Llaveros", minQuantity: 10, needsPhoto: true },
      { id: "tarjetas", name: "Tarjetas Personales", minQuantity: 10, needsPhoto: false },
      { id: "membretadas", name: "Hojas Membretadas", minQuantity: 10, needsPhoto: false },
      { id: "carpetas", name: "Carpetas", minQuantity: 10, needsPhoto: true },
      { id: "cintas", name: "Cintas", minQuantity: 10, needsPhoto: true },
    ]

    const selectedItems = answers.selectedItems || {}

    const updateItemQuantity = (itemId: string, quantity: number) => {
      const item = corporateItems.find((i) => i.id === itemId)
      const minQty = item?.minQuantity || 10

      // Ensure minimum quantity
      const validQuantity = Math.max(0, Math.floor(quantity))

      const updatedItems = { ...selectedItems }

      if (validQuantity === 0) {
        delete updatedItems[itemId]
      } else {
        // Enforce minimum quantity
        updatedItems[itemId] = Math.max(validQuantity, minQty)
      }

      updateAnswer("selectedItems", updatedItems)

      // Calculate total quantity
      const totalQuantity = Object.values(updatedItems).reduce((sum: number, qty: any) => sum + (qty || 0), 0)
      updateAnswer("totalQuantity", totalQuantity)

      // Clear validation errors
      if (Object.keys(updatedItems).length > 0 && errors.selectedItems) {
        setErrors((prev) => ({ ...prev, selectedItems: "" }))
      }
    }

    const addItem = (itemId: string) => {
      const item = corporateItems.find((i) => i.id === itemId)
      const minQty = item?.minQuantity || 10
      updateItemQuantity(itemId, minQty)
    }

    const removeItem = (itemId: string) => {
      updateItemQuantity(itemId, 0)
    }

    const getItemQuantity = (itemId: string) => {
      return selectedItems[itemId] || 0
    }

    const today = new Date().toISOString().split("T")[0]
    const isDateDisabled = (dateString: string) => {
      const date = new Date(dateString)
      const dayOfWeek = date.getDay()
      return dayOfWeek === 0 // Sunday = 0
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Productos Promocionales y Corporativos</h2>
          <p className="text-muted-foreground">
            Selecciona los productos que necesitas y las cantidades (mínimo 10 unidades por producto)
          </p>
        </div>

        {/* Shopping Cart Summary */}
        {Object.keys(selectedItems).length > 0 && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Carrito de Compras</h3>
                <div className="text-lg font-bold text-primary">
                  {Object.values(selectedItems).reduce((sum: number, qty: any) => sum + (qty || 0), 0)} productos
                  seleccionados
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {Object.entries(selectedItems).map(([itemId, quantity]) => {
                  const item = corporateItems.find((i) => i.id === itemId)
                  return (
                    <div key={itemId} className="flex justify-between items-center bg-background/50 rounded px-3 py-2">
                      <span className="font-medium">{item?.name}</span>
                      <span className="text-primary font-semibold">{quantity} unidades</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Product Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {corporateItems.map((item) => {
            const quantity = getItemQuantity(item.id)
            const isSelected = quantity > 0

            return (
              <Card
                key={item.id}
                className={`transition-all duration-200 border-2 ${
                  isSelected ? "border-primary bg-primary/5 shadow-lg" : "border-border hover:border-primary/50"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        {item.needsPhoto && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            <Camera className="h-3 w-3" />
                            Foto de producto
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Cantidad mínima: {item.minQuantity} unidades</p>
                    </div>

                    {!isSelected ? (
                      <Button variant="outline" size="sm" onClick={() => addItem(item.id)} className="h-8 px-3">
                        <Plus className="h-4 w-4 mr-1" />
                        Agregar
                      </Button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateItemQuantity(item.id, quantity - 1)}
                          disabled={quantity <= item.minQuantity}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value) || item.minQuantity
                            updateItemQuantity(item.id, value)
                          }}
                          onBlur={(e) => {
                            const value = Number.parseInt(e.target.value) || item.minQuantity
                            if (value < item.minQuantity) {
                              updateItemQuantity(item.id, item.minQuantity)
                            }
                          }}
                          className="w-16 h-8 text-center"
                          min={item.minQuantity}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateItemQuantity(item.id, quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          title="Eliminar producto"
                        >
                          ×
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        {errors.selectedItems && <p className="text-sm text-destructive text-center">{errors.selectedItems}</p>}

        {/* Total Summary */}
        {Object.keys(selectedItems).length > 0 && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-semibold text-foreground">
                Total de productos:{" "}
                {Object.values(selectedItems).reduce((sum: number, qty: any) => sum + (qty || 0), 0)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Los precios finales se calcularán según diseño, materiales y cantidades específicas
              </p>
            </CardContent>
          </Card>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="designPreferences" className="text-sm font-medium">
              Preferencias de diseño y personalización *
            </Label>
            <Textarea
              id="designPreferences"
              value={answers.designPreferences || ""}
              onChange={(e) => updateAnswer("designPreferences", e.target.value)}
              placeholder="Describe cómo quieres personalizar los productos: colores, logo, texto, estilo, etc."
              className={`min-h-[100px] resize-none ${errors.designPreferences ? "border-destructive" : ""}`}
            />
            {errors.designPreferences && <p className="text-sm text-destructive">{errors.designPreferences}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="usageOccasion" className="text-sm font-medium">
              Ocasión o evento de uso
            </Label>
            <Textarea
              id="usageOccasion"
              value={answers.usageOccasion || ""}
              onChange={(e) => updateAnswer("usageOccasion", e.target.value)}
              placeholder="ej., Evento corporativo, regalo de fin de año, lanzamiento de producto, feria comercial"
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryDate" className="text-sm font-medium">
              Fecha de entrega deseada
            </Label>
            <Input
              type="date"
              id="deliveryDate"
              value={answers.deliveryDate || ""}
              onChange={(e) => {
                const selectedDate = e.target.value
                if (selectedDate && !isDateDisabled(selectedDate)) {
                  updateAnswer("deliveryDate", selectedDate)
                } else if (selectedDate && isDateDisabled(selectedDate)) {
                  // Show error for Sunday selection
                  setErrors((prev) => ({ ...prev, deliveryDate: "No se permiten entregas los domingos" }))
                }
              }}
              className={`h-12 ${errors.deliveryDate ? "border-destructive" : ""}`}
              min={today}
            />
            <p className="text-xs text-muted-foreground">* No se permiten entregas los domingos</p>
            {errors.deliveryDate && <p className="text-sm text-destructive">{errors.deliveryDate}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="references" className="text-sm font-medium">
              Referencias de estilo o inspiración
            </Label>
            <Textarea
              id="references"
              value={answers.references || ""}
              onChange={(e) => updateAnswer("references", e.target.value)}
              placeholder="Comparte enlaces, describe estilos que te gusten, o menciona ejemplos que admires"
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequirements" className="text-sm font-medium">
              Requisitos especiales
            </Label>
            <Textarea
              id="specialRequirements"
              value={answers.specialRequirements || ""}
              onChange={(e) => updateAnswer("specialRequirements", e.target.value)}
              placeholder="ej., Materiales específicos, certificaciones, empaque especial, etc."
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <div className="text-amber-600 mt-0.5">⚠️</div>
              <div>
                <h4 className="font-medium text-amber-800">Requisito de Logo</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Para garantizar la mejor calidad de impresión, necesitamos el logo en formato vectorial (AI, SVG, EPS)
                  o de alta resolución. Si no tienes el logo en estos formatos, se aplicará un cargo adicional por la
                  vectorización.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSubscriptionQuestions = () => {
    const subscriptionPlans = [
      {
        id: "base",
        name: "Base",
        price: "$75,000",
        description: "Perfecto para emprendedores que necesitan diseño básico",
        features: [
          "2 piezas gráficas por mes",
          "1 revisión por pieza",
          "Formatos básicos (JPG, PNG)",
          "Soporte por email",
          "Tiempo de entrega: 5-7 días",
        ],
      },
      {
        id: "emprendedor",
        name: "Emprendedor",
        price: "$135,000",
        description: "Ideal para pequeñas empresas en crecimiento",
        features: [
          "5 piezas gráficas por mes",
          "2 revisiones por pieza",
          "Todos los formatos (AI, SVG, EPS, PDF)",
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
          "10 piezas gráficas por mes",
          "3 revisiones por pieza",
          "Todos los formatos + archivos fuente",
          "Soporte 24/7",
          "Tiempo de entrega: 1-3 días",
          "2 sesiones de consultoría mensual",
          "Estrategia de marca incluida",
        ],
      },
    ]

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Planes de Suscripción Mensual</h2>
          <p className="text-muted-foreground">Elige el plan que mejor se adapte a tus necesidades de diseño</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 relative ${
                plan.popular ? "border-primary bg-primary/5" : "border-border"
              } ${
                answers.subscriptionPlan === plan.id
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "hover:border-primary/50"
              }`}
              onClick={() => updateAnswer("subscriptionPlan", plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Más Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-foreground">{plan.price}</div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {answers.subscriptionPlan === plan.id && (
                  <div className="mt-4 flex justify-center">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        {errors.subscriptionPlan && <p className="text-sm text-destructive text-center">{errors.subscriptionPlan}</p>}

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
              Número de Revisiones *
            </Label>
            <Input
              type="number"
              id="revisions"
              value={answers.revisions || ""}
              onChange={(e) => updateAnswer("revisions", Number.parseInt(e.target.value) || 0)}
              className="h-12"
              min="1"
            />
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
              Número de Revisiones *
            </Label>
            <Input
              type="number"
              id="revisions"
              value={answers.revisions || ""}
              onChange={(e) => updateAnswer("revisions", Number.parseInt(e.target.value) || 0)}
              className="h-12"
              min="1"
            />
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
              Número de Revisiones *
            </Label>
            <Input
              type="number"
              id="revisions"
              value={answers.revisions || ""}
              onChange={(e) => updateAnswer("revisions", Number.parseInt(e.target.value) || 0)}
              className="h-12"
              min="1"
            />
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
              Número de Revisiones *
            </Label>
            <Input
              type="number"
              id="revisions"
              value={answers.revisions || ""}
              onChange={(e) => updateAnswer("revisions", Number.parseInt(e.target.value) || 0)}
              className="h-12"
              min="1"
            />
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
      case "corporate-gifts":
        return renderCorporateGiftsQuestions()
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
        <Button variant="outline" onClick={onPrev} size="lg" className="min-w-[120px] bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Atrás
        </Button>
        <Button onClick={handleNext} size="lg" className="min-w-[120px]">
          Continuar
        </Button>
      </div>
    </div>
  )
}
