"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { PreviewArea } from "@/components/preview-area"
import { CodePanel } from "@/components/code-panel"
import { ThemeProvider } from "@/components/theme-provider"

export interface GlassConfig {
  blur: number
  saturation: number
  opacity: number
  borderRadius: number
  backgroundColor: string
  borderColor: string
  borderWidth: number
  boxShadow: string
  backgroundImage: string
  backgroundType: "image" | "gradient"
  gradientFrom: string
  gradientTo: string
}

export interface ComponentConfig {
  type: "profile-card" | "product-card" | "login-form" | "notification-card" | "button-showcase" | "modal-preview"
  title: string
  subtitle: string
  description: string
  buttonText: string
  imageUrl: string
}

export default function Home() {
  const [glassConfig, setGlassConfig] = useState<GlassConfig>({
    blur: 16,
    saturation: 180,
    opacity: 75,
    borderRadius: 12,
    backgroundColor: "rgba(17, 25, 40, 0.75)",
    borderColor: "rgba(255, 255, 255, 0.125)",
    borderWidth: 1,
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backgroundImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    backgroundType: "image",
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
  })

  const [componentConfig, setComponentConfig] = useState<ComponentConfig>({
    type: "profile-card",
    title: "Charles McBrayer",
    subtitle: "UI/UX Designer",
    description: "Some quick example text to build on the card title and make up the bulk of the card content.",
    buttonText: "Follow",
    imageUrl: "/placeholder.svg?height=120&width=120",
  })

  const [activeCodeTab, setActiveCodeTab] = useState<"css" | "tailwind">("css")

  return (
    <ThemeProvider>
      <div className="h-screen bg-background text-foreground flex flex-col">
        <Header glassConfig={glassConfig} componentConfig={componentConfig} />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 border-r border-border bg-card">
            <Sidebar
              componentConfig={componentConfig}
              setComponentConfig={setComponentConfig}
              glassConfig={glassConfig}
              setGlassConfig={setGlassConfig}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Preview Area */}
            <div className="flex-1 p-8 overflow-auto">
              <PreviewArea glassConfig={glassConfig} componentConfig={componentConfig} />
            </div>

            {/* Code Panel */}
            <div className="w-96 border-l border-border bg-card">
              <CodePanel
                glassConfig={glassConfig}
                componentConfig={componentConfig}
                activeTab={activeCodeTab}
                setActiveTab={setActiveCodeTab}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
