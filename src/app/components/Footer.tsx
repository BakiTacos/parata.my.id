import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const policyLinks = [
    { name: 'Kebijakan Pengembalian', href: '/kebijakan/pengembalian' },
    { name: 'Kebijakan Privasi', href: '/kebijakan/privasi' },
    { name: 'Syarat & Ketentuan', href: '/kebijakan/syarat-ketentuan' },
    { name: 'Kebijakan Pengiriman', href: '/kebijakan/pengiriman' },
    { name: 'Kebijakan Layanan Pelanggan', href: '/kebijakan/layanan-pelanggan' },
  ];

  return (
    <footer id="footer" className="bg-[#F9F9F7] text-[#9CAF88] py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-4">
          
          {/* Column 1: Logo & Tagline */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://github.com/BakiTacos/image-host/blob/main/PARATA/LOGO/PA%20NORMAL.png?raw=true"
                alt="Parata Logo"
                width={40}
                height={40}
              />
              <h2 className="text-3xl font-bold">PARATA</h2>
            </div>
            <p className="text-sm font-semibold">PERALATAN RUMAH TANGGA KITA</p>
            <p className="text-sm">TERPERCAYA DAN BERKUALITAS</p>
          </div>

          {/* Column 2: Kebijakan Kami */}
          <div className="lg:col-span-3">
            <h3 className="font-bold uppercase tracking-wider mb-4">Kebijakan Kami</h3>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Sosial Media */}
          <div className="lg:col-span-2">
            <h3 className="font-bold uppercase tracking-wider mb-4">Sosial Media</h3>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-6 w-6 hover:opacity-75" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-6 w-6 hover:opacity-75" />
              </a>
            </div>
          </div>
          
          {/* Column 4: Hubungi Kami */}
          <div className="lg:col-span-3">
            <h3 className="font-bold uppercase tracking-wider mb-4">Hubungi Kami</h3>
            <p className="text-sm">+620821</p>
            <p className="text-sm">parata.osho@gmail.com</p>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-[#E0E0E0] text-center">
          <p className="text-sm uppercase tracking-wider">
            Copyright &copy; {new Date().getFullYear()} PARATA
          </p>
        </div>
      </div>
    </footer>
  );
}