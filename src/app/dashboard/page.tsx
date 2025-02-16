"use client";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import ProductInfoCard from "../components/ProductInfoCard";
import { client } from "@/sanity/lib/client";
import { ProductPieChart } from "../components/ProductPieChart";
// import ProductTable from "../components/ProductTable";

export default function Dashboard() {
  const [products, setProducts] = useState<number>(0);
  const [featuredProducts, setFeaturedProducts] = useState<number>(0);
  const [latestProduct, setLatestProducts] = useState<number>(0);
  const [categories, setCategories] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCount = await client.fetch('count(*[_type == "product"])');
        setProducts(productCount);

        const featuredProduct = await client.fetch(
          'count(*[_type == "product" && isFeaturedProduct == true])'
        );
        setFeaturedProducts(featuredProduct);

        const latestProduct = await client.fetch(
          'count(*[_type == "product" && isFeaturedProduct == false])'
        );
        setLatestProducts(latestProduct);

        const categoriesArray = await client.fetch(
          '*[_type == "product"].category'
        );
        const uniqueCategories = new Set(categoriesArray).size
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <SidebarProvider>
      <div className="sm:mx-5 mx-2 flex flex-wrap gap-1">
      <ProductInfoCard heading="Total Products" quantity={products} />
      <ProductInfoCard heading="Featured Products" quantity={featuredProducts} />
      <ProductInfoCard heading="Latest Products" quantity={latestProduct} />
      <ProductInfoCard heading="Categories" quantity={categories} />
      <ProductPieChart featured={featuredProducts} latest={latestProduct}/>
      {/* <ProductTable /> */}
      </div>
    </SidebarProvider>
    
  );
}
