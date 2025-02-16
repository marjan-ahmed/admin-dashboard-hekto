"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    _id: "",
    name: "",
    price: "",
    category: "",
    stockLevel: "",
    discountPercentage: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  // Handle form input changes
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Product
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const method = form._id ? "PUT" : "POST"; // Update if _id exists, otherwise add
    await fetch("/api/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    fetchProducts();
    setForm({ _id: "", name: "", price: "", category: "", stockLevel: "", discountPercentage: "" });
  };

  // Delete Product
  const handleDelete = async (id: string) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    fetchProducts();
  };

  // Load product details into the form for editing
  const handleEdit = (product: any) => {
    setForm(product);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="p-2 border w-full" required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="p-2 border w-full" required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="p-2 border w-full" required />
        <input type="number" name="stockLevel" placeholder="Stock Level" value={form.stockLevel} onChange={handleChange} className="p-2 border w-full" required />
        <input type="number" name="discountPercentage" placeholder="Discount (%)" value={form.discountPercentage} onChange={handleChange} className="p-2 border w-full" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">{form._id ? "Update" : "Add"} Product</button>
      </form>

      {/* Product List */}
      <ul className="space-y-3">
        {products.map((product: any) => (
          <li key={product._id} className="flex justify-between p-2 border">
            <span>{product.name} - ${product.price}</span>
            <div className="space-x-2">
              <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
