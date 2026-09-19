"use client";

import { useEffect, useMemo, useState } from "react";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  inventory: number;
  image: string;
  badge: string;
  description: string;
};

export type CartItem = Product & {
  quantity: number;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Urban Pro Headphones",
    category: "Electronics",
    price: 249,
    rating: 4.8,
    inventory: 18,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
    badge: "Best Seller",
    description: "Noise cancelling wireless headphones with 30hr battery life.",
  },
  {
    id: 2,
    name: "Aero Smartwatch",
    category: "Wearables",
    price: 319,
    rating: 4.7,
    inventory: 12,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    badge: "New",
    description: "Smart fitness tracking, heart rate monitoring and GPS.",
  },
  {
    id: 3,
    name: "Luna Backpack",
    category: "Accessories",
    price: 159,
    rating: 4.6,
    inventory: 22,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    badge: "Popular",
    description: "Water-resistant everyday backpack with organizer pockets.",
  },
  {
    id: 4,
    name: "Sora Running Shoes",
    category: "Fashion",
    price: 189,
    rating: 4.9,
    inventory: 15,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    badge: "Top Rated",
    description: "Lightweight support shoes built for all-day comfort.",
  },
  {
    id: 5,
    name: "Nimbus Lamp",
    category: "Home",
    price: 99,
    rating: 4.5,
    inventory: 30,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    badge: "Eco",
    description: "Minimal lamp with warm ambient lighting for your room.",
  },
  {
    id: 6,
    name: "Summit Speaker",
    category: "Electronics",
    price: 219,
    rating: 4.8,
    inventory: 10,
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80",
    badge: "Hot",
    description: "Bluetooth speaker delivering rich sound and deep bass.",
  },
];

const categories = ["All", "Electronics", "Wearables", "Accessories", "Fashion", "Home"];

export function Storefront() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem("storefront-products");
    const savedCart = localStorage.getItem("storefront-cart");

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("storefront-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("storefront-cart", JSON.stringify(cart));
  }, [cart]);

  const visibleProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 18 : 0;
  const total = subtotal + shipping;

  const addToCart = (product: Product) => {
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);
      if (exists) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: number, qty: number) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, qty) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const checkout = () => {
    if (!cart.length) return;
    setCart([]);
    alert("Order placed successfully. Thanks for shopping with us!");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-600">NovaCart</div>
            <div className="text-xl font-bold">Modern Store</div>
          </div>

          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#products" className="transition hover:text-slate-900">Products</a>
            <a href="#deals" className="transition hover:text-slate-900">Deals</a>
            <a href="#services" className="transition hover:text-slate-900">Services</a>
            <a href="/admin" className="transition hover:text-slate-900">Admin Panel</a>
          </nav>

          <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-soft">
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-5 inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              New collection
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight text-slate-900">
              Smart products for a better everyday life.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Discover premium tech, lifestyle essentials, and curated accessories designed to look good and work harder.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#products" className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-brand-700">
                Shop now
              </a>
              <a href="/admin" className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400">
                Open admin
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-600">
              <div>
                <div className="text-2xl font-bold text-slate-900">12k+</div>
                <div>happy buyers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                <div>average rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">48h</div>
                <div>shipping</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-brand-100 blur-2xl" />
            <div className="absolute -right-3 bottom-12 h-20 w-20 rounded-full bg-cyan-100 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
                alt="Featured product"
                className="h-[520px] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>
        </section>

        <section id="deals" className="mx-auto max-w-7xl px-6 pb-6">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: "Free shipping", subtitle: "Orders over $200" },
              { title: "Secure checkout", subtitle: "Protected payments" },
              { title: "Easy returns", subtitle: "30-day guarantee" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-lg font-bold text-slate-900">{item.title}</div>
                <div className="mt-2 text-sm text-slate-600">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Featured products</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Curated for your lifestyle</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product) => (
                <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="h-56 w-full object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                      {product.badge}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{product.category}</span>
                      <span>★ {product.rating}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-slate-900">{product.name}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">{product.description}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-black text-slate-900">${product.price}</div>
                        <div className="text-xs text-slate-500">{product.inventory} in stock</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Your cart</h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">
                    Your cart is empty. Add some products to continue shopping.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-slate-200 p-3">
                      <div className="flex gap-3">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="flex justify-between gap-2">
                            <div className="font-semibold text-slate-900">{item.name}</div>
                            <button type="button" onClick={() => updateCartQuantity(item.id, 0)} className="text-xs text-slate-400 hover:text-slate-700">
                              remove
                            </button>
                          </div>
                          <div className="mt-1 text-sm text-slate-500">${item.price}</div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-2 py-1">
                              <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="text-lg leading-none">−</button>
                              <span className="min-w-5 text-center text-sm font-semibold">{item.quantity}</span>
                              <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="text-lg leading-none">+</button>
                            </div>
                            <div className="font-bold text-slate-900">${item.price * item.quantity}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 space-y-3 border-t border-slate-200 pt-5 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={!cart.length}
                onClick={checkout}
                className="mt-6 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Proceed to checkout
              </button>
            </aside>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2rem] bg-slate-900 p-10 text-white shadow-soft">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Need help?</p>
                <h3 className="mt-2 text-3xl font-bold">Our support team is ready to assist</h3>
              </div>
              <button type="button" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900">
                Contact support
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
