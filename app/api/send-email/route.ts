import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializar Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY);

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  servicio: string;
  presupuesto: string;
  mensaje: string;
  acepta_terminos: boolean;
}

// Función para parsear el mensaje de texto plano y convertirlo a HTML estructurado
function parseMessageToHTML(mensaje: string): any {
  const lines = mensaje.split('\n').filter(line => line.trim() !== '');
  const parsed: any = {
    serviceName: '',
    empresa: '',
    industria: '',
    tiempoOperando: '',
    ubicacion: '',
    websiteRedes: '',
    descripcionNegocio: '',
    propuestaValor: '',
    presupuesto: '',
    timeline: '',
    expectativas: '',
    especificaciones: '',
    responsableDecisiones: '',
    metodoComunicacion: '',
    horario: '',
    frecuencia: '',
    metodoPago: '',
    cuotas: '',
    comentarios: ''
  };

  let currentSection = '';
  let currentContent = '';

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('CONSULTA DE ')) {
      parsed.serviceName = trimmedLine.replace('CONSULTA DE ', '');
    } else if (trimmedLine === 'INFORMACIÓN DE LA EMPRESA:') {
      currentSection = 'empresa';
    } else if (trimmedLine === 'DESCRIPCIÓN DEL NEGOCIO:') {
      currentSection = 'descripcion';
    } else if (trimmedLine === 'PROPUESTA ÚNICA DE VALOR:') {
      currentSection = 'propuesta';
    } else if (trimmedLine === 'DETALLES DEL PROYECTO:') {
      currentSection = 'detalles';
    } else if (trimmedLine === 'ESPECIFICACIONES DEL SERVICIO:') {
      currentSection = 'especificaciones';
    } else if (trimmedLine === 'COMUNICACIÓN:') {
      currentSection = 'comunicacion';
    } else if (trimmedLine === 'INFORMACIÓN DE PAGO:') {
      currentSection = 'pago';
    } else if (trimmedLine === 'COMENTARIOS ADICIONALES:') {
      currentSection = 'comentarios';
    } else if (trimmedLine.startsWith('- ')) {
      // Campo con formato "- Campo: Valor"
      const [campo, ...valorParts] = trimmedLine.substring(2).split(': ');
      const valor = valorParts.join(': ');
      
      if (campo === 'Empresa') parsed.empresa = valor;
      else if (campo === 'Industria') parsed.industria = valor;
      else if (campo === 'Tiempo operando') parsed.tiempoOperando = valor;
      else if (campo === 'Ubicación') parsed.ubicacion = valor;
      else if (campo === 'Website/Redes') parsed.websiteRedes = valor;
      else if (campo === 'Presupuesto') parsed.presupuesto = valor;
      else if (campo === 'Timeline') parsed.timeline = valor;
      else if (campo === 'Expectativas de diseño') parsed.expectativas = valor;
      else if (campo === 'Responsable de decisiones') parsed.responsableDecisiones = valor;
      else if (campo === 'Método preferido') {
        if (currentSection === 'comunicacion') {
          parsed.metodoComunicacion = translateCommunicationMethod(valor);
        } else if (currentSection === 'pago') {
          parsed.metodoPago = translatePaymentMethod(valor);
        }
      }
      else if (campo === 'Horario') parsed.horario = translateSchedule(valor);
      else if (campo === 'Frecuencia') parsed.frecuencia = translateFrequency(valor);
      else if (campo === 'Cuotas') parsed.cuotas = valor;
    } else {
      // Contenido libre
      if (currentSection === 'descripcion') {
        parsed.descripcionNegocio += trimmedLine + ' ';
      } else if (currentSection === 'propuesta') {
        parsed.propuestaValor += trimmedLine + ' ';
      } else if (currentSection === 'especificaciones') {
        parsed.especificaciones += trimmedLine + '\n';
      } else if (currentSection === 'comentarios') {
        parsed.comentarios += trimmedLine + ' ';
      }
    }
  }

  return parsed;
}

// Funciones de traducción
function translateCommunicationMethod(method: string): string {
  const translations: { [key: string]: string } = {
    'email': 'Correo electrónico',
    'whatsapp': 'WhatsApp',
    'video': 'Videollamada',
    'phone': 'Teléfono',
    'advance-60': 'Aviso con 60 días de anticipación'
  };
  return translations[method] || method;
}

