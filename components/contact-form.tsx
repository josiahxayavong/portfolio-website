/* this tells Next.js that this file must run on the client side.
it's required for handling form state with 'useState' and for
all the client-side animations with Framer Motion. */
"use client"

// importing React types and the 'useState' hook
import type React from "react"
import { useState } from "react"

// importing reusable UI components and icons
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, User, MessageSquare, Send, Check, X, AlertCircle } from "lucide-react"

// importing animation components from Framer Motion
import { motion, AnimatePresence } from "framer-motion"

// defining the props for this component, which includes a function to close the modal
interface ContactFormProps {
  onClose: () => void
}

// main ContactForm component
export function ContactForm({ onClose }: ContactFormProps) {
  // state to hold the form's input data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  // state to track the submission process (for showing a loading spinner)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // state to show the success message after submission
  const [isSubmitted, setIsSubmitted] = useState(false)
  // state to handle the closing animation
  const [isClosing, setIsClosing] = useState(false)
  // state to store any error messages from the server
  const [error, setError] = useState<string | null>(null)

  // updates the form data state as the user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError(null) // clear error when user starts typing again
  }

  // handles the form submission when the user clicks "Send"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // prevent default browser form submission
    setIsSubmitting(true)
    setError(null)

    try {
      // sends the form data to my API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      // on success, show the success message
      setIsSubmitting(false)
      setIsSubmitted(true)

      // automatically close the form after 3 seconds
      setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (error) {
      // on failure, show an error message
      setIsSubmitting(false)
      setError(error instanceof Error ? error.message : "Failed to send message. Please try again.")
    }
  }

  // handles the closing animation and calls the onClose prop
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
      setError(null)
    }, 300) // wait for animation to finish
  }

  // simple validation to enable/disable the submit button
  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim()

  // if the form is submitted successfully, render the success message
  if (isSubmitted) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <Card className="bg-black border-2 border-emerald-400">
            <CardContent className="pt-6 text-center">
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-16 h-16 bg-emerald-400 rounded-full flex items-center justify-center"
                >
                  <Check className="w-8 h-8 text-black" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white">Message Sent!</h3>
                <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    )
  }

  // otherwise, render the contact form
  return (
    <Card className="bg-black border-2 border-gray-700 relative">
      <motion.button
        onClick={handleClose}
        whileHover={{ scale: 1.1, rotate: 90 }}
        className="absolute top-4 right-4 w-8 h-8 border-2 border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:border-emerald-400 hover:text-emerald-400"
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
        {/* display an error message if one exists */}
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* form fields with motion effects */}
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
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
              placeholder="Enter your full name"
            />
          </motion.div>

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
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
              placeholder="Enter your email address"
            />
          </motion.div>

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
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 resize-none"
              placeholder="Tell me about your project or inquiry..."
            />
          </motion.div>

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
