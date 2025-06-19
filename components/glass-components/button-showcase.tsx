"use client"

import type { GlassConfig, ComponentConfig } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Play, Heart, Share, Download } from "lucide-react"

interface ButtonShowcaseProps {
  glassConfig: GlassConfig
  componentConfig: ComponentConfig
}

export function ButtonShowcase({ glassConfig, componentConfig }: ButtonShowcaseProps) {
  const glassStyle = {
    backdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
    WebkitBackdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
    backgroundColor: glassConfig.backgroundColor,
    borderRadius: `${glassConfig.borderRadius}px`,
    border: `${glassConfig.borderWidth}px solid ${glassConfig.borderColor}`,
    boxShadow: glassConfig.boxShadow,
  }

  return (
    <div className="p-8 max-w-sm w-full text-white space-y-4" style={glassStyle}>
      <h3 className="text-xl font-bold mb-6 text-center">{componentConfig.title}</h3>

      <div className="space-y-3">
        <Button className="w-full bg-blue-600/80 hover:bg-blue-700/80 backdrop-blur-sm border border-blue-400/30">
          <Play className="h-4 w-4 mr-2" />
          Primary Action
        </Button>

        <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 border-white/30 text-white">
          <Heart className="h-4 w-4 mr-2" />
          Secondary Action
        </Button>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1 bg-green-600/80 hover:bg-green-700/80">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 bg-white/10 hover:bg-white/20 border-white/30 text-white"
          >
            <Download className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      <p className="text-white/70 text-sm text-center mt-4">{componentConfig.description}</p>
    </div>
  )
}
