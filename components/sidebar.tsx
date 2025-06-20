"use client"

import type { ComponentConfig } from "@/app/page"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ControlPanel } from "@/components/control-panel"

interface SidebarProps {
  componentConfig: ComponentConfig
  setComponentConfig: (config: ComponentConfig) => void
  glassConfig: any
  setGlassConfig: (config: any) => void
}

export function Sidebar({ componentConfig, setComponentConfig, glassConfig, setGlassConfig }: SidebarProps) {
  const updateConfig = (key: keyof ComponentConfig, value: string) => {
    setComponentConfig({
      ...componentConfig,
      [key]: value,
    })
  }

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="glass-effects" className="flex-1 flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="component-settings">Component</TabsTrigger>
            <TabsTrigger value="glass-effects">Glass Effects</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="component-settings" className="flex-1 overflow-auto m-0">
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Component Settings</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="component-type">Component Type</Label>
                  <Select value={componentConfig.type} onValueChange={(value) => updateConfig("type", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profile-card">Profile Card</SelectItem>
                      <SelectItem value="product-card">Product Card</SelectItem>
                      <SelectItem value="login-form">Login Form</SelectItem>
                      <SelectItem value="notification-card">Notification Card</SelectItem>
                      <SelectItem value="button-showcase">Button Showcase</SelectItem>
                      <SelectItem value="modal-preview">Modal Preview</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={componentConfig.title}
                    onChange={(e) => updateConfig("title", e.target.value)}
                    placeholder="Enter title"
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={componentConfig.subtitle}
                    onChange={(e) => updateConfig("subtitle", e.target.value)}
                    placeholder="Enter subtitle"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={componentConfig.description}
                    onChange={(e) => updateConfig("description", e.target.value)}
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="button-text">Button Text</Label>
                  <Input
                    id="button-text"
                    value={componentConfig.buttonText}
                    onChange={(e) => updateConfig("buttonText", e.target.value)}
                    placeholder="Enter button text"
                  />
                </div>

                <div>
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input
                    id="image-url"
                    value={componentConfig.imageUrl}
                    onChange={(e) => updateConfig("imageUrl", e.target.value)}
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="glass-effects" className="flex-1 overflow-auto m-0">
          <ControlPanel glassConfig={glassConfig} setGlassConfig={setGlassConfig} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
