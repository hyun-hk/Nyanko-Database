"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Filter, Menu, Info, Database } from 'lucide-react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null)
  const [selectedTargets, setSelectedTargets] = useState<string[]>([])

  const rarityOptions = [
    { value: "basic", label: "기본 캐릭터" },
    { value: "ex", label: "EX" },
    { value: "rare", label: "레어" },
    { value: "super-rare", label: "슈퍼 레어" },
    { value: "ultra-rare", label: "울트라 슈퍼 레어" },
    { value: "legend-rare", label: "레전드 레어" },
  ]

  const targetOptions = [
    { value: "red", label: "빨간 적", color: "bg-[#D43F01]" },
    { value: "floating", label: "떠있는 적", color: "bg-[#669738]" },
    { value: "black", label: "검은 적", color: "bg-[#2A2A2A]" },
    { value: "metal", label: "메탈 적", color: "bg-gradient-to-b from-[#DBDBDB] to-[#ACACAC]" },
    { value: "angel", label: "천사", color: "bg-[#AB9F2D]" },
    { value: "alien", label: "에이리언", color: "bg-[#21B6A4]" },
    { value: "zombie", label: "좀비", color: "bg-[#9522C4]" },
    { value: "relic", label: "고대종", color: "bg-[#75801E]" },
    { value: "demon", label: "악마", color: "bg-[#436EA4]" },
    { value: "untyped", label: "무속성", color: "bg-[#ABB6C9]" },
  ]

  const toggleRarity = (value: string) => {
    setSelectedRarity(selectedRarity === value ? null : value)
  }

  const toggleTarget = (value: string) => {
    setSelectedTargets(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/images/logo/logo.png"
              alt="냥코대전쟁 로고"
              width={150}
              height={100}
            />
            <p className="ml-4 text-sm hidden sm:block">냥코대전쟁 데이터베이스</p>
          </div>
          <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu />
          </Button>
          <nav className="hidden sm:block">
            {/* 여기에 필요한 네비게이션 링크를 추가할 수 있습니다 */}
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className={`sm:flex justify-between items-center mb-6 ${isMenuOpen ? 'block' : 'hidden sm:flex'}`}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto mb-2 sm:mb-0 bg-white text-gray-800 border-2 border-gray-300 shadow-md hover:bg-gray-50">
                <Filter className="mr-2 h-4 w-4" />필터
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] w-11/12 bg-white">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900">필터 옵션</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <h3 className="font-semibold text-gray-800">레어도</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {rarityOptions.map((option) => (
                      <Button
                        key={option.value}
                        onClick={() => toggleRarity(option.value)}
                        variant={selectedRarity === option.value ? "default" : "outline"}
                        className={`
                          ${selectedRarity === option.value
                            ? "bg-[#E7B71A] text-white hover:bg-[#E7B71A]/90"
                            : "bg-white text-gray-800 hover:bg-gray-100"
                          }
                          border-2 border-gray-300 shadow-md font-semibold
                        `}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <h3 className="font-semibold text-gray-800">타겟</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {targetOptions.map((option) => (
                      <Button
                        key={option.value}
                        onClick={() => toggleTarget(option.value)}
                        variant={selectedTargets.includes(option.value) ? "default" : "outline"}
                        className={`
                          ${selectedTargets.includes(option.value) 
                            ? `${option.color} text-white`
                            : "bg-white text-gray-800 hover:bg-gray-100"
                          }
                          border-2 border-gray-300 shadow-md font-semibold
                        `}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Input 
            type="search" 
            placeholder="검색..." 
            className="w-full sm:max-w-sm mt-2 sm:mt-0 bg-white text-gray-800 border-2 border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <Info className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">냥코 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>모든 냥코 캐릭터의 상세 정보와 능력치</CardDescription>
            </CardContent>
            <CardFooter>
              <Link href="/cat-info" className="w-full">
                <Button className="w-full bg-black text-white hover:bg-gray-800">이동하기</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Info className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">적 캐릭터 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>모든 적 캐릭터의 특성과 약점 분석</CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-black text-white hover:bg-gray-800">이동하기</Button>
            </CardFooter>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">냥코 스테이지</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>각 스이지별 구성과 클리어 전략</CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-black text-white hover:bg-gray-800">이동하기</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
