'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define a type for our product for type safety
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
  productSold: number;
};

// Mock data (same as before)
const mockProducts: Product[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Produk Estetik ${i + 1}`,
  price: Math.floor(Math.random() * (2000000 - 100000 + 1)) + 100000,
  image: `https://placehold.co/400x400/F3E9DC/333333/png?text=Produk+${i+1}`,
  slug: `produk-estetik-${i + 1}`,
  category: 'Ruang Tamu',
  productSold: Math.floor(Math.random() * 500) + 10,
}));

export default function ProductPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products] = useState<Product[]>(mockProducts);
  
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get('page');
    return page ? parseInt(page, 10) : 1;
  });

  const [sortOption, setSortOption] = useState(() => {
    const sort = searchParams.get('sort');
    if (['harga-terendah', 'harga-tertinggi', 'terbaru', 'terlaris'].includes(sort || '')) {
      return sort as string;
    }
    return 'terbaru';
  });

  const productsPerPage = 16;

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortOption) {
      case 'terlaris':
        sorted.sort((a, b) => b.productSold - a.productSold);
        break;
      case 'harga-terendah':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'harga-tertinggi':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted.sort((a, b) => b.id - a.id);
        break;
    }
    return sorted;
  }, [products, sortOption]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const updateURL = (params: { [key: string]: string }) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(params).forEach(([key, value]) => current.set(key, value));
    if ('sort' in params && !('page' in params)) current.set('page', '1');
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    setCurrentPage(1);
    updateURL({ sort: newSortOption });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
      updateURL({ page: page.toString() });
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Semua Produk</h1>
              <p className="text-sm text-gray-500 mt-1">
                <Link href="/" className="hover:text-[#9CAF88]">Home</Link> &gt; <span>Produk</span>
              </p>
            </div>
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Urutkan:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-[#9CAF88] focus:border-transparent"
              >
                <option value="terbaru">Terbaru (Reset)</option>
                <option value="terlaris">Terlaris</option>
                <option value="harga-terendah">Harga Terendah</option>
                <option value="harga-tertinggi">Harga Tertinggi</option>
              </select>
            </div>
          </div>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <Link href={`/product/${product.slug}`} key={product.id} className="group">
              <div className="bg-gray-50 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <div className="w-full aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-md font-semibold text-gray-800 truncate">{product.name}</h3>
                  <p className="text-lg font-bold text-[#9CAF88] mt-2">{formatCurrency(product.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <nav className="flex items-center justify-center mt-12 border-t pt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 mx-1 text-gray-600 bg-white rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <ChevronLeft size={16} />
            <span className="ml-2 text-sm">Previous</span>
          </button>

          <div className="hidden sm:flex">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 mx-1 text-sm rounded-md border ${
                  currentPage === page
                    ? 'bg-[#9CAF88] text-white border-[#9CAF88]'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <div className="sm:hidden px-4 py-2 text-sm">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 mx-1 text-gray-600 bg-white rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <span className="mr-2 text-sm">Next</span>
            <ChevronRight size={16} />
          </button>
        </nav>
      </div>
    </div>
  );
}