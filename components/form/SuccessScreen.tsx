"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function SuccessScreen() {
  return (
    <div className="min-h-screen bg-[#F5F2EB] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 max-w-md w-full text-center space-y-6">
        <div className="flex flex-col items-center gap-4 mb-4">
          <Image src="/logo_cics.png" alt="CICS Logo" width={64} height={64} className="rounded-md" />
          <div className="w-12 h-12 bg-[#1A3626]/10 text-[#1A3626] rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
          </div>
        </div>
        
        <h2 className="font-serif text-3xl font-bold text-[#1A3626]">Thank You!</h2>
        <p className="text-gray-600">
          Your information has been successfully recorded. An email confirmation has been sent to you.
        </p>

        <div className="pt-6">
          <Link href="/" className="inline-block bg-[#1A3626] text-white font-medium py-3 px-8 rounded-lg hover:bg-[#12261a] transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
