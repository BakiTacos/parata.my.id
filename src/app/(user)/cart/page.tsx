'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingCart, Minus, Plus, ArrowRight, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
  stock: number;
  weight: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // --- LOGIC (Load, Update, Remove) TETAP SAMA ---
  useEffect(() => {
    const timer = setTimeout(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          try {
            const parsedItems = JSON.parse(storedCart);
            if (Array.isArray(parsedItems)) setCartItems(parsedItems);
          } catch (error) {
            localStorage.removeItem('cart');
          }
        }
        setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const updateCartStorage = (items: CartItem[]) => {
    setCartItems(items);
    if (items.length === 0) localStorage.removeItem('cart');
    else localStorage.setItem('cart', JSON.stringify(items));
    window.dispatchEvent(new Event("storage"));
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        if (newQuantity >= 1 && newQuantity <= item.stock) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });
    updateCartStorage(updatedItems);
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    updateCartStorage(updatedItems);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  const totalWeight = cartItems.reduce((acc, item) => acc + (item.weight || 0) * item.quantity, 0);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#9CAF88]"></div></div>;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-[60vh] px-4">
        <ShoppingCart size={64} className="text-gray-300 mb-4" />
        <h1 className="text-xl font-bold text-gray-800">Keranjang Kosong</h1>
        <Link href="/product" className="mt-4 text-[#9CAF88] underline">Mulai Belanja</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-[#9CAF88] mb-6 flex items-center gap-2">
           <ShoppingCart className="mb-1" /> Keranjang Belanja
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- TABEL PRODUK (KIRI) --- */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* HEADER TABEL (Grid 12 Kolom) */}
              <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-semibold text-gray-600">
                {/* Kolom 1-6: Produk */}
                <div className="col-span-6 pl-2">Produk</div> 
                {/* Kolom 7-9: Jumlah (Tengah) */}
                <div className="col-span-3 text-center">Jumlah</div>
                {/* Kolom 10-12: Total (Kanan) */}
                <div className="col-span-3 text-right pr-4">Total</div>
              </div>

              {/* LIST ITEM */}
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                    // Container Item
                    <div key={item.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                        
                        {/* Grid Wrapper untuk Item */}
                        <div className="flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:items-center">
                            
                            {/* 1. KOLOM PRODUK (Gambar + Teks) - Span 6 */}
                            <div className="col-span-6 flex items-start gap-4">
                                {/* Container Gambar (Fixed Size agar tidak meledak) */}
                                <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                    <img
                                        src={item.image || "https://via.placeholder.com/150"}
                                        alt={item.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'}
                                    />
                                </div>
                                
                                {/* Detail Teks */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-bold text-gray-800 line-clamp-2">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {formatCurrency(item.price)}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                        <Package size={12} />
                                        <span>{(item.weight || 0) * item.quantity} g</span>
                                    </div>
                                </div>
                            </div>

                            {/* 2. KOLOM JUMLAH (Quantity Selector) - Span 3 */}
                            <div className="col-span-3 flex justify-start sm:justify-center items-center mt-2 sm:mt-0">
                                <div className="flex items-center border border-gray-300 rounded-lg bg-white h-9">
                                    <button 
                                        onClick={() => handleQuantityChange(item.id, -1)} 
                                        disabled={item.quantity <= 1}
                                        className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                                    <button 
                                        onClick={() => handleQuantityChange(item.id, 1)} 
                                        disabled={item.quantity >= item.stock}
                                        className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* 3. KOLOM TOTAL & HAPUS - Span 3 */}
                            <div className="col-span-3 flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                                <span className="font-bold text-[#9CAF88] text-base">
                                    {formatCurrency(item.price * item.quantity)}
                                </span>
                                <button 
                                    onClick={() => handleRemoveItem(item.id)} 
                                    className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- RINGKASAN ORDER (KANAN) --- */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="font-bold text-gray-800 text-lg mb-4 border-b pb-4">Ringkasan</h3>
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                   <span>Total Item</span>
                   <span className="font-semibold">{totalItems} Barang</span>
                </div>
                <div className="flex justify-between">
                   <span>Berat Total</span>
                   <span className="font-semibold">{(totalWeight / 1000).toFixed(2)} kg</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t">
                   <span>Total Harga</span>
                   <span className="text-[#9CAF88]">{formatCurrency(subtotal)}</span>
                </div>
              </div>
              <button 
                onClick={() => router.push('/checkout')}
                className="w-full py-3 bg-[#9CAF88] text-white font-bold rounded-lg hover:bg-[#869975] transition-all flex justify-center items-center gap-2"
              >
                Checkout <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}