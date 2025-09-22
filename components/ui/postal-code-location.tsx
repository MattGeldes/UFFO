"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FaMapMarkerAlt, FaSearch, FaSpinner, FaEdit } from "react-icons/fa"
import { getLocationByPostalCode, validatePostalCode, SUPPORTED_COUNTRIES, type LocationResult } from "@/lib/services/location-service"

interface PostalCodeLocationProps {
  onLocationChange: (location: {
    postalCode: string
    city: string
    state: string
    country: string
    isManual: boolean
  }) => void
  initialValues?: {
    postalCode?: string
    city?: string
    state?: string
    country?: string
  }
  className?: string
}

export function PostalCodeLocation({ onLocationChange, initialValues, className }: PostalCodeLocationProps) {
  const [postalCode, setPostalCode] = useState(initialValues?.postalCode || "")
  const [city, setCity] = useState(initialValues?.city || "")
  const [state, setState] = useState(initialValues?.state || "")
  const [country, setCountry] = useState(initialValues?.country || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isManualMode, setIsManualMode] = useState(false)
  const [autoDetected, setAutoDetected] = useState<LocationResult | null>(null)

  // Debounce para búsqueda automática
  useEffect(() => {
    if (postalCode.length >= 4 && !isManualMode) {
      const timeoutId = setTimeout(() => {
        handlePostalCodeLookup()
      }, 800) // Esperar 800ms después de que el usuario deje de escribir

      return () => clearTimeout(timeoutId)
    }
  }, [postalCode, isManualMode])

  // Notificar cambios al componente padre
  useEffect(() => {
    if (city && state && country) {
      onLocationChange({
        postalCode,
        city,
        state,
        country,
        isManual: isManualMode
      })
    }
  }, [postalCode, city, state, country, isManualMode])

  const handlePostalCodeLookup = async () => {
    if (!postalCode.trim()) return

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const validation = validatePostalCode(postalCode)
      if (!validation.isValid) {
        setError(validation.error || "Código postal no válido")
        setIsLoading(false)
        return
      }

      const result = await getLocationByPostalCode(postalCode)
      
      if (result.success) {
        setAutoDetected(result)
        setCity(result.city || "")
        setState(result.state || "")
        setCountry(result.country || "")
        setSuccess(`📍 Ubicación encontrada: ${result.city}, ${result.state}, ${result.country}`)
      } else {
        setError(result.error || "No se pudo encontrar la ubicación")
        setIsManualMode(true) // Cambiar a modo manual automáticamente
      }
    } catch (error) {
      setError("Error al buscar la ubicación. Ingresa manualmente.")
      setIsManualMode(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualToggle = () => {
    setIsManualMode(!isManualMode)
    setError("")
    setSuccess("")
    if (!isManualMode) {
      // Limpiar datos auto-detectados al cambiar a manual
      setCity("")
      setState("")
      setCountry("")
    }
  }

  const handlePostalCodeChange = (value: string) => {
    setPostalCode(value)
    setError("")
    setSuccess("")
    setAutoDetected(null)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Encabezado con toggle manual */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="w-4 h-4 text-[#BFE220]" />
          <Label className="text-sm font-medium">Ubicación del Negocio</Label>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleManualToggle}
          className="text-xs"
        >
          <FaEdit className="w-3 h-3 mr-1" />
          {isManualMode ? "Buscar por código postal" : "Ingresar manualmente"}
        </Button>
      </div>

      {!isManualMode ? (
        // Modo automático: Búsqueda por código postal
        <div className="space-y-3">
          <div className="relative">
            <Label htmlFor="postalCode" className="text-sm font-medium">
              Código Postal *
            </Label>
            <div className="relative mt-1">
              <Input
                id="postalCode"
                value={postalCode}
                onChange={(e) => handlePostalCodeChange(e.target.value)}
                placeholder="ej. 1001, 10001, M4B 1A1, etc."
                className="pr-10"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {isLoading ? (
                  <FaSpinner className="w-4 h-4 text-gray-400 animate-spin" />
                ) : (
                  <FaSearch className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Ingresa tu código postal para autocompletar la ubicación
            </p>
          </div>

          {/* Campos auto-completados (solo lectura) */}
          {(city || state || country) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Ciudad</Label>
                <div className="p-2 bg-muted rounded-md text-sm">
                  {city || "Detectando..."}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Provincia/Estado</Label>
                <div className="p-2 bg-muted rounded-md text-sm">
                  {state || "Detectando..."}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Modo manual: Formulario tradicional
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="manualPostalCode" className="text-sm font-medium">
                Código Postal
              </Label>
              <Input
                id="manualPostalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Código postal"
              />
            </div>
            <div>
              <Label htmlFor="manualCountry" className="text-sm font-medium">
                País *
              </Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el país" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_COUNTRIES.map((c) => (
                    <SelectItem key={c.code} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="manualCity" className="text-sm font-medium">
                Ciudad *
              </Label>
              <Input
                id="manualCity"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="ej. Buenos Aires, New York"
              />
            </div>
            <div>
              <Label htmlFor="manualState" className="text-sm font-medium">
                Provincia/Estado *
              </Label>
              <Input
                id="manualState"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="ej. Buenos Aires, California"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mensajes de estado */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="text-sm">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-[#BFE220] bg-[#BFE220]/10">
          <AlertDescription className="text-sm text-[#181818]">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {/* Información del país detectado */}
      {autoDetected && !isManualMode && (
        <div className="text-xs text-muted-foreground p-2 bg-muted rounded-md">
          <strong>País detectado:</strong> {autoDetected.country} ({autoDetected.countryCode})
        </div>
      )}
    </div>
  )
}