function translatePaymentMethod(method: string): string {
  const translations: { [key: string]: string } = {
    'transfer': 'Transferencia bancaria',
    'installments': 'Cuotas/Financiamiento',
    'cash': 'Efectivo',
    'card': 'Tarjeta de crédito/débito'
  };
  return translations[method] || method;
}

function translateSchedule(schedule: string): string {
  const translations: { [key: string]: string } = {
    'morning': 'Mañana (9:00-12:00)',
    'afternoon': 'Tarde (13:00-17:00)',
    'evening': 'Noche (18:00-21:00)',
    'flexible': 'Horario flexible'
  };
  return translations[schedule] || schedule;
}

function translateFrequency(frequency: string): string {
  const translations: { [key: string]: string } = {
    'daily': 'Diaria',
    'weekly': 'Semanal', 
    'biweekly': 'Quincenal',
    'monthly': 'Mensual',
    'as-needed': 'Según sea necesario'
  };
  return translations[frequency] || frequency;
}

// Función para convertir JSON de especificaciones a HTML legible
function formatSpecificationsToHTML(especificaciones: string): string {
  try {
    const jsonData = JSON.parse(especificaciones.trim());
    
    // Mapeo de nombres de campos en inglés a español
    const fieldTranslations: { [key: string]: string } = {
      // Logo specifications
      'emotions': 'Emociones/Sensaciones',
      'colors': 'Colores preferidos',
      'useCases': 'Casos de uso',
      'revisions': 'Revisiones incluidas',
      
      // Subscription specifications
      'subscriptionPlan': 'Plan de suscripción',
      'monthlyNeeds': 'Necesidades mensuales',
      
      // Website specifications
      'pages': 'Páginas',
      'features': 'Características',
      'hosting': 'Hosting incluido',
      
      // Visual Identity specifications
      'elements': 'Elementos incluidos',
      'applications': 'Aplicaciones',
      'brandGuidelines': 'Guía de marca',
      
      // Graphic Assets specifications
      'assetTypes': 'Tipos de activos',
      'formats': 'Formatos',
      'usage': 'Uso previsto'
    };

    // Generar HTML para cada campo
    let htmlOutput = '';
    for (const [key, value] of Object.entries(jsonData)) {
      const fieldName = fieldTranslations[key] || key;
      htmlOutput += `<div class="field"><strong>${fieldName}:</strong><span>${value}</span></div>`;
    }
    
    return htmlOutput;
  } catch (e) {
    // Si no es JSON válido, mostrar como texto plano
    return `<div class="field">${especificaciones.trim()}</div>`;
  }
}

