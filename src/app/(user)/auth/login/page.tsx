'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      router.push('/');
    } catch (error: unknown) { // ✅ Catch error as 'unknown'
      let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.';
      
      // ✅ Safely check the error's structure before using it
      if (error && typeof error === 'object' && 'code' in error) {
        const err = error as { code: string };
        switch (err.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            errorMessage = 'Email atau password salah. Silakan periksa kembali.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Akses ke akun ini telah dinonaktifkan sementara karena terlalu banyak upaya login yang gagal.';
            break;
          default:
            console.error("Firebase Auth Error:", err);
            break;
        }
      } else {
        // Handle cases where the error is not the expected object
        console.error("An unexpected error occurred:", error);
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <Link href="/">
            <Image
              src="https://github.com/BakiTacos/image-host/blob/main/PARATA/LOGO/PA%20NORMAL.png?raw=true"
              alt="parata-logo"
              width={50}
              height={50}
              className="mx-auto"
            />
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Selamat Datang Kembali
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Masuk ke akun Anda untuk melanjutkan.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9CAF88] focus:border-transparent text-black"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9CAF88] focus:border-transparent text-black"
            />
          </div>
          <div className="text-right">
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-gray-600 hover:text-[#9CAF88]"
            >
              Lupa Password?
            </Link>
          </div>
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#9CAF88] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9CAF88] disabled:bg-gray-400"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Masuk'}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-500">
          Belum punya akun?{' '}
          <Link
            href="/auth/register"
            className="font-bold text-[#9CAF88] hover:underline"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}