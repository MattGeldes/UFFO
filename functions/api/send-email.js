import { Resend } from 'resend';

export async function onRequestPost({ request, env }) {
  try {
    // Verificar que la API key existe
    if (!env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY no está configurada');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Configuración de email no disponible',
        details: 'RESEND_API_KEY no configurada en el entorno'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const resend = new Resend(env.RESEND_API_KEY);
    const formData = await request.json();
    
    // Log para debugging (sin datos sensibles)
    console.log('📧 Procesando email para:', formData.empresa, 'Servicio:', formData.servicio);

    const currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Función para parsear el mensaje estructurado
    function parseMessageToHTML(mensaje) {
      const lines = mensaje.split('\n').filter(line => line.trim() !== '');
      const parsed = {
        empresa: '', industria: '', tiempoOperando: '', ubicacion: '', websiteRedes: '',
        descripcionNegocio: '', propuestaValor: '', presupuesto: '', timeline: '', 
        especificaciones: '', responsableDecisiones: '', metodoComunicacion: '',
        horario: '', frecuencia: '', metodoPago: '', cuotas: '', comentarios: '',
        expectativas: ''
      };

      let currentSection = '';
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (trimmedLine === 'INFORMACIÓN DE LA EMPRESA:') currentSection = 'empresa';
        else if (trimmedLine === 'DESCRIPCIÓN DEL NEGOCIO:') currentSection = 'descripcion';
        else if (trimmedLine === 'PROPUESTA ÚNICA DE VALOR:') currentSection = 'propuesta';
        else if (trimmedLine === 'DETALLES DEL PROYECTO:') currentSection = 'detalles';
        else if (trimmedLine === 'ESPECIFICACIONES DEL SERVICIO:') currentSection = 'especificaciones';
        else if (trimmedLine === 'COMUNICACIÓN:') currentSection = 'comunicacion';
        else if (trimmedLine === 'INFORMACIÓN DE PAGO:') currentSection = 'pago';
        else if (trimmedLine === 'COMENTARIOS ADICIONALES:') currentSection = 'comentarios';
        else if (trimmedLine.startsWith('- ')) {
          const [campo, ...valorParts] = trimmedLine.substring(2).split(': ');
          const valor = valorParts.join(': ');
          
          // Mapear los campos que realmente vienen del formulario
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
            if (currentSection === 'comunicacion') parsed.metodoComunicacion = valor;
            else if (currentSection === 'pago') parsed.metodoPago = valor;
          }
          else if (campo === 'Horario') parsed.horario = valor;
          else if (campo === 'Frecuencia') parsed.frecuencia = valor;
          else if (campo === 'Cuotas') parsed.cuotas = valor;
        } else {
          if (currentSection === 'descripcion') parsed.descripcionNegocio += trimmedLine + ' ';
          else if (currentSection === 'propuesta') parsed.propuestaValor += trimmedLine + ' ';
          else if (currentSection === 'especificaciones') parsed.especificaciones += trimmedLine + '\n';
          else if (currentSection === 'comentarios') parsed.comentarios += trimmedLine + ' ';
        }
      }
      
      return parsed;
    }

    const parsedData = parseMessageToHTML(formData.mensaje);

    const htmlContent = `
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

            ${parsedData.descripcionNegocio && parsedData.descripcionNegocio.trim() ? `
            <div class="description-box">
                <h3>📝 Descripción del Negocio</h3>
                <div class="description-text">${parsedData.descripcionNegocio.trim()}</div>
            </div>
            ` : ''}

            ${parsedData.propuestaValor && parsedData.propuestaValor.trim() ? `
            <div class="description-box">
                <h3>🎯 Propuesta Única de Valor</h3>
                <div class="description-text">${parsedData.propuestaValor.trim()}</div>
            </div>
            ` : ''}

            <div class="section">
                <h2>💼 Detalles del Proyecto</h2>
                <div class="field"><strong>Servicio:</strong><span>${formData.servicio}</span></div>
                <div class="field"><strong>Presupuesto:</strong><span>${formData.presupuesto}</span></div>
                <div class="field"><strong>Fecha Limite:</strong><span>${parsedData.timeline || 'No especificado'}</span></div>
                <div class="field"><strong>Expectativas:</strong><span>${parsedData.expectativas || 'No especificado'}</span></div>
            </div>

            ${parsedData.especificaciones && parsedData.especificaciones.trim() ? `
            <div class="section">
                <h2>⚙️ Especificaciones del Servicio</h2>
                <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${parsedData.especificaciones.trim()}</div>
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
                <div class="field"><strong>Método seleccionado:</strong><span>${parsedData.metodoPago || 'No especificado'}</span></div>
                <div class="field"><strong>Cuotas:</strong><span>${parsedData.cuotas || 'No especificado'}</span></div>
            </div>

            ${parsedData.comentarios && parsedData.comentarios.trim() ? `
            <div class="description-box">
                <h3>💬 Comentarios Adicionales</h3>
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
</html>`;

    const emailResult = await resend.emails.send({
      from: 'UFFO Studios <onboarding@resend.dev>',
      to: ['somosuffo@gmail.com'],
      subject: `Nueva consulta de ${formData.servicio} - ${formData.empresa}`,
      html: htmlContent,
    });

    console.log('✅ Email enviado exitosamente. ID:', emailResult.data?.id);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email enviado correctamente',
      id: emailResult.data?.id,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Error enviando email:', error.message);
    console.error('Stack:', error.stack);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error enviando email',
      details: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}