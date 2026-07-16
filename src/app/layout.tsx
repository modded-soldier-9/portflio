import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-display", display: "swap", style: ["normal", "italic"] });

const siteUrl = "https://mohamedelsheikh.dev";

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1612" },
  ],
};

export const metadata: Metadata = {
  title: { default: "Mohamed Elsheikh — Security Researcher", template: "%s | Mohamed Elsheikh" },
  description: "Independent security researcher and full-stack developer. Vulnerability research, secure systems, web development.",
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/favicon.svg", type: "image/svg+xml" }] },
  keywords: ["Mohamed Elsheikh", "Security Researcher", "Cybersecurity", "Web Developer", "Portfolio"],
  authors: [{ name: "Mohamed Elsheikh", url: siteUrl }],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mohamed Elsheikh — Security Researcher",
    description: "Independent security researcher. Vulnerability research, secure web development, mentorship.",
    url: siteUrl, siteName: "Mohamed Elsheikh",
    images: [{ url: "/personal.jpg", width: 800, height: 800, alt: "Mohamed Elsheikh" }],
    locale: "en_US", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Mohamed Elsheikh", images: ["/personal.jpg"] },
  robots: { index: true, follow: true },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.remove('dark','light');document.documentElement.classList.add(d?'dark':'light')}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${newsreader.variable} light`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <StructuredData />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
