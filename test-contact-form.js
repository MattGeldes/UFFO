// Script de prueba para el endpoint de envío de email
// Ejecutar con: node test-contact-form.js

const testFormData = {
  nombre: "Juan Pérez",
  email: "ruculoide01@gmail.com", // Email del cliente para prueba
  telefono: "+54 11 1234-5678",
  empresa: "Empresa Test",
  servicio: "Diseño Web",
  presupuesto: "$1,500 - $5,000 USD",
  mensaje: "Este es un mensaje de prueba para verificar que el formulario de contacto funcione correctamente.",
  acepta_terminos: true,
  enviar_copia_cliente: true // Solicitar copia al cliente
};

async function testContactForm() {
  try {
    console.log('🧪 Iniciando prueba del formulario de contacto...');
    console.log('📧 Datos de prueba:', JSON.stringify(testFormData, null, 2));
    
    const response = await fetch('http://localhost:3001/api/send-email', {
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
      console.log('✅ ¡Prueba exitosa! El email se envió correctamente.');
      console.log('📧 Email ID (UFFO):', result.emailId);
      
      if (result.clientEmailSent) {
        console.log('📧 Email de confirmación enviado al cliente:', result.clientEmailId);
      } else {
        console.log('ℹ️ No se envió copia al cliente');
      }
    } else {
      console.log('❌ Error en la prueba:', result.error);
      if (result.details) {
        console.log('🔍 Detalles:', result.details);
      }
    }
    
  } catch (error) {
    console.error('❌ Error durante la prueba:', error.message);
    console.log('\n💡 Asegúrate de que:');
    console.log('   - El servidor Next.js esté ejecutándose (npm run dev)');
    console.log('   - La variable RESEND_API_KEY esté configurada en .env.local');
    console.log('   - El endpoint /api/send-email esté disponible');
  }
}

// Ejecutar la prueba
testContactForm();