'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingCart } from 'lucide-react';

// Define a type for our cart item for type safety
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string; // To link back to the product page
};

// Mock data to simulate a cart with items.
const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Kursi Kayu Estetik',
    price: 750000,
    quantity: 1,
    image: 'https://placehold.co/150x150/F3E9DC/333333/png',
    slug: 'kursi-kayu-estetik',
  },
  {
    id: 2,
    name: 'Lampu Meja Modern',
    price: 320000,
    quantity: 2,
    image: 'https://placehold.co/150x150/9CAF88/FFFFFF/png',
    slug: 'lampu-meja-modern',
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [subtotal, setSubtotal] = useState(0);

  // Recalculate subtotal whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(total);
  }, [cartItems]);

  // Handler to update item quantity
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Quantity cannot be less than 1
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handler to remove an item
  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Empty Cart View
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-[60vh]">
        <ShoppingCart size={64} className="text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Anda Kosong</h1>
        <p className="text-gray-500 mb-6">Sepertinya Anda belum menambahkan produk apapun.</p>
        <Link
          href="/product"
          className="px-6 py-3 bg-[#9CAF88] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-colors"
        >
          Lanjutkan Belanja
        </Link>
      </div>
    );
  }

  // Main Cart View
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#9CAF88] mb-10">Keranjang Belanja</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items List */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-6 last:border-b-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover w-24 h-24"
                  />
                  <div className="flex-grow text-center sm:text-left">
                    <Link href={`/product/${item.slug}`} className="text-lg font-semibold text-gray-800 hover:text-[#9CAF88]">
                      {item.name}
                    </Link>
                    <p className="text-gray-600">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border rounded-md">
                      <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                      <span className="px-4 py-1 text-center w-12">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                    </div>
                    {/* Item Subtotal */}
                    <p className="font-semibold text-gray-800 w-28 text-right">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    {/* Remove Button */}
                    <button onClick={() => handleRemoveItem(item.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Ringkasan Pesanan</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimasi Pengiriman</span>
                  <span className="font-semibold text-gray-800">Rp 25.000</span>
                </div>
              </div>
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-gray-800">{formatCurrency(subtotal + 25000)}</span>
                </div>
              </div>
              <Link
                href="/orders"
                className="block text-center w-full mt-6 py-3 bg-[#9CAF88] text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 transition-colors"
              >
                Lanjutkan ke Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}