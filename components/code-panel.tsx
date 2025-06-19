"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import type { GlassConfig, ComponentConfig } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateCSS, generateTailwindCSS, generateHTML } from "@/lib/code-generators"

interface CodePanelProps {
  glassConfig: GlassConfig
  componentConfig: ComponentConfig
  activeTab: "css" | "tailwind"
  setActiveTab: (tab: "css" | "tailwind") => void
}

export function CodePanel({ glassConfig, componentConfig, activeTab, setActiveTab }: CodePanelProps) {
  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTailwind, setCopiedTailwind] = useState(false)
  const [copiedHTML, setCopiedHTML] = useState(false)

  const cssCode = generateCSS(glassConfig, componentConfig)
  const tailwindCode = generateTailwindCSS(glassConfig, componentConfig)
  const htmlCode = generateHTML(componentConfig)

  const copyToClipboard = async (text: string, type: "css" | "tailwind" | "html") => {
    await navigator.clipboard.writeText(text)

    if (type === "css") setCopiedCSS(true)
    if (type === "tailwind") setCopiedTailwind(true)
    if (type === "html") setCopiedHTML(true)

    setTimeout(() => {
      setCopiedCSS(false)
      setCopiedTailwind(false)
      setCopiedHTML(false)
    }, 2000)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border flex-shrink-0">
        <h3 className="text-lg font-semibold">Generated Code</h3>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="flex-shrink-0 px-4 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="css" className="flex-1 m-4 mt-2 overflow-hidden">
            <div className="relative h-full flex flex-col">
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 z-10"
                onClick={() => copyToClipboard(cssCode, "css")}
              >
                {copiedCSS ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <div className="bg-muted rounded-lg flex-1 overflow-hidden">
                <pre className="p-4 text-sm overflow-auto h-full">
                  <code>{cssCode}</code>
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tailwind" className="flex-1 m-4 mt-2 overflow-hidden">
            <div className="relative h-full flex flex-col">
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 z-10"
                onClick={() => copyToClipboard(tailwindCode, "tailwind")}
              >
                {copiedTailwind ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <div className="bg-muted rounded-lg flex-1 overflow-hidden">
                <pre className="p-4 text-sm overflow-auto h-full">
                  <code>{tailwindCode}</code>
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-4 border-t border-border flex-shrink-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">HTML Structure</span>
            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(htmlCode, "html")}>
              {copiedHTML ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="bg-muted rounded text-xs overflow-hidden">
            <pre className="p-3 overflow-auto max-h-32">
              <code>{htmlCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
