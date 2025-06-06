import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Josiah Xayavong | Portfolio",
  description:
    "Portfolio of Josiah Xayavong, a Computer Information Systems professional with experience in web development, robot engineering, and cloud computing.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-gray-200 antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="pb-24 md:pb-8">{children}</main>
          <footer className="text-center text-gray-500 py-8 border-t border-gray-800 mt-12">
            <p>&copy; {new Date().getFullYear()} Josiah Xayavong. All rights reserved.</p>
            <p className="mt-1 text-sm">Built with Next.js and Tailwind CSS.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
