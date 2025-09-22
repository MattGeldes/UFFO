// Servicio para obtener ubicación por código postal
// Soporta múltiples países usando diferentes APIs gratuitas

export interface LocationResult {
  success: boolean;
  country?: string;
  countryCode?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  error?: string;
}

// Base de datos local para códigos postales argentinos principales
const ARGENTINA_POSTAL_CODES: Record<string, { city: string; state: string }> = {
  // Buenos Aires - Capital Federal
  '1001': { city: 'Buenos Aires', state: 'Ciudad Autónoma de Buenos Aires' },
  '1002': { city: 'Buenos Aires', state: 'Ciudad Autónoma de Buenos Aires' },
  '1003': { city: 'Buenos Aires', state: 'Ciudad Autónoma de Buenos Aires' },
  '1004': { city: 'Buenos Aires', state: 'Ciudad Autónoma de Buenos Aires' },
  '1005': { city: 'Buenos Aires', state: 'Ciudad Autónoma de Buenos Aires' },
  
  // Buenos Aires - Provincia
  '1600': { city: 'San Isidro', state: 'Buenos Aires' },
  '1601': { city: 'San Isidro', state: 'Buenos Aires' },
  '1602': { city: 'Florida', state: 'Buenos Aires' },
  '1603': { city: 'Villa Martelli', state: 'Buenos Aires' },
  '1604': { city: 'Florida', state: 'Buenos Aires' },
  '1605': { city: 'Munro', state: 'Buenos Aires' },
  
  // Córdoba
  '5000': { city: 'Córdoba', state: 'Córdoba' },
  '5001': { city: 'Córdoba', state: 'Córdoba' },
  '5002': { city: 'Córdoba', state: 'Córdoba' },
  '5003': { city: 'Córdoba', state: 'Córdoba' },
  '5004': { city: 'Córdoba', state: 'Córdoba' },
  
  // Mendoza
  '5500': { city: 'Mendoza', state: 'Mendoza' },
  '5501': { city: 'Mendoza', state: 'Mendoza' },
  '5502': { city: 'Mendoza', state: 'Mendoza' },
  '5503': { city: 'Mendoza', state: 'Mendoza' },
  '5504': { city: 'Mendoza', state: 'Mendoza' },
  '5600': { city: 'San Rafael', state: 'Mendoza' }, // ¡CORRECCIÓN PARA TU CIUDAD!
  '5601': { city: 'San Rafael', state: 'Mendoza' },
  '5602': { city: 'San Rafael', state: 'Mendoza' },
  '5603': { city: 'San Rafael', state: 'Mendoza' },
  
  // Rosario - Santa Fe
  '2000': { city: 'Rosario', state: 'Santa Fe' },
  '2001': { city: 'Rosario', state: 'Santa Fe' },
  '2002': { city: 'Rosario', state: 'Santa Fe' },
  '2003': { city: 'Rosario', state: 'Santa Fe' },
  
  // Mar del Plata - Buenos Aires
  '7600': { city: 'Mar del Plata', state: 'Buenos Aires' },
  '7601': { city: 'Mar del Plata', state: 'Buenos Aires' },
  '7602': { city: 'Mar del Plata', state: 'Buenos Aires' },
  '7603': { city: 'Mar del Plata', state: 'Buenos Aires' },
  
  // Salta
  '4400': { city: 'Salta', state: 'Salta' },
  '4401': { city: 'Salta', state: 'Salta' },
  '4402': { city: 'Salta', state: 'Salta' },
  
  // Tucumán
  '4000': { city: 'San Miguel de Tucumán', state: 'Tucumán' },
  '4001': { city: 'San Miguel de Tucumán', state: 'Tucumán' },
  '4002': { city: 'San Miguel de Tucumán', state: 'Tucumán' },
  
  // La Plata - Buenos Aires
  '1900': { city: 'La Plata', state: 'Buenos Aires' },
  '1901': { city: 'La Plata', state: 'Buenos Aires' },
  '1902': { city: 'La Plata', state: 'Buenos Aires' },
};

// Mapeo de códigos de país ISO para APIs
const COUNTRY_CODES: Record<string, string> = {
  'Argentina': 'AR',
  'United States': 'US',
  'Brazil': 'BR',
  'Chile': 'CL',
  'Colombia': 'CO',
  'Mexico': 'MX',
  'Spain': 'ES',
  'United Kingdom': 'GB',
  'Canada': 'CA',
  'Germany': 'DE',
  'France': 'FR',
  'Italy': 'IT',
};

// Detectar país por formato de código postal
function detectCountryByPostalCode(postalCode: string): string | null {
  const cleaned = postalCode.replace(/\s+/g, '').toUpperCase();
  
  // Argentina: NNNN o CNNNNAAA (ej: 1001, C1001AAA)
  if (/^[C]?\d{4}([A-Z]{3})?$/.test(cleaned)) {
    return 'AR';
  }
  
  // Estados Unidos: NNNNN o NNNNN-NNNN
  if (/^\d{5}(-\d{4})?$/.test(cleaned)) {
    return 'US';
  }
  
  // Brasil: NNNNN-NNN
  if (/^\d{5}-?\d{3}$/.test(cleaned)) {
    return 'BR';
  }
  
  // España: NNNNN
  if (/^\d{5}$/.test(cleaned)) {
    return 'ES';
  }
  
  // Reino Unido: AN NAA, ANN NAA, ANA NAA, AANN NAA, etc.
  if (/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(cleaned)) {
    return 'GB';
  }
  
  // Canadá: ANA NAA
  if (/^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i.test(cleaned)) {
    return 'CA';
  }
  
  return null;
}

