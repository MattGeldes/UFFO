const { Resend } = require('resend');

// Inicializar Resend con la API key
const resend = new Resend('re_bNC5o9B8_M7jra9fpqGLjDRrVaNEGfxiX');

// Datos de prueba que simulan un formulario completado
const testFormData = {
  selectedService: 'logo',
  companyName: 'Test Company UFFO',
  contactName: 'Juan Pérez',
  email: 'test@example.com',
  phone: '+54 11 1234-5678',
  industry: 'Tecnología',
  websiteOrSocial: 'https://testcompany.com',
  companyDescription: 'Una empresa de tecnología innovadora',
  operatingTime: '2 años',
  uniqueSellingPoint: 'Soluciones tecnológicas personalizadas',
  budget: '$1000 - $3000',
  deadline: '1-2 meses',
  decisionMaker: 'CEO',
  communicationMethod: 'email',
  designExpectations: 'Un diseño moderno y profesional',
  contactSchedule: 'manana',
  contactFrequency: 'semanal',
  businessLocation: 'argentina',
  province: 'Buenos Aires',
  city: 'CABA',
  conditionalAnswers: {
    logoStyle: 'moderno',
    logoColors: 'azul y blanco',
    logoUsage: 'digital y impreso'
  },
  additionalComments: 'Estamos muy emocionados de trabajar con UFFO Studios',
  consentGiven: true,
  paymentPreference: 'transferencia',
  paymentInstallments: 2
};

// Función para generar el contenido HTML del email (igual que en email-actions.ts)
function generateHTMLEmailContent(formData) {
  const getServiceName = (serviceType) => {
    const serviceNames = {
      subscription: "Suscripción Mensual",
      logo: "Diseño de Logo",
      "visual-identity": "Identidad Visual",
      website: "Diseño de Sitio Web",
      "graphic-assets": "Activos Gráficos",
    };
    return serviceNames[serviceType] || serviceType;
  };

  const formatConditionalAnswers = (answers) => {
    return Object.entries(answers)
      .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
      .join('<br>');
  };

  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva Consulta - UFFO Studios</title>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Rubik', Arial, sans-serif;
            line-height: 1.6;
            color: #181818;
            background-color: #FDFDFF;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #BFE220 0%, #4e6e5d 100%);
            padding: 30px 20px;
            text-align: center;
            color: #181818;
        }
        .header h1 {
            font-family: 'Rubik', sans-serif;
            font-weight: 700;
            font-size: 28px;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .content {
            padding: 30px;
        }
        .section {
            margin-bottom: 25px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #BFE220;
        }
        .section h2 {
            font-family: 'Rubik', sans-serif;
            font-weight: 700;
            color: #052210;
            margin: 0 0 15px 0;
            font-size: 18px;
        }
        .field {
            margin-bottom: 10px;
        }
        .field strong {
            font-weight: 700;
            color: #052210;
        }
        .footer {
            background: #181818;
            color: #BFE220;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }
        .footer strong {
            font-weight: 700;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Nueva Consulta de ${getServiceName(formData.selectedService)}</h1>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>Información de Contacto</h2>
                <div class="field"><strong>Empresa:</strong> ${formData.companyName}</div>
                <div class="field"><strong>Contacto:</strong> ${formData.contactName}</div>
                <div class="field"><strong>Email:</strong> ${formData.email}</div>
                <div class="field"><strong>Teléfono:</strong> ${formData.phone}</div>
                <div class="field"><strong>Ubicación:</strong> ${formData.city}, ${formData.province || 'Internacional'}</div>
            </div>

            <div class="section">
                <h2>Detalles del Proyecto</h2>
                <div class="field"><strong>Servicio:</strong> ${getServiceName(formData.selectedService)}</div>
                <div class="field"><strong>Industria:</strong> ${formData.industry}</div>
                <div class="field"><strong>Presupuesto:</strong> ${formData.budget || 'A definir'}</div>
                <div class="field"><strong>Timeline:</strong> ${formData.deadline}</div>
                <div class="field"><strong>Expectativas:</strong> ${formData.designExpectations}</div>
            </div>

            <div class="section">
                <h2>Información de la Empresa</h2>
                <div class="field"><strong>Descripción:</strong> ${formData.companyDescription}</div>
                <div class="field"><strong>Tiempo Operando:</strong> ${formData.operatingTime}</div>
                <div class="field"><strong>Propuesta Única:</strong> ${formData.uniqueSellingPoint}</div>
                <div class="field"><strong>Website/Social:</strong> ${formData.websiteOrSocial}</div>
            </div>

            ${Object.keys(formData.conditionalAnswers).length > 0 ? `
            <div class="section">
                <h2>Especificaciones del Servicio</h2>
                <div class="field">${formatConditionalAnswers(formData.conditionalAnswers)}</div>
            </div>
            ` : ''}

            <div class="section">
                <h2>Preferencias de Comunicación</h2>
                <div class="field"><strong>Método Preferido:</strong> ${formData.communicationMethod}</div>
                <div class="field"><strong>Horario:</strong> ${formData.contactSchedule}</div>
                <div class="field"><strong>Frecuencia:</strong> ${formData.contactFrequency}</div>
                <div class="field"><strong>Toma Decisiones:</strong> ${formData.decisionMaker}</div>
            </div>

            <div class="section">
                <h2>Información de Pago</h2>
                <div class="field"><strong>Método Preferido:</strong> ${formData.paymentPreference}</div>
                <div class="field"><strong>Cuotas:</strong> ${formData.paymentInstallments}</div>
            </div>

            ${formData.additionalComments ? `
            <div class="section">
                <h2>Comentarios Adicionales</h2>
                <div class="field">${formData.additionalComments}</div>
            </div>
            ` : ''}
        </div>

        <div class="footer">
            <strong>UFFO Studios</strong><br>
            Recibido el ${new Date().toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}
        </div>
    </div>
</body>
</html>`;
}

async function testResendEmail() {
  console.log('🧪 Iniciando test de Resend...\n');
  
  try {
    // Generar contenido HTML
    const htmlContent = generateHTMLEmailContent(testFormData);
    
    console.log('📧 Enviando email con Resend...');
    
    // Configurar y enviar email
    const emailData = {
      from: 'UFFO Studios <onboarding@resend.dev>',
      to: ['somosuffo@gmail.com'],
      subject: `Nueva Consulta ${testFormData.selectedService.toUpperCase()} - ${testFormData.companyName}`,
      html: htmlContent,
    };

    console.log(`📬 Destinatario: ${emailData.to[0]}`);
    console.log(`📋 Asunto: ${emailData.subject}`);
    console.log(`🎨 Contenido: HTML con tipografía Rubik y colores UFFO\n`);

    const result = await resend.emails.send(emailData);
    
    if (result.data?.id) {
      console.log('✅ Email enviado exitosamente!');
      console.log(`📍 ID del email: ${result.data.id}`);
      console.log(`📨 Email enviado a: ${emailData.to[0]}`);
      console.log(`📝 Asunto: ${emailData.subject}`);
      console.log('\n🎉 Test de Resend completado con éxito!');
    } else {
      console.log('❌ Error: No se recibió confirmación del envío');
      console.log('Respuesta:', result);
    }

  } catch (error) {
    console.error('❌ Error durante el test de Resend:');
    console.error('Mensaje:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Ejecutar el test
console.log('🚀 UFFO Studios - Test de Email con Resend\n');
console.log('=' * 50);
testResendEmail();