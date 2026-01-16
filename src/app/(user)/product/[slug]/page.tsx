import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Package, Info } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import ProductActionButtons from '../../../components/ProductActionButtons'; 

// --- FETCH DATA ---
// --- FETCH DATA ---
async function getProductBySlug(slug: string) {
  console.log("🔍 Mencari produk dengan slug:", slug); 

  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("❌ Produk tidak ditemukan di Firebase untuk slug:", slug);
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    
    // --- PERBAIKAN UTAMA DI SINI ---
    // Kita harus konversi Timestamp Firestore menjadi String biasa (ISO String)
    // agar Next.js tidak error saat mengirim data ini ke Client Component.
    
    const serializedProduct = {
      id: doc.id,
      ...data,
      // Cek apakah field createdAt ada, jika ada ubah jadi string, jika tidak null
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
      // Lakukan hal yang sama jika ada field updated_at atau tipe tanggal lainnya
    };

    console.log("✅ Produk ditemukan:", data.name);
    
    return serializedProduct as any; // Cast ke any sementara atau sesuaikan interface
  } catch (error) {
    console.error("🔥 Error fetch data:", error);
    return null;
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Update Tipe Params untuk Next.js 15
type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  // PENTING: Di Next.js 15, params harus di-await!
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const decodedSlug = decodeURIComponent(slug);
  
  const product = await getProductBySlug(decodedSlug);

  if (!product) {
    // Ini yang menyebabkan halaman jadi 404 jika data kosong
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#9CAF88]">Home</Link> 
          <span>&gt;</span> 
          <Link href="/product" className="hover:text-[#9CAF88]">Produk</Link> 
          <span>&gt;</span> 
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* FOTO */}
          <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
             <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
             />
          </div>

          {/* DETAIL */}
          <div className="flex flex-col">
            <span className="w-fit mb-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
              {product.category}
            </span>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-3xl text-[#9CAF88] font-bold mt-4">
              {formatCurrency(product.price)}
            </p>

            <div className="flex gap-6 mt-6 border-y border-gray-100 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package size={18} />
                    <span>Stok: <b className="text-gray-900">{product.stock || 0}</b></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Info size={18} />
                    <span>Berat: <b className="text-gray-900">{product.weight || 0}g</b></span>
                </div>
            </div>

            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-900 mb-2">Deskripsi Produk</h3>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                {product.description}
              </div>
            </div>

            {/* TOMBOL AKSI */}
            <ProductActionButtons product={product} />

          </div>
        </div>
      </div>
    </div>
  );
}