import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FlashMind",
  description:
    "Create flashcards, study at your own pace, and actually remember what you learn. No account needed.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="
          min-h-full 
          bg-gradient-to-br from-black via-zinc-900 to-black
          text-white 
          flex flex-col
          overflow-x-hidden
        "
      >
        {/* Floating Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="pt-24 px-4 flex-grow">
          {children}
        </main>

        {/* --- STARK WHITE PORTRAIT "PET" (Responsive) --- */}
        <div className="
          fixed 
          bottom-4 right-4   /* Tighter to corner on mobile */
          sm:bottom-8 sm:right-8 /* Standard spacing on desktop */
          z-[100] flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer
        ">
          <Link 
            href="/flashcards" 
            className="
              relative 
              flex items-center justify-center 
              w-[50px] h-[65px]    /* Smaller on mobile */
              sm:w-[65px] sm:h-[85px] /* Standard size on desktop */
              bg-white 
              border-[2px] sm:border-[3px] border-black
              rounded-md 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
              sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
              hover:-translate-y-2 hover:translate-x-[-2px]
              transition-all duration-300 ease-in-out
              active:scale-95
            "
          >
            {/* Outer Glow on Hover */}
            <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* THE SHARP DIAMOND (CSS DRAWN) */}
            <div className="relative z-10">
              <div className="
                w-6 h-6         /* Smaller diamond on mobile */
                sm:w-8 sm:h-8   /* Standard diamond on desktop */
                bg-white 
                border-[2px] border-black 
                rotate-45 
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                group-hover:scale-110
                transition-transform
              " />
            </div>
          </Link>

          {/* THE HIGHLIGHTED TEXT */}
          <span className="
            text-[9px] sm:text-[11px] /* Tiny text on mobile */
            font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] 
            text-blue-500 
            opacity-0 group-hover:opacity-100 
            transition-all duration-300 
            pointer-events-none
            group-hover:scale-110
            text-center
          ">
            My Cards
          </span>
        </div>
        {/* -------------------------------------- */}

      </body>
    </html>
  );
}