"use client";

import { useState, useCallback, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible"
import { Cat, Swords, Shield, Zap, Target, Menu, Trophy, Clock, Star, Search, Sun, Moon, ChevronRight, Book, Gamepad, Skull, Users, ChevronDown, ChevronUp } from 'lucide-react'
import { useTheme } from 'next-themes'

const ColoredIcon = ({ icon: Icon, color, ...props }: { icon: React.ElementType; color: string; [key: string]: any }) => (
  <motion.div
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon color={color} {...props} />
  </motion.div>
)

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

interface ChapterSectionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  color: string;
  items: string[];
}

const ChapterSection = ({ title, description, icon: Icon, image, color, items }: ChapterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div 
      variants={itemVariants} 
      className="relative"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-10 rounded-3xl`}></div>
      <div className="relative flex flex-col md:flex-row items-center gap-12 p-8 rounded-3xl overflow-hidden">
        <div className="md:w-1/2">
          <Image src={`/placeholder.svg?height=400&width=500&text=${image}`} width={500} height={400} alt={title} className="rounded-2xl shadow-2xl" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
            <ColoredIcon icon={Icon} className="mr-3" size={32} color={color.split(' ')[1]} />
            {title}
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {description}
          </p>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                자세히 보기
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-4 w-4 ml-2" />
                </motion.div>
              </Button>
            </CollapsibleTrigger>
            <AnimatePresence>
              {isOpen && (
                <CollapsibleContent asChild>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="mt-4 space-y-2">
                      {items.map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center text-gray-600 dark:text-gray-300"
                        >
                          <ChevronRight className="mr-2" size={16} />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </CollapsibleContent>
              )}
            </AnimatePresence>
          </Collapsible>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className={`mt-4 bg-gradient-to-r ${color} text-white hover:opacity-90 transition-all duration-200`}>
              {title.split(':')[1].trim()} 열기 <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

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
    { href: "#", label: "아군 캐릭터", icon: Users, color: "#4CAF50" },
    { href: "#", label: "적 캐릭터", icon: Skull, color: "#F44336" },
    { href: "#", label: "스테이지", icon: Target, color: "#2196F3" },
    { href: "#", label: "아이템", icon: Shield, color: "#FFC107" },
    { href: "#", label: "이벤트", icon: Star, color: "#9C27B0" },
  ], [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.header 
        className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
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
                  <ColoredIcon icon={item.icon} className="mr-1" size={18} color={item.color} />
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-900">로그인</Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200">무료 체험</Button>
            </motion.div>
            {mounted && (
              <motion.div variants={itemVariants}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
              </motion.div>
            )}
          </motion.div>
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-gray-800 p-4"
            >
              <nav className="mb-4">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={item.href} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 flex items-center py-2 transition-colors duration-200">
                        <ColoredIcon icon={item.icon} className="mr-2" size={18} color={item.color} />
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-900 w-full mb-2">로그인</Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 w-full">무료 체험</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
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
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600  transition-all duration-200">
                  냥코 여행 시작하기
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-purple-600 border-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-900">
                  자세히 알아보기
                </Button>
              </motion.div>
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

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 text-xl text-gray-800 dark:text-gray-100 flex items-center">
                  <ColoredIcon icon={Trophy} className="mr-2" size={24} color="#FFD700" />
                  오늘의 미션
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <ColoredIcon icon={Clock} className="mr-2" size={18} color="#8B5CF6" />
                    <span>레어 캐릭터 뽑기</span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <ColoredIcon icon={Swords} className="mr-2" size={18} color="#EF4444" />
                    <span>우르룬 격파 3회</span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <ColoredIcon icon={Zap} className="mr-2" size={18} color="#F59E0B" />
                    <span>XP 1000 획득</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 text-xl text-gray-800 dark:text-gray-100 flex items-center">
                  <ColoredIcon icon={Users} className="mr-2" size={24} color="#3B82F6" />
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

          <motion.div variants={itemVariants}>
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 text-xl text-gray-800 dark:text-gray-100 flex items-center">
                  <ColoredIcon icon={Target} className="mr-2" size={24} color="#EC4899" />
                  최신 스테이지
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <span>미래편 3장</span>
                    <ColoredIcon icon={Star} size={18} color="#F59E0B" />
                  </li>
                  <li className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <span>우주편  2장</span>
                    <ColoredIcon icon={Star} size={18} color="#F59E0B" />
                  </li>
                  <li className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <span>전설의 시작 1장</span>
                    <div className="flex">
                      <ColoredIcon icon={Star} size={18} color="#F59E0B" />
                      <ColoredIcon icon={Star} size={18} color="#F59E0B" />
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          className="space-y-32 mt-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ChapterSection
            title="챕터 1: 캐릭터 도감"
            description="모든 냥코 캐릭터의 상세 정보를 한눈에 확인하세요. 레어도, 능력치, 특수 스킬 등 다양한 정보를 제공합니다."
            icon={Book}
            image="캐릭터+도감"
            color="from-purple-400 to-pink-500"
            items={[
              "200+ 캐릭터 정보",
              "레어도별 분류 시스템",
              "캐릭터 조합 추천",
              "능력치 상세 분석"
            ]}
          />

          <ChapterSection
            title="챕터 2: 적 캐릭터 도감"
            description="모든 적 캐릭터의 정보를 상세히 알아보세요. 각 적의 특성, 약점, 그리고 대응 전략을 제공합니다."
            icon={Skull}
            image="적+캐릭터+도감"
            color="from-red-400 to-orange-500"
            items={[
              "150+ 적 캐릭터 정보",
              "적 유형별 대응 전략",
              "보스 캐릭터 상세 가이드",
              "적 출현 스테이지 정보"
            ]}
          />

          <ChapterSection
            title="챕터 3: 스테이지 공략"
            description="각 스테이지별 최적의 전략과 팁을 제공합니다. 난이도 높은 스테이지도 쉽게 클리어할 수 있습니다."
            icon={Gamepad}
            image="스테이지+공략"
            color="from-green-400 to-blue-500"
            items={[
              "모든 스테이지 상세 공략",
              "추천 캐릭터 라인업",
              "숨겨진 보상 정보",
              "스테이지별 난이도 평가"
            ]}
          />
        </motion.div>
      </main>

      <footer className="bg-gray-800 text-white py-12 mt-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold mb-2">냥코 데이터베이스</h4>
              <p className="text-gray-400">모든 냥코 대전쟁 정보를 한 곳에서</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">이용약관</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">개인정보처리방침</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">문의하기</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © 2023 냥코 데이터베이스. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
