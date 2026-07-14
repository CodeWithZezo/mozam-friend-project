export type MockVariant = { id: number; name: string; price: number }
export type MockProduct = {
  id: number
  name: string
  description: string
  basePrice: number
  variants: MockVariant[]
  featured?: boolean
  image: string
}
export type MockCategory = { id: number; name: string; products: MockProduct[] }

export const MOCK_MENU: MockCategory[] = [
  {
    id: -1,
    name: 'Burgers',
    products: [
      {
        id: -101,
        name: 'BBQ Smash Burger',
        description: 'Double smashed beef patty, smoked BBQ sauce, cheddar, crispy onions.',
        basePrice: 950,
        featured: true,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [
          { id: -1011, name: 'Single', price: 950 },
          { id: -1012, name: 'Double', price: 1250 },
        ],
      },
      {
        id: -102,
        name: 'Zinger Deluxe',
        description: 'Crispy fried chicken thigh, spicy mayo, pickles, brioche bun.',
        basePrice: 850,
        image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [{ id: -1021, name: 'Regular', price: 850 }],
      },
      {
        id: -103,
        name: 'Classic Beef Cheese',
        description: 'Grilled beef patty, melted cheese, lettuce, tomato, house sauce.',
        basePrice: 750,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [{ id: -1031, name: 'Regular', price: 750 }],
      },
    ],
  },
  {
    id: -2,
    name: 'Wood-Fired Pizzas',
    products: [
      {
        id: -201,
        name: 'Margherita Classico',
        description: 'San Marzano tomato, fresh mozzarella, basil, extra virgin olive oil.',
        basePrice: 1100,
        featured: true,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [
          { id: -2011, name: '10"', price: 1100 },
          { id: -2012, name: '14"', price: 1650 },
        ],
      },
      {
        id: -202,
        name: 'Spicy Pepperoni',
        description: 'Double pepperoni, mozzarella, chili oil drizzle.',
        basePrice: 1350,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [
          { id: -2021, name: '10"', price: 1350 },
          { id: -2022, name: '14"', price: 1950 },
        ],
      },
      {
        id: -203,
        name: 'Chicken Fajita',
        description: 'Grilled chicken, bell peppers, onions, fajita spice, mozzarella.',
        basePrice: 1250,
        image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [{ id: -2031, name: '12"', price: 1250 }],
      },
    ],
  },
  {
    id: -3,
    name: 'Pasta & Mains',
    products: [
      {
        id: -301,
        name: 'Fettuccine Alfredo',
        description: 'Creamy parmesan sauce, grilled chicken, cracked black pepper.',
        basePrice: 1050,
        featured: true,
        image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [{ id: -3011, name: 'Regular', price: 1050 }],
      },
      {
        id: -302,
        name: 'Penne Arrabiata',
        description: 'Spicy tomato sauce, garlic, chili flakes, fresh basil.',
        basePrice: 900,
        image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [{ id: -3021, name: 'Regular', price: 900 }],
      },
    ],
  },
  {
    id: -4,
    name: 'Sides',
    products: [
      {
        id: -401,
        name: 'Loaded Fries',
        description: 'Crispy fries topped with cheese sauce, jalapeños, beef bits.',
        basePrice: 550,
        image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [{ id: -4011, name: 'Regular', price: 550 }],
      },
      {
        id: -402,
        name: 'Garlic Bread',
        description: 'Wood-fired bread, garlic butter, mozzarella, herbs.',
        basePrice: 450,
        image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [{ id: -4021, name: 'Regular', price: 450 }],
      },
    ],
  },
  {
    id: -5,
    name: 'Desserts',
    products: [
      {
        id: -501,
        name: 'Molten Lava Cake',
        description: 'Warm chocolate cake, molten center, vanilla ice cream.',
        basePrice: 500,
        featured: true,
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [{ id: -5011, name: 'Regular', price: 500 }],
      },
      {
        id: -502,
        name: 'New York Cheesecake',
        description: 'Classic baked cheesecake, berry compote.',
        basePrice: 550,
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [{ id: -5021, name: 'Slice', price: 550 }],
      },
    ],
  },
  {
    id: -6,
    name: 'Drinks',
    products: [
      {
        id: -601,
        name: 'Fresh Lemonade',
        description: 'Chilled, freshly squeezed, mint leaves.',
        basePrice: 300,
        image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [{ id: -6011, name: 'Regular', price: 300 }],
      },
      {
        id: -602,
        name: 'Iced Coffee',
        description: 'Cold brew, milk, a touch of caramel.',
        basePrice: 400,
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&h=450&fit=crop&auto=format&q=75',
        variants: [{ id: -6021, name: 'Regular', price: 400 }],
      },
    ],
  },
]

export function featuredMockDishes(): (MockProduct & { categoryName: string })[] {
  return MOCK_MENU.flatMap(c => c.products.map(p => ({ ...p, categoryName: c.name }))).filter(p => p.featured)
}
