// Test completo del sistema Resend con PDF adjunto
require('dotenv').config({ path: '.env.local' });

async function testCompleteResendWithPDF() {
  console.log('🧪 Iniciando test completo de Resend con PDF...');
  
  // Importar dinámicamente las funciones desde email-actions
  const emailModule = await import('./lib/actions/email-actions.ts');
  const { sendEmailWithResend } = emailModule;
  
  // Datos de prueba del formulario
  const testFormData = {
    companyName: 'Test Company UFFO',
    contactName: 'María González',
    email: 'maria@testcompany.com',
    phone: '+1234567890',
    selectedService: 'brand',
    budget: '$5,000 - $10,000',
    timeline: '2-3 meses',
    projectDescription: 'Necesitamos renovar completamente nuestra identidad de marca, incluyendo logo, colores, tipografía y manual de marca.',
    specialRequirements: 'El diseño debe ser moderno pero conservar elementos que reflejen nuestra tradición de 20 años en el mercado.',
    targetAudience: 'Profesionales de 25-45 años con alto poder adquisitivo',
    currentChallenges: 'Nuestra imagen actual se ve desactualizada comparada con la competencia',
    platformPreferences: ['website', 'social-media', 'print'],
    additionalServices: ['photography', 'copywriting']
  };

  try {
    console.log('📝 Datos de prueba:', {
      empresa: testFormData.companyName,
      contacto: testFormData.contactName,
      servicio: testFormData.selectedService
    });

    console.log('🚀 Enviando email con PDF...');
    const result = await sendEmailWithResend(testFormData);

    if (result.success) {
      console.log('🎉 ¡Test exitoso!');
      console.log('✅ Email enviado con ID:', result.emailId);
      console.log('📧 Proveedor usado:', result.provider);
      console.log('🎯 Revisa tu bandeja de entrada en somosuffo@gmail.com');
      console.log('📎 El email debería incluir un PDF adjunto con la propuesta');
    } else {
      console.error('❌ Test falló:', result.error);
    }

  } catch (error) {
    console.error('❌ Error en test completo:', error);
  }
}

testCompleteResendWithPDF();