// Test de la nueva API mejorada de códigos postales argentinos
const { getLocationByPostalCode } = require('./lib/services/location-service.ts');

console.log('🧪 Test API Códigos Postales Argentinos - MEJORADA\n');

async function testArgentinaCodes() {
    const testCodes = [
        { code: '5600', expected: 'San Rafael, Mendoza' },
        { code: '1001', expected: 'Buenos Aires, CABA' },
        { code: '5000', expected: 'Córdoba, Córdoba' },
        { code: '2000', expected: 'Rosario, Santa Fe' },
        { code: '7600', expected: 'Mar del Plata, Buenos Aires' },
    ];

    for (const test of testCodes) {
        console.log(`🌍 Probando ${test.code} (esperado: ${test.expected})...`);
        try {
            const result = await getLocationByPostalCode(test.code);
            if (result.success) {
                console.log(`  ✅ ${result.city}, ${result.state}`);
                if (test.code === '5600' && result.city === 'San Rafael') {
                    console.log(`  🎉 ¡CORREGIDO! San Rafael detectado correctamente`);
                }
            } else {
                console.log(`  ❌ Error: ${result.error}`);
            }
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

testArgentinaCodes().then(() => {
    console.log('\n✨ Test completado');
    console.log('📝 El código 5600 ahora debería mostrar "San Rafael, Mendoza" correctamente');
});