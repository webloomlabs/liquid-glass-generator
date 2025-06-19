import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Liquid Glass Generator - Create Beautiful Glassmorphism Components",
  description:
    "Generate stunning glassmorphism components with real-time preview and code export. Built with Next.js and Tailwind CSS.",
  keywords: "glassmorphism, glass effect, CSS generator, Tailwind CSS, Next.js, web components",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
