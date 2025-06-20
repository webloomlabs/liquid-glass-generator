"use client"

import type { GlassConfig, ComponentConfig } from "@/app/page"
import { ProfileCard } from "@/components/glass-components/profile-card"
import { ProductCard } from "@/components/glass-components/product-card"
import { LoginForm } from "@/components/glass-components/login-form"
import { NotificationCard } from "@/components/glass-components/notification-card"
import { ButtonShowcase } from "@/components/glass-components/button-showcase"
import { ModalPreview } from "@/components/glass-components/modal-preview"

interface PreviewAreaProps {
  glassConfig: GlassConfig
  componentConfig: ComponentConfig
}

export function PreviewArea({ glassConfig, componentConfig }: PreviewAreaProps) {
  const backgroundStyle =
    glassConfig.backgroundType === "image"
      ? { backgroundImage: `url(${glassConfig.backgroundImage})` }
      : {
          background: `linear-gradient(135deg, ${glassConfig.gradientFrom}, ${glassConfig.gradientTo})`,
        }

  const renderComponent = () => {
    const props = { glassConfig, componentConfig }

    switch (componentConfig.type) {
      case "profile-card":
        return <ProfileCard {...props} />
      case "product-card":
        return <ProductCard {...props} />
      case "login-form":
        return <LoginForm {...props} />
      case "notification-card":
        return <NotificationCard {...props} />
      case "button-showcase":
        return <ButtonShowcase {...props} />
      case "modal-preview":
        return <ModalPreview {...props} />
      default:
        return <ProfileCard {...props} />
    }
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div
        className="w-full h-full rounded-lg bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={backgroundStyle}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 h-full flex items-center justify-center p-8">
          <div key={`${componentConfig.type}-${JSON.stringify(glassConfig)}`}>{renderComponent()}</div>
        </div>
      </div>
    </div>
  )
}
