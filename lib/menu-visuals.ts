import { Beef, Pizza, UtensilsCrossed, Soup, IceCreamCone, CupSoda, type LucideIcon } from 'lucide-react'

type CategoryVisual = { icon: LucideIcon; gradient: string }

const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  burgers: { icon: Beef, gradient: 'from-[#a8471f] to-[#5c2410]' },
  'wood-fired pizzas': { icon: Pizza, gradient: 'from-[#c0392b] to-[#6b1f2a]' },
  pizzas: { icon: Pizza, gradient: 'from-[#c0392b] to-[#6b1f2a]' },
  'pasta & mains': { icon: UtensilsCrossed, gradient: 'from-[#a8721f] to-[#4a1620]' },
  sides: { icon: Soup, gradient: 'from-[#5c6b3f] to-[#2b1a14]' },
  desserts: { icon: IceCreamCone, gradient: 'from-[#c48a3f] to-[#7a2331]' },
  drinks: { icon: CupSoda, gradient: 'from-[#d69432] to-[#a8721f]' },
}

const DEFAULT_VISUAL: CategoryVisual = { icon: UtensilsCrossed, gradient: 'from-[#7a2331] to-[#4a1620]' }

export function getCategoryVisual(categoryName?: string | null): CategoryVisual {
  if (!categoryName) return DEFAULT_VISUAL
  return CATEGORY_VISUALS[categoryName.toLowerCase()] ?? DEFAULT_VISUAL
}
