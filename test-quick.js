// Test rápido de APIs
console.log('🧪 Test rápido del sistema UFFO\n');

// Test 1: API de código postal
async function testPostalCode() {
    console.log('1️⃣ Probando API de código postal...');
    try {
        const response = await fetch('https://api.zippopotam.us/ar/1001');
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Código postal argentino (1001):', data.places[0]['place name'], data.places[0]['state']);
        }
    } catch (error) {
        console.log('❌ Error API código postal:', error.message);
    }
}

// Test 2: Validación de funciones del servidor local
async function testLocalServer() {
    console.log('\n2️⃣ Verificando servidor local...');
    try {
        const response = await fetch('http://localhost:3000/formulario');
        if (response.ok) {
            console.log('✅ Servidor local respondiendo correctamente');
        }
    } catch (error) {
        console.log('❌ Servidor local no disponible:', error.message);
        console.log('💡 Asegúrate de que Next.js esté ejecutándose con "npm run dev"');
    }
}

// Ejecutar tests
async function runTests() {
    await testPostalCode();
    await testLocalServer();
    console.log('\n🎯 Tests completados. Continúa con test manual en el navegador.');
}

runTests();