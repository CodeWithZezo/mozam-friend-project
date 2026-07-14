import { prisma } from '@/lib/db'
import { MenuCard } from '@/components/site/MenuCard'
import { MOCK_MENU } from '@/lib/mock-menu'

export default async function MenuPage() {
  const dbCategories = await prisma.category.findMany({
    where: { status: 'active' },
    include: {
      products: {
        where: { status: 'active' },
        include: { variants: { where: { status: 'active' } } },
      },
    },
    orderBy: { name: 'asc' },
  })

  const hasRealMenu = dbCategories.some(c => c.products.length > 0)

  const categories = hasRealMenu
    ? dbCategories
        .filter(c => c.products.length > 0)
        .map(c => ({
          id: c.id,
          name: c.name,
          products: c.products.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            basePrice: Number(p.basePrice),
            image: p.imageUrl,
            variants: p.variants.map(v => ({ id: v.id, name: v.name, price: Number(v.price) })),
            categoryName: c.name,
          })),
        }))
    : MOCK_MENU.map(c => ({
        ...c,
        products: c.products.map(p => ({ ...p, categoryName: c.name })),
      }))

  return (
    <div className="site-gradient-hero">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="text-[var(--site-amber-dark)] font-semibold tracking-widest text-xs uppercase mb-3">
            What We Serve
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-[var(--site-maroon)]">
            Our Menu
          </h1>
          <p className="text-[var(--site-ink)]/60 mt-3 max-w-lg mx-auto">
            Freshly made, every single day — from wood-fired pizzas to slow-cooked pastas and
            signature burgers.
          </p>
        </div>

        <div className="space-y-16">
          {categories.map(category => (
            <section key={category.id}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--site-ink)] whitespace-nowrap">
                  {category.name}
                </h2>
                <div className="h-px flex-1 bg-[var(--site-maroon)]/15" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.products.map(product => (
                  <MenuCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-[var(--site-ink)]/50">
            Prices are inclusive of all taxes. Ask our staff about daily specials.
          </p>
        </div>
      </div>
    </div>
  )
}
