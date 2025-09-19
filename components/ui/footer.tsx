import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Instagram, MessageCircle, AtSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: MessageCircle, href: "#", label: "WhatsApp" },
    { icon: AtSign, href: "#", label: "Email" },
    {
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 7.728-.896 7.728-.379 2.655-1.407 3.119-2.752 3.119-1.39 0-2.326-.554-2.326-1.644 0-.694.405-1.235 1.004-1.235.509 0 .909.399.909.909 0 .524-.379.945-.848.945-.179 0-.329-.09-.329-.269 0-.149.12-.269.269-.269.089 0 .179.06.179.149 0 .06-.06.12-.12.12-.03 0-.06-.03-.06-.06 0-.03.03-.06.06-.06.06 0 .12.06.12.12 0 .179-.149.329-.329.329-.269 0-.509-.239-.509-.509 0-2.147 1.734-3.881 3.881-3.881 1.644 0 3.119 1.036 3.731 2.616z" />
        </svg>
      ),
      href: "#",
      label: "Pinterest",
    },
    {
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.5 3.5h9v17h-9z" />
          <path d="M8 4v16h8V4H8zm7 14.5h-6v-13h6v13z" />
        </svg>
      ),
      href: "#",
      label: "Behance",
    },
  ]

  const quickLinks = [
    { href: "#about", label: "Nosotros" },
    { href: "#works", label: "Trabajos" },
    { href: "#faq", label: "Dudas" },
    { href: "/contacto", label: "Contacto" },
  ]

  const services = [
    "Diseño Gráfico",
    "Diseño Web",
    "Diseño UX UI",
    "Foto Producto",
    "Impresión 3D",
    "SEO SEM",
    "Marketing Digital",
  ]

  return (
    <footer id="footer" className="bg-[#181818] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/logo-uffo.jpg" alt="UFFO Studios" width={48} height={48} className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">UFFO Studios</h3>
            </div>

            <p className="text-lg leading-relaxed max-w-md text-gray-300 text-center">
              Creatividad visual y diseño estratégico para marcas con propósito. Transformamos ideas en experiencias
              digitales memorables.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#bfe220] flex-shrink-0" />
                <span className="text-gray-300">San Rafael, Mendoza, Argentina</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#bfe220] flex-shrink-0" />
                <span className="text-gray-300">+54 926046666</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#bfe220] flex-shrink-0" />
                <span className="text-gray-300">@somosuffo</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-[#4e6e5d]/30 rounded-full flex items-center justify-center hover:bg-[#bfe220] hover:text-[#181818] transition-all duration-300 hover:scale-110 text-white"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#bfe220] transition-colors duration-300 flex items-center group nav-link"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Servicios</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300 hover:text-[#bfe220] transition-colors duration-300 cursor-pointer flex items-center group nav-link">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Card className="mt-16 bg-[#bfe220] text-[#181818] border-none">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">¿Listo para hacer tu idea realidad?</h3>
            <p className="text-lg mb-6 opacity-90 text-center">
              Contáctanos y comencemos a trabajar juntos en tu próximo proyecto
            </p>
            <Link href="/formulario">
              <Button
                size="lg"
                className="bg-[#181818] text-white hover:bg-[#4e6e5d] font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Comenzar Proyecto
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#4e6e5d]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>Copyright © 2025</span>
              <Image src="/logo-uffo.jpg" alt="UFFO Studios" width={20} height={20} className="w-5 h-5" />
              <span>UFFO Studios. Todos los derechos reservados.</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacidad"
                className="text-gray-300 hover:text-[#bfe220] transition-colors duration-300 nav-link"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-gray-300 hover:text-[#bfe220] transition-colors duration-300 nav-link"
              >
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
