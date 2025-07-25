import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import AuthListener from '@/components/AuthListener';
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Crafter",
  description: "Get job-ready fast!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 const cookieStore = await cookies();

const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: cookieStore,
  }
);
  // Optional: you can use this to pre-fetch the session if needed
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthListener />
        {children}
        <Toaster richColors={false} position="top-center" />
      </body>
    </html>
  );
}