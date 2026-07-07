import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProgressBar from "@/components/ProgressBar";
import Analytics from "@/components/Analytics";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://mohamedelsheikh.dev";

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0e13" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fa" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Mohamed Elsheikh — Head of Cyber Security",
    template: "%s | Mohamed Elsheikh",
  },
  description:
    "Mohamed Elsheikh is Head of Cyber Security at Quota Libex — AWS-certified, Google & Microsoft cybersecurity credentialed, building secure, scalable systems.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  keywords: [
    "Mohamed Elsheikh",
    "Cybersecurity",
    "Head of Cyber Security",
    "AWS",
    "Cloud Architecture",
    "Threat Detection",
    "Security Risk Assessment",
    "Python",
    "IT Management",
    "Portfolio",
  ],
  authors: [{ name: "Mohamed Elsheikh", url: siteUrl }],
  creator: "Mohamed Elsheikh",
  publisher: "Mohamed Elsheikh",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mohamed Elsheikh — Head of Cyber Security",
    description:
      "AWS-certified cybersecurity leader. Security protocols, cloud architecture, threat detection, and secure web development.",
    url: siteUrl,
    siteName: "Mohamed Elsheikh",
    images: [
      {
        url: "/personal.jpg",
        width: 800,
        height: 800,
        alt: "Portrait of Mohamed Elsheikh",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Elsheikh — Head of Cyber Security",
    description:
      "AWS-certified cybersecurity leader. Security protocols, cloud architecture, and threat detection.",
    images: ["/personal.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Applies the saved (or system) theme before first paint to avoid a flash.
const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme') || 'system';
    var dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var c = document.documentElement.classList;
    c.remove('dark', 'light');
    c.add(dark ? 'dark' : 'light');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <Analytics />
          <ProgressBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
