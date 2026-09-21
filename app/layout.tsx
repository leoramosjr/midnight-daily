import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Midnight Daily', template: '%s | Midnight Daily' },
  description: 'Análises culturais para quem lê após a meia-noite.',
  icons: {
    icon: '/oldMidnightDailyLogoDark.ico',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
