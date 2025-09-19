"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaSync, FaShieldAlt } from "react-icons/fa"

interface CaptchaProps {
  onVerify: (isVerified: boolean) => void
  isVerified: boolean
}

export function Captcha({ onVerify, isVerified }: CaptchaProps) {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [error, setError] = useState("")

  const generateCaptcha = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1
    const newNum2 = Math.floor(Math.random() * 10) + 1
    setNum1(newNum1)
    setNum2(newNum2)
    setUserAnswer("")
    setError("")
    onVerify(false)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleVerify = () => {
    const correctAnswer = num1 + num2
    const userAnswerNum = Number.parseInt(userAnswer)

    if (userAnswerNum === correctAnswer) {
      onVerify(true)
      setError("")
    } else {
      setError("Respuesta incorrecta. Inténtalo de nuevo.")
      generateCaptcha()
    }
  }

  const handleInputChange = (value: string) => {
    setUserAnswer(value)
    if (error) setError("")
  }

  return (
    <Card className={`border-2 ${isVerified ? "border-green-500 bg-green-50" : "border-gray-300"}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <FaShieldAlt className={`w-5 h-5 ${isVerified ? "text-green-600" : "text-gray-600"}`} />
          <Label className="font-semibold">Verificación de Seguridad</Label>
        </div>

        {isVerified ? (
          <div className="text-center text-green-600 font-medium">✓ Verificación completada exitosamente</div>
        ) : (
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Resuelve la siguiente operación:</p>
              <div className="bg-gray-100 p-3 rounded-lg border-2 border-dashed border-gray-300">
                <span className="text-2xl font-bold text-gray-800">
                  {num1} + {num2} = ?
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Tu respuesta"
                  className={error ? "border-red-500" : ""}
                />
              </div>
              <Button onClick={handleVerify} disabled={!userAnswer}>
                Verificar
              </Button>
              <Button variant="outline" onClick={generateCaptcha} size="icon">
                <FaSync className="w-4 h-4" />
              </Button>
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
