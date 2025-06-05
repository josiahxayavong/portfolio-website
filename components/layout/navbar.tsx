"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Home, Briefcase, GraduationCap, Mail } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { AnimatePresence, motion } from "framer-motion"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/education", label: "Education", icon: GraduationCap },
  ]

  return (
    <>
      {/* Main Navigation */}
      <header className="bg-black sticky top-0 z-50 transition-all duration-300">
        <nav className="container mx-auto px-4 md:px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 border-2 border-white rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">JX</span>
              </div>
            </Link>

            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group text-white font-medium text-lg transition-colors hover:text-white"
                >
                  <span className="relative z-10">{link.label}</span>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="absolute inset-0 bg-emerald-400 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom -z-10"></div>
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowContactForm(true)}
            className="border-2 border-white px-6 py-2 rounded-lg text-white font-medium hover:bg-emerald-400 hover:border-emerald-400 hover:text-black transition-colors duration-300"
          >
            Contact Me
          </button>
        </nav>
      </header>

      {/* Sticky Navigation (appears on scroll) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-emerald-400 shadow-lg">
          <nav className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-base">JX</span>
                </div>
              </Link>

              <div className="hidden md:flex space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative group font-medium text-lg transition-colors ${
                      pathname === link.href ? "text-black" : "text-black hover:text-black"
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {pathname === link.href && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowContactForm(true)}
              className="border-2 border-black px-6 py-2 rounded-lg text-black font-medium hover:bg-black hover:text-emerald-400 transition-colors duration-300"
            >
              Contact Me
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-black border border-gray-700 rounded-2xl p-4">
          <div className="flex justify-around">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  pathname === link.href ? "text-emerald-400" : "text-gray-400 hover:text-white"
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            ))}
            <button
              onClick={() => setShowContactForm(true)}
              className="flex flex-col items-center space-y-1 p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-xs font-medium">Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Overlay with Animation */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3,
              }}
              className="w-full max-w-md"
            >
              <ContactForm onClose={() => setShowContactForm(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
