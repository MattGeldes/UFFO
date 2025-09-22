# 🧪 GUÍA DE TESTING MANUAL - FORMULARIO UFFO

## 📋 ESTADO ACTUAL
- ✅ Servidor corriendo en: http://localhost:3000
- ✅ Formulario disponible en: http://localhost:3000/formulario
- ✅ Fix aplicado para error "Maximum update depth exceeded"

## 🎯 TESTS PASO A PASO

### 1️⃣ TEST CÓDIGO POSTAL AUTOMÁTICO 
**Objetivo**: Verificar que el código postal detecte automáticamente la ubicación

**Pasos**:
1. En el campo "Código Postal", escribir: `1001`
2. **Resultado esperado**: Aparece automáticamente "Buenos Aires, Ciudad Autónoma de Buenos Aires"
3. Limpiar campo y probar: `10001`
4. **Resultado esperado**: Aparece "New York, NY" (Estados Unidos)
5. Limpiar campo y probar: `28001`
6. **Resultado esperado**: Aparece "Madrid, Madrid" (España)

**✅ Marca como OK si las ubicaciones aparecen automáticamente**

### 2️⃣ TEST SELECTOR DEADLINE
**Objetivo**: Verificar que el selector de deadline funcione correctamente

**Pasos**:
1. Buscar el campo "¿Cuándo necesitas el trabajo terminado?"
2. Hacer clic en el dropdown
3. **Resultado esperado**: Ver opciones:
   - "Cuanto antes"
   - "1-2 semanas"
   - "1 mes"
   - "2-3 meses"
   - "No tengo prisa"
4. Seleccionar cualquier opción

**✅ Marca como OK si el dropdown funciona y se pueden seleccionar opciones**

### 3️⃣ TEST FIX BUCLE INFINITO
**Objetivo**: Verificar que NO aparezca más el error de React

**Pasos**:
1. Hacer clic en cualquier campo del formulario
2. Escribir texto en campos
3. Cambiar entre campos
4. Usar el selector de código postal
5. **Resultado esperado**: NO debe aparecer error "Maximum update depth exceeded"

**✅ Marca como OK si no hay errores en la consola del navegador**

### 4️⃣ TEST FORMULARIO COMPLETO
**Objetivo**: Completar todo el formulario con datos de prueba

**Datos de prueba**:
```
Nombre: Test Usuario UFFO
Email: geldesmatias@gmail.com
Teléfono: +54 11 1234-5678
Empresa: UFFO Testing
Código Postal: 1001 (debe autocompletar Buenos Aires)
Servicio: Diseño de Logo
Presupuesto: $30,000 - $50,000
Deadline: 1-2 semanas
Mensaje: Este es un test completo del formulario después de las mejoras implementadas.
✓ Acepto términos y condiciones
✓ Enviar copia al cliente
```

**✅ Marca como OK si todos los campos se completan correctamente**

### 5️⃣ TEST ENVÍO DE EMAIL
**Objetivo**: Verificar que el email se envíe correctamente

**Pasos**:
1. Completar formulario con datos del paso anterior
2. Hacer clic en "Enviar Solicitud"
3. **Resultado esperado**: 
   - Mensaje de éxito en pantalla
   - Email llega a: somosuffo@gmail.com
   - Email llega a: geldesmatias@gmail.com (copia cliente)
   - Formato HTML con estilos

**✅ Marca como OK si ambos emails llegan correctamente**

## 🎨 VERIFICACIONES VISUALES

### Colores UFFO
- ✅ Fondo negro (#181818)
- ✅ Botones verdes (#BFE220)
- ✅ Texto blanco sobre fondo oscuro

### Iconos
- ✅ React Icons (Fa*) consistentes
- ✅ Sin iconos de Lucide React

### Responsive
- ✅ Funciona en pantalla completa
- ✅ Funciona en móvil (puedes simular con F12 > Device Mode)

## ⚠️ PROBLEMAS CONOCIDOS RESUELTOS
- ❌ EmailJS + PDF roto → ✅ Resend API
- ❌ Bucle infinito React → ✅ useCallback fix
- ❌ Ubicación manual → ✅ Código postal automático
- ❌ Iconos mezclados → ✅ React Icons unificados

---

## 📝 RESULTADOS DEL TEST

**Completa esta checklist mientras pruebas**:

- [ ] Código postal automático funciona
- [ ] Selector deadline funciona  
- [ ] No hay errores de React
- [ ] Formulario completo se puede llenar
- [ ] Email se envía correctamente
- [ ] Colores UFFO aplicados
- [ ] Iconos consistentes
- [ ] Responsive funcional

**🎉 Si todas las casillas están marcadas: SISTEMA 100% FUNCIONAL**