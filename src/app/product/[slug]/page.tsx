import { Suspense } from 'react';
import ProductPageClient from './ProductPageClient';
import Link from 'next/link';

// A simple loading skeleton to show as a fallback
function LoadingSkeleton() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Semua Produk</h1>
              <p className="text-sm text-gray-500 mt-1">
                <Link href="/" className="hover:text-[#9CAF88]">Home</Link> &gt; <span>Produk</span>
              </p>
            </div>
            <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-lg animate-pulse">
              <div className="w-full aspect-square bg-gray-200"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default function ProductPage() {
  return (
    // Suspense wraps the client component, showing a fallback while it loads
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductPageClient />
    </Suspense>
  );
}