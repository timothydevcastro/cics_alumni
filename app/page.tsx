import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#2D332F] font-sans selection:bg-[#1A3626] selection:text-[#F5F2EB] flex flex-col">
      {/* Header */}
      <header className="w-full px-12 md:px-24 py-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Image src="/logo_cics.png" alt="CICS Logo" width={80} height={80} className="rounded-xl shadow-sm" />
          <div>
            <h1 className="font-bold text-2xl md:text-3xl leading-tight text-[#1A3626] tracking-tight">CICS Alumni</h1>
            <p className="text-[10px] text-[#1A3626] font-bold uppercase tracking-[0.3em] opacity-70">RECORDER SYSTEM</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-12 md:px-24 py-12 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
        {/* Left Column */}
        <div className="space-y-8 md:space-y-12">
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] text-[#1A3626] tracking-tight text-left">
            Your story<br />
            matters.<br />
            Share it with<br />
            us.
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg font-medium opacity-80 text-left">
            Help us track the success of CICS graduates. Your information supports CHED compliance and strengthens our alumni community.
          </p>

          <div className="pt-6 flex flex-col items-start gap-6">
            <Link 
              href="/form" 
              className="w-full sm:w-auto bg-[#1A3626] text-white hover:bg-[#12261a] transition-all transform hover:scale-[1.05] active:scale-[0.95] font-bold py-6 px-16 rounded-2xl shadow-[0_20px_50px_rgba(26,54,38,0.2)] flex flex-col items-center group"
            >
              <span className="text-xl mb-1 group-hover:tracking-wider transition-all">Fill Out Form</span>
              <span className="text-[10px] opacity-60 uppercase tracking-[0.2em] font-bold">Takes ~3 minutes</span>
            </Link>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative w-full flex justify-end items-center">
          <div className="absolute inset-0 bg-[#E8E4D9] rounded-full opacity-30 blur-[100px] scale-150"></div>
          <div className="relative z-10 w-full max-w-[650px] rounded-[40px] overflow-hidden border-[12px] border-white shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
            <Image 
              src="/alumni_illustration.png" 
              alt="Alumni Networking" 
              width={800}
              height={800}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </main>

      {/* Simplified Footer Stats */}
      <footer className="w-full border-t border-gray-100 bg-white/40 backdrop-blur-md py-12 px-12 md:px-24 mt-auto">
        <div className="flex flex-wrap justify-between items-center gap-12">
          <div className="flex flex-col items-start">
            <p className="text-4xl font-bold text-[#1A3626] mb-1">6</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Steps to Complete</p>
          </div>
          <div className="h-12 w-px bg-gray-200 hidden lg:block opacity-50"></div>
          <div className="flex flex-col items-start">
            <p className="text-4xl font-bold text-[#1A3626] mb-1">~3 min</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Estimated Time</p>
          </div>
          <div className="h-12 w-px bg-gray-200 hidden lg:block opacity-50"></div>
          <div className="flex flex-col items-start">
            <p className="text-4xl font-bold text-[#1A3626] mb-1">100%</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Secure Privacy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
