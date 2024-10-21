"use client";

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Cat, Skull, Map, Package, Calendar, Info, Search, ChevronRight, Star, Trophy, Users, Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsLoading(false)  // 컴포넌트가 마운트되면 로딩 상태를 false로 설정
  }, [])

  const sections = [
    { title: "아군 정보", icon: Cat, href: "/allies", color: "bg-blue-500" },
    { title: "적 정보", icon: Skull, href: "/enemies", color: "bg-red-500" },
    { title: "스테이지 정보", icon: Map, href: "/stages", color: "bg-green-500" },
    { title: "아이템 정보", icon: Package, href: "/items", color: "bg-yellow-500" },
    { title: "이벤트 정보", icon: Calendar, href: "/events", color: "bg-purple-500" },
    { title: "게임 시스템", icon: Info, href: "/system", color: "bg-pink-500" },
    { title: "랭킹", icon: Trophy, href: "/ranking", color: "bg-orange-500" },
    { title: "커뮤니티", icon: Users, href: "/community", color: "bg-indigo-500" },
    { title: "가이드", icon: Star, href: "/guides", color: "bg-teal-500" },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>냥코 데이터베이스 - 냥코대전쟁의 모든 정보</title>
        <meta name="description" content="냥코대전쟁의 모든 정보를 한눈에! 캐릭터, 스테이지, 이벤트 정보를 확인하세요." />
        <meta name="keywords" content="냥코대전쟁, 게임 데이터베이스, 캐릭터 정보, 스테이지 공략" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image
                src="/placeholder.svg?height=40&width=40"
                width={40}
                height={40}
                alt="냥코 로고"
                className="rounded-full"
              />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">냥코 데이터베이스</h1>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative w-64">
                <Input
                  type="search"
                  placeholder="냥코 정보 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {mounted && (
                <Button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span className="sr-only">테마 변경</span>
                </Button>
              )}
            </div>
            <button
              className="md:hidden text-gray-600 dark:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu />
            </button>
          </div>
          {isMobileMenuOpen && (
            <div className="mt-4 md:hidden">
              <Input
                type="search"
                placeholder="냥코 정보 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-2 w-full"
              />
              {mounted && (
                <Button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  variant="outline"
                  className="w-full justify-center"
                >
                  {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  {theme === 'dark' ? '라이트 모드' : '다크 모드'}
                </Button>
              )}
            </div>
          )}
        </header>
        <main className="container mx-auto px-4 flex-grow">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card className="col-span-full bg-gradient-to-r from-blue-500 to-purple-500 text-white overflow-hidden">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">새 이벤트: 여름 축제!</h2>
                  <p className="mb-4">특별 냥코와 보물이 기다리고 있어요. 지금 참여하세요!</p>
                  <Button variant="secondary" size="lg" className="bg-white text-blue-500 hover:bg-blue-100">
                    축제 참가하기
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  width={120}
                  height={120}
                  alt="이벤트 이미지"
                  className="rounded-full border-4 border-white shadow-lg mt-4 md:mt-0"
                />
              </CardContent>
            </Card>
            {sections.map((item, index) => (
              <Link href={item.href} key={index} className="group">
                <Card className="h-full overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-700">
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className={`${item.color} p-3 rounded-full text-white`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{item.title}</h2>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">최신 업데이트</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>새로운 울트라 슈퍼 레어 캐릭터 추가</li>
                  <li>스테이지 50-60 오픈</li>
                  <li>버그 수정 및 성능 개선</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">인기 가이드</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>초보자를 위한 빠른 시작 가이드</li>
                  <li>효적인 캣 푸드 파밍 방법</li>
                  <li>레전드 스테이지 공략법</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">커뮤니티 핫토픽</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>새로운 콜라보 이벤트 예측</li>
                  <li>최강 조합 토론</li>
                  <li>다음 업데이트 기대 요소</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">냥코 데이터베이스</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">냥코대전쟁의 모든 비밀을 한눈에!</p>
              </div>
              <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
                <nav>
                  <ul className="flex justify-center space-x-4">
                    <li><Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">소개</Link></li>
                    <li><Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">문의</Link></li>
                    <li><Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">개인정보 처리방침</Link></li>
                  </ul>
                </nav>
              </div>
              <div className="w-full md:w-1/3 text-center md:text-right">
                <p className="text-sm text-gray-600 dark:text-gray-300">© 2024 냥코 데이터베이스. 모든 권리 보유.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}