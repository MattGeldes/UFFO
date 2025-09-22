// Test completo del endpoint de PDF - Versión corregida
const fs = require('fs');
const path = require('path');

// Datos de prueba
const testFormData = {
  selectedService: 'website',
  companyName: 'Empresa Test PDF',
  contactName: 'María González',
  email: 'maria@test.com',
  phone: '+54 11 9876-5432',
  industry: 'E-commerce',
  websiteOrSocial: 'https://test-ecommerce.com',
  companyDescription: 'Tienda online de productos artesanales',
  operatingTime: '3 años',
  uniqueSellingPoint: 'Productos únicos hechos a mano',
  budget: '$3000 - $5000',
  deadline: '2-3 meses',
  decisionMaker: 'Directora General',
  communicationMethod: 'whatsapp',
  designExpectations: 'Un sitio web moderno con e-commerce integrado',
  contactSchedule: 'tarde',
  contactFrequency: 'quincenal',
  businessLocation: 'argentina',
  province: 'Córdoba',
  city: 'Córdoba Capital',
  conditionalAnswers: {
    websiteType: 'E-commerce',
    websitePages: '10-15 páginas',
    websiteFeatures: 'Carrito de compras, Blog, Galería',
    websiteStyle: 'Moderno y elegante',
    mobileOptimized: 'Sí, responsive'
  },
  additionalComments: 'Necesitamos integrar con MercadoPago y otros medios de pago locales',
  consentGiven: true,
  paymentPreference: 'transferencia',
  paymentInstallments: 3
};

async function testPDFEndpoint() {
  console.log('🧪 Iniciando test del endpoint PDF...\n');
  
  try {
    // Importar fetch dinámicamente
    const fetch = (await import('node-fetch')).default;
    
    console.log('📄 Enviando solicitud al endpoint /api/generate-pdf...');
    
    const response = await fetch('http://localhost:3002/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testFormData),
    });

    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    // Verificar headers
    const contentType = response.headers.get('content-type');
    const contentDisposition = response.headers.get('content-disposition');
    
    console.log(`📋 Content-Type: ${contentType}`);
    console.log(`📎 Content-Disposition: ${contentDisposition}`);

    if (contentType !== 'application/pdf') {
      throw new Error(`Tipo de contenido incorrecto: ${contentType}`);
    }

    // Obtener el PDF como buffer
    const pdfBuffer = await response.buffer();
    const pdfSize = pdfBuffer.byteLength;
    
    console.log(`📏 Tamaño del PDF: ${(pdfSize / 1024).toFixed(2)} KB`);

    if (pdfSize < 1000) {
      throw new Error('El PDF parece ser demasiado pequeño');
    }

    // Guardar el PDF para verificación manual
    const outputPath = path.join(__dirname, 'test-output-pdf.pdf');
    fs.writeFileSync(outputPath, pdfBuffer);
    
    console.log(`💾 PDF guardado en: ${outputPath}`);
    console.log('\n✅ Test del endpoint PDF completado exitosamente!');
    
    // Verificar que el archivo es un PDF válido
    const pdfHeader = pdfBuffer.slice(0, 4).toString();
    if (pdfHeader === '%PDF') {
      console.log('✅ Formato PDF válido confirmado');
    } else {
      console.log('⚠️  Advertencia: El archivo no parece ser un PDF válido');
    }

  } catch (error) {
    console.error('❌ Error durante el test del PDF:');
    console.error('Mensaje:', error.message);
  }
}

// Verificar que el servidor esté corriendo
async function checkServer() {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('http://localhost:3002');
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Ejecutar el test
async function runTest() {
  console.log('🚀 UFFO Studios - Test del Endpoint PDF\n');
  console.log('==================================================\n');
  
  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log('❌ Error: El servidor de desarrollo no está corriendo en puerto 3002');
    console.log('Ejecuta "npm run dev" primero\n');
    return;
  }
  
  console.log('✅ Servidor de desarrollo detectado en puerto 3002\n');
  await testPDFEndpoint();
}

runTest();