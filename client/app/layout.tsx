"use client"

import { Footer} from '@/components'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import store from '@/store'


const inter = Inter({ subsets: ['latin'] })
// export const metadata: Metadata = {
//   title: 'MECHANICS SHOP',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
    <html lang="en">
     
      <body className="relative">
      <Provider store={store}>
        {children}
        <Footer/>
        </Provider>
        </body>
    </html>
    
  )
}
