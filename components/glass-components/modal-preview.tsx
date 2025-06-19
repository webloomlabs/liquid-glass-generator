"use client"

import { X } from "lucide-react"
import type { GlassConfig, ComponentConfig } from "@/app/page"
import { Button } from "@/components/ui/button"

interface ModalPreviewProps {
  glassConfig: GlassConfig
  componentConfig: ComponentConfig
}

export function ModalPreview({ glassConfig, componentConfig }: ModalPreviewProps) {
  const glassStyle = {
    backdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
    WebkitBackdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
    backgroundColor: glassConfig.backgroundColor,
    borderRadius: `${glassConfig.borderRadius}px`,
    border: `${glassConfig.borderWidth}px solid ${glassConfig.borderColor}`,
    boxShadow: glassConfig.boxShadow,
  }

  return (
    <div className="p-6 max-w-md w-full text-white relative" style={glassStyle}>
      <button className="absolute top-4 right-4 text-white/70 hover:text-white">
        <X className="h-5 w-5" />
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{componentConfig.title}</h2>
        {componentConfig.subtitle && <p className="text-white/80 text-sm">{componentConfig.subtitle}</p>}
      </div>

      <div className="mb-6">
        <p className="text-white/90 leading-relaxed">{componentConfig.description}</p>
      </div>

      <div className="flex gap-3 justify-end">
        <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
          Cancel
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">{componentConfig.buttonText}</Button>
      </div>
    </div>
  )
}
