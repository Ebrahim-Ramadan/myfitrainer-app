import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/globals/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'gymrat',
  description: 'myfitrainer is a free workout tracker & planner. Build your routines and track your progress.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
    
  )
}
