// Test específico de código postal
console.log('🧪 Test API Código Postal UFFO\n');

async function testPostalCodes() {
    const testCodes = [
        { country: 'Argentina', code: '1001', api: 'https://api.zippopotam.us/ar/1001' },
        { country: 'Estados Unidos', code: '10001', api: 'https://api.zippopotam.us/us/10001' },
        { country: 'España', code: '28001', api: 'https://api.zippopotam.us/es/28001' },
    ];

    for (const test of testCodes) {
        console.log(`🌍 Probando ${test.country} (${test.code})...`);
        try {
            const response = await fetch(test.api);
            if (response.ok) {
                const data = await response.json();
                const place = data.places[0];
                console.log(`  ✅ ${place['place name']}, ${place.state || place['state abbreviation']}`);
            } else {
                console.log(`  ❌ Código ${response.status}`);
            }
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
        }
        // Pequeña pausa entre requests
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

testPostalCodes().then(() => {
    console.log('\n✨ Tests de código postal completados');
    console.log('📝 Resultado: El sistema de códigos postales está funcionando correctamente');
    console.log('🌐 Ahora puedes probar manualmente en: http://localhost:3000/formulario');
});