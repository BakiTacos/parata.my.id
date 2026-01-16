// src/components/ProductActionButtons.tsx
"use client";

import { useState } from 'react';
import { ShoppingCart, CreditCard, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

export default function ProductActionButtons({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle Quantity
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQty = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  // 1. Logika Tambah ke Keranjang
  const handleAddToCart = () => {
    setLoading(true);
    // TODO: Di sini nanti kita sambungkan ke CartContext / LocalStorage
    // Simulasi sementara:
    const cartItem = {
      ...product,
      quantity: quantity
    };
    
    console.log("Added to cart:", cartItem);
    
    // Simpan ke LocalStorage agar bisa diambil di halaman Cart nanti
    // (Ini solusi sederhana sebelum pakai Global State)
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += quantity;
    } else {
        existingCart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    alert(`✅ Berhasil menambahkan ${quantity} ${product.name} ke keranjang!`);
    setLoading(false);
  };

  // 2. Logika Beli Langsung
  const handleBuyNow = () => {
    // Simpan item ke session storage untuk checkout langsung (single item)
    sessionStorage.setItem('checkoutItem', JSON.stringify({ ...product, quantity }));
    router.push('/checkout'); // Arahkan ke halaman pembayaran
  };

  return (
    <div className="mt-8 flex flex-col gap-4">
      {/* Selector Quantity */}
      <div className="flex items-center gap-4 mb-2">
        <span className="text-sm font-medium text-gray-700">Jumlah:</span>
        <div className="flex items-center border border-gray-300 rounded-md">
            <button 
                onClick={decreaseQty}
                disabled={quantity <= 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 text-gray-600"
            >
                <Minus size={16} />
            </button>
            <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
            <button 
                onClick={increaseQty}
                disabled={quantity >= product.stock}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 text-gray-600"
            >
                <Plus size={16} />
            </button>
        </div>
        <span className="text-xs text-gray-500">Tersisa {product.stock} buah</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Tombol Keranjang */}
        <button 
            onClick={handleAddToCart}
            disabled={loading || product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#9CAF88] text-[#9CAF88] font-bold rounded-lg hover:bg-[#9CAF88] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <ShoppingCart size={20} />
            Keranjang
        </button>

        {/* Tombol Beli Langsung */}
        <button 
            onClick={handleBuyNow}
            disabled={loading || product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#9CAF88] text-white font-bold rounded-lg shadow-md hover:bg-[#869975] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <CreditCard size={20} />
            Beli Sekarang
        </button>
      </div>
    </div>
  );
}