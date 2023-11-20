import './globals.css'
import { Header } from '@/components/globals/Header'
import { GeistSans } from "geist/font/sans";
import { Footer } from '@/components/globals/Footer';

export const metadata = {
  title: 'gymrat',
  description: 'myfitrainer is a free workout tracker & planner. Build your routines and track your progress.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
    
  )
}
