"use client";

import Center from "@/components/Center";
import Layout from "@/components/Layout";
import ProductGrid from "@/components/ProductGrid";
import axios from "axios";
import { useEffect, useState } from "react";
import { H2 } from "../cart/page";


export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Layout>
      <Center>
        <H2>All products</H2>
        <ProductGrid products={products} />
      </Center>
    </Layout>
  );
}