function generateHTMLEmailContent(formData: FormData) {
  const currentDate = new Date().toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Parsear el mensaje de texto plano a objeto estructurado
  const parsedData = parseMessageToHTML(formData.mensaje);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva Consulta - UFFO Studios</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');
        
        body {
            font-family: 'Rubik', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header {
            background: #181818;
            color: #BFE220;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            font-family: 'Rubik', sans-serif;
            font-weight: 700;
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px 20px;
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
            margin-bottom: 12px;
            display: flex;
            flex-wrap: wrap;
        }
        .field strong {
            font-weight: 700;
            color: #052210;
            min-width: 140px;
            margin-right: 10px;
        }
        .field span {
            color: #333;
            flex: 1;
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
        .description-box {
            background: #f8fdf0;
            border-left: 4px solid #BFE220;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .description-box h3 {
            margin: 0 0 15px 0;
            color: #052210;
            font-size: 16px;
            font-weight: 700;
        }
        .description-text {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
            font-size: 14px;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Nueva Consulta de ${formData.empresa}</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px; opacity: 0.9;">Servicio solicitado: ${formData.servicio}</p>
        </div>
        
        <div class="content">
            <div style="background: #BFE220; color: #181818; padding: 15px 20px; border-radius: 8px; margin: 20px 0; font-weight: 600; text-align: center; font-size: 16px;">
                💼 Consulta de <strong>${formData.servicio}</strong> desde <strong>${formData.empresa}</strong>
            </div>

            <div class="section">
                <h2>👤 Información de Contacto</h2>
                <div class="field"><strong>Nombre:</strong><span>${formData.nombre}</span></div>
                <div class="field"><strong>Email:</strong><span>${formData.email}</span></div>
                <div class="field"><strong>Teléfono:</strong><span>${formData.telefono}</span></div>
                <div class="field"><strong>Empresa:</strong><span>${formData.empresa}</span></div>
            </div>

            <div class="section">
                <h2>🏢 Información de la Empresa</h2>
                <div class="field"><strong>Industria:</strong><span>${parsedData.industria || 'No especificado'}</span></div>
                <div class="field"><strong>Tiempo operando:</strong><span>${parsedData.tiempoOperando || 'No especificado'}</span></div>
                <div class="field"><strong>Ubicación:</strong><span>${parsedData.ubicacion || 'No especificado'}</span></div>
                <div class="field"><strong>Website/Redes:</strong><span>${parsedData.websiteRedes || 'No especificado'}</span></div>
            </div>

            ${parsedData.descripcionNegocio ? `
            <div class="description-box">
                <h3>📝 Descripción del Negocio</h3>
                <div class="description-text">${parsedData.descripcionNegocio.trim()}</div>
            </div>
            ` : ''}

            ${parsedData.propuestaValor ? `
            <div class="description-box">
                <h3>🎯 Propuesta Única de Valor</h3>
                <div class="description-text">${parsedData.propuestaValor.trim()}</div>
            </div>
            ` : ''}

            <div class="section">
                <h2>💼 Detalles del Proyecto</h2>
                <div class="field"><strong>Servicio:</strong><span>${formData.servicio}</span></div>
                <div class="field"><strong>Presupuesto:</strong><span>${formData.presupuesto}</span></div>
                <div class="field"><strong>Timeline:</strong><span>${parsedData.timeline || 'No especificado'}</span></div>
                <div class="field"><strong>Expectativas:</strong><span>${parsedData.expectativas || 'No especificado'}</span></div>
            </div>

            ${parsedData.especificaciones ? `
            <div class="section">
                <h2>⚙️ Especificaciones del Servicio</h2>
                ${formatSpecificationsToHTML(parsedData.especificaciones)}
            </div>
            ` : ''}

            <div class="section">
                <h2>💬 Comunicación</h2>
                <div class="field"><strong>Responsable:</strong><span>${parsedData.responsableDecisiones || 'No especificado'}</span></div>
                <div class="field"><strong>Método preferido:</strong><span>${parsedData.metodoComunicacion || 'No especificado'}</span></div>
                <div class="field"><strong>Horario:</strong><span>${parsedData.horario || 'No especificado'}</span></div>
                <div class="field"><strong>Frecuencia:</strong><span>${parsedData.frecuencia || 'No especificado'}</span></div>
            </div>

            <div class="section">
                <h2>💳 Información de Pago</h2>
                <div class="field"><strong>Método preferido:</strong><span>${parsedData.metodoPago || (parsedData.cuotas ? 'Financiamiento en cuotas' : 'No especificado')}</span></div>
                ${parsedData.cuotas ? `<div class="field"><strong>Cuotas:</strong><span>${parsedData.cuotas}</span></div>` : ''}
            </div>

            ${parsedData.comentarios && parsedData.comentarios.trim() !== 'Ninguno' ? `
            <div class="description-box">
                <h3>💭 Comentarios Adicionales</h3>
                <div class="description-text">${parsedData.comentarios.trim()}</div>
            </div>
            ` : ''}

            <div class="section">
                <h2>✅ Estado de la Consulta</h2>
                <div class="field"><strong>Términos:</strong><span>${formData.acepta_terminos ? 'Aceptados ✓' : 'No aceptados ✗'}</span></div>
            </div>
        </div>

        <div class="footer">
            <strong>UFFO Studios</strong><br>
            Consulta recibida el ${currentDate}<br>
            Responderemos a la brevedad a ${formData.email}
        </div>
    </div>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json();
    
    console.log('📧 Iniciando envío de email...');
    console.log('API Key configurada:', process.env.RESEND_API_KEY ? '✅ Sí' : '❌ No');
    
    // Validar datos requeridos
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      console.error('❌ Faltan campos obligatorios');
      return NextResponse.json(
        { success: false, error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // Generar contenido HTML del email
    const htmlContent = generateHTMLEmailContent(formData);

    console.log('✉️ Intentando enviar email a:', 'somosuffo@gmail.com');
    
    // Enviar email
    const result = await resend.emails.send({
      from: 'UFFO Studios <onboarding@resend.dev>',
      to: ['somosuffo@gmail.com'],
      subject: `Nueva consulta de ${formData.nombre} - ${formData.servicio}`,
      html: htmlContent,
      replyTo: formData.email,
    });

    console.log('✅ Email enviado exitosamente:', result);

    return NextResponse.json({
      success: true,
      message: 'Email enviado correctamente',
      emailId: result.data?.id,
    });

  } catch (error) {
    console.error('❌ Error detallado:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al enviar email',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}