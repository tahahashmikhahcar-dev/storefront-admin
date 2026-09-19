"use client";

import { useEffect, useState } from "react";
import { Product } from "@/components/storefront";

const starterProducts: Product[] = [
  {
    id: 101,
    name: "Ultraboost Wireless Earbuds",
    category: "Electronics",
    price: 129,
    rating: 4.8,
    inventory: 22,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
    badge: "Hot",
    description: "High-fidelity wireless earbuds with noise reduction.",
  },
  {
    id: 102,
    name: "Terra Smart Bottle",
    category: "Accessories",
    price: 59,
    rating: 4.7,
    inventory: 18,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    badge: "New",
    description: "Hydration tracking bottle with smart reminders.",
  },
  {
    id: 103,
    name: "Drift Office Chair",
    category: "Home",
    price: 349,
    rating: 4.9,
    inventory: 8,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    badge: "Premium",
    description: "Ergonomic chair designed for all-day comfort.",
  },
];

const defaultOrders = [
  { id: "#1042", customer: "Sara M.", total: 540, status: "Paid" },
  { id: "#1043", customer: "Ethan G.", total: 420, status: "Pending" },
  { id: "#1044", customer: "Mia R.", total: 310, status: "Shipped" },
];

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>(starterProducts);
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    category: "Electronics",
    price: 0,
    rating: 5,
    inventory: 0,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    badge: "New",
    description: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem("storefront-products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("storefront-products", JSON.stringify(products));
  }, [products]);

  const totalRevenue = products.reduce((sum, item) => sum + item.price * item.inventory, 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name || !form.description) return;

    if (editingId !== null) {
      setProducts((current) =>
        current.map((item) => (item.id === editingId ? { ...item, ...form } : item))
      );
      setEditingId(null);
    } else {
      const nextProduct: Product = {
        id: Date.now(),
        ...form,
      };
      setProducts((current) => [nextProduct, ...current]);
    }

    setForm({
      name: "",
      category: "Electronics",
      price: 0,
      rating: 5,
      inventory: 0,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      badge: "New",
      description: "",
    });
  };

  const editProduct = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      rating: product.rating,
      inventory: product.inventory,
      image: product.image,
      badge: product.badge,
      description: product.description,
    });
  };

  const deleteProduct = (id: number) => {
    setProducts((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">Admin</div>
            <h1 className="text-2xl font-black">Store Control Center</h1>
          </div>
          <a href="/" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            View storefront
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="grid gap-5 md:grid-cols-4">
          {[
            { title: "Revenue", value: `$${totalRevenue}` },
            { title: "Orders", value: "248" },
            { title: "Visitors", value: "14.7k" },
            { title: "Conversion", value: "4.8%" },
          ].map((stat) => (
            <div key={stat.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">{stat.title}</div>
              <div className="mt-3 text-3xl font-black text-slate-900">{stat.value}</div>
            </div>
          ))}
        </section>

        <div className="mt-10 grid gap-8 xl:grid-cols-[0.9fr_1.3fr]">
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">{editingId !== null ? "Edit product" : "Add product"}</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Product name</label>
                <input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
                <select
                  value={form.category}
                  onChange={(event) => setForm({ ...form, category: event.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500"
                >
                  <option>Electronics</option>
                  <option>Wearables</option>
                  <option>Accessories</option>
                  <option>Fashion</option>
                  <option>Home</option>
                </select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Price</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Inventory</label>
                  <input
                    type="number"
                    value={form.inventory}
                    onChange={(event) => setForm({ ...form, inventory: Number(event.target.value) })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Image URL</label>
                <input
                  value={form.image}
                  onChange={(event) => setForm({ ...form, image: event.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Badge</label>
                <input
                  value={form.badge}
                  onChange={(event) => setForm({ ...form, badge: event.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button type="submit" className="rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700">
                {editingId !== null ? "Save changes" : "Add product"}
              </button>
              {editingId !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      name: "",
                      category: "Electronics",
                      price: 0,
                      rating: 5,
                      inventory: 0,
                      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
                      badge: "New",
                      description: "",
                    });
                  }}
                  className="rounded-full border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Products</h2>
              <div className="mt-5 space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-3">
                    <img src={product.image} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold text-slate-900">{product.name}</div>
                        <div className="text-lg font-bold text-slate-900">${product.price}</div>
                      </div>
                      <div className="mt-1 text-sm text-slate-500">{product.category} • {product.inventory} stock</div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => editProduct(product)} className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700">
                        Edit
                      </button>
                      <button type="button" onClick={() => deleteProduct(product.id)} className="rounded-full bg-red-500 px-3 py-1.5 text-sm font-medium text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Recent orders</h2>
              <div className="mt-5 space-y-3">
                {defaultOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                    <div>
                      <div className="font-semibold text-slate-900">{order.id}</div>
                      <div className="text-sm text-slate-500">{order.customer}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">${order.total}</div>
                      <div className="mt-1 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
