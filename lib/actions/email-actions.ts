// Función para enviar email con EmailJS
async function sendEmailWithEmailJS(emailData: any) {
  try {
    // Enviar email usando EmailJS API
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: emailData.serviceId,
        template_id: emailData.templateId,
        user_id: emailData.publicKey,
        template_params: emailData.templateParams,
      }),
    })

    if (response.ok) {
      console.log("Email enviado exitosamente a somosuffo@gmail.com")
      return { success: true, error: null }
    } else {
      const errorText = await response.text()
      console.error("Error en respuesta de EmailJS:", errorText)
      return { success: false, error: `Error del servidor EmailJS: ${response.status}` }
    }
  } catch (error) {
    console.error("Error enviando email con EmailJS:", error)
    return { success: false, error: `Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}` }
  }
}

export async function generatePDFAndSendEmail(formData: any) {
  try {
    // Generar el contenido del PDF
    const pdfContent = generateMockPDF(formData)
    const plainTextContent = generatePlainTextContent(formData)

    return {
      success: true,
      pdfBase64: pdfContent,
      filename: `propuesta-${formData.companyName?.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.pdf`,
      plainTextContent: plainTextContent,
      emailData: {
        serviceId: "service_3ybd176",
        templateId: "template_z10n5b8",
        publicKey: "Q8YNdJxRGmnBeMN0i",
        templateParams: {
          to_email: "somosuffo@gmail.com",
          subject: `Consulta ${getServiceName(formData.selectedService)} - ${formData.companyName}`,
          company_name: formData.companyName,
          contact_name: formData.contactName,
          contact_email: formData.email,
          contact_phone: formData.phone,
          service_type: getServiceName(formData.selectedService),
          message: plainTextContent,
          pdf_attachment: pdfContent,
          submission_date: new Date().toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          industry: formData.industry,
          budget: formData.budget || "No especificado",
          deadline: formData.deadline,
          company_description: formData.companyDescription,
          unique_selling_point: formData.uniqueSellingPoint,
          decision_maker: formData.decisionMaker,
          communication_method: formData.communicationMethod,
          contact_schedule: formData.contactSchedule,
          design_expectations: formData.designExpectations,
          additional_comments: formData.additionalComments || "Ninguno",
          payment_preference: formData.paymentPreference,
          payment_installments: formData.paymentInstallments,
        },
      },
    }
  } catch (error) {
    console.error("Error generating PDF:", error)
    return {
      success: false,
      error: "Error al generar el PDF",
    }
  }
}

function getServiceName(serviceType: string): string {
  const serviceNames: Record<string, string> = {
    subscription: "Suscripción Mensual",
    logo: "Diseño de Logo",
    "visual-identity": "Identidad Visual",
    website: "Diseño de Sitio Web",
  }
  return serviceNames[serviceType] || serviceType
}

function generatePlainTextContent(formData: any): string {
  const currentDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return `
NUEVA SOLICITUD DE PRESUPUESTO - ${currentDate}

═══════════════════════════════════════════════════════════════
INFORMACIÓN DE LA EMPRESA
═══════════════════════════════════════════════════════════════

Empresa: ${formData.companyName}
Contacto: ${formData.contactName}
Email: ${formData.email}
Teléfono: ${formData.phone}
Industria: ${formData.industry}
Sitio Web/Redes: ${formData.websiteOrSocial || "No especificado"}

Ubicación: ${
    formData.businessLocation === "argentina" ? `${formData.city}, ${formData.province}, Argentina` : formData.city
  }

═══════════════════════════════════════════════════════════════
DESCRIPCIÓN DEL NEGOCIO
═══════════════════════════════════════════════════════════════

${formData.companyDescription}

Tiempo Operando: ${formData.operatingTime}

Propuesta Única de Valor:
${formData.uniqueSellingPoint}

═══════════════════════════════════════════════════════════════
SERVICIO SOLICITADO
═══════════════════════════════════════════════════════════════

Servicio: ${getServiceName(formData.selectedService)}
${formData.selectedService !== "subscription" ? `Presupuesto: ${formData.budget}` : ""}
Fecha Límite: ${formData.deadline}

═══════════════════════════════════════════════════════════════
DETALLES DEL PROYECTO
═══════════════════════════════════════════════════════════════

${JSON.stringify(formData.conditionalAnswers, null, 2)}

═══════════════════════════════════════════════════════════════
COMUNICACIÓN Y PROCESO
═══════════════════════════════════════════════════════════════

Responsable de Decisiones: ${formData.decisionMaker}
Método de Comunicación: ${formData.communicationMethod}
Horario de Contacto: ${formData.contactSchedule}
Frecuencia de Contacto: ${formData.contactFrequency}

Expectativas de Diseño:
${formData.designExpectations}

═══════════════════════════════════════════════════════════════
INFORMACIÓN ADICIONAL
═══════════════════════════════════════════════════════════════

Comentarios Adicionales:
${formData.additionalComments || "Ninguno"}

Preferencia de Pago: ${formData.paymentPreference}
Cuotas: ${formData.paymentInstallments}

═══════════════════════════════════════════════════════════════

Solicitud generada automáticamente el ${currentDate}
Para UFFO Studios - somosuffo@gmail.com
  `
}

