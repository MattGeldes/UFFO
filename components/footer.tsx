import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaInstagram, 
  FaWhatsapp, 
  FaPinterest, 
  FaBehance 
} from "react-icons/fa"

export default function Footer() {
  const socialLinks = [
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/uffostudios",
      label: "Instagram",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/5492604002739",
      label: "WhatsApp",
    },
    {
      icon: FaEnvelope,
      href: "mailto:somosuffo@gmail.com",
      label: "Email",
    },
    {
      icon: FaPinterest,
      href: "https://www.pinterest.com/somosuffo",
      label: "Pinterest",
    },
    {
      icon: FaBehance,
      href: "https://www.behance.net/uffo",
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
    <footer id="footer" className="bg-[#181818] text-white mt-0">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/logo-uffo.svg" alt="UFFO Studios" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">UFFO Studios</h3>
            </div>

            <p className="text-base sm:text-lg leading-relaxed max-w-md text-gray-300 text-justify">
              Creatividad visual y diseño estratégico para marcas con propósito. Transformamos ideas en experiencias
              digitales memorables.
            </p>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-[#bfe220] flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">San Rafael, Mendoza, Argentina</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-[#bfe220] flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">+54 92604002739</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-[#bfe220] flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">somosuffo@gmail.com</span>
              </div>
            </div>

            <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-[#4e6e5d]/30 rounded-full flex items-center justify-center hover:bg-[#bfe220] hover:text-[#181818] transition-all duration-300 hover:scale-110 text-white"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-gray-300 hover:text-[#bfe220] transition-colors duration-300 flex items-center justify-center sm:justify-start group nav-link"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">Servicios</h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm sm:text-base text-gray-300 hover:text-[#bfe220] transition-colors duration-300 cursor-pointer flex items-center justify-center sm:justify-start group nav-link">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Card className="mt-8 sm:mt-12 lg:mt-16 bg-[#bfe220] text-[#181818] border-none">
          <CardContent className="p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">¿Listo para hacer tu idea realidad?</h3>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90 text-center sm:text-justify">
              Contáctanos y comencemos a trabajar juntos en tu próximo proyecto
            </p>
            <Link href="/formulario">
              <Button
                size="lg"
                className="bg-[#181818] text-white hover:bg-[#4e6e5d] font-semibold px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Comenzar Proyecto
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#4e6e5d]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 text-gray-300 text-center sm:text-left">
              <span className="text-xs sm:text-sm">Copyright © 2025</span>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Image src="/logo-uffo.svg" alt="UFFO Studios" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">UFFO Studios. Todos los derechos reservados.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
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
