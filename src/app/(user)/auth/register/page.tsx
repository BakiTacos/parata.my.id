'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 👈 Impor useRouter
import { Loader2 } from 'lucide-react';
// 👇 Impor fungsi-fungsi Firebase yang dibutuhkan
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../../../lib/firebase'; // 👈 Pastikan path ini benar

export default function Register() {
  // State for form inputs, loading, and errors
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // 👈 Inisialisasi router

  // Fungsi handleSubmit yang sudah diperbarui dengan logika Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // --- Validasi sisi klien ---
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }
    if (password.length < 8) {
      setError('Password minimal harus 8 karakter.');
      return;
    }
    // --- Akhir validasi ---

    setLoading(true);

    try {
      // 1. Buat pengguna baru dengan email dan password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      // 2. Simpan nama lengkap ke profil pengguna
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      console.log('Registration successful, user created:', userCredential.user);
      
      // 3. Arahkan ke halaman login atau homepage setelah berhasil
      router.push('/auth/login?registered=true');

    } catch (error: unknown) {
      let errorMessage = 'Gagal membuat akun. Silakan coba lagi.';
      if (error && typeof error === 'object' && 'code' in error) {
        const err = error as { code: string };
        switch (err.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Email ini sudah terdaftar. Silakan gunakan email lain.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password terlalu lemah. Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Format email tidak valid.';
            break;
          default:
            console.error('Firebase Register Error:', err);
            break;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
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
            Buat Akun Baru
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Mulai perjalanan Anda bersama kami.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Lengkap
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9CAF88] focus:border-transparent text-black"
            />
          </div>

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
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9CAF88] focus:border-transparent text-black"
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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9CAF88] focus:border-transparent text-black"
            />
          </div>
          
          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Konfirmasi Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9CAF88] focus:border-transparent text-black"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 text-center pt-2">{error}</p>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#9CAF88] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9CAF88] disabled:bg-gray-400"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Daftar'
              )}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-500 pt-4">
          Sudah punya akun?{' '}
          <Link
            href="/auth/login"
            className="font-bold text-[#9CAF88] hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}