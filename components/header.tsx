"use client"

import { Moon, Sun, Github } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ExportDialog } from "@/components/export-dialog"

interface GlassConfig {
  [key: string]: any
}

interface ComponentConfig {
  [key: string]: any
}

interface HeaderProps {
  glassConfig: GlassConfig
  componentConfig: ComponentConfig
}

export function Header({ glassConfig, componentConfig }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🧊</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Liquid Glass Generator
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button variant="ghost" size="icon">
            <Github className="h-4 w-4" />
          </Button>

          <ExportDialog glassConfig={glassConfig} componentConfig={componentConfig} />
        </div>
      </div>
    </header>
  )
}
