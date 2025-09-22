// Test básico de Resend - Verificar conexión y envío simple
const { Resend } = require('resend');
require('dotenv').config({ path: '.env.local' });

async function testResendBasic() {
  console.log('🧪 Iniciando test básico de Resend...');
  
  // Verificar API key
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY no encontrada en .env.local');
    return;
  }
  
  console.log('✅ API key encontrada:', process.env.RESEND_API_KEY.substring(0, 10) + '...');
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    console.log('📧 Enviando email de prueba...');
    
    const { data, error } = await resend.emails.send({
      from: 'UFFO Studio <onboarding@resend.dev>', // Dominio temporal de Resend
      to: ['somosuffo@gmail.com'],
      subject: '🧪 Test de conexión - UFFO Studio',
      html: `
        <div style="font-family: 'Rubik', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #BFE220 0%, #052210 100%); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: #FDFDFF; margin: 0; font-size: 28px; font-weight: 700;">
              🎯 Test de Resend
            </h1>
            <p style="color: #FDFDFF; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
              Verificando conexión con UFFO Studio
            </p>
          </div>
          
          <div style="background: #FDFDFF; padding: 25px; border-radius: 8px; border-left: 4px solid #BFE220;">
            <h2 style="color: #181818; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
              ✅ Test exitoso
            </h2>
            <p style="color: #4e6e5d; line-height: 1.6; margin: 0; font-size: 14px;">
              Este email confirma que la integración con Resend está funcionando correctamente.
              El sistema está listo para enviar emails con PDF adjuntos.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <p style="color: #4e6e5d; font-size: 12px; margin: 0;">
              <strong style="color: #181818;">UFFO Studio</strong> • Test de sistema de emails
            </p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('❌ Error enviando email:', error);
      return;
    }

    console.log('✅ Email enviado exitosamente!');
    console.log('📬 ID del email:', data?.id);
    console.log('🎯 Revisa tu bandeja de entrada en somosuffo@gmail.com');

  } catch (error) {
    console.error('❌ Error en test de Resend:', error);
  }
}

testResendBasic();