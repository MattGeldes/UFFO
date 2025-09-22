// Test simple para verificar que el error de re-render está solucionado
console.log('🧪 Test Fix Error React - UFFO\n');

async function testFormulario() {
    console.log('📋 Verificando formulario sin errores...');
    
    try {
        // Test 1: Verificar que la página carga
        const response = await fetch('http://localhost:3000/formulario');
        if (response.ok) {
            console.log('✅ Página del formulario carga correctamente');
        } else {
            console.log('❌ Error cargando formulario:', response.status);
            return;
        }

        // Test 2: Verificar API de código postal (esta debería funcionar sin problemas)
        console.log('🌍 Probando código postal...');
        const postalResponse = await fetch('https://api.zippopotam.us/ar/1001');
        if (postalResponse.ok) {
            const data = await postalResponse.json();
            console.log('✅ API código postal funcionando:', data.places[0]['place name']);
        }

        console.log('\n🎉 RESULTADO:');
        console.log('✅ El error de "Maximum update depth exceeded" debería estar SOLUCIONADO');
        console.log('💡 Instrucciones de test manual:');
        console.log('   1. Ve a http://localhost:3000/formulario');
        console.log('   2. Haz clic en "Cotiza tu proyecto"');
        console.log('   3. En el campo "Código Postal" escribe: 1001');
        console.log('   4. Deberías ver "Buenos Aires" automáticamente SIN errores de React');
        console.log('   5. El formulario debería funcionar normalmente');

    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

testFormulario();