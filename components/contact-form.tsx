"use client"

import type React from "react"

import { useState } from "react"
import { 
  FaPaperPlane, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaCheckCircle 
} from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    servicio: "",
    presupuesto: "",
    mensaje: "",
    acepta_terminos: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Ubicación",
      content: "San Rafael, Mendoza, Argentina",
      description: "Trabajamos desde Mendoza para el mundo",
    },
    {
      icon: FaPhone,
      title: "Teléfono",
      content: "+54 926046666",
      description: "Lunes a Viernes, 9:00 - 18:00",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      content: "@somosuffo",
      description: "Respuesta en menos de 24 horas",
    },
    {
      icon: FaClock,
      title: "Horarios",
      content: "Lun - Vie: 9:00 - 18:00",
      description: "Sáb: 9:00 - 13:00",
    },
  ]

  const servicios = [
    "Diseño Web",
    "Branding",
    "Diseño UX/UI",
    "Desarrollo Web",
    "SEO",
    "Marketing Digital",
    "Fotografía",
    "Consultoría",
    "Otro",
  ]

  const presupuestos = [
    "Menos de $500 USD",
    "$500 - $1,500 USD",
    "$1,500 - $5,000 USD",
    "$5,000 - $10,000 USD",
    "Más de $10,000 USD",
    "A definir",
  ]

  if (isSubmitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 pt-20">
        <Card className="w-full max-w-md text-center shadow-2xl">
          <CardContent className="p-8">
            <FaCheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">¡Mensaje Enviado!</h2>
            <p className="text-muted-foreground mb-6">
              Gracias por contactarnos. Nos pondremos en contacto contigo en las próximas 24 horas.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Enviar Otro Mensaje
            </Button>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-background to-muted pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Hablemos de tu <span className="text-primary">proyecto</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos listos para hacer realidad tus ideas. Cuéntanos sobre tu proyecto y comencemos a trabajar juntos.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in-up">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-foreground font-medium">{info.content}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="shadow-xl bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">¿Por qué elegirnos?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-2">
                    <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Respuesta rápida en menos de 24 horas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Cotización personalizada y gratuita</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Proceso de trabajo transparente</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Soporte continuo post-entrega</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-fade-in-up">
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">Cuéntanos sobre tu proyecto</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo *</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange("nombre", e.target.value)}
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange("telefono", e.target.value)}
                        placeholder="+54 9 11 1234-5678"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input
                        id="empresa"
                        value={formData.empresa}
                        onChange={(e) => handleInputChange("empresa", e.target.value)}
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="servicio">Servicio de interés *</Label>
                      <Select value={formData.servicio} onValueChange={(value) => handleInputChange("servicio", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                        <SelectContent>
                          {servicios.map((servicio) => (
                            <SelectItem key={servicio} value={servicio}>
                              {servicio}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="presupuesto">Presupuesto estimado</Label>
                      <Select
                        value={formData.presupuesto}
                        onValueChange={(value) => handleInputChange("presupuesto", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rango" />
                        </SelectTrigger>
                        <SelectContent>
                          {presupuestos.map((presupuesto) => (
                            <SelectItem key={presupuesto} value={presupuesto}>
                              {presupuesto}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="mensaje">Cuéntanos sobre tu proyecto *</Label>
                    <Textarea
                      id="mensaje"
                      value={formData.mensaje}
                      onChange={(e) => handleInputChange("mensaje", e.target.value)}
                      placeholder="Describe tu proyecto, objetivos, plazos y cualquier detalle importante..."
                      rows={5}
                      required
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terminos"
                      checked={formData.acepta_terminos}
                      onCheckedChange={(checked) => handleInputChange("acepta_terminos", checked as boolean)}
                    />
                    <Label htmlFor="terminos" className="text-sm leading-relaxed">
                      Acepto los términos y condiciones y autorizo el tratamiento de mis datos personales para fines
                      comerciales. *
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || !formData.acepta_terminos}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        <span>Enviando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <FaPaperPlane className="w-5 h-5" />
                        <span>Enviar Mensaje</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
