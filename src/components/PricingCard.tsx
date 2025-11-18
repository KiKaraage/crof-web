import { Button } from "./ui/button"
import { Card } from "./ui/card"
import type { ReactNode } from "react"

interface PricingCardProps {
  title: string
  price?: string
  period?: string
  description?: string
  features?: string[]
  isPrimary?: boolean
  actionText?: string
  onAction?: () => void
  children?: ReactNode
  className?: string
}

export function PricingCard({
  title,
  price,
  period = "month",
  description,
  features = [],
  isPrimary = false,
  actionText,
  onAction,
  children,
  className = ""
}: PricingCardProps) {
  return (
    <Card className={`p-4 flex flex-col bg-neutral-950 ${isPrimary ? 'border-primary' : ''} ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className={`text-xl font-semibold ${isPrimary ? 'gradient-text' : ''}`}>{title}</h3>
          {price !== undefined && (
            <p className="text-3xl font-bold mt-1">
              ${price}<span className="text-lg font-normal text-muted-foreground">/{period}</span>
            </p>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
      
      {features.length > 0 && (
        <ul className="space-y-2 mb-2 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">• {feature}</li>
          ))}
        </ul>
      )}
      
      {children && (
        <div className="mb-2 flex-grow">
          {children}
        </div>
      )}
      
      {actionText && onAction && (
        <Button
          className="w-full"
          variant="main"
          onClick={onAction}
        >
          {actionText}
        </Button>
      )}
    </Card>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon?: ReactNode
  actionText?: string
  onAction?: () => void
  isPrimary?: boolean
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon,
  actionText,
  onAction,
  isPrimary = false,
  className = ""
}: FeatureCardProps) {
  return (
    <Card className={`p-4 flex flex-col bg-neutral-950 ${isPrimary ? 'border-primary' : ''} ${className}`}>
      {icon && (
        <div className="mb-3">
          {icon}
        </div>
      )}
      
      <h3 className={`text-xl font-semibold mb-2 ${isPrimary ? 'gradient-text' : ''}`}>
        {title}
      </h3>
      
      <p className="text-muted-foreground mb-4 flex-grow">
        {description}
      </p>
      
      {actionText && onAction && (
        <Button
          className="w-full"
          variant="main"
          onClick={onAction}
        >
          {actionText}
        </Button>
      )}
    </Card>
  )
}

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({
  title,
  value,
  description,
  trend,
  className = ""
}: StatsCardProps) {
  return (
    <Card className={`p-4 bg-neutral-950 ${className}`}>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold">{value}</span>
        {trend && (
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.value}
          </span>
        )}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </Card>
  )
}