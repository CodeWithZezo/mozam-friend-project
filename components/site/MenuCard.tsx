'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Flame, Plus, Check } from 'lucide-react'
import { formatCurrency, cn } from '@/lib/utils'
import { getCategoryVisual } from '@/lib/menu-visuals'
import { useCart } from '@/components/site/CartContext'

type Variant = { id: number; name: string; price: number | string }
type Product = {
  id: number
  name: string
  description: string | null
  basePrice: number | string
  variants: Variant[]
  featured?: boolean
  image?: string | null
  categoryName?: string | null
}

export function MenuCard({ product, className }: { product: Product; className?: string }) {
  const [imgFailed, setImgFailed] = useState(false)
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCart()
  const { icon: Icon, gradient } = getCategoryVisual(product.categoryName)
  const showImage = product.image && !imgFailed

  const selectedVariant = useMemo(
    () => product.variants.find(v => v.id === selectedVariantId) ?? product.variants[0],
    [product.variants, selectedVariantId]
  )

  const handleAdd = () => {
    if (!selectedVariant) return
    addItem({
      variantId: selectedVariant.id,
      productName: product.name,
      variantName: selectedVariant.name,
      unitPrice: Number(selectedVariant.price),
      image: product.image,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1400)
  }

  return (
    <div className={cn('group bg-white rounded-2xl border border-(--site-maroon)/10 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200', className)}>
      <div className="relative w-full aspect-4/3 overflow-hidden">
        {showImage ? (
          <Image
            src={product.image!}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className={cn('w-full h-full bg-linear-to-br flex items-center justify-center', gradient)}>
            <Icon size={40} className="text-white/70" strokeWidth={1.5} />
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-(--site-amber-dark) text-[11px] font-semibold px-2 py-1 rounded-full shadow-sm">
            <Flame size={11} /> Popular
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-(family-name:--font-display) text-lg font-semibold text-(--site-ink)">
            {product.name}
          </h3>
          <span className="text-(--site-amber-dark) font-bold whitespace-nowrap">
            {formatCurrency(selectedVariant ? selectedVariant.price : product.basePrice)}
          </span>
        </div>
        {product.description && (
          <p className="text-sm text-(--site-ink)/60 mt-1.5 leading-relaxed">{product.description}</p>
        )}

        {product.variants.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.variants.map(v => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariantId(v.id)}
                className={cn(
                  'text-xs px-2.5 py-1 rounded-full border transition-colors',
                  v.id === selectedVariant?.id
                    ? 'bg-(--site-maroon) border-(--site-maroon) text-white'
                    : 'border-(--site-maroon)/20 text-(--site-ink)/60 hover:border-(--site-maroon)/50'
                )}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleAdd}
          disabled={!selectedVariant}
          className={cn(
            'mt-4 w-full flex items-center justify-center gap-2 rounded-full text-sm font-medium py-2.5 transition-colors duration-150',
            justAdded
              ? 'bg-(--site-olive) text-white'
              : 'bg-(--site-maroon) text-white hover:bg-(--site-maroon-dark)'
          )}
        >
          {justAdded ? <Check size={15} /> : <Plus size={15} />}
          {justAdded ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
