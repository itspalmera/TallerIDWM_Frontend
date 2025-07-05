import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import { Providers } from './providers'


export const metadata = {
  title: 'BLACKCAT - E-commerce',
  description: 'Tu tienda favorita',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
