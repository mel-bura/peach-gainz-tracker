import './globals.css'
import { AuthProvider } from '../components/AuthProvider'

export const metadata = {
  title: 'Peach Gainz Tracker',
  description: '12-Week Maximum Glute Growth Programme',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Peach Gainz' },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0F0F0F',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen bg-[#0F0F0F]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
