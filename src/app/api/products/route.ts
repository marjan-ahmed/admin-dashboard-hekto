import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/client";

// Handle requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Fetch products
    const query = `*[_type == "product"]`;
    const products = await client.fetch(query);
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    // Add new product
    const { name, price, category, stockLevel, discountPercentage } = req.body;
    try {
      const newProduct = await client.create({
        _type: "product",
        name,
        price,
        category,
        stockLevel,
        discountPercentage,
      });
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ error: "Error adding product" });
    }
  }

  if (req.method === "PUT") {
    // Update product
    const { _id, name, price, category, stockLevel, discountPercentage } = req.body;
    try {
      await client.patch(_id).set({ name, price, category, stockLevel, discountPercentage }).commit();
      return res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error updating product" });
    }
  }

  if (req.method === "DELETE") {
    // Delete product
    const { _id } = req.body;
    try {
      await client.delete(_id);
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting product" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
