import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#2D332F] font-sans selection:bg-[#1A3626] selection:text-[#F5F2EB] flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Image src="/logo_cics.png" alt="CICS Logo" width={96} height={96} className="rounded-md" />
          <div>
            <h1 className="font-bold text-xl md:text-2xl leading-tight text-[#1A3626]">CICS Alumni</h1>
            <p className="text-xs text-[#1A3626] font-bold uppercase tracking-[0.2em]">RECORDER SYSTEM</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 pt-8 md:pt-16 pb-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-6 md:space-y-8 max-w-xl text-center md:text-left">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] text-[#1A3626]">
            Your story<br />
            matters.<br />
            Share it with<br />
            us.
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
            Help us track the success of CICS graduates. Your information supports CHED compliance and strengthens our alumni community.
          </p>

          <div className="pt-4 flex flex-col items-center md:items-start gap-4">
            <Link 
              href="/form" 
              className="w-full sm:w-auto bg-[#1A3626] text-white hover:bg-[#12261a] transition-all transform hover:scale-[1.02] active:scale-[0.98] font-bold py-4 px-12 rounded-xl shadow-lg flex flex-col items-center"
            >
              <span className="text-lg">Fill Out Form</span>
              <span className="text-[10px] opacity-80 uppercase tracking-widest font-normal">Takes ~3 minutes</span>
            </Link>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative w-full max-w-md mx-auto order-last md:order-none mt-8 md:mt-0 flex justify-center items-center">
          <div className="absolute inset-0 bg-[#E8E4D9] rounded-full opacity-40 blur-3xl scale-110"></div>
          <div className="relative z-10 w-full rounded-3xl overflow-hidden border-8 border-white shadow-2xl transition-transform duration-500">
            <Image 
              src="/alumni_illustration.png" 
              alt="Alumni Networking" 
              width={500}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </main>

      {/* Simplified Footer Stats */}
      <footer className="w-full border-t border-gray-200 bg-white/50 backdrop-blur-sm py-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between gap-8 text-center md:text-left">
          <div>
            <p className="text-2xl font-bold text-[#1A3626]">6</p>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Steps</p>
          </div>
          <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
          <div>
            <p className="text-2xl font-bold text-[#1A3626]">~3 min</p>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Avg. Time</p>
          </div>
          <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
          <div>
            <p className="text-2xl font-bold text-[#1A3626]">100%</p>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Secure</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
