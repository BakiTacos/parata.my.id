'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, MailCheck } from 'lucide-react';
import Image from 'next/image';

export default function ForgotPassword() {
  // State for form input, loading, submission status, and errors
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // --- Placeholder for your password reset logic ---
    // In a real application, you would make an API call here to send a reset email.
    setTimeout(() => {
      console.log("Password reset request for:", email);
      setLoading(false);
      setSubmitted(true); // Switch to the confirmation view
    }, 1500);
    // --- End of placeholder ---
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        
        {/* Conditional rendering: Show confirmation or the form */}
        {submitted ? (
          // --- Confirmation View ---
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
          // --- Form View ---
          <>
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
                Lupa Password?
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang password.
              </p>
            </div>

            {/* Forgot Password Form */}
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
                    'Kirim Tautan Reset'
                  )}
                </button>
              </div>
            </form>

            {/* Back to Login Link */}
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