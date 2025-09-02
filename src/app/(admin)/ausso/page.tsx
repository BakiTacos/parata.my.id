import Link from 'next/link';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  PlusCircle,
  ArrowRight,
} from 'lucide-react';

// --- Mock Data (In a real app, you'd fetch this from your database) ---
const stats = {
  totalSales: 125750000,
  newOrders: 32,
  newCustomers: 15,
  totalProducts: 128,
};

const recentOrders = [
  { id: 'ORD-001', customer: 'Budi Santoso', date: '2025-09-02', total: 750000, status: 'Pending' },
  { id: 'ORD-002', customer: 'Citra Lestari', date: '2025-09-02', total: 1200000, status: 'Completed' },
  { id: 'ORD-003', customer: 'Agus Wijaya', date: '2025-09-01', total: 450000, status: 'Completed' },
  { id: 'ORD-004', customer: 'Dewi Anggraini', date: '2025-09-01', total: 2800000, status: 'Shipped' },
  { id: 'ORD-005', customer: 'Eko Prasetyo', date: '2025-08-31', total: 980000, status: 'Completed' },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// --- Main Dashboard Component ---
export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Selamat Datang Kembali, Admin!</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<DollarSign />} title="Total Sales" value={formatCurrency(stats.totalSales)} />
        <StatCard icon={<ShoppingCart />} title="New Orders" value={stats.newOrders.toString()} />
        <StatCard icon={<Users />} title="New Customers" value={stats.newCustomers.toString()} />
        <StatCard icon={<Package />} title="Total Products" value={stats.totalProducts.toString()} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Table (Larger Column) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pesanan Terbaru</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="p-3 font-medium text-gray-700">{order.id}</td>
                    <td className="p-3">{order.customer}</td>
                    <td className="p-3">{order.date}</td>
                    <td className="p-3">{formatCurrency(order.total)}</td>
                    <td className="p-3">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right mt-4">
            <Link href="/ausso/orders" className="text-sm font-semibold text-[#9CAF88] hover:underline">
              Lihat Semua Pesanan
            </Link>
          </div>
        </div>

        {/* Quick Actions (Smaller Column) */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Aksi Cepat</h2>
          <div className="space-y-4">
            <Link href="ausso/product/add" className="w-full flex items-center justify-between p-4 bg-[#9CAF88] text-white rounded-lg hover:bg-opacity-90 transition-colors">
              <div className="flex items-center gap-3">
                <PlusCircle />
                <span className="font-bold">Tambah Produk Baru</span>
              </div>
              <ArrowRight />
            </Link>
            <Link href="/ausso/product" className="w-full flex items-center justify-between p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <div className="flex items-center gap-3">
                <Package />
                <span className="font-bold">Kelola Produk</span>
              </div>
               <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
      <div className="bg-[#E8F0E5] p-3 rounded-full text-[#9CAF88]">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
  const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    Shipped: "bg-blue-100 text-blue-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  const className = `${baseClasses} ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`;
  return <span className={className}>{status}</span>;
}