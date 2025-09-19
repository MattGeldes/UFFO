"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FormData } from "../design-form"
import { ArrowLeft } from "lucide-react"

interface GeneralQuestionsProps {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}

const budgetRanges = [
  { value: "30k-50k", label: "$30,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "100k-200k", label: "$100,000 - $200,000" },
  { value: "200k-300k", label: "$200,000 - $300,000" },
  { value: "300k-500k", label: "$300,000 - $500,000" },
  { value: "discuss", label: "Conversemos sobre el presupuesto" }, // Updated to more natural Spanish
]

const communicationMethods = [
  { value: "email", label: "Correo electrónico" },
  { value: "phone", label: "Llamadas" },
  { value: "video", label: "Videollamadas" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "mixed", label: "Combinación de métodos" },
]

export function GeneralQuestions({ formData, onUpdate, onNext, onPrev }: GeneralQuestionsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyName.trim()) newErrors.companyName = "El nombre de la empresa es requerido"
    if (!formData.contactName.trim()) newErrors.contactName = "El nombre del contacto es requerido"

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Por favor ingresa un correo electrónico válido"
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido"
    } else {
      const phoneRegex = /^[\d\s+\-()]+$/
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "El teléfono solo puede contener números, espacios, +, -, ( )"
      }
    }

    if (!formData.industry.trim()) newErrors.industry = "La industria es requerida"
    if (!formData.companyDescription.trim()) newErrors.companyDescription = "La descripción de la empresa es requerida"
    if (!formData.operatingTime.trim()) newErrors.operatingTime = "El tiempo de operación es requerido"
    if (!formData.uniqueSellingPoint.trim()) newErrors.uniqueSellingPoint = "La propuesta única de valor es requerida"
    if (!formData.budget) newErrors.budget = "El rango de presupuesto es requerido"
    if (!formData.deadline.trim()) newErrors.deadline = "La fecha límite es requerida"
    if (!formData.decisionMaker.trim()) newErrors.decisionMaker = "El responsable de decisiones es requerido"
    if (!formData.communicationMethod) newErrors.communicationMethod = "El método de comunicación es requerido"
    if (!formData.designExpectations.trim()) newErrors.designExpectations = "Las expectativas de diseño son requeridas"
    if (!formData.contactSchedule) newErrors.contactSchedule = "El horario de contacto es requerido"
    if (!formData.contactFrequency) newErrors.contactFrequency = "La frecuencia de contacto es requerida"

    if (!formData.businessLocation.trim()) newErrors.businessLocation = "La ubicación del negocio es requerida"
    if (!formData.city.trim()) newErrors.city = "La ciudad/localidad es requerida"
    if (formData.businessLocation === "argentina" && !formData.province.trim()) {
      newErrors.province = "La provincia es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    onUpdate({ [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Cuéntanos sobre tu negocio</h2>
        <p className="text-muted-foreground">Ayúdanos a entender tu empresa y los requisitos del proyecto</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-sm font-medium">
            Nombre de la Empresa *
          </Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            placeholder="Ingresa el nombre de tu empresa"
            className={`h-12 ${errors.companyName ? "border-destructive" : ""}`}
          />
          {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
        </div>

        {/* Contact Name */}
        <div className="space-y-2">
          <Label htmlFor="contactName" className="text-sm font-medium">
            Nombre del Contacto *
          </Label>
          <Input
            id="contactName"
            value={formData.contactName}
            onChange={(e) => handleInputChange("contactName", e.target.value)}
            placeholder="Tu nombre completo"
            className={`h-12 ${errors.contactName ? "border-destructive" : ""}`}
          />
          {errors.contactName && <p className="text-sm text-destructive">{errors.contactName}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Correo Electrónico *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="tu@email.com"
            className={`h-12 ${errors.email ? "border-destructive" : ""}`}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Teléfono *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+54 9 2604002739"
            className={`h-12 ${errors.phone ? "border-destructive" : ""}`}
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-sm font-medium">
            Industria / Tipo de Negocio *
          </Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => handleInputChange("industry", e.target.value)}
            placeholder="ej. Tecnología, Salud, Retail"
            className={`h-12 ${errors.industry ? "border-destructive" : ""}`}
          />
          {errors.industry && <p className="text-sm text-destructive">{errors.industry}</p>}
        </div>

        {/* Website or Social Media */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="websiteOrSocial" className="text-sm font-medium">
            Sitio Web o Redes Sociales (si existen)
          </Label>
          <Input
            id="websiteOrSocial"
            value={formData.websiteOrSocial}
            onChange={(e) => handleInputChange("websiteOrSocial", e.target.value)}
            placeholder="https://tusitio.com o @turedsocial"
            className="h-12"
          />
        </div>

        {/* Company Description */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="companyDescription" className="text-sm font-medium">
            Breve Descripción de tu Empresa *
          </Label>
          <Textarea
            id="companyDescription"
            value={formData.companyDescription}
            onChange={(e) => handleInputChange("companyDescription", e.target.value)}
            placeholder="Cuéntanos qué hace tu empresa, tu audiencia objetivo y tu misión"
            className={`min-h-[100px] resize-none ${errors.companyDescription ? "border-destructive" : ""}`}
          />
          {errors.companyDescription && <p className="text-sm text-destructive">{errors.companyDescription}</p>}
        </div>

        {/* Operating Time */}
        <div className="space-y-2">
          <Label htmlFor="operatingTime" className="text-sm font-medium">
            Tiempo Operando / Fecha de Inicio Planeada *
          </Label>
          <Input
            id="operatingTime"
            value={formData.operatingTime}
            onChange={(e) => handleInputChange("operatingTime", e.target.value)}
            placeholder="ej. 5 años, Iniciando en Marzo 2024"
            className={`h-12 ${errors.operatingTime ? "border-destructive" : ""}`}
          />
          {errors.operatingTime && <p className="text-sm text-destructive">{errors.operatingTime}</p>}
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-sm font-medium">
            Presupuesto Estimado *
          </Label>
          <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
            <SelectTrigger className={`h-12 ${errors.budget ? "border-destructive" : ""}`}>
              <SelectValue placeholder="Selecciona rango de presupuesto" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
        </div>

        {/* Unique Selling Point */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="uniqueSellingPoint" className="text-sm font-medium">
            ¿Qué Hace que tu Negocio se Destaque? *
          </Label>
          <Textarea
            id="uniqueSellingPoint"
            value={formData.uniqueSellingPoint}
            onChange={(e) => handleInputChange("uniqueSellingPoint", e.target.value)}
            placeholder="Describe tu propuesta única de valor, ventajas competitivas o qué te diferencia"
            className={`min-h-[80px] resize-none ${errors.uniqueSellingPoint ? "border-destructive" : ""}`}
          />
          {errors.uniqueSellingPoint && <p className="text-sm text-destructive">{errors.uniqueSellingPoint}</p>}
        </div>

        {/* Deadline */}
        <div className="space-y-2">
          <Label htmlFor="deadline" className="text-sm font-medium">
            Fecha Límite / Fecha de Entrega Esperada *
          </Label>
          <Input
            id="deadline"
            value={formData.deadline}
            onChange={(e) => handleInputChange("deadline", e.target.value)}
            placeholder="ej. Fin de Marzo, Lo antes posible, Flexible"
            className={`h-12 ${errors.deadline ? "border-destructive" : ""}`}
          />
          {errors.deadline && <p className="text-sm text-destructive">{errors.deadline}</p>}
        </div>

        {/* Decision Maker */}
        <div className="space-y-2">
          <Label htmlFor="decisionMaker" className="text-sm font-medium">
            ¿Quién Toma las Decisiones Finales de Diseño? *
          </Label>
          <Input
            id="decisionMaker"
            value={formData.decisionMaker}
            onChange={(e) => handleInputChange("decisionMaker", e.target.value)}
            placeholder="ej. CEO, Director de Marketing, Yo"
            className={`h-12 ${errors.decisionMaker ? "border-destructive" : ""}`}
          />
          {errors.decisionMaker && <p className="text-sm text-destructive">{errors.decisionMaker}</p>}
        </div>

        {/* Business Location */}
        <div className="space-y-2">
          <Label htmlFor="businessLocation" className="text-sm font-medium">
            Ubicación del Negocio *
          </Label>
          <Select
            value={formData.businessLocation}
            onValueChange={(value) => {
              handleInputChange("businessLocation", value)
              // Clear province and city when changing location
              if (value !== "argentina") {
                handleInputChange("province", "")
              }
            }}
          >
            <SelectTrigger className={`h-12 ${errors.businessLocation ? "border-destructive" : ""}`}>
              <SelectValue placeholder="Selecciona ubicación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="argentina">Argentina</SelectItem>
              <SelectItem value="abroad">En el extranjero</SelectItem>
            </SelectContent>
          </Select>
          {errors.businessLocation && <p className="text-sm text-destructive">{errors.businessLocation}</p>}
        </div>

        {/* Province (only for Argentina) */}
        {formData.businessLocation === "argentina" && (
          <div className="space-y-2">
            <Label htmlFor="province" className="text-sm font-medium">
              Provincia *
            </Label>
            <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)}>
              <SelectTrigger className={`h-12 ${errors.province ? "border-destructive" : ""}`}>
                <SelectValue placeholder="Selecciona provincia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buenos-aires">Buenos Aires</SelectItem>
                <SelectItem value="catamarca">Catamarca</SelectItem>
                <SelectItem value="chaco">Chaco</SelectItem>
                <SelectItem value="chubut">Chubut</SelectItem>
                <SelectItem value="cordoba">Córdoba</SelectItem>
                <SelectItem value="corrientes">Corrientes</SelectItem>
                <SelectItem value="entre-rios">Entre Ríos</SelectItem>
                <SelectItem value="formosa">Formosa</SelectItem>
                <SelectItem value="jujuy">Jujuy</SelectItem>
                <SelectItem value="la-pampa">La Pampa</SelectItem>
                <SelectItem value="la-rioja">La Rioja</SelectItem>
                <SelectItem value="mendoza">Mendoza</SelectItem>
                <SelectItem value="misiones">Misiones</SelectItem>
                <SelectItem value="neuquen">Neuquén</SelectItem>
                <SelectItem value="rio-negro">Río Negro</SelectItem>
                <SelectItem value="salta">Salta</SelectItem>
                <SelectItem value="san-juan">San Juan</SelectItem>
                <SelectItem value="san-luis">San Luis</SelectItem>
                <SelectItem value="santa-cruz">Santa Cruz</SelectItem>
                <SelectItem value="santa-fe">Santa Fe</SelectItem>
                <SelectItem value="santiago-del-estero">Santiago del Estero</SelectItem>
                <SelectItem value="tierra-del-fuego">Tierra del Fuego</SelectItem>
                <SelectItem value="tucuman">Tucumán</SelectItem>
                <SelectItem value="caba">Ciudad Autónoma de Buenos Aires</SelectItem>
              </SelectContent>
            </Select>
            {errors.province && <p className="text-sm text-destructive">{errors.province}</p>}
          </div>
        )}

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium">
            {formData.businessLocation === "argentina" ? "Localidad *" : "Ciudad/País *"}
          </Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder={
              formData.businessLocation === "argentina"
                ? "ej. San Rafael, Rosario, La Plata"
                : "ej. Madrid, España / New York, USA"
            }
            className={`h-12 ${errors.city ? "border-destructive" : ""}`}
          />
          {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
        </div>

        {/* Communication Method */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="communicationMethod" className="text-sm font-medium">
            Método de Comunicación Preferido *
          </Label>
          <Select
            value={formData.communicationMethod}
            onValueChange={(value) => handleInputChange("communicationMethod", value)}
          >
            <SelectTrigger className={`h-12 ${errors.communicationMethod ? "border-destructive" : ""}`}>
              <SelectValue placeholder="Selecciona preferencia de comunicación" />
            </SelectTrigger>
            <SelectContent>
              {communicationMethods.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.communicationMethod && <p className="text-sm text-destructive">{errors.communicationMethod}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactSchedule" className="text-sm font-medium">
            ¿En qué horario nos podemos contactar? *
          </Label>
          <Select
            value={formData.contactSchedule || ""}
            onValueChange={(value) => handleInputChange("contactSchedule", value)}
          >
            <SelectTrigger className={`h-12 ${errors.contactSchedule ? "border-destructive" : ""}`}>
              <SelectValue placeholder="Selecciona horario preferido" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Mañana (9:00 - 12:00)</SelectItem>
              <SelectItem value="afternoon">Tarde (13:00 - 18:00)</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
          {errors.contactSchedule && <p className="text-sm text-destructive">{errors.contactSchedule}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactFrequency" className="text-sm font-medium">
            ¿Con qué frecuencia prefieres que nos contactemos? *
          </Label>
          <Select
            value={formData.contactFrequency || ""}
            onValueChange={(value) => handleInputChange("contactFrequency", value)}
          >
            <SelectTrigger className={`h-12 ${errors.contactFrequency ? "border-destructive" : ""}`}>
              <SelectValue placeholder="Selecciona frecuencia de contacto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diariamente</SelectItem>
              <SelectItem value="weekly">Semanalmente</SelectItem>
              <SelectItem value="biweekly">Cada dos semanas</SelectItem>
              <SelectItem value="monthly">Mensualmente</SelectItem>
              <SelectItem value="as-needed">Solo cuando sea necesario</SelectItem>
            </SelectContent>
          </Select>
          {errors.contactFrequency && <p className="text-sm text-destructive">{errors.contactFrequency}</p>}
        </div>

        {/* Design Expectations */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="designExpectations" className="text-sm font-medium">
            Expectativas para el Proceso de Diseño *
          </Label>
          <Textarea
            id="designExpectations"
            value={formData.designExpectations}
            onChange={(e) => handleInputChange("designExpectations", e.target.value)}
            placeholder="Cuéntanos sobre tus expectativas, estilo preferido, número de revisiones, cronograma, etc."
            className={`min-h-[100px] resize-none ${errors.designExpectations ? "border-destructive" : ""}`}
          />
          {errors.designExpectations && <p className="text-sm text-destructive">{errors.designExpectations}</p>}
        </div>
      </div>

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
