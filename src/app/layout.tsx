// src/app/layout.tsx
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
// import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your App Name',
  description: 'Description of your app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.className
      )}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
          <Toaster />
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}