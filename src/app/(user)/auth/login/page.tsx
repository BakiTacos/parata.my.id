'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth function
import { auth } from '../../../../lib/firebase'; // Import your Firebase auth instance

export default function Login() {
  // State for form inputs, loading, and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  // Handle form submission with Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in the user with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      // Redirect to the home on success
      router.push('/'); 
    } catch (err: any) {
      // Handle Firebase authentication errors
      let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.';
      switch (err.code) {
        case 'auth/invalid-credential':
          errorMessage = 'Email atau password salah. Silakan periksa kembali.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Tidak ada akun yang ditemukan dengan email ini.';
          break;
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
      setError(errorMessage);
    } finally {
      // Stop the loading indicator
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        {/* Header */}
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
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
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9CAF88] focus:border-transparent"
            />
          </div>

          {/* Password Input */}
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
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9CAF88] focus:border-transparent"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-gray-600 hover:text-[#9CAF88]"
            >
              Lupa Password?
            </Link>
          </div>
          
          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#9CAF88] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9CAF88] disabled:bg-gray-400"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Masuk'
              )}
            </button>
          </div>
        </form>

        {/* Register Link */}
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