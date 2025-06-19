"use client"

import Image from "next/image"
import type { GlassConfig, ComponentConfig } from "@/app/page"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  glassConfig: GlassConfig
  componentConfig: ComponentConfig
}

export function ProductCard({ glassConfig, componentConfig }: ProductCardProps) {
  const glassStyle = {
    backdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
    WebkitBackdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
    backgroundColor: glassConfig.backgroundColor,
    borderRadius: `${glassConfig.borderRadius}px`,
    border: `${glassConfig.borderWidth}px solid ${glassConfig.borderColor}`,
    boxShadow: glassConfig.boxShadow,
  }

  return (
    <div className="p-6 max-w-sm w-full text-white overflow-hidden" style={glassStyle}>
      <div className="mb-4">
        <Image
          src={componentConfig.imageUrl || "/placeholder.svg"}
          alt={componentConfig.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <h3 className="text-xl font-bold mb-2">{componentConfig.title}</h3>
      {componentConfig.subtitle && <p className="text-white/80 mb-3 font-semibold">{componentConfig.subtitle}</p>}

      <p className="text-white/70 text-sm mb-4 leading-relaxed">{componentConfig.description}</p>

      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">{componentConfig.buttonText}</Button>
    </div>
  )
}
