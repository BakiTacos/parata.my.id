'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [productsDropdown, setProductsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    // Tutup mobile menu saat berpindah halaman
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Bagian Kiri: Logo & Navigasi Utama */}
          <div className="flex items-center">
            {/* Tombol menu mobile */}
            <div className="sm:hidden -ml-2 mr-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#333333] hover:text-[#A5D6A7] transition-colors">
                <Image
                      src="https://github.com/BakiTacos/image-host/blob/main/PARATA/LOGO/PA%20NORMAL.png?raw=true"
                      alt="parata-logo"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
              </Link>
            </div>
            {/* Menu Desktop */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-1">
                <Link
                href="/product"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  isActive('/article') ? 'text-[#A5D6A7] font-semibold' : 'text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50'
                }`}
              >
                Produk
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProductsDropdown((prev) => !prev)}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50"
                >
                  Kategori
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {productsDropdown && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      {['Dapur', 'Ruang Tamu', 'Kamar Tidur', 'Kamar Mandi'].map((label, index) => {
                        const slug = label.toLowerCase().replace(/\s+/g, '-');
                        return (
                          <Link
                            key={index}
                            href={`/product?category=${slug}`}
                            className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#A5D6A7] hover:text-white"
                            onClick={() => setProductsDropdown(false)}
                          >
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bagian Kanan: Aksi Pengguna (Keranjang & Profil) */}
          <div className="flex items-center space-x-2">
            {/* Ikon Shopping Cart */}
            <Link
              href="/cart"
              className="p-2 rounded-md text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-100 transition-colors"
              aria-label="Shopping Cart"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>

            {/* Link Teks Masuk/Daftar */}
            <Link
              href="/auth/login"
              className="hidden sm:flex items-center px-3 py-2 rounded-md text-sm font-medium text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50 transition-colors"
            >
              MASUK / DAFTAR
            </Link>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/product"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Produk
            </Link>
            <div className="py-2">
              <button
                onClick={() => setProductsDropdown(!productsDropdown)}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50"
              >
                Kategori
                <svg className={`h-4 w-4 transform transition-transform duration-200 ${productsDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {productsDropdown && (
                <div className="pl-4 mt-2 space-y-1">
                  {['Dapur', 'Ruang Tamu', 'Kamar Tidur', 'Kamar Mandi'].map((label, index) => {
                    const slug = label.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <Link
                        key={index}
                        href={`/product?category=${slug}`}
                        className="block px-3 py-2 rounded-md text-sm text-[#333333] hover:bg-[#A5D6A7] hover:text-white"
                        onClick={() => {
                          setProductsDropdown(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Link Login/Daftar di Mobile (Hanya Teks) */}
            <div className="border-t border-gray-200 pt-3">
              <Link
                href="/auth/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Masuk / Daftar
              </Link>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}