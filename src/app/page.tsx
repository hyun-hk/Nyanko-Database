"use client";

import { useState, useCallback, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Cat, Swords, Shield, Zap, Target, Menu, Trophy, Clock, Star, Search, Sun, Moon } from 'lucide-react'
import { useTheme, ThemeProvider } from 'next-themes'

export default function MainPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  const navItems = useMemo(() => [
    { href: "#", label: "캐릭터", icon: Cat },
    { href: "#", label: "스테이지", icon: Target },
    { href: "#", label: "아이템", icon: Shield },
    { href: "#", label: "이벤트", icon: Star },
  ], [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Image src="/placeholder.svg?height=40&width=40&text=냥코" width={40} height={40} alt="냥코 로고" className="rounded-full" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">냥코 DB</span>
          </motion.div>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={item.href} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 flex items-center transition-colors duration-200">
                  <item.icon className="mr-1" size={18} />
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-900">로그인</Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200">무료 체험</Button>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            )}
          </div>
          <div className="md:hidden flex items-center space-x-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            )}
            <button className="text-gray-600 dark:text-gray-300" onClick={toggleMobileMenu}>
              <Menu size={24} />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 p-4"
          >
            <nav className="mb-4">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 flex items-center py-2 transition-colors duration-200">
                      <item.icon className="mr-2" size={18} />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-900 w-full mb-2">로그인</Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 w-full">무료 체험</Button>
          </motion.div>
        )}
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-2/3"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              냥코 마스터가 되세요!
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6">
              모든 정보를 한 곳에서
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
              냥코 대전쟁의 모든 정보를 효율적으로 관리하고 게임 실력을 향상시키세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                냥코 여행 시작하기
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-purple-600 border-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-900">
                자세히 알아보기
              </Button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="캐릭터, 스테이지, 아이템 검색..."
                className="w-full p-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/3"
          >
            <Image src="/placeholder.svg?height=300&width=400&text=냥코+대전쟁+이미지" width={400} height={300} alt="냥코 대전쟁 이미지" className="rounded-lg shadow-lg mx-auto" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 text-xl text-gray-800 dark:text-gray-100 flex items-center">
                  <Trophy className="mr-2 text-yellow-500" size={24} />
                  오늘의 미션
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="mr-2 text-purple-500" size={18} />
                    <span>레어 캐릭터 뽑기</span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <Swords className="mr-2 text-red-500" size={18} />
                    <span>우르룬 격파 3회</span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <Zap className="mr-2 text-yellow-500" size={18} />
                    <span>XP 1000 획득</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 text-xl text-gray-800 dark:text-gray-100 flex items-center">
                  <Cat className="mr-2 text-purple-500" size={24} />
                  인기 캐릭터
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center">
                      <Image src={`/placeholder.svg?height=60&width=60&text=냥코${i}`} width={60} height={60} alt={`냥코 ${i}`} className="rounded-full mx-auto mb-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">냥코 {i}호</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 text-xl text-gray-800 dark:text-gray-100 flex items-center">
                  <Target className="mr-2 text-pink-500" size={24} />
                  최신 스테이지
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <span>미래편 3장</span>
                    <Star className="text-yellow-500" size={18} />
                  </li>
                  <li className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <span>우주편 2장</span>
                    <Star className="text-yellow-500" size={18} />
                  </li>
                  <li className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <span>전설의 시작 1장</span>
                    <div className="flex">
                      <Star className="text-yellow-500" size={18} />
                      <Star className="text-yellow-500" size={18} />
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h4 className="text-lg font-bold mb-2">냥코 데이터베이스</h4>
              <p className="text-sm text-gray-400">© 2023 All rights reserved</p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">이용약관</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">개인정보처리방침</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">문의하기</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </ThemeProvider>
  )
}