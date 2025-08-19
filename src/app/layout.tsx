import '@/styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Toaster } from 'sonner'
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
      <head>
        <title>nekowawolf</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <script src="https://kit.fontawesome.com/2ff8362c80.js" crossOrigin="anonymous"></script>
        <script dangerouslySetInnerHTML={{
          __html: `(function() {
            if (localStorage.getItem("darkmode") === "active") {
              document.documentElement.classList.add("darkmode");
            }
          })();`
        }} />
      </head>
      <body className={`${montserrat.className} body-color`}>
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  )
}
