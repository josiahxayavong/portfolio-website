/* import react types and metadata definition for next.js */
import type React from "react"
import type { Metadata } from "next"

/* import google font and global styles */
import { Inter } from "next/font/google"
import "./globals.css"

/* import navbar, theme provider, and vercel analytics */
import { Navbar } from "@/components/layout/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"

/* configure inter font with latin character subset */
const inter = Inter({ subsets: ["latin"] })

/* define metadata for seo and browser previews */
export const metadata: Metadata = {
  title: "Josiah Xayavong | Portfolio",
  description:
    "Portfolio of Josiah Xayavong, a Computer Information Systems professional with experience in web development, robot engineering, and cloud computing.",
  generator: 'v0.dev'
}

/* root layout component used to wrap all pages */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-gray-200 antialiased`}>
        {/* apply theme provider and enable dark mode by default */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* site-wide navigation bar */}
          <Navbar />

          {/* render main content from page components */}
          <main className="pb-24 md:pb-8">{children}</main>
          
          {/* include analytics tracking from vercel */}
          <Analytics />

          {/* site-wide footer with attribution */}
          <footer className="text-center text-gray-500 py-8 border-t border-gray-800 mt-12">
            <p>&copy; {new Date().getFullYear()} Josiah Xayavong. All rights reserved.</p>
            <p className="mt-1 text-sm">Built with Next.js and Tailwind CSS.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
