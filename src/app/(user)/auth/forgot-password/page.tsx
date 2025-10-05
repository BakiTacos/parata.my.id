'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, MailCheck } from 'lucide-react';
import Image from 'next/image';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../lib/firebase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (error: unknown) { // ✅ Catch error as 'unknown'
      let errorMessage = 'Gagal mengirim email. Silakan coba lagi.';

      // ✅ Safely check the error's structure before using it
      if (error && typeof error === 'object' && 'code' in error) {
        const err = error as { code: string };
        if (err.code === 'auth/user-not-found') {
          errorMessage = 'Email yang Anda masukkan tidak terdaftar.';
        } else {
          console.error("Firebase Error:", err);
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
        {submitted ? (
          <div className="text-center">
            <MailCheck size={60} className="mx-auto text-[#9CAF88]" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Periksa Email Anda
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Kami telah mengirimkan tautan untuk mengatur ulang password ke{' '}
              <strong className="text-gray-700">{email}</strong>. Silakan periksa kotak masuk Anda.
            </p>
            <Link
              href="/auth/login"
              className="block w-full mt-6 py-3 px-4 rounded-md shadow-sm text-sm font-bold text-white bg-[#9CAF88] hover:bg-opacity-90"
            >
              Kembali ke Login
            </Link>
          </div>
        ) : (
          <>
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
                Lupa Password?
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang password.
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
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#9CAF88] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9CAF88] disabled:bg-gray-400"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Kirim Tautan Reset'
                  )}
                </button>
              </div>
            </form>
            <p className="text-sm text-center text-gray-500">
              Ingat password Anda?{' '}
              <Link
                href="/auth/login"
                className="font-bold text-[#9CAF88] hover:underline"
              >
                Masuk di sini
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}