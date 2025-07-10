import type React from "react"
import type { Metadata } from "next"

// importing the Inter font from Google Fonts via next/font
import { Inter } from "next/font/google"

// importing global CSS styles
import "./globals.css"

// importing my main layout and provider components
import { Navbar } from "@/components/layout/navbar"
import { ThemeProvider } from "@/components/theme-provider"
// importing Vercel Analytics to track site performance
import { Analytics } from "@vercel/analytics/react"

// importing Suspense for handling loading states with server components
import { Suspense } from "react"

// initializing the Inter font with the 'latin' subset
const inter = Inter({ subsets: ["latin"] })

// this metadata object sets the default SEO title and description for the site.
// individual pages can override this if needed.
export const metadata: Metadata = {
  title: "Josiah Xayavong | Portfolio",
  description:
    "Portfolio of Josiah Xayavong, a Computer Information Systems professional with experience in web development, robot engineering, and cloud computing.",
}

// this is the main RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-gray-200 antialiased`}>
        {/* ThemeProvider handles the dark mode theme for the site */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* Navbar is included on every page */}
          <Navbar />
          {/* Suspense is used by React to handle loading states for server components */}
          <Suspense>
            <main className="pb-24 md:pb-8">{children}</main>
            {/* Footer is also included inside the transition so it fades with the page */}
            <footer className="text-center text-gray-500 py-8 border-t border-gray-800 mt-12">
              <p>&copy; {new Date().getFullYear()} Josiah Xayavong. All rights reserved.</p>
              <p className="mt-1 text-sm">Built with Next.js and Tailwind CSS.</p>
            </footer>
          </Suspense>
          {/* Vercel Analytics component */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
