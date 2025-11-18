import { PricingCard } from "./PricingCard"
import { useAuth } from "../contexts/AuthContext"

interface PlanCardsProps {
  onPlanSelect: (plan: string) => void
}

export function PlanCards({ onPlanSelect }: PlanCardsProps) {
  const { isLoggedIn } = useAuth()

  const plans = [
    {
      id: 'free',
      title: 'Free/Pay-as-you-go',
      price: '0',
      period: 'month',
      features: [
        'Pay only for usage',
        'No recurring monthly charge'
      ],
      isPrimary: false,
      actionText: 'Get Started',
      action: () => window.location.href = '/signup'
    },
    {
      id: 'hobby',
      title: 'Hobby',
      price: '5',
      period: 'month',
      features: [
        '250 daily requests',
        'Access to all models'
      ],
      isPrimary: true,
      actionText: isLoggedIn ? 'Purchase Hobby Plan' : 'Get Started',
      action: () => isLoggedIn ? onPlanSelect('hobby') : (window.location.href = '/signup')
    },
    {
      id: 'pro',
      title: 'Pro',
      price: '10',
      period: 'month',
      features: [
        'All Hobby benefits',
        '1,000 daily requests',
        'Priority Support'
      ],
      isPrimary: true,
      actionText: isLoggedIn ? 'Purchase Pro Plan' : 'Get Started',
      action: () => isLoggedIn ? onPlanSelect('pro') : (window.location.href = '/signup')
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <PricingCard
          key={plan.id}
          title={plan.title}
          price={plan.price}
          period={plan.period}
          features={plan.features}
          isPrimary={plan.isPrimary}
          onAction={plan.action}
          actionText={plan.actionText}
        />
      ))}
    </div>
  )
}