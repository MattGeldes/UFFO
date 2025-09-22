// Script de prueba realista para el sistema de email
// Simula un formulario completo como el que genera el sistema

const testFormData = {
  nombre: "Matías Geldes",
  email: "geldesmatias@gmail.com",
  telefono: "+54 11 1234-5678",
  empresa: "Innovación Digital SA",
  servicio: "Identidad Visual",
  presupuesto: "50k-100k",
  mensaje: `CONSULTA DE Identidad Visual

INFORMACIÓN DE LA EMPRESA:
- Empresa: Innovación Digital SA
- Industria: Tecnología y Software
- Tiempo operando: 3 años
- Ubicación: Buenos Aires, Buenos Aires, Argentina
- Website/Redes: www.innovaciondigital.com.ar

DESCRIPCIÓN DEL NEGOCIO:
Somos una empresa de desarrollo de software que se especializa en soluciones tecnológicas para PyMEs. Ofrecemos desde aplicaciones web hasta sistemas de gestión empresarial, siempre enfocados en la innovación y la eficiencia.

PROPUESTA ÚNICA DE VALOR:
Combinamos tecnología de vanguardia con un entendimiento profundo de las necesidades locales, ofreciendo soluciones que realmente impactan en el crecimiento de nuestros clientes.

DETALLES DEL PROYECTO:
- Presupuesto: 50k-100k
- Timeline: 1 a 2 meses
- Expectativas de diseño: Buscamos una identidad visual moderna, profesional y que transmita confianza tecnológica

ESPECIFICACIONES DEL SERVICIO:
{
  "emotions": "profesional, innovador, confiable",
  "colors": "azul corporativo, gris tecnológico, verde acento",
  "applications": "papelería, sitio web, redes sociales, presentaciones",
  "communicationTone": "profesional pero cercano",
  "revisions": 3
}

COMUNICACIÓN:
- Responsable de decisiones: Matías Geldes (Director General)
- Método preferido: video
- Horario: afternoon
- Frecuencia: weekly

INFORMACIÓN DE PAGO:
- Método preferido: installments
- Cuotas: 3

COMENTARIOS ADICIONALES:
Necesitamos tener todo listo para el próximo trimestre ya que tenemos una campaña de marketing planificada. También nos interesaría explorar la posibilidad de expandir el proyecto a incluir material promocional.
    `,
  acepta_terminos: true,
  enviar_copia_cliente: true
};

async function testEmailRealista() {
  try {
    console.log('🧪 Iniciando prueba realista del sistema de email...');
    console.log('📧 Email de prueba:', testFormData.email);
    console.log('🏢 Empresa:', testFormData.empresa);
    console.log('🎨 Servicio:', testFormData.servicio);
    
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testFormData),
    });

    const result = await response.json();
    
    console.log('\n📊 Resultado de la prueba:');
    console.log('Status Code:', response.status);
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('\n✅ ¡Prueba exitosa!');
      console.log('📧 Email enviado a UFFO Studios:', result.emailId);
      
      if (result.clientEmailSent && result.clientEmailId) {
        console.log('📧 Email de confirmación enviado al cliente:', result.clientEmailId);
        console.log(`\n📬 Revisa tu bandeja de entrada en: ${testFormData.email}`);
        console.log('   - Deberías recibir un email de confirmación de UFFO Studios');
        console.log('   - El email debería tener formato HTML profesional');
        console.log('   - Revisa también la carpeta de SPAM por si acaso');
      } else {
        console.log('⚠️ No se pudo enviar la copia al cliente');
        if (result.clientEmailError) {
          console.log('Error:', result.clientEmailError);
        }
      }
      
      console.log('\n📋 Para verificar el formato:');
      console.log('1. Revisa el email en UFFO Studios (somosuffo@gmail.com)');
      console.log('2. Confirma que el email del cliente se vea bien');
      console.log('3. Verifica que los datos se parseen correctamente');
      
    } else {
      console.log('❌ Error en la prueba:', result.error);
      if (result.details) {
        console.log('Detalles:', result.details);
      }
    }
    
  } catch (error) {
    console.error('❌ Error durante la prueba:', error.message);
    
    console.log('\n💡 Posibles soluciones:');
    console.log('   - Verificar que el servidor esté ejecutándose en puerto 3001');
    console.log('   - Confirmar que la variable RESEND_API_KEY esté configurada');
    console.log('   - Revisar la configuración del dominio en Resend');
  }
}

// Ejecutar la prueba
testEmailRealista();