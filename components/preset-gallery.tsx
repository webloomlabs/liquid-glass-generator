"use client"

import { useState } from "react"
import { Palette, Sparkles } from "lucide-react"
import type { GlassConfig } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface PresetGalleryProps {
  onApplyPreset: (preset: Partial<GlassConfig>) => void
}

const advancedPresets = {
  "aurora-borealis": {
    blur: 24,
    saturation: 200,
    opacity: 65,
    backgroundColor: "rgba(16, 185, 129, 0.25)",
    borderColor: "rgba(34, 197, 94, 0.3)",
    borderRadius: 20,
    boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.37)",
    backgroundType: "gradient" as const,
    gradientFrom: "#10b981",
    gradientTo: "#3b82f6",
  },
  "cyberpunk-neon": {
    blur: 16,
    saturation: 250,
    opacity: 70,
    backgroundColor: "rgba(236, 72, 153, 0.3)",
    borderColor: "rgba(251, 146, 60, 0.4)",
    borderRadius: 8,
    boxShadow: "0 0 40px rgba(236, 72, 153, 0.5)",
    backgroundType: "gradient" as const,
    gradientFrom: "#ec4899",
    gradientTo: "#8b5cf6",
  },
  "ocean-depths": {
    blur: 20,
    saturation: 160,
    opacity: 80,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    borderColor: "rgba(147, 197, 253, 0.3)",
    borderRadius: 16,
    boxShadow: "0 12px 40px 0 rgba(59, 130, 246, 0.3)",
    backgroundType: "gradient" as const,
    gradientFrom: "#3b82f6",
    gradientTo: "#1e40af",
  },
  "golden-hour": {
    blur: 18,
    saturation: 180,
    opacity: 75,
    backgroundColor: "rgba(251, 191, 36, 0.25)",
    borderColor: "rgba(252, 211, 77, 0.4)",
    borderRadius: 24,
    boxShadow: "0 8px 32px 0 rgba(251, 191, 36, 0.4)",
    backgroundType: "gradient" as const,
    gradientFrom: "#fbbf24",
    gradientTo: "#f59e0b",
  },
  "midnight-purple": {
    blur: 22,
    saturation: 140,
    opacity: 85,
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    borderColor: "rgba(167, 139, 250, 0.3)",
    borderRadius: 12,
    boxShadow: "0 10px 36px 0 rgba(139, 92, 246, 0.35)",
    backgroundType: "gradient" as const,
    gradientFrom: "#8b5cf6",
    gradientTo: "#6366f1",
  },
  "forest-mist": {
    blur: 26,
    saturation: 120,
    opacity: 60,
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    borderColor: "rgba(74, 222, 128, 0.25)",
    borderRadius: 18,
    boxShadow: "0 8px 28px 0 rgba(34, 197, 94, 0.25)",
    backgroundType: "gradient" as const,
    gradientFrom: "#22c55e",
    gradientTo: "#16a34a",
  },
}

export function PresetGallery({ onApplyPreset }: PresetGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)

  const applyPreset = (presetName: keyof typeof advancedPresets) => {
    const preset = advancedPresets[presetName]
    onApplyPreset(preset)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          More Presets
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Advanced Glass Presets
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(advancedPresets).map(([name, preset]) => (
            <div
              key={name}
              className="relative group cursor-pointer"
              onClick={() => applyPreset(name as keyof typeof advancedPresets)}
            >
              <div
                className="h-32 rounded-lg border-2 border-transparent group-hover:border-primary/50 transition-all duration-200 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${preset.gradientFrom}, ${preset.gradientTo})`,
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center text-white font-medium"
                  style={{
                    backdropFilter: `blur(${preset.blur}px) saturate(${preset.saturation}%)`,
                    backgroundColor: preset.backgroundColor,
                    borderRadius: `${preset.borderRadius}px`,
                    border: `1px solid ${preset.borderColor}`,
                  }}
                >
                  <div className="text-center">
                    <div className="text-sm font-semibold capitalize">{name.replace("-", " ")}</div>
                    <div className="text-xs opacity-80 mt-1">
                      {preset.blur}px • {preset.saturation}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
