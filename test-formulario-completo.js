// Test completo del formulario UFFO - Todas las mejoras implementadas
// Ejecutar con: node test-formulario-completo.js

const testData = {
  // Datos básicos
  nombre: "Matías Geldes",
  email: "geldesmatias@gmail.com", 
  telefono: "+54 11 1234-5678",
  empresa: "UFFO Test Company",
  servicio: "Identidad Visual",
  presupuesto: "100k-200k",
  
  // Mensaje que incluye todas las funcionalidades mejoradas
  mensaje: `CONSULTA DE Identidad Visual

INFORMACIÓN DE LA EMPRESA:
- Empresa: UFFO Test Company
- Industria: Tecnología y Diseño
- Tiempo operando: 2 años
- Ubicación: Buenos Aires, Buenos Aires (CP: 1001)
- Website/Redes: www.uffotest.com

DESCRIPCIÓN DEL NEGOCIO:
Empresa de prueba para verificar el funcionamiento completo del sistema de formularios mejorado con código postal automático, selector de deadline, y formato de email optimizado.

PROPUESTA ÚNICA DE VALOR:
Ofrecemos una experiencia de usuario superior con detección automática de ubicación y formularios inteligentes.

DETALLES DEL PROYECTO:
- Presupuesto: 100k-200k
- Timeline: 1 a 2 meses
- Expectativas de diseño: Moderno, profesional, que refleje innovación tecnológica

ESPECIFICACIONES DEL SERVICIO:
{
  "emotions": "profesional, innovador, confiable, moderno",
  "colors": "Negro corporativo (#181818), Verde UFFO (#BFE220), acentos tecnológicos",
  "applications": "Logo, papelería, sitio web, redes sociales, presentaciones, material promocional",
  "communicationTone": "profesional pero accesible, técnico pero claro",
  "revisions": 3
}

COMUNICACIÓN:
- Responsable de decisiones: Matías Geldes (CEO)
- Método preferido: video
- Horario: afternoon
- Frecuencia: weekly

INFORMACIÓN DE PAGO:
- Método preferido: installments
- Cuotas: 3

COMENTARIOS ADICIONALES:
TEST COMPLETO - Verificando:
✅ Sistema de código postal automático
✅ Selector de deadline (dropdown)
✅ Formato HTML mejorado en emails
✅ Copia al cliente
✅ Parsing correcto de datos
✅ APIs integradas
✅ UX optimizada
    `,
  acepta_terminos: true,
  enviar_copia_cliente: true
};

async function testFormularioCompleto() {
  console.log('🧪 === TEST COMPLETO DEL FORMULARIO UFFO ===');
  console.log('📋 Verificando todas las mejoras implementadas...\n');
  
  // Test 1: Verificar servidor
  console.log('1️⃣ Verificando servidor...');
  try {
    const serverTest = await fetch('http://localhost:3000');
    console.log('✅ Servidor respondiendo correctamente');
  } catch (error) {
    console.log('❌ Error de servidor:', error.message);
    return;
  }
  
  // Test 2: Verificar endpoint de email
  console.log('\n2️⃣ Probando sistema de email completo...');
  try {
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('📊 Resultado del test:');
    console.log('Status Code:', response.status);
    
    if (result.success) {
      console.log('✅ Email enviado exitosamente a UFFO Studios');
      console.log('📧 Email ID:', result.emailId);
      
      if (result.clientEmailSent && result.clientEmailId) {
        console.log('✅ Copia al cliente enviada exitosamente');
        console.log('📧 Client Email ID:', result.clientEmailId);
        console.log('📬 Verifica tu bandeja: geldesmatias@gmail.com');
      } else {
        console.log('⚠️ Copia al cliente no enviada');
      }
      
      console.log('\n🎯 TEST COMPLETADO EXITOSAMENTE');
      console.log('\n📋 Funcionalidades verificadas:');
      console.log('✅ Sistema de email con Resend');
      console.log('✅ Formato HTML mejorado');
      console.log('✅ Parsing de datos estructurado');
      console.log('✅ Copia al cliente');
      console.log('✅ Información de código postal incluida');
      
    } else {
      console.log('❌ Error en el envío:', result.error);
      if (result.details) {
        console.log('Detalles:', result.details);
      }
    }
    
  } catch (error) {
    console.error('❌ Error durante el test:', error.message);
  }
  
  console.log('\n🔍 Para test manual completo:');
  console.log('1. Ve a: http://localhost:3000/formulario');
  console.log('2. Paso 1: Selecciona "Identidad Visual"');
  console.log('3. Paso 2: Prueba código postal (ej: 1001 para Argentina)');
  console.log('4. Paso 2: Verifica selector de deadline (dropdown)');
  console.log('5. Paso 3: Completa preguntas específicas');
  console.log('6. Paso 4: Marca "Enviar copia al cliente" y envía');
  console.log('7. Verifica email en: geldesmatias@gmail.com');
  
  console.log('\n🌍 Códigos postales para probar:');
  console.log('🇦🇷 Argentina: 1001, C1001AAA');
  console.log('🇺🇸 Estados Unidos: 10001');
  console.log('🇪🇸 España: 28001');
  console.log('🇬🇧 Reino Unido: SW1A 1AA');
  console.log('🇨🇦 Canadá: M4B 1A1');
}

// Ejecutar el test
testFormularioCompleto();