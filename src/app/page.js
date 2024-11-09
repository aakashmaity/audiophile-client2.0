"use client"

import Featured from "@/components/Featured";
import Layout from "@/components/Layout";
import NewProducts from "@/components/NewProducts";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [newProducts, setNewProducts] = useState([])
  const [featuredProduct, setFeaturedProduct] = useState();

  

  async function getProducts(){
    const response = await axios.post("/api/products");
    setNewProducts(response.data.newProducts);
    setFeaturedProduct(response.data.featuredProduct);
  }
  useEffect(() => {
    getProducts();
  }, []);

  if(newProducts?.length < 0 || featuredProduct === null){
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Featured  product={featuredProduct} />
      <NewProducts products={newProducts} />
    </Layout>
  );
}



{/* <main className={styles.main}>
    
    <div className={styles.description}>
      <p>
        Get started by editing&nbsp;
        <code className={styles.code}>src/app/page.js</code>
      </p>
      <div>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          By{" "}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className={styles.vercelLogo}
            width={100}
            height={24}
            priority
          />
        </a>
      </div>
    </div>

    <div className={styles.center}>
      
    </div>

    

      <a
        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
          Deploy <span>-&gt;</span>
        </h2>
        <p>
          Instantly deploy your Next.js site to a shareable URL with Vercel.
        </p>
      </a>
  </main> */}