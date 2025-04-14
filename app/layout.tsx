import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import {Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import { cn } from '@/app/lib/utils';
import { ThemeProvider } from "@/components/theme-provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ['300' , '400' , '500' , '600' , '700'],
  variable: "--font-sans",

})
export const metadata: Metadata = {
  title: "Jasiri Hospital App",
  description: "Hospital app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      //   className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      // >
      //   {children}
      className={cn ('min-h-screen bg-dark-300 font-sans antialised font-sans.variable')}> 
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            // enableSystem
            // disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      {children}
      </body>
    </html>
  );
}