// API principal: Zippopotam.us (internacional)
async function getLocationFromZippopotam(postalCode: string, countryCode: string): Promise<LocationResult> {
  try {
    // Usar HTTPS en lugar de HTTP para evitar problemas de CORS
    const response = await fetch(`https://api.zippopotam.us/${countryCode}/${postalCode}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.places && data.places.length > 0) {
      const place = data.places[0];
      return {
        success: true,
        country: data.country,
        countryCode: data['country abbreviation'],
        state: place.state || place['state abbreviation'],
        city: place['place name'],
        postalCode: data['post code'],
      };
    }
    
    throw new Error('No location found');
  } catch (error) {
    return {
      success: false,
      error: `Zippopotam error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// API de respaldo: GeoNames (requiere username pero es gratuito)
async function getLocationFromGeoNames(postalCode: string, countryCode: string): Promise<LocationResult> {
  try {
    // Usar username demo para pruebas (en producción deberías registrarte)
    const username = 'demo';
    const response = await fetch(
      `https://secure.geonames.org/postalCodeSearchJSON?postalcode=${postalCode}&country=${countryCode}&maxRows=1&username=${username}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.postalCodes && data.postalCodes.length > 0) {
      const place = data.postalCodes[0];
      return {
        success: true,
        country: place.countryCode,
        countryCode: place.countryCode,
        state: place.adminName1,
        city: place.placeName,
        postalCode: place.postalCode,
      };
    }
    
    throw new Error('No location found');
  } catch (error) {
    return {
      success: false,
      error: `GeoNames error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// API específica para Argentina: Base de datos local + API respaldo
async function getLocationFromArgentina(postalCode: string): Promise<LocationResult> {
  try {
    const cleaned = postalCode.replace(/\s+/g, '').replace(/^C/, '').substring(0, 4);
    
    // Primero buscar en base de datos local
    if (ARGENTINA_POSTAL_CODES[cleaned]) {
      const location = ARGENTINA_POSTAL_CODES[cleaned];
      return {
        success: true,
        country: 'Argentina',
        countryCode: 'AR',
        state: location.state,
        city: location.city,
        postalCode: cleaned,
      };
    }
    
    // Si no está en la base local, usar Zippopotam como respaldo
    return await getLocationFromZippopotam(postalCode, 'AR');
  } catch (error) {
    return {
      success: false,
      error: `Argentina API error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// Función principal que intenta múltiples APIs
export async function getLocationByPostalCode(postalCode: string): Promise<LocationResult> {
  if (!postalCode || postalCode.trim().length === 0) {
    return {
      success: false,
      error: 'Código postal requerido',
    };
  }
  
  const cleanedPostalCode = postalCode.trim();
  const detectedCountry = detectCountryByPostalCode(cleanedPostalCode);
  
  if (!detectedCountry) {
    return {
      success: false,
      error: 'Formato de código postal no reconocido. Ingresa manualmente tu ubicación.',
    };
  }
  
  // Intentar múltiples APIs en orden de preferencia
  const apiAttempts = [
    () => getLocationFromZippopotam(cleanedPostalCode, detectedCountry),
    () => getLocationFromGeoNames(cleanedPostalCode, detectedCountry),
  ];
  
  // Para Argentina, intentar API específica primero
  if (detectedCountry === 'AR') {
    apiAttempts.unshift(() => getLocationFromArgentina(cleanedPostalCode));
  }
  
  for (const apiCall of apiAttempts) {
    try {
      const result = await apiCall();
      if (result.success) {
        return result;
      }
    } catch (error) {
      // Continuar con la siguiente API
      console.warn('API call failed, trying next:', error);
    }
  }
  
  return {
    success: false,
    error: 'No se pudo encontrar la ubicación para este código postal. Por favor, ingresa manualmente tu ciudad y provincia/estado.',
  };
}

// Función para validar código postal por país
export function validatePostalCode(postalCode: string): { isValid: boolean; country?: string; error?: string } {
  const cleaned = postalCode.replace(/\s+/g, '').toUpperCase();
  const country = detectCountryByPostalCode(cleaned);
  
  if (!country) {
    return {
      isValid: false,
      error: 'Formato de código postal no válido',
    };
  }
  
  return {
    isValid: true,
    country,
  };
}

// Lista de países soportados para el dropdown de fallback
export const SUPPORTED_COUNTRIES = [
  { code: 'AR', name: 'Argentina' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'BR', name: 'Brasil' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'MX', name: 'México' },
  { code: 'ES', name: 'España' },
  { code: 'GB', name: 'Reino Unido' },
  { code: 'CA', name: 'Canadá' },
  { code: 'DE', name: 'Alemania' },
  { code: 'FR', name: 'Francia' },
  { code: 'IT', name: 'Italia' },
  { code: 'OTHER', name: 'Otro país' },
];