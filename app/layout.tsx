import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bugworld.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BugWorld — Entomology Blog',
    template: '%s | BugWorld',
  },
  description:
    'Explore the hidden world of insects. Expert articles on entomology, insect behavior, ecology, pest control, and more.',
  keywords: [
    'entomology',
    'insects',
    'beetles',
    'butterflies',
    'ants',
    'bees',
    'insect behavior',
    'ecology',
    'pest control',
  ],
  authors: [{ name: 'BugWorld Editorial Team' }],
  creator: 'BugWorld',
  publisher: 'BugWorld',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'BugWorld',
    title: 'BugWorld — Entomology Blog',
    description: 'Explore the hidden world of insects.',
    images: [
      {
        url: `${siteUrl}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'BugWorld - Entomology Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BugWorld — Entomology Blog',
    description: 'Explore the hidden world of insects.',
    images: [`${siteUrl}/og-default.jpg`],
    creator: '@bugworldblog',
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
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5149589500636355"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
