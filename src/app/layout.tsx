import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProgressBar from "@/components/ProgressBar";
import CustomCursor from "@/components/CustomCursor";
import Analytics from "@/components/Analytics";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Mohamed Elsheikh - Cybersecurity Professional",
    template: "%s | Mohamed Elsheikh"
  },
  description: "Head of Cyber Security at Quota Libex | AWS Academy Graduate | Cybersecurity Expert | Web Developer | IT Management Leader",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  keywords: [
    "Mohamed Elsheikh",
    "Cybersecurity",
    "AWS",
    "Web Development",
    "IT Management",
    "Security Protocols",
    "Cloud Architecture",
    "Python Developer",
    "JavaScript Developer",
    "Linux Administrator",
    "Security Risk Assessment",
    "Threat Detection",
    "System Administration",
    "Portfolio",
    "Professional"
  ],
  authors: [{ name: "Mohamed Elsheikh", url: "https://mohamedelsheikh.dev" }],
  creator: "Mohamed Elsheikh",
  publisher: "Mohamed Elsheikh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mohamedelsheikh.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mohamed Elsheikh - Cybersecurity Professional",
    description: "Head of Cyber Security at Quota Libex | AWS Academy Graduate | Cybersecurity Expert | Web Developer",
    url: 'https://mohamedelsheikh.dev',
    siteName: 'Mohamed Elsheikh Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mohamed Elsheikh - Cybersecurity Professional',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Elsheikh - Cybersecurity Professional',
    description: 'Head of Cyber Security at Quota Libex | AWS Academy Graduate | Cybersecurity Expert',
    creator: '@mohamedelsheikh',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Analytics />
          <ProgressBar />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
