import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = "https://mohamedelsheikh.dev";

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0f14" },
    { media: "(prefers-color-scheme: light)", color: "#fafbfc" },
  ],
};

export const metadata: Metadata = {
  title: { default: "Mohamed Elsheikh — Head of Cyber Security", template: "%s | Mohamed Elsheikh" },
  description: "Head of Cyber Security at Quota Libex. AWS-certified, Google & Microsoft credentialed. Building secure, scalable systems.",
  icons: { icon: "/favicon.ico" },
  keywords: ["Mohamed Elsheikh", "Cybersecurity", "Head of Cyber Security", "AWS", "Cloud Architecture", "Portfolio"],
  authors: [{ name: "Mohamed Elsheikh", url: siteUrl }],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mohamed Elsheikh — Head of Cyber Security",
    description: "AWS-certified cybersecurity leader. Security protocols, cloud architecture, threat detection.",
    url: siteUrl, siteName: "Mohamed Elsheikh",
    images: [{ url: "/personal.jpg", width: 800, height: 800, alt: "Mohamed Elsheikh" }],
    locale: "en_US", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Mohamed Elsheikh — Head of Cyber Security", images: ["/personal.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.add(d?'dark':'light')}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <StructuredData />
      </head>
      <body className="font-sans">
        <a href="#main" className="skip-link">Skip to content</a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
