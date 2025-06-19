"use client"

import { Bell } from "lucide-react"
import type { GlassConfig, ComponentConfig } from "@/app/page"
import { Button } from "@/components/ui/button"

interface NotificationCardProps {
  glassConfig: GlassConfig
  componentConfig: ComponentConfig
}

export function NotificationCard({ glassConfig, componentConfig }: NotificationCardProps) {
  const glassStyle = {
    backdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
    WebkitBackdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
    backgroundColor: glassConfig.backgroundColor,
    borderRadius: `${glassConfig.borderRadius}px`,
    border: `${glassConfig.borderWidth}px solid ${glassConfig.borderColor}`,
    boxShadow: glassConfig.boxShadow,
  }

  return (
    <div className="p-6 max-w-sm w-full text-white" style={glassStyle}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-blue-300" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{componentConfig.title}</h3>
          {componentConfig.subtitle && <p className="text-white/80 text-sm mb-2">{componentConfig.subtitle}</p>}
          <p className="text-white/70 text-sm mb-4">{componentConfig.description}</p>

          <div className="flex space-x-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              {componentConfig.buttonText}
            </Button>
            <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
