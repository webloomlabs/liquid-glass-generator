"use client"

import Image from "next/image"
import type { GlassConfig, ComponentConfig } from "@/app/page"
import { Button } from "@/components/ui/button"

interface ProfileCardProps {
  glassConfig: GlassConfig
  componentConfig: ComponentConfig
}

export function ProfileCard({ glassConfig, componentConfig }: ProfileCardProps) {
  const glassStyle = {
    backdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
    WebkitBackdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
    backgroundColor: glassConfig.backgroundColor,
    borderRadius: `${glassConfig.borderRadius}px`,
    border: `${glassConfig.borderWidth}px solid ${glassConfig.borderColor}`,
    boxShadow: glassConfig.boxShadow,
  }

  return (
    <div className="p-8 max-w-sm w-full text-center text-white" style={glassStyle}>
      <div className="mb-6">
        <Image
          src={componentConfig.imageUrl || "/placeholder.svg"}
          alt={componentConfig.title}
          width={120}
          height={120}
          className="rounded-full mx-auto border-4 border-white/20"
        />
      </div>

      <h2 className="text-2xl font-bold mb-2">{componentConfig.title}</h2>
      {componentConfig.subtitle && <p className="text-white/80 mb-4">{componentConfig.subtitle}</p>}

      <Button className="mb-4 bg-green-600 hover:bg-green-700 text-white">{componentConfig.buttonText}</Button>

      <p className="text-white/70 text-sm leading-relaxed">{componentConfig.description}</p>
    </div>
  )
}
