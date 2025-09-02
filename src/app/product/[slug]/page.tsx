import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

// --- Mock Data & Fetching (Same as your product list page) ---
type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  sku: string;
  images: string[];
};

const mockProducts: Product[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Produk Estetik ${i + 1}`,
  slug: `produk-estetik-${i + 1}`,
  price: Math.floor(Math.random() * (2000000 - 100000 + 1)) + 100000,
  description: `Deskripsi detail untuk Produk Estetik ${i + 1}. Dibuat dengan bahan berkualitas tinggi untuk menambah keindahan rumah Anda.`,
  category: i % 2 === 0 ? 'Ruang Tamu' : 'Kamar Tidur',
  sku: `PRT-00${i + 1}`,
  images: [`https://placehold.co/600x600/F3E9DC/333333/png?text=Produk+${i+1}`],
  productSold: Math.floor(Math.random() * 500) + 10,
}));

const getProductBySlug = (slug: string): Product | undefined => {
  return mockProducts.find((p) => p.slug === slug);
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
};


// --- The Page Component ---
export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#9CAF88]">Home</Link> &gt; 
          <Link href="/product" className="hover:text-[#9CAF88]"> Produk</Link> &gt; 
          <span className="text-gray-800"> {product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="w-full aspect-square relative rounded-lg overflow-hidden">
             <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-3xl text-[#9CAF88] font-bold mt-4">{formatCurrency(product.price)}</p>
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-900">Deskripsi</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            <div className="mt-8">
              <button className="w-full mt-6 flex items-center justify-center gap-2 py-3 bg-[#9CAF88] text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 transition-colors">
                <ShoppingCart size={20} />
                Tambah ke Keranjang
              </button>
            </div>

            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
              <p className="text-sm text-gray-500">Kategori: {product.category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}