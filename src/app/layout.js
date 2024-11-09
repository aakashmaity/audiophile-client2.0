import { CartContextProvider } from "@/components/CartContext";
import { Inter } from "next/font/google";
import "./globals.css";
// import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Audiophile",
  description: "Purchase your favourite one",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CartContextProvider>
        <body className={inter.className}>{children}</body>
      </CartContextProvider>
    </html>
  );
}
