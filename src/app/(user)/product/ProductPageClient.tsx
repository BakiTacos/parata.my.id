'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase'; // Pastikan path import benar
import { collection, query, where, getDocs, orderBy, DocumentData } from 'firebase/firestore';

// Tipe data Produk
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
  createdAt: any;
}

export default function ProductPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Ambil parameter dari URL (misal: ?category=dapur&sort=terbaru)
  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'Semua');
  const [activeSort, setActiveSort] = useState(sortParam || 'terbaru');

  // Daftar Kategori untuk Filter UI
  const categories = [
    { name: 'Semua', slug: 'Semua' },
    { name: 'Dapur', slug: 'Dapur' },
    { name: 'Ruang Tamu', slug: 'Ruang Tamu' },
    { name: 'Kamar Tidur', slug: 'Kamar Tidur' },
    { name: 'Kamar Mandi', slug: 'Kamar Mandi' },
    { name: 'Elektronik', slug: 'Elektronik' },
    { name: 'Dekorasi', slug: 'Dekorasi' },
    { name: 'Lainnya', slug: 'Lainnya' },
  ];

  // --- FETCH DATA FIREBASE ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, 'products');
        let q;

        // 1. Filter Query berdasarkan Kategori
        if (categoryParam && categoryParam !== 'Semua') {
            // Perhatikan huruf besar/kecil harus sama dengan di database
            // Jika di DB 'Dapur', tapi param 'dapur', ini perlu disesuaikan. 
            // Disini kita asumsi user menyimpan dengan format Capitalize sesuai opsi input.
            q = query(productsRef, where('category', '==', categoryParam));
        } else {
            q = query(productsRef);
        }

        const snapshot = await getDocs(q);
        
        // Mapping data
        let fetchedProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];

        // 2. Sorting Client-Side (Lebih aman dari error 'Index Required' Firestore untuk kombinasi filter)
        if (sortParam) {
            if (sortParam === 'terbaru') {
                // Sort by date desc
                fetchedProducts.sort((a, b) => {
                    const dateA = a.createdAt?.seconds || 0;
                    const dateB = b.createdAt?.seconds || 0;
                    return dateB - dateA;
                });
            } else if (sortParam === 'terlama') {
                 fetchedProducts.sort((a, b) => {
                    const dateA = a.createdAt?.seconds || 0;
                    const dateB = b.createdAt?.seconds || 0;
                    return dateA - dateB;
                });
            } else if (sortParam === 'termurah') {
                fetchedProducts.sort((a, b) => a.price - b.price);
            } else if (sortParam === 'termahal') {
                fetchedProducts.sort((a, b) => b.price - a.price);
            }
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    setActiveCategory(categoryParam || 'Semua');
    setActiveSort(sortParam || 'terbaru');
    fetchProducts();
  }, [categoryParam, sortParam]); // Rerun saat URL berubah

  // Fungsi Format Rupiah
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  // Handler Ganti Filter (Update URL)
  const handleFilterChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'Semua') {
        params.delete('category');
    } else {
        params.set('category', slug);
    }
    router.push(`/product?${params.toString()}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    router.push(`/product?${params.toString()}`);
  };

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* HEADER & FILTER AREA */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {activeCategory === 'Semua' ? 'Semua Produk' : `Kategori: ${activeCategory}`}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                <Link href="/" className="hover:text-[#9CAF88] transition-colors">Home</Link> 
                <span className="mx-2">&gt;</span> 
                <span className="text-gray-700">Produk</span>
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-600">Urutkan:</label>
                <select 
                    value={activeSort}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded-md text-sm py-2 px-3 focus:ring-1 focus:ring-[#9CAF88] focus:border-[#9CAF88] outline-none bg-white cursor-pointer"
                >
                    <option value="terbaru">Terbaru</option>
                    <option value="terlama">Terlama</option>
                    <option value="termurah">Harga Terendah</option>
                    <option value="termahal">Harga Tertinggi</option>
                </select>
            </div>
          </div>

          {/* Kategori Tags (Horizontal Scroll di Mobile) */}
          <div className="mt-6 overflow-x-auto hide-scrollbar pb-2">
            <div className="flex space-x-2">
                {categories.map((cat) => (
                    <button
                        key={cat.slug}
                        onClick={() => handleFilterChange(cat.slug)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 
                            ${activeCategory === cat.slug 
                                ? 'bg-[#9CAF88] text-white shadow-md' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
          </div>
        </header>

        {/* PRODUCT GRID */}
        {loading ? (
             // Loading State (Bisa pakai Skeleton yg sudah Anda buat di parent, 
             // tapi disini kita buat simple text/spinner lokal jika perlu transition)
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-gray-100 h-80 rounded-lg"></div>
                ))}
             </div>
        ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-lg font-medium">Tidak ada produk ditemukan.</p>
                <p className="text-sm mt-1">Coba ganti kategori atau filter lainnya.</p>
                <button 
                    onClick={() => handleFilterChange('Semua')}
                    className="mt-4 text-[#9CAF88] underline hover:text-[#7a8a6a]"
                >
                    Lihat Semua Produk
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <Link 
                    key={product.id} 
                    href={`/product/${product.slug}`} // Pastikan Anda punya page detail produk [slug]
                    className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                    {/* Gambar */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Badge Kategori Kecil */}
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                            {product.category}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                        <h3 className="text-gray-900 font-medium text-base line-clamp-2 min-h-[3rem] mb-1 group-hover:text-[#9CAF88] transition-colors">
                            {product.name}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-[#9CAF88] font-bold text-lg">
                                {formatRupiah(product.price)}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
            </div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}