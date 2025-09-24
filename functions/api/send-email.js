import { Resend } from 'resend';

export async function onRequestPost({ request, env }) {
  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const formData = await request.json();

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
        industria: '', tiempoOperando: '', ubicacion: '', websiteRedes: '',
        descripcionNegocio: '', propuestaValor: '', timeline: '', expectativas: '',
        especificaciones: '', responsableDecisiones: '', metodoComunicacion: '',
        horario: '', frecuencia: '', metodoPago: '', cuotas: '', comentarios: ''
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
          
          if (campo === 'Industria') parsed.industria = valor;
          else if (campo === 'Tiempo operando') parsed.tiempoOperando = valor;
          else if (campo === 'Ubicación') parsed.ubicacion = valor;
          else if (campo === 'Website/Redes') parsed.websiteRedes = valor;
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
    <title>Nueva Consulta - UFFO Studios</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
        .header { background: #181818; color: #BFE220; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px 20px; }
        .section { margin-bottom: 25px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #BFE220; }
        .section h2 { color: #052210; margin: 0 0 15px 0; font-size: 18px; }
        .field { margin-bottom: 12px; display: flex; flex-wrap: wrap; }
        .field strong { font-weight: 700; color: #052210; min-width: 140px; margin-right: 10px; }
        .field span { color: #333; flex: 1; }
        .footer { background: #181818; color: #BFE220; padding: 20px; text-align: center; font-size: 14px; }
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

            <div class="section">
                <h2>💼 Detalles del Proyecto</h2>
                <div class="field"><strong>Servicio:</strong><span>${formData.servicio}</span></div>
                <div class="field"><strong>Presupuesto:</strong><span>${formData.presupuesto}</span></div>
                <div class="field"><strong>Timeline:</strong><span>${parsedData.timeline || 'No especificado'}</span></div>
                <div class="field"><strong>Términos:</strong><span>${formData.acepta_terminos ? 'Aceptados ✓' : 'No aceptados ✗'}</span></div>
            </div>
        </div>

        <div class="footer">
            <strong>UFFO Studios</strong><br>
            Consulta recibida el ${currentDate}
        </div>
    </div>
</body>
</html>`;

    const emailResult = await resend.emails.send({
      from: 'UFFO Studios <noreply@uffostudios.com>',
      to: ['somosuffo@gmail.com'],
      subject: `Nueva consulta de ${formData.servicio} - ${formData.empresa}`,
      html: htmlContent,
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email enviado correctamente',
      id: emailResult.data?.id 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error enviando email',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}