'use client'; // This is required for the carousel component

import Link from 'next/link'; // Make sure to import Link
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Home() {
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

  // Category data for the new section
  const categories = [
    { name: 'Dapur', slug: 'dapur' },
    { name: 'Ruang Tamu', slug: 'ruang-tamu' },
    { name: 'Kamar Tidur', slug: 'kamar-tidur' },
    { name: 'Kamar Mandi', slug: 'kamar-mandi' },
    { name: 'Elektronik', slug: 'elektronik' },
    { name: 'Dekorasi', slug: 'dekorasi' },
    { name: 'Lainnya', slug: 'lainnya' },
  ];

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
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
                  {item.title}
                </h2>
                <p className="text-base md:text-lg text-gray-700 max-w-md">
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. Main Content Wrapper */}
      <div className="font-sans w-full flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
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
                    className="flex-shrink-0 flex items-center justify-center text-center p-4 w-32 h-16 rounded-full bg-gray-200 text-gray-700 hover:bg-[#9CAF88] hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <span className="text-sm font-semibold whitespace-nowrap">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* TERLARIS Section */}
          <section className="w-full flex flex-col">
            <div className="flex justify-between items-center w-full mb-6 px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#9CAF88]">
                TERLARIS
              </h2>
              <Link href="/product?sort=terlaris" className="text-sm font-semibold text-gray-600 hover:underline">
                LIHAT SEMUA
              </Link>
            </div>
            <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex flex-row space-x-4 px-2 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4 sm:space-x-0 sm:px-0">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-[45%] sm:w-full bg-gray-200 rounded-lg shadow-sm aspect-square flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Produk {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NEW ARRIVALS Section */}
          <section className="w-full flex flex-col">
            <div className="flex justify-between items-center w-full mb-6 px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#9CAF88]">
                NEW ARRIVALS
              </h2>
              {/* FIX: Link updated to sort by 'terbaru' */}
              <Link href="/product?sort=terbaru" className="text-sm font-semibold text-gray-600 hover:underline">
                LIHAT SEMUA
              </Link>
            </div>
            <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex flex-row space-x-4 px-2 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4 sm:space-x-0 sm:px-0">
                {[...Array(5)].map((_, index) => (
                   <div key={index} className="flex-shrink-0 w-[45%] sm:w-full bg-gray-200 rounded-lg shadow-sm aspect-square flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Produk {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BLOGS Section */}
          <section className="w-full flex flex-col">
            <div className="flex justify-between items-center w-full mb-6 px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#9CAF88]">
                BLOGS
              </h2>
              <Link href="/blog" className="text-sm font-semibold text-gray-600 hover:underline">
                LIHAT SEMUA
              </Link>
            </div>
            <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex flex-row space-x-4 px-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-x-0 sm:px-0">
                {[...Array(3)].map((_, index) => (
                   <div key={index} className="flex-shrink-0 w-[70%] sm:w-full bg-gray-200 rounded-lg shadow-sm aspect-[4/3] flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Blog Post {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </main>
      </div>
      
      {/* Swiper & Custom Scrollbar Styles */}
      <style jsx global>{`
        /* Swiper Navigation & Pagination styles */
        .swiper-button-next,
        .swiper-button-prev {
          color: #000000;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px !important;
          font-weight: 900;
        }
        .swiper-pagination-bullet {
          background-color: #888888 !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #000000 !important;
        }

        /* Hide Scrollbar for Kategori section */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </>
  );
}