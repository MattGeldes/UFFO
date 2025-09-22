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

// ═══════════════════════════════════════════════════════════════
// 🚀 NUEVA IMPLEMENTACIÓN CON RESEND + PDF
// ═══════════════════════════════════════════════════════════════

// Importación dinámica de Resend solo en el servidor
let resend: any = null;

// Función para inicializar Resend de forma dinámica
async function initializeResend() {
  if (typeof window !== 'undefined') {
    return null; // No ejecutar en el cliente
  }
  
  if (!resend && process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      resend = new Resend(process.env.RESEND_API_KEY);
    } catch (error) {
      console.error('Error inicializando Resend:', error);
    }
  }
  return resend;
}

// Función para generar PDF usando Puppeteer
async function generatePDFFromHTML(htmlContent: string): Promise<Buffer> {
  // Importación dinámica de Puppeteer solo en el servidor
  if (typeof window !== 'undefined') {
    throw new Error('Puppeteer no puede ejecutarse en el cliente');
  }

  const puppeteer = await import('puppeteer');
  let browser;
  try {
    console.log('🎨 Iniciando generación de PDF...');
    
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // HTML completo con estilos UFFO para PDF
    const fullHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Presupuesto UFFO Studios</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Rubik', Arial, sans-serif;
            font-size: 13px;
            line-height: 1.5;
            color: #181818;
            background: white;
            padding: 15mm;
        }
        
        .pdf-container {
            max-width: 100%;
            margin: 0 auto;
        }
        
        .pdf-header {
            background: linear-gradient(135deg, #BFE220 0%, #052210 100%);
            padding: 25px;
            text-align: center;
            border-radius: 10px;
            margin-bottom: 20px;
            color: white;
        }
        
        .pdf-logo {
            width: 50px;
            height: 50px;
            margin: 0 auto 10px;
            fill: #BFE220;
        }
        
        .pdf-title {
            font-family: 'Rubik', sans-serif;
            font-weight: 700;
            font-size: 22px;
            margin: 0;
            letter-spacing: 0.5px;
        }
        
        .pdf-date {
            font-size: 14px;
            color: #4e6e5d;
            text-align: center;
            margin-bottom: 20px;
            font-weight: 400;
        }
        
        .pdf-section {
            background: #FDFDFF;
            padding: 18px;
            margin-bottom: 12px;
            border-radius: 8px;
            border-left: 4px solid #BFE220;
            break-inside: avoid;
        }
        
        .pdf-section.alt {
            border-left-color: #4e6e5d;
        }
        
        .pdf-section-title {
            font-family: 'Rubik', sans-serif;
            font-weight: 600;
            font-size: 16px;
            color: #052210;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .pdf-field {
            margin: 6px 0;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }
        
        .pdf-label {
            font-weight: 500;
            color: #052210;
            min-width: 100px;
        }
        
        .pdf-value {
            font-weight: 400;
            color: #181818;
            flex: 1;
        }
        
        .pdf-footer {
            background: #181818;
            color: #BFE220;
            padding: 15px;
            text-align: center;
            border-radius: 8px;
            margin-top: 20px;
            font-size: 11px;
        }
        
        @page {
            margin: 10mm;
            size: A4;
        }
        
        @media print {
            body { padding: 0; }
            .pdf-section { margin-bottom: 8px; padding: 12px; }
            .pdf-header { padding: 15px; margin-bottom: 12px; }
            .pdf-footer { padding: 10px; margin-top: 12px; }
        }
    </style>
</head>
<body>
    <div class="pdf-container">
        ${htmlContent}
    </div>
</body>
</html>`;

    await page.setContent(fullHTML, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Generar PDF optimizado para A4
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm'
      },
      preferCSSPageSize: true
    });

    console.log('✅ PDF generado exitosamente');
    return Buffer.from(pdfBuffer);
    
  } catch (error) {
    console.error('❌ Error generando PDF:', error);
    throw new Error('Error al generar el PDF del presupuesto');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Función para generar contenido HTML del email con estilos UFFO
function generateHTMLEmailContent(formData: any): string {
  const currentDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
<div style="font-family: 'Rubik', 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #181818; line-height: 1.6; background-color: #FDFDFF;">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap');
  </style>
  
  <!-- HEADER CON FONDO NEGRO, LOGO CENTRADO Y TÍTULO VERDE BOLD -->
  <div style="background-color: #181818; padding: 30px 25px; margin: 0 0 30px 0; text-align: center;">
    <!-- Logo UFFO centrado -->
    <div style="margin-bottom: 20px;">
      <svg width="80" height="80" viewBox="0 0 300 300" style="fill: #BFE220;">
        <path d="M157,186.1c-56.1,15-104.7,15.5-108.5,1-2.9-10.8,19.9-26.8,55-40.5-.8-19.4,11.9-37.5,31.5-42.8,19.6-5.2,39.6,4.1,48.7,21.3,37.2-5.7,65-3.2,67.9,7.6,3.9,14.4-38.4,38.3-94.5,53.4Z"/>
      </svg>
    </div>
    
    <!-- Título verde y bold -->
    <h1 style="font-family: 'Rubik', sans-serif; font-weight: 900; color: #BFE220; margin: 0; font-size: 28px; letter-spacing: 0.5px;">
      NUEVA SOLICITUD DE PRESUPUESTO
    </h1>
  </div>
  
  <p style="font-family: 'Rubik', sans-serif; font-weight: 400; text-align: center; color: #4e6e5d; margin-bottom: 30px; font-size: 16px;">${currentDate}</p>

  <div style="background: #FDFDFF; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #BFE220; box-shadow: 0 2px 4px rgba(5, 34, 16, 0.1);">
    <h2 style="font-family: 'Rubik', sans-serif; font-weight: 700; color: #052210; margin-top: 0; font-size: 20px;">📋 INFORMACIÓN DE LA EMPRESA</h2>
    
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Empresa:</strong> <span style="font-weight: 400; color: #181818;">${formData.companyName}</span></p>
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Contacto:</strong> <span style="font-weight: 400; color: #181818;">${formData.contactName}</span></p>
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Email:</strong> <span style="font-weight: 400; color: #181818;">${formData.email}</span></p>
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Teléfono:</strong> <span style="font-weight: 400; color: #181818;">${formData.phone}</span></p>
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Industria:</strong> <span style="font-weight: 400; color: #181818;">${formData.industry}</span></p>
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Sitio Web/Redes:</strong> <span style="font-weight: 400; color: #181818;">${formData.websiteOrSocial || 'No especificado'}</span></p>
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Ubicación:</strong> <span style="font-weight: 400; color: #181818;">${getLocationString(formData)}</span></p>
  </div>

  <div style="background: #FDFDFF; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #4e6e5d; box-shadow: 0 2px 4px rgba(5, 34, 16, 0.1);">
    <h2 style="font-family: 'Rubik', sans-serif; font-weight: 700; color: #052210; margin-top: 0; font-size: 20px;">🏢 DESCRIPCIÓN DEL NEGOCIO</h2>
    
    <p style="font-family: 'Rubik', sans-serif; font-weight: 400; margin: 15px 0; line-height: 1.7; color: #181818;">${formData.companyDescription}</p>
    
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Tiempo Operando:</strong> <span style="font-weight: 400; color: #181818;">${formData.operatingTime}</span></p>
    
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Propuesta Única de Valor:</strong></p>
    <p style="font-family: 'Rubik', sans-serif; font-weight: 400; margin: 10px 0; line-height: 1.7; padding: 15px; border-left: 3px solid #BFE220; color: #181818; background-color: rgba(191, 226, 32, 0.05); border-radius: 6px;">${formData.uniqueSellingPoint}</p>
  </div>

  <div style="background: #FDFDFF; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #BFE220; box-shadow: 0 2px 4px rgba(5, 34, 16, 0.1);">
    <h2 style="font-family: 'Rubik', sans-serif; font-weight: 700; color: #052210; margin-top: 0; font-size: 20px;">🎯 SERVICIO SOLICITADO</h2>
    
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Servicio:</strong> <span style="font-weight: 400; color: #181818;">${getServiceName(formData.selectedService)}</span></p>
    ${formData.budget ? `<p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Presupuesto:</strong> <span style="font-weight: 400; color: #181818;">${formData.budget}</span></p>` : ''}
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Fecha Límite:</strong> <span style="font-weight: 400; color: #181818;">${formData.deadline}</span></p>
  </div>

  ${generateConditionalContent(formData)}

  <div style="background: #FDFDFF; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #4e6e5d; box-shadow: 0 2px 4px rgba(5, 34, 16, 0.1);">
    <h2 style="font-family: 'Rubik', sans-serif; font-weight: 700; color: #052210; margin-top: 0; font-size: 20px;">💬 COMUNICACIÓN Y PROCESO</h2>
    
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Responsable de Decisiones:</strong> <span style="font-weight: 400; color: #181818;">${formData.decisionMaker}</span></p>
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Método de Comunicación:</strong> <span style="font-weight: 400; color: #181818;">${formData.communicationMethod}</span></p>
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Horario de Contacto:</strong> <span style="font-weight: 400; color: #181818;">${formData.contactTime}</span></p>
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Frecuencia de Comunicación:</strong> <span style="font-weight: 400; color: #181818;">${formData.contactFrequency}</span></p>
    
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Expectativas de Diseño:</strong></p>
    <p style="font-family: 'Rubik', sans-serif; font-weight: 400; margin: 10px 0; line-height: 1.7; padding: 15px; border-left: 3px solid #BFE220; color: #181818; background-color: rgba(191, 226, 32, 0.05); border-radius: 6px;">${formData.designExpectations}</p>
  </div>

  <div style="background: #FDFDFF; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #4e6e5d; box-shadow: 0 2px 4px rgba(5, 34, 16, 0.1);">
    <h2 style="font-family: 'Rubik', sans-serif; font-weight: 700; color: #052210; margin-top: 0; font-size: 20px;">ℹ️ INFORMACIÓN ADICIONAL</h2>
    
    ${formData.additionalComments ? `
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Comentarios Adicionales:</strong></p>
    <p style="font-family: 'Rubik', sans-serif; font-weight: 400; margin: 10px 0; line-height: 1.7; padding: 15px; border-left: 3px solid #BFE220; color: #181818; background-color: rgba(191, 226, 32, 0.05); border-radius: 6px;">${formData.additionalComments}</p>
    ` : ''}
    
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Método de Pago Preferido:</strong> <span style="font-weight: 400; color: #181818;">${formData.paymentPreference}</span></p>
    <p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 700; color: #052210;">Cuotas:</strong> <span style="font-weight: 400; color: #181818;">${formData.installments}</span></p>
  </div>

  <!-- FOOTER NEGRO SIMPLE -->
  <div style="background-color: #181818; padding: 25px 20px; border-radius: 8px; text-align: center;">
    <p style="font-family: 'Rubik', sans-serif; font-weight: 400; color: #BFE220; font-size: 14px; line-height: 1.5; margin: 0;">
      Solicitud generada automáticamente el ${currentDate}<br>
      Para <strong style="font-weight: 500; color: #FDFDFF;">UFFO Studios</strong> - somosuffo@gmail.com
    </p>
  </div>
</div>
  `;
}

// Funciones auxiliares
function getLocationString(formData: any): string {
  if (formData.businessLocation === "argentina") {
    return `${formData.city}, ${formData.province}, Argentina`;
  }
  return formData.city || 'No especificado';
}

function generateConditionalContent(formData: any): string {
  if (!formData.conditionalAnswers) return '';
  
  let content = `
  <div style="background: #FDFDFF; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #4e6e5d; box-shadow: 0 2px 4px rgba(5, 34, 16, 0.1);">
    <h2 style="font-family: 'Rubik', sans-serif; font-weight: 700; color: #052210; margin-top: 0; font-size: 20px;">📝 DETALLES DEL PROYECTO</h2>
    <div style="font-family: 'Rubik', sans-serif; font-weight: 400; line-height: 1.6;">`;
  
  const answers = formData.conditionalAnswers;
  
  // Contenido específico por tipo de servicio
  if (formData.selectedService === 'subscription' && answers.subscriptionPlan) {
    content += `<p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 500; color: #052210;">Plan de Suscripción:</strong> <span style="font-weight: 400; color: #181818;">${answers.subscriptionPlan}</span></p>`;
    
    if (answers.monthlyNeeds) {
      content += `<p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 500; color: #052210;">Necesidades Mensuales:</strong></p>`;
      content += `<p style="font-family: 'Rubik', sans-serif; margin: 8px 0 16px 0; color: #181818; line-height: 1.6; padding: 15px; border-left: 3px solid #BFE220; background-color: rgba(191, 226, 32, 0.05); border-radius: 6px;">${answers.monthlyNeeds}</p>`;
    }
  }
  
  if (answers.references) {
    content += `<p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 500; color: #052210;">Referencias:</strong></p>`;
    content += `<p style="font-family: 'Rubik', sans-serif; margin: 8px 0 16px 0; color: #181818; line-height: 1.6; padding: 15px; border-left: 3px solid #BFE220; background-color: rgba(191, 226, 32, 0.05); border-radius: 6px;">${answers.references}</p>`;
  }
  
  if (answers.priorities) {
    content += `<p style="font-family: 'Rubik', sans-serif; margin: 12px 0;"><strong style="font-weight: 500; color: #052210;">Prioridades:</strong></p>`;
    content += `<p style="font-family: 'Rubik', sans-serif; margin: 8px 0 16px 0; color: #181818; line-height: 1.6; padding: 15px; border-left: 3px solid #BFE220; background-color: rgba(191, 226, 32, 0.05); border-radius: 6px;">${answers.priorities}</p>`;
  }
  
  content += `</div></div>`;
  return content;
}

// Función principal para enviar email con Resend
export async function sendEmailWithResend(formData: any) {
  try {
    console.log('🚀 Iniciando envío de email con Resend...');

    // Inicializar Resend de forma dinámica
    const resendInstance = await initializeResend();
    
    // Validar que Resend esté disponible
    if (!process.env.RESEND_API_KEY || !resendInstance) {
      console.warn('⚠️ RESEND_API_KEY no configurada o no disponible, usando fallback EmailJS');
      return await generatePDFAndSendEmail(formData);
    }

    // Generar contenido HTML
    const htmlContent = generateHTMLEmailContent(formData);
    
    // Generar PDF usando puppeteer
    console.log('📄 Generando PDF con Puppeteer...');
    const pdfBuffer = await generatePDFWithPuppeteer(formData);
    
    if (!pdfBuffer) {
      console.warn('⚠️ No se pudo generar PDF, enviando sin adjunto...');
    } else {
      console.log('✅ PDF generado exitosamente');
    }

    // Configurar datos del email
    const serviceType = getServiceName(formData.selectedService);
    const subject = `Nueva Consulta ${serviceType} - ${formData.companyName}`;
    
    // Configurar email
    const emailConfig: any = {
      from: 'UFFO Studios <noreply@resend.dev>', // Email temporal de Resend
      to: ['somosuffo@gmail.com'],
      subject: subject,
      html: htmlContent,
    };
    
    // Agregar PDF como adjunto solo si se generó correctamente
    if (pdfBuffer) {
      emailConfig.attachments = [
        {
          filename: `presupuesto-${formData.companyName.replace(/\s+/g, '-').toLowerCase()}.pdf`,
          content: pdfBuffer,
        },
      ];
    }
    
    // Enviar email con Resend
    console.log('📧 Enviando email con Resend...');
    const { data, error } = await resendInstance.emails.send(emailConfig);

    if (error) {
      console.error('❌ Error enviando email con Resend:', error);
      console.log('🔄 Fallback: Intentando con EmailJS...');
      return await generatePDFAndSendEmail(formData);
    }

    console.log('✅ Email enviado exitosamente con Resend:', data);
    return { success: true, error: null, emailId: data?.id, provider: 'resend' };

  } catch (error) {
    console.error('❌ Error en sendEmailWithResend:', error);
    console.log('🔄 Fallback: Intentando con EmailJS...');
    return await generatePDFAndSendEmail(formData);
  }
}

// =====================================================
// 📄 FUNCIONES DE GENERACIÓN DE PDF CON PUPPETEER
// =====================================================

/**
 * Genera un PDF real usando Puppeteer con el contenido del formulario
 * Esta función crea un PDF profesional con el branding de UFFO
 */
export async function generatePDFWithPuppeteer(formData: any): Promise<Buffer | null> {
  try {
    console.log('🚀 Iniciando generación de PDF con Puppeteer...');
    
    // Importación dinámica de puppeteer para compatibilidad con ES modules
    const puppeteer = await import('puppeteer');
    
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Configurar formato de página
    await page.setViewport({ width: 1200, height: 1600 });
    
    // Generar el HTML para el PDF
    const htmlContent = generatePDFHTMLContent(formData);
    
    // Cargar el contenido HTML
    await page.setContent(htmlContent, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Generar el PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });
    
    await browser.close();
    
    console.log('✅ PDF generado exitosamente con Puppeteer');
    return pdfBuffer as Buffer;
    
  } catch (error) {
    console.error('❌ Error generando PDF con Puppeteer:', error);
    return null;
  }
}

