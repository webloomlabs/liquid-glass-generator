"use client"

import type { GlassConfig } from "@/app/page"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PresetGallery } from "@/components/preset-gallery"

interface ControlPanelProps {
  glassConfig: GlassConfig
  setGlassConfig: (config: GlassConfig) => void
}

const presets = {
  "frosted-blue": {
    blur: 16,
    saturation: 180,
    opacity: 75,
    backgroundColor: "rgba(17, 25, 40, 0.75)",
    borderColor: "rgba(255, 255, 255, 0.125)",
  },
  "neon-glow": {
    blur: 20,
    saturation: 200,
    opacity: 60,
    backgroundColor: "rgba(139, 69, 19, 0.6)",
    borderColor: "rgba(255, 215, 0, 0.3)",
  },
  "sunset-shine": {
    blur: 12,
    saturation: 150,
    opacity: 80,
    backgroundColor: "rgba(255, 99, 71, 0.4)",
    borderColor: "rgba(255, 165, 0, 0.2)",
  },
  "apple-frost": {
    blur: 24,
    saturation: 120,
    opacity: 85,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
}

export function ControlPanel({ glassConfig, setGlassConfig }: ControlPanelProps) {
  const updateConfig = (key: keyof GlassConfig, value: any) => {
    if (key === "opacity") {
      // When opacity changes, update the backgroundColor to reflect the new opacity
      const currentBg = glassConfig.backgroundColor
      let newBackgroundColor = currentBg

      // Parse RGBA string and update opacity
      const rgbaMatch = currentBg.match(/rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?$$/)
      if (rgbaMatch) {
        const [, r, g, b] = rgbaMatch
        newBackgroundColor = `rgba(${r}, ${g}, ${b}, ${value / 100})`
      }

      setGlassConfig({
        ...glassConfig,
        [key]: value,
        backgroundColor: newBackgroundColor,
      })
    } else {
      setGlassConfig({
        ...glassConfig,
        [key]: value,
      })
    }
  }

  const applyPreset = (presetName: keyof typeof presets) => {
    const preset = presets[presetName]
    setGlassConfig({
      ...glassConfig,
      ...preset,
    })
  }

  return (
    <div className="p-6 space-y-6 overflow-auto h-full flex flex-col">
      <div>
        <h3 className="text-lg font-semibold mb-4">Glass Effects</h3>

        <div className="space-y-6">
          {/* Presets */}
          <div>
            <Label>Quick Presets</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => applyPreset("frosted-blue")}>
                Frosted Blue
              </Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("neon-glow")}>
                Neon Glow
              </Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("sunset-shine")}>
                Sunset Shine
              </Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("apple-frost")}>
                Apple Frost
              </Button>
            </div>
            <div className="mt-2">
              <PresetGallery onApplyPreset={(preset) => setGlassConfig({ ...glassConfig, ...preset })} />
            </div>
          </div>

          {/* Background */}
          <div>
            <Label>Background Type</Label>
            <Select
              value={glassConfig.backgroundType}
              onValueChange={(value: "image" | "gradient") => updateConfig("backgroundType", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {glassConfig.backgroundType === "image" ? (
            <div>
              <Label>Background Image URL</Label>
              <Input
                value={glassConfig.backgroundImage}
                onChange={(e) => updateConfig("backgroundImage", e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <Label>Gradient From</Label>
                <Input
                  type="color"
                  value={glassConfig.gradientFrom}
                  onChange={(e) => updateConfig("gradientFrom", e.target.value)}
                />
              </div>
              <div>
                <Label>Gradient To</Label>
                <Input
                  type="color"
                  value={glassConfig.gradientTo}
                  onChange={(e) => updateConfig("gradientTo", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Blur */}
          <div>
            <Label>Blur: {glassConfig.blur}px</Label>
            <Slider
              value={[glassConfig.blur]}
              onValueChange={([value]) => updateConfig("blur", value)}
              max={50}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>

          {/* Saturation */}
          <div>
            <Label>Saturation: {glassConfig.saturation}%</Label>
            <Slider
              value={[glassConfig.saturation]}
              onValueChange={([value]) => updateConfig("saturation", value)}
              max={300}
              min={50}
              step={10}
              className="mt-2"
            />
          </div>

          {/* Opacity */}
          <div>
            <Label>Opacity: {glassConfig.opacity}%</Label>
            <Slider
              value={[glassConfig.opacity]}
              onValueChange={([value]) => updateConfig("opacity", value)}
              max={100}
              min={10}
              step={5}
              className="mt-2"
            />
          </div>

          {/* Border Radius */}
          <div>
            <Label>Border Radius: {glassConfig.borderRadius}px</Label>
            <Slider
              value={[glassConfig.borderRadius]}
              onValueChange={([value]) => updateConfig("borderRadius", value)}
              max={50}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>

          {/* Background Color */}
          <div>
            <Label>Glass Color</Label>
            <Input
              value={glassConfig.backgroundColor}
              onChange={(e) => updateConfig("backgroundColor", e.target.value)}
              placeholder="rgba(17, 25, 40, 0.75)"
            />
          </div>

          {/* Border Color */}
          <div>
            <Label>Border Color</Label>
            <Input
              value={glassConfig.borderColor}
              onChange={(e) => updateConfig("borderColor", e.target.value)}
              placeholder="rgba(255, 255, 255, 0.125)"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
