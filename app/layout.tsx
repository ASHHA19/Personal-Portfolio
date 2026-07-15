import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const siteUrl = 'https://ashha-g.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ASHHA G — Software & AI Engineer',
    template: '%s — ASHHA G',
  },
  description:
    'Electronics and Communication Engineering graduate specializing in Software Development, Artificial Intelligence, Embedded Systems, and Data Analytics. Experienced in Python, Machine Learning, IoT, and Power BI.',
  keywords: [
    'ASHHA G',
    'Software Engineer',
    'AI Engineer',
    'Machine Learning',
    'Embedded Systems',
    'Python Developer',
    'Data Analyst',
    'IoT',
    'Electronics and Communication Engineering',
  ],
  authors: [{ name: 'ASHHA G' }],
  creator: 'ASHHA G',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'ASHHA G — Software & AI Engineer',
    description:
      'Building intelligent software, AI-powered applications, and embedded systems that solve real-world problems.',
    siteName: 'ASHHA G Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASHHA G — Software & AI Engineer',
    description:
      'Building intelligent software, AI-powered applications, and embedded systems that solve real-world problems.',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#09090B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${jetBrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