/**
 * Genera el contenido HTML para el PDF optimizado para una página A4
 */
function generatePDFHTMLContent(formData: any): string {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Propuesta ${formData.companyName} - UFFO Studio</title>
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Rubik', Arial, sans-serif;
          background: #FDFDFF;
          color: #181818;
          line-height: 1.4;
          font-size: 11px;
          height: 100vh;
          overflow: hidden;
        }
        
        .container {
          max-width: 100%;
          height: 100vh;
          padding: 15px;
          display: flex;
          flex-direction: column;
        }
        
        .header {
          background: linear-gradient(135deg, #BFE220 0%, #052210 100%);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 15px;
          flex-shrink: 0;
        }
        
        .header h1 {
          color: #FDFDFF;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .header .subtitle {
          color: #FDFDFF;
          font-size: 12px;
          font-weight: 400;
          opacity: 0.9;
        }
        
        .content {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          overflow: hidden;
        }
        
        .section {
          background: #FDFDFF;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          overflow: hidden;
        }
        
        .section-title {
          color: #181818;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 8px;
          padding-bottom: 4px;
          border-bottom: 2px solid #BFE220;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .info-item {
          margin-bottom: 6px;
        }
        
        .info-label {
          color: #052210;
          font-size: 10px;
          font-weight: 700;
          display: inline;
        }
        
        .info-value {
          color: #181818;
          font-size: 10px;
          font-weight: 400;
          display: inline;
        }
        
        .service-badge {
          display: inline-block;
          background: linear-gradient(135deg, #BFE220 0%, #4e6e5d 100%);
          color: #181818;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          margin: 2px;
        }
        
        .footer {
          text-align: center;
          padding: 10px;
          background: #181818;
          border-radius: 6px;
          margin-top: 15px;
          flex-shrink: 0;
        }
        
        .footer .company {
          color: #BFE220;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .footer .tagline {
          color: #FDFDFF;
          font-size: 9px;
          font-weight: 400;
        }
        
        .date {
          color: #4e6e5d;
          font-size: 9px;
          text-align: right;
          margin-bottom: 10px;
        }
        
        .description {
          font-size: 9px;
          line-height: 1.3;
          color: #181818;
          background: rgba(191, 226, 32, 0.05);
          padding: 8px;
          border-radius: 4px;
          border-left: 3px solid #BFE220;
          margin-top: 4px;
        }
        
        .full-width {
          grid-column: 1 / -1;
        }
        
        @page {
          margin: 10mm;
          size: A4;
        }
        
        @media print {
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
            height: 100vh;
            overflow: hidden;
          }
          .container {
            height: 100vh;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="date">Generado el ${currentDate}</div>
        
        <div class="header">
          <h1>🎯 Propuesta de Proyecto</h1>
          <div class="subtitle">Consulta de ${getServiceName(formData.selectedService)}</div>
        </div>
        
        <div class="content">
          <div class="section">
            <h2 class="section-title">🏢 Información de la Empresa</h2>
            <div class="info-item">
              <span class="info-label">Empresa:</span>
              <span class="info-value">${formData.companyName || 'No especificado'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Contacto:</span>
              <span class="info-value">${formData.contactName || 'No especificado'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Email:</span>
              <span class="info-value">${formData.email || 'No especificado'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Teléfono:</span>
              <span class="info-value">${formData.phone || 'No especificado'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Industria:</span>
              <span class="info-value">${formData.industry || 'No especificado'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Ubicación:</span>
              <span class="info-value">${getLocationString(formData)}</span>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">🎯 Servicio y Presupuesto</h2>
            <div class="service-badge">
              ${getServiceName(formData.selectedService)}
            </div>
            ${formData.budget ? `
            <div class="info-item">
              <span class="info-label">Presupuesto:</span>
              <span class="info-value">${formData.budget}</span>
            </div>
            ` : ''}
            ${formData.deadline ? `
            <div class="info-item">
              <span class="info-label">Fecha Límite:</span>
              <span class="info-value">${formData.deadline}</span>
            </div>
            ` : ''}
            ${formData.operatingTime ? `
            <div class="info-item">
              <span class="info-label">Tiempo Operando:</span>
              <span class="info-value">${formData.operatingTime}</span>
            </div>
            ` : ''}
          </div>
          
          ${formData.companyDescription ? `
          <div class="section full-width">
            <h2 class="section-title">📝 Descripción del Negocio</h2>
            <div class="description">${formData.companyDescription}</div>
          </div>
          ` : ''}
          
          ${formData.uniqueSellingPoint ? `
          <div class="section">
            <h2 class="section-title">💡 Propuesta Única de Valor</h2>
            <div class="description">${formData.uniqueSellingPoint}</div>
          </div>
          ` : ''}
          
          <div class="section">
            <h2 class="section-title">💬 Comunicación</h2>
            ${formData.decisionMaker ? `
            <div class="info-item">
              <span class="info-label">Responsable:</span>
              <span class="info-value">${formData.decisionMaker}</span>
            </div>
            ` : ''}
            ${formData.communicationMethod ? `
            <div class="info-item">
              <span class="info-label">Método:</span>
              <span class="info-value">${formData.communicationMethod}</span>
            </div>
            ` : ''}
            ${formData.contactTime ? `
            <div class="info-item">
              <span class="info-label">Horario:</span>
              <span class="info-value">${formData.contactTime}</span>
            </div>
            ` : ''}
          </div>
        </div>
        
        <div class="footer">
          <div class="company">UFFO STUDIO</div>
          <div class="tagline">Transformando ideas en experiencias digitales excepcionales</div>
        </div>
      </div>
    </body>
    </html>
  `;
}
