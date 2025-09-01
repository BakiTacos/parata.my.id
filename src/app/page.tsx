'use client'; // This is required for the carousel component

import Image from "next/image";
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

  return (
    <>
      {/* 1. Carousel is now a full-screen, edge-to-edge hero section */}
      <div className="w-full h-screen relative bg-black">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          {carouselItems.map((item, index) => (
            <SwiperSlide key={index} className="bg-black">
              {/* The content is now centered inside the black slide */}
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  {item.title}
                </h2>
                <p className="text-base md:text-lg text-gray-300 max-w-md">
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. All other content is now in a separate, padded container below the carousel */}
      <div className="font-sans w-full flex justify-center p-8 sm:p-12 lg:p-20">
        <main className="flex flex-col gap-10 items-center w-full max-w-5xl">
          {/* Original Content Section */}
          <div className="flex flex-col gap-8 items-center text-center sm:text-left">
             <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
            <ol className="font-mono list-inside list-decimal text-sm/6">
              <li className="mb-2">
                Get started by editing{" "}
                <code className="bg-black/[.05] dark:bg-white/[.06] font-semibold px-1 py-0.5 rounded">
                  src/app/page.tsx
                </code>.
              </li>
              <li>Save and see your changes instantly.</li>
            </ol>
          </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>
        </main>
      </div>
      
      {/* 3. This style block is updated for the new design */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #ffffff;
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
          background-color: #ffffff !important;
        }
      `}</style>
    </>
  );
}