import '@/styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { ReactNode } from 'react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata = {
  title: '503 | Forbidden',
  description: 'Forbidden',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-gray-900`}>{children}</body>
    </html>
  )
}
