import ContactForm from "@/components/contact-form"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export const metadata = {
  title: "Contacto - UFFO Studios",
  description: "Contáctanos para comenzar tu próximo proyecto. Estamos listos para hacer realidad tus ideas.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ContactForm />
      <Footer />
    </main>
  )
}
