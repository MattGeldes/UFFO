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
    <footer id="footer" className="bg-[#181818] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/logo-uffo.svg" alt="UFFO Studios" width={48} height={48} className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">UFFO Studios</h3>
            </div>

            <p className="text-lg leading-relaxed max-w-md text-gray-300 text-justify">
              Creatividad visual y diseño estratégico para marcas con propósito. Transformamos ideas en experiencias
              digitales memorables.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-[#bfe220] flex-shrink-0" />
                <span className="text-gray-300">San Rafael, Mendoza, Argentina</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-[#bfe220] flex-shrink-0" />
                <span className="text-gray-300">+54 92604002739</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-[#bfe220] flex-shrink-0" />
                <span className="text-gray-300">somosuffo@gmail.com</span>
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
            <p className="text-lg mb-6 opacity-90 text-justify">
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
              <Image src="/logo-uffo.svg" alt="UFFO Studios" width={20} height={20} className="w-5 h-5" />
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
