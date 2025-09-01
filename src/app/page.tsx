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
      image: "https://placehold.co/1200x600/9CAF88/FFFFFF/png",
      title: "Discover Our New Collection",
      description: "High-quality products designed for modern living.",
    },
    {
      image: "https://placehold.co/1200x600/333333/FFFFFF/png",
      title: "Sustainable & Stylish",
      description: "Eco-friendly materials that don't compromise on style.",
    },
    {
      image: "https://placehold.co/1200x600/F3E9DC/333333/png",
      title: "Limited Time Offers",
      description: "Don't miss out on our exclusive seasonal discounts.",
    },
  ];

  return (
    // The p-4 class here sets the smallest padding for mobile
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 lg:p-20 pb-20 gap-12 sm:gap-16">
      <main className="flex flex-col gap-10 row-start-2 items-center w-full max-w-5xl">
        {/* Carousel Section */}
        <div className="w-full shadow-2xl rounded-lg overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="w-full"
          >
            {carouselItems.map((item, index) => (
              <SwiperSlide key={index} className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1200}
                  height={600}
                  // This class sets the mobile height to h-64 (256px)
                  className="object-cover w-full h-64 md:h-96"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4">
                  {/* This class sets the smallest title size to text-xl for mobile */}
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    {item.title}
                  </h2>
                  <p className="text-base md:text-lg text-gray-200 max-w-md">
                    {item.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

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
      <footer className="row-start-3 flex flex-col sm:flex-row gap-6 items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}