"use client"

import type { GlassConfig, ComponentConfig } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginFormProps {
  glassConfig: GlassConfig
  componentConfig: ComponentConfig
}

export function LoginForm({ glassConfig, componentConfig }: LoginFormProps) {
  const glassStyle = {
    backdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
    WebkitBackdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
    backgroundColor: glassConfig.backgroundColor,
    borderRadius: `${glassConfig.borderRadius}px`,
    border: `${glassConfig.borderWidth}px solid ${glassConfig.borderColor}`,
    boxShadow: glassConfig.boxShadow,
  }

  return (
    <div className="p-8 max-w-sm w-full text-white" style={glassStyle}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{componentConfig.title}</h2>
        {componentConfig.subtitle && <p className="text-white/80">{componentConfig.subtitle}</p>}
      </div>

      <form className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-white/90">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-white/90">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">{componentConfig.buttonText}</Button>
      </form>

      {componentConfig.description && (
        <p className="text-white/70 text-sm text-center mt-4">{componentConfig.description}</p>
      )}
    </div>
  )
}
