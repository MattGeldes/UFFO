// Test simple para verificar el endpoint de email
const testEmailEndpoint = async () => {
  const testData = {
    nombre: "Juan Test",
    email: "test@example.com", 
    telefono: "+54 9 2604002739",
    empresa: "Empresa Test",
    servicio: "Diseño de Logo",
    presupuesto: "$30,000 - $50,000",
    mensaje: `CONSULTA DE Diseño de Logo
Fecha: ${new Date().toLocaleDateString('es-ES')}

INFORMACIÓN DE CONTACTO:
- Nombre: Juan Test
- Email: test@example.com
- Teléfono: +54 9 2604002739
- Empresa: Empresa Test

INFORMACIÓN DE LA EMPRESA:
- Industria: Tecnología
- Tiempo operando: 2 años
- Ubicación: Buenos Aires, Argentina
- Website/Redes: www.test.com

DESCRIPCIÓN DEL NEGOCIO:
Empresa de desarrollo de software especializada en soluciones web.

PROPUESTA ÚNICA DE VALOR:
Desarrollamos soluciones tecnológicas innovadoras para empresas modernas.

DETALLES DEL PROYECTO:
- Timeline: 2-3 meses
- Expectativas de diseño: Logo moderno y profesional

ESPECIFICACIONES DEL SERVICIO:
Logo corporativo con identidad visual completa.

COMUNICACIÓN:
- Responsable de decisiones: CEO
- Método preferido: Email
- Horario: 9:00 - 18:00
- Frecuencia: Semanal

INFORMACIÓN DE PAGO:
- Método preferido: Transferencia
- Cuotas: 2 cuotas

COMENTARIOS ADICIONALES:
Necesitamos el logo para el lanzamiento del próximo trimestre.`,
    acepta_terminos: true,
  }

  console.log('Enviando datos de test:', testData)
  
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })
    
    const result = await response.json()
    console.log('Respuesta del servidor:', result)
    
    if (result.success) {
      console.log('✅ Email enviado exitosamente!')
      console.log('ID del email:', result.id)
    } else {
      console.error('❌ Error enviando email:', result.error)
      console.error('Detalles:', result.details)
    }
  } catch (error) {
    console.error('❌ Error en la solicitud:', error)
  }
}

// Ejecutar el test cuando se cargue la página
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Iniciando test de email...')
    testEmailEndpoint()
  })
}

module.exports = { testEmailEndpoint }