"use client"

// import types and hooks
import type React from "react"
import { useState } from "react"

// import ui components and icons
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, User, MessageSquare, Send, Check, X, AlertCircle } from "lucide-react"

// import framer motion for animations
import { motion, AnimatePresence } from "framer-motion"

// props type for contact form to handle closing
interface ContactFormProps {
  onClose: () => void
}

export function ContactForm({ onClose }: ContactFormProps) {
  // form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  // track form submission and error states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // update input field state on change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // clear error if user begins editing
    if (error) setError(null)
  }

  // handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      setIsSubmitting(false)
      setIsSubmitted(true)

      // close form after short delay (3 seconds)
      setTimeout(() => {
        setIsClosing(true)
        setTimeout(() => {
          onClose()
          setIsSubmitted(false)
          setIsClosing(false)
          setFormData({ name: "", email: "", message: "" })
        }, 300)
      }, 3000)
    } catch (error) {
      setIsSubmitting(false)
      setError(error instanceof Error ? error.message : "Failed to send message. Please try again.")
    }
  }

  // close form instantly
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
      setError(null)
    }, 300)
  }

  // check if all form fields are filled out
  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim()

  // show success animation if form was submitted
  if (isSubmitted) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <Card className="bg-black border-2 border-emerald-400">
            <CardContent className="pt-6 text-center">
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 bg-emerald-400 rounded-full flex items-center justify-center"
                >
                  <Check className="w-8 h-8 text-black" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-semibold text-white"
                >
                  Message Sent!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-300"
                >
                  Thank you for reaching out. I'll get back to you soon.
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    )
  }

  // main contact form ui
  return (
    <Card className="bg-black border-2 border-gray-700 relative">
      {/* close button in top corner */}
      <motion.button
        onClick={handleClose}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="absolute top-4 right-4 w-8 h-8 border-2 border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:border-emerald-400 hover:text-emerald-400 transition-colors duration-300"
      >
        <X className="w-4 h-4" />
      </motion.button>

      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center">
          <Mail className="w-6 h-6 mr-3 text-emerald-400" />
          Contact Me
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* error message if submit fails */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg flex items-center space-x-2"
          >
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm">{error}</span>
          </motion.div>
        )}

        {/* contact form fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* name input */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
              placeholder="Enter your full name"
            />
          </motion.div>

          {/* email input */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
              placeholder="Enter your email address"
            />
          </motion.div>

          {/* message textarea */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
              placeholder="Tell me about your project or inquiry..."
            />
          </motion.div>

          {/* submit button with loading state */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-emerald-400 text-black hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending...
                </div>
              ) : (
                <motion.div
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </motion.div>
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}
