"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const scrollToFooter = () => {
    const footer = document.getElementById("footer")
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  const navLinks = [
    { href: "#about", label: "Nosotros" },
    { href: "#works", label: "Trabajos" },
    { href: "#faq", label: "Dudas" },
    { href: "#", label: "Contacto", onClick: scrollToFooter },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#181818] shadow-lg" : "bg-[#181818]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16" : "h-20"}`}
        >
          <Link
            href="/"
            className="flex items-center"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" })
              setIsOpen(false)
            }}
          >
            <Image src="/logo-uffo.svg" alt="UFFO Studios" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.onClick}
                className="text-white hover:text-[#bfe220] transition-colors duration-300 font-medium nav-link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:text-[#bfe220] hover:bg-transparent"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </nav>

        {isOpen && (
          <div className="md:hidden fixed inset-0 top-0 bg-[#181818] z-[9999] shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between p-6 border-b border-[#4e6e5d]/30">
              <Image src="/logo-uffo.svg" alt="UFFO Studios" width={32} height={32} className="w-8 h-8" />
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-[#bfe220] hover:bg-transparent"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="px-6 pt-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-4 text-white hover:text-[#bfe220] transition-colors duration-300 font-medium text-xl nav-link border-b border-[#4e6e5d]/20"
                  onClick={() => {
                    if (link.onClick) {
                      link.onClick()
                    } else {
                      setIsOpen(false)
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
