import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '냥코 데이터베이스',
  description: '냥코대전쟁의 모든 정보를 한눈에! 캐릭터, 스테이지, 이벤트 정보를 확인하세요.',
  keywords: '냥코대전쟁, 게임 데이터베이스, 캐릭터 정보, 스테이지 공략',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}