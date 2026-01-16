'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { db } from '@/lib/firebase'; // Pastikan path ini benar
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Tipe data untuk Produk (agar TypeScript tidak bingung)
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
}

export default function Home() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 1. FETCH DATA DARI FIREBASE ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');

        // A. Logika New Arrivals (Max 14 Hari ke belakang)
        const today = new Date();
        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(today.getDate() - 14);

        // Query: Ambil yang dibuat >= 14 hari lalu, urutkan dari yang terbaru
        // Catatan: Jika error "index required", cek console browser
        const newArrivalsQuery = query(
          productsRef,
          where('createdAt', '>=', fourteenDaysAgo),
          orderBy('createdAt', 'desc'),
          limit(10)
        );

        // B. Logika Terlaris (Sementara kita ambil 5 produk random/terlama sebagai contoh)
        // Nanti bisa diganti logic berdasarkan jumlah terjual
        const bestSellersQuery = query(
          productsRef,
          limit(5)
        );

        const [newArrivalsSnapshot, bestSellersSnapshot] = await Promise.all([
            getDocs(newArrivalsQuery),
            getDocs(bestSellersQuery)
        ]);

        // Mapping data
        const newArrivalsData = newArrivalsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];

        const bestSellersData = bestSellersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];

        setNewArrivals(newArrivalsData);
        setBestSellers(bestSellersData);

      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- DATA STATIS ---
  const carouselItems = [
    {
      title: "Discover Our New Collection",
      description: "High-quality products designed for modern living.",
    },
    {
      title: "Sustainable & Stylish",
      description: "Eco-friendly materials that don't compromise on style.",
    },
    {
      title: "Limited Time Offers",
      description: "Don't miss out on our exclusive seasonal discounts.",
    },
  ];

  const categories = [
    { name: 'Dapur', slug: 'Dapur' }, // Sesuaikan slug dengan value di database (case sensitive kadang berpengaruh)
    { name: 'Ruang Tamu', slug: 'Ruang Tamu' },
    { name: 'Kamar Tidur', slug: 'Kamar Tidur' },
    { name: 'Kamar Mandi', slug: 'Kamar Mandi' },
    { name: 'Elektronik', slug: 'Elektronik' },
    { name: 'Dekorasi', slug: 'Dekorasi' },
    { name: 'Lainnya', slug: 'Lainnya' },
  ];

  // Helper untuk format Rupiah
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <>
      {/* 1. Carousel Hero Section */}
      <div className="w-full h-[60vh] relative bg-gray-300">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          {carouselItems.map((item, index) => (
            <SwiperSlide key={index} className="bg-gray-300">
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-gradient-to-t from-gray-400 to-gray-200">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-4 drop-shadow-md">
                  {item.title}
                </h2>
                <p className="text-base md:text-lg text-gray-800 max-w-md font-medium">
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. Main Content Wrapper */}
      <div className="font-sans w-full flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white text-gray-900">
        <main className="flex flex-col gap-16 items-center w-full max-w-7xl">
          
          {/* KATEGORI Section */}
          <section className="w-full flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#9CAF88] text-center mb-6">
              KATEGORI
            </h2>
            <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex flex-row space-x-4 px-2 sm:px-0">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/product?category=${category.slug}`}
                    className="flex-shrink-0 flex items-center justify-center text-center p-4 w-32 h-16 rounded-full bg-gray-100 border border-gray-200 text-gray-700 hover:bg-[#9CAF88] hover:text-white hover:border-[#9CAF88] transition-all duration-300 shadow-sm"
                  >
                    <span className="text-sm font-semibold whitespace-nowrap">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* TERLARIS Section (Menggunakan Data Fetch) */}
          <section className="w-full flex flex-col">
            <div className="flex justify-between items-center w-full mb-6 px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#9CAF88]">
                TERLARIS
              </h2>
              <Link href="/product?sort=best-seller" className="text-sm font-semibold text-gray-500 hover:text-[#9CAF88] hover:underline transition-colors">
                LIHAT SEMUA
              </Link>
            </div>
            
            <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex flex-row space-x-4 px-2 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4 sm:space-x-0 sm:px-0">
                {loading ? (
                    // Skeleton Loading
                    [...Array(5)].map((_, i) => (
                        <div key={i} className="flex-shrink-0 w-[160px] sm:w-full h-64 bg-gray-100 animate-pulse rounded-lg"></div>
                    ))
                ) : bestSellers.map((product) => (
                  <Link key={product.id} href={`/product/${product.slug}`} className="group flex-shrink-0 w-[160px] sm:w-full block">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        {/* Gambar Produk */}
                        <div className="aspect-square relative w-full bg-gray-100 overflow-hidden">
                             <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                             />
                        </div>
                        {/* Info Produk */}
                        <div className="p-3">
                            <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">{product.name}</h3>
                            <p className="text-[#9CAF88] font-bold text-sm mt-2">{formatRupiah(product.price)}</p>
                        </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* NEW ARRIVALS Section (Data < 14 Hari) */}
          <section className="w-full flex flex-col">
            <div className="flex justify-between items-center w-full mb-6 px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#9CAF88]">
                NEW ARRIVALS
              </h2>
              <Link href="/product?sort=newest" className="text-sm font-semibold text-gray-500 hover:text-[#9CAF88] hover:underline transition-colors">
                LIHAT SEMUA
              </Link>
            </div>
            
            {newArrivals.length === 0 && !loading ? (
                <div className="w-full text-center py-8 text-gray-400 italic bg-gray-50 rounded-lg">
                    Belum ada produk baru dalam 2 minggu terakhir.
                </div>
            ) : (
                <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex flex-row space-x-4 px-2 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4 sm:space-x-0 sm:px-0">
                    {loading ? (
                         [...Array(5)].map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-[160px] sm:w-full h-64 bg-gray-100 animate-pulse rounded-lg"></div>
                        ))
                    ) : newArrivals.map((product) => (
                    <Link key={product.id} href={`/product/${product.slug}`} className="group flex-shrink-0 w-[160px] sm:w-full block">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow relative">
                            {/* Badge New */}
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
                                BARU
                            </div>

                            <div className="aspect-square relative w-full bg-gray-100 overflow-hidden">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-3">
                                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">{product.name}</h3>
                                <p className="text-[#9CAF88] font-bold text-sm mt-2">{formatRupiah(product.price)}</p>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
                </div>
            )}
          </section>

          {/* BLOGS Section (Masih Statis) */}
          <section className="w-full flex flex-col">
            <div className="flex justify-between items-center w-full mb-6 px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#9CAF88]">
                BLOGS
              </h2>
              <Link href="/blog" className="text-sm font-semibold text-gray-500 hover:text-[#9CAF88] hover:underline transition-colors">
                LIHAT SEMUA
              </Link>
            </div>
            <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex flex-row space-x-4 px-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-x-0 sm:px-0">
                {[...Array(3)].map((_, index) => (
                   <div key={index} className="flex-shrink-0 w-[80%] sm:w-full bg-gray-100 rounded-lg shadow-sm aspect-[4/3] flex items-center justify-center border border-gray-200">
                    <span className="text-gray-400 text-sm">Coming Soon Blog {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </main>
      </div>
      
      {/* Styles */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #000000;
        }
        .swiper-pagination-bullet {
          background-color: #888888 !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #000000 !important;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}