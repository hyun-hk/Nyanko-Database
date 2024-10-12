"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Filter, Menu, ArrowLeft } from 'lucide-react'
import CharacterStatsModal, { CharacterStatsModalProps, CharacterType } from '@/app/components/ui/CharacterStatsModal'
import logo from '@/app/assets/logo.png'
import cat1 from '@/app/assets/001_1.png'
import cat2 from '@/app/assets/002_1.png'
import cat3 from '@/app/assets/003_1.png'
import cat4 from '@/app/assets/004_1.png'
import cat5 from '@/app/assets/005_1.png'
import cat6 from '@/app/assets/006_1.png'
import cat7 from '@/app/assets/007_1.png'
import cat8 from '@/app/assets/008_1.png'
import cat9 from '@/app/assets/009_1.png'
import cat10 from '@/app/assets/0010_1.png'
import { StaticImageData } from 'next/image';

interface CatData {
  name: string;
  code: string;
  image: StaticImageData;
  type: CharacterType;
  baseStats: {
    hp: number;
    attack: number;
    dps: number;
    attackSpeed: number;
    initialDelay: number;
    movementSpeed: number;
    range: number;
    hitBack: number;
    cost: number;
    cooldown?: number;
    afterDelay?: number;
    finishTime: number;
  };
  obtainedFrom: string;
}

export default function CatInfo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null)
  const [selectedTargets, setSelectedTargets] = useState<string[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)

  const rarityOptions = [
    { value: "basic", label: "기본 캐릭터" },
    { value: "ex", label: "EX" },
    { value: "rare", label: "레어" },
    { value: "super-rare", label: "슈퍼 레어" },
    { value: "ultra-rare", label: "울트라 슈퍼 레어" },
    { value: "legend-rare", label: "전드 레어" },
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

  const catData: CatData[] = [
    { name: "고양이", code: "CAT_001", image: cat1, type: "basic" as CharacterType, baseStats: { hp: 250, attack: 400, dps: 400, attackSpeed: 3.33, initialDelay: 0.7, movementSpeed: 10, range: 140, hitBack: 1, cost: 75, finishTime: 0.33 }, obtainedFrom: "기본 캐릭터" },
    { name: "탱크 고양이", code: "CAT_002", image: cat2, type: "basic" as CharacterType, baseStats: { hp: 600, attack: 200, dps: 200, attackSpeed: 3.33, initialDelay: 0.7, movementSpeed: 10, range: 140, hitBack: 1, cost: 75, finishTime: 0.33 }, obtainedFrom: "기본 캐릭터" },
    { name: "배틀 고양이", code: "CAT_003", image: cat3, type: "basic" as CharacterType, baseStats: { hp: 300, attack: 600, dps: 600, attackSpeed: 3.33, initialDelay: 0.7, movementSpeed: 10, range: 140, hitBack: 1, cost: 75, finishTime: 0.33 }, obtainedFrom: "기본 캐릭터" },
    { name: "징글 고양이", code: "CAT_004", image: cat4, type: "basic" as CharacterType, baseStats: { hp: 350, attack: 450, dps: 450, attackSpeed: 3.33, initialDelay: 0.7, movementSpeed: 10, range: 140, hitBack: 1, cost: 75, finishTime: 0.33 }, obtainedFrom: "기본 캐릭터" },
    { name: "황소 고양이", code: "CAT_005", image: cat5, type: "basic" as CharacterType, baseStats: { hp: 500, attack: 300, dps: 300, attackSpeed: 3.33, initialDelay: 0.7, movementSpeed: 10, range: 140, hitBack: 1, cost: 75, finishTime: 0.33 }, obtainedFrom: "기본 캐릭터" },
    { name: "고양이 새", code: "CAT_006", image: cat6, type: "basic" as CharacterType, baseStats: { hp: 250, attack: 550, dps: 550, attackSpeed: 3.33, initialDelay: 0.7, movementSpeed: 10, range: 140, hitBack: 1, cost: 75, finishTime: 0.33 }, obtainedFrom: "기본 캐릭터" },
    { name: "고양이 피쉬", code: "CAT_007", image: cat7, type: "basic" as CharacterType, baseStats: { hp: 450, attack: 350, dps: 350, attackSpeed: 3.33, initialDelay: 0.7, movementSpeed: 10, range: 140, hitBack: 1, cost: 75, finishTime: 0.33 }, obtainedFrom: "기본 캐릭터" },
    { name: "고양이 도마뱀", code: "CAT_008", image: cat8, type: "basic" as CharacterType, baseStats: { hp: 550, attack: 250, dps: 250, attackSpeed: 3.33, initialDelay: 0.7, movementSpeed: 10, range: 140, hitBack: 1, cost: 75, finishTime: 0.33 }, obtainedFrom: "기본 캐릭터" },
    { name: "거신 고양이", code: "CAT_009", image: cat9, type: "basic" as CharacterType, baseStats: { hp: 700, attack: 100, dps: 100, attackSpeed: 3.33, initialDelay: 0.7, movementSpeed: 10, range: 140, hitBack: 1, cost: 75, finishTime: 0.33 }, obtainedFrom: "기본 캐릭터" },
    { name: "고양이 초인", code: "CAT_644", image: cat10, type: "basic" as CharacterType, baseStats: { hp: 800, attack: 800, dps: 800, attackSpeed: 3.33, initialDelay: 0.7, movementSpeed: 10, range: 140, hitBack: 1, cost: 75, finishTime: 0.33 }, obtainedFrom: "기본 캐릭터" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-6 w-6 mr-2" />
              <span className="sr-only">Back to Home</span>
            </Link>
            <Image
              src={logo}
              alt="코대전쟁 로고"
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
        <h1 className="text-3xl font-bold mb-6">냥코 정보</h1>
        
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
                        onClick={() =>   toggleRarity(option.value)}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {catData.map((cat, index) => (
            <Card 
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:z-10"
            >
              <CardHeader>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={200}
                  height={200}
                  className="w-full h-auto"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-bold">{cat.name}</CardTitle>
                <p className="text-sm text-gray-600 mt-2">코드: {cat.code}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-black text-white hover:bg-gray-800"
                  onClick={() => setSelectedCharacter(index)}
                >
                  스펙보기
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {selectedCharacter !== null && catData[selectedCharacter] && (
        <CharacterStatsModal
          isOpen={true}
          onClose={() => setSelectedCharacter(null)}
          character={catData[selectedCharacter] as CharacterStatsModalProps['character']}
        />
      )}
    </div>
  )
}