function utf8ToBase64(str: string): string {
  try {
    // Convertir string a UTF-8 bytes y luego a base64
    const encoder = new TextEncoder()
    const data = encoder.encode(str)

    // Convertir Uint8Array a string binario
    let binary = ""
    for (let i = 0; i < data.length; i++) {
      binary += String.fromCharCode(data[i])
    }

    // Codificar a base64
    return btoa(binary)
  } catch (error) {
    console.error("Error encoding to base64:", error)
    // Fallback: remover caracteres problemáticos y usar btoa normal
    const cleanStr = str.replace(/[^\x00-\x7F]/g, "?")
    return btoa(cleanStr)
  }
}

function generateMockPDF(formData: any): string {
  const currentDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const pdfContentText = `
    ═══════════════════════════════════════════════════════════════
    [LOGO UFFO]                                    ${currentDate}
                              UFFO STUDIOS
    ═══════════════════════════════════════════════════════════════
    
    PROPUESTA DE DISEÑO
    
    ═══════════════════════════════════════════════════════════════
    INFORMACIÓN DE LA EMPRESA
    ═══════════════════════════════════════════════════════════════
    
    Empresa: ${formData.companyName}
    Contacto: ${formData.contactName}
    Email: ${formData.email}
    Teléfono: ${formData.phone}
    Industria: ${formData.industry}
    Sitio Web/Redes: ${formData.websiteOrSocial || "No especificado"}
    
    Ubicación: ${
      formData.businessLocation === "argentina" ? `${formData.city}, ${formData.province}, Argentina` : formData.city
    }
    
    ═══════════════════════════════════════════════════════════════
    DESCRIPCIÓN DEL NEGOCIO
    ═══════════════════════════════════════════════════════════════
    
    ${formData.companyDescription}
    
    Tiempo Operando: ${formData.operatingTime}
    
    Propuesta Única de Valor:
    ${formData.uniqueSellingPoint}
    
    ═══════════════════════════════════════════════════════════════
    SERVICIO SOLICITADO
    ═══════════════════════════════════════════════════════════════
    
    Servicio: ${getServiceName(formData.selectedService)}
    ${formData.selectedService !== "subscription" ? `Presupuesto: ${formData.budget}` : ""}
    Fecha Límite: ${formData.deadline}
    
    ═══════════════════════════════════════════════════════════════
    DETALLES DEL PROYECTO
    ═══════════════════════════════════════════════════════════════
    
    ${JSON.stringify(formData.conditionalAnswers, null, 2)}
    
    ═══════════════════════════════════════════════════════════════
    COMUNICACIÓN Y PROCESO
    ═══════════════════════════════════════════════════════════════
    
    Responsable de Decisiones: ${formData.decisionMaker}
    Método de Comunicación: ${formData.communicationMethod}
    Horario de Contacto: ${formData.contactSchedule}
    Frecuencia de Contacto: ${formData.contactFrequency}
    
    Expectativas de Diseño:
    ${formData.designExpectations}
    
    ═══════════════════════════════════════════════════════════════
    INFORMACIÓN ADICIONAL
    ═══════════════════════════════════════════════════════════════
    
    Comentarios Adicionales:
    ${formData.additionalComments || "Ninguno"}
    
    Preferencia de Pago: ${formData.paymentPreference}
    Cuotas: ${formData.paymentInstallments}
    
    ═══════════════════════════════════════════════════════════════
    
    Este presupuesto fue generado automáticamente el ${currentDate}
    Para UFFO Studios - somosuffo@gmail.com
    
    ═══════════════════════════════════════════════════════════════
  `

  return utf8ToBase64(pdfContentText)
}
