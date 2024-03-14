"use client"

import Hero from "@/components/Hero";
import  ProductList from "@/components/ProductList";
import { Navbar } from '@/components'
import { Provider } from 'react-redux';
import store from "@/store";



export default function Home() {
  return (
    <Provider store={store}>
    <main className="overflow-hidden">
      <Navbar/>
      <Hero />
      <ProductList />
    </main>
    </Provider>
  );
}
