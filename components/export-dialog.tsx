"use client"

import { useState } from "react"
import { Download, FileText, Code, Github } from "lucide-react"
import type { GlassConfig, ComponentConfig } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateCSS, generateTailwindCSS, generateHTML } from "@/lib/code-generators"

interface ExportDialogProps {
  glassConfig: GlassConfig
  componentConfig: ComponentConfig
}

export function ExportDialog({ glassConfig, componentConfig }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportAsZip = () => {
    const htmlContent = generateHTML(componentConfig)
    const cssContent = generateCSS(glassConfig, componentConfig)

    // Create individual files
    downloadFile(htmlContent, "index.html", "text/html")
    downloadFile(cssContent, "styles.css", "text/css")

    // Show success message
    alert("Files downloaded successfully!")
  }

  const exportToGitHub = () => {
    // This would integrate with GitHub API in a real implementation
    alert("GitHub integration coming soon!")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export Your Glass Component</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="download" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="download">Download Files</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="download" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => downloadFile(generateHTML(componentConfig), "index.html", "text/html")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Download HTML
              </Button>

              <Button
                onClick={() => downloadFile(generateCSS(glassConfig, componentConfig), "styles.css", "text/css")}
                className="flex items-center gap-2"
              >
                <Code className="h-4 w-4" />
                Download CSS
              </Button>

              <Button
                onClick={() =>
                  downloadFile(generateTailwindCSS(glassConfig, componentConfig), "tailwind.html", "text/html")
                }
                className="flex items-center gap-2"
              >
                <Code className="h-4 w-4" />
                Download Tailwind
              </Button>

              <Button onClick={exportAsZip} variant="default" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download All
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="github" className="space-y-4">
            <div className="text-center space-y-4">
              <Github className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Export your component directly to a GitHub repository</p>
              <Button onClick={exportToGitHub} className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                Export to GitHub
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/50">
              <h4 className="font-semibold mb-2">Component Preview</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <strong>Type:</strong> {componentConfig.type}
                </p>
                <p>
                  <strong>Blur:</strong> {glassConfig.blur}px
                </p>
                <p>
                  <strong>Saturation:</strong> {glassConfig.saturation}%
                </p>
                <p>
                  <strong>Opacity:</strong> {glassConfig.opacity}%
                </p>
                <p>
                  <strong>Border Radius:</strong> {glassConfig.borderRadius}px
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
