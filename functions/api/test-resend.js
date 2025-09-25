import { Resend } from 'resend';

export async function onRequestPost({ request, env }) {
  try {
    // Test básico para verificar que Resend funciona
    console.log('🧪 Iniciando test de Resend...');
    
    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'RESEND_API_KEY no configurada' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const resend = new Resend(env.RESEND_API_KEY);
    
    const emailResult = await resend.emails.send({
      from: 'UFFO Test <onboarding@resend.dev>',
      to: ['somosuffo@gmail.com'],
      subject: '🧪 Test de Resend - UFFO Studios',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #181818;">🧪 Test de Email - UFFO Studios</h1>
          <p>Este es un email de prueba para verificar que Resend está funcionando correctamente.</p>
          <div style="background: #BFE220; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <strong>✅ Si recibes este email, Resend está configurado correctamente!</strong>
          </div>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>
      `,
    });

    console.log('✅ Test email enviado. ID:', emailResult.data?.id);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email de test enviado correctamente',
      id: emailResult.data?.id,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Error en test de Resend:', error.message);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error en test de email',
      details: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}