import React, { useState, useEffect, useCallback, CSSProperties } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { StaticImageData } from 'next/image'

// 이 스타일 객체를 컴포넌트 외부에 정의합니다
const hideNumberInputArrows: CSSProperties = {
  WebkitAppearance: 'none',
  MozAppearance: 'textfield',
};

export type CharacterType = 'basic' | 'ex' | 'rare_gacha' | 'bahamut' | 'rare' | 'super_rare' | 'ultra_super_rare' | 'madness'

export interface CharacterStatsModalProps {
  isOpen: boolean
  onClose: () => void
  character: {
    name: string
    code: string
    image: StaticImageData  // string에서 StaticImageData로 변경
    type: CharacterType
    baseStats: {
      hp: number
      attack: number
      dps: number
      attackSpeed: number
      initialDelay: number
      movementSpeed: number
      range: number
      hitBack: number
      cost: number
      cooldown?: number
      afterDelay?: number
      finishTime: number
    }
    obtainedFrom: string
  }
}

const CharacterStatsModal: React.FC<CharacterStatsModalProps> = ({ isOpen, onClose, character }) => {
  const [level, setLevel] = useState(1)
  const [plusLevel, setPlusLevel] = useState(0)
  const [stats, setStats] = useState(character.baseStats)

  const calculateStats = useCallback((baseStats: typeof character.baseStats, level: number, plusLevel: number, type: CharacterType) => {
    const totalLevel = level + plusLevel;
    let multiplier = 1;

    switch (type) {
      case 'basic':
      case 'ex':
        if (totalLevel <= 60) {
          multiplier = 1 + (totalLevel - 1) * 0.2
        } else {
          multiplier = 1 + 59 * 0.2 + (totalLevel - 60) * 0.1
        }
        break
      case 'rare_gacha':
        if (totalLevel <= 20) {
          multiplier = 1 + (totalLevel - 1) * 0.2
        } else if (totalLevel <= 30) {
          multiplier = 1 + 19 * 0.2 + (totalLevel - 20) * 0.6
        } else if (totalLevel <= 40) {
          multiplier = 1 + 19 * 0.2 + 10 * 0.6 + (totalLevel - 30) * 1.2
        } else {
          multiplier = 1 + 19 * 0.2 + 10 * 0.6 + (totalLevel - 40) * 1.8
        }
        break
      case 'bahamut':
        if (totalLevel <= 30) {
          multiplier = 1 + (totalLevel - 1) * 0.2
        } else {
          multiplier = 1 + 29 * 0.2 + (totalLevel - 30) * 0.1
        }
        break
      case 'rare':
        if (totalLevel <= 70) {
          multiplier = 1 + (totalLevel - 1) * 0.2
        } else if (totalLevel <= 90) {
          multiplier = 1 + 69 * 0.2 + (totalLevel - 70) * 0.1
        } else {
          multiplier = 1 + 69 * 0.2 + 20 * 0.1 + (totalLevel - 90) * 0.05
        }
        break
      case 'super_rare':
      case 'ultra_super_rare':
        if (totalLevel <= 60) {
          multiplier = 1 + (totalLevel - 1) * 0.2
        } else if (totalLevel <= 80) {
          multiplier = 1 + 59 * 0.2 + (totalLevel - 60) * 0.1
        } else {
          multiplier = 1 + 59 * 0.2 + 20 * 0.1 + (totalLevel - 80) * 0.05
        }
        break
      case 'madness':
        if (totalLevel <= 20) {
          multiplier = 1 + (totalLevel - 1) * 0.2
        } else {
          multiplier = 1 + 19 * 0.2 + (totalLevel - 20) * 0.1
        }
        break
    }

    return {
      ...baseStats,
      hp: Math.round(baseStats.hp * multiplier),
      attack: Math.round(baseStats.attack * multiplier),
      dps: Math.round(baseStats.dps * multiplier),
      afterDelay: baseStats.afterDelay, // 이 줄을 추가
    };
  }, [character]); // character를 의존성 배열에 추가

  useEffect(() => {
    const newStats = calculateStats(character.baseStats, level, plusLevel, character.type);
    setStats(newStats);
  }, [level, plusLevel, character.baseStats, character.type, calculateStats]);

  const handleLevelChange = (newValue: string | number) => {
    const stringValue = String(newValue);
    
    // 입력값이 비어있는 경우 1로 설정
    if (stringValue === '') {
      setLevel(1);
      return;
    }
    
    // '00'으로 시작하는 경우 입력을 무시
    if (stringValue.startsWith('00')) {
      return;
    }
    
    const parsedValue = parseInt(stringValue, 10);
    if (isNaN(parsedValue) || parsedValue < 1) {
      setLevel(1);
    } else {
      setLevel(Math.min(20, parsedValue));
    }
  };

  const handlePlusLevelChange = (newValue: string | number) => {
    const stringValue = String(newValue);
    
    // 입력값이 비어있는 경우 0으로 설정
    if (stringValue === '') {
      setPlusLevel(0);
      return;
    }
    
    // '00'으로 시작하는 경우 입력을 무시
    if (stringValue.startsWith('00')) {
      return;
    }
    
    const parsedValue = parseInt(stringValue, 10);
    if (isNaN(parsedValue) || parsedValue < 0) {
      setPlusLevel(0);
    } else {
      setPlusLevel(Math.min(90, parsedValue));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-white rounded-lg shadow-lg p-6 text-black">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon"><ChevronLeft className="h-6 w-6" /></Button>
            <h2 className="text-2xl font-bold">제 1형태</h2>
            <Button variant="ghost" size="icon"><ChevronRight className="h-6 w-6" /></Button>
          </div>
          
          <div className="border rounded-lg p-4 shadow-md flex justify-center items-center bg-gradient-to-br from-white to-gray-100">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-200 text-gray-800 rounded-md flex items-center overflow-hidden">
                <button className="px-3 py-2 text-lg hover:bg-gray-300 transition-colors" onClick={() => handleLevelChange(level + 1)}>▲</button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={level === 0 ? '' : level}
                  onChange={(e) => handleLevelChange(e.target.value)}
                  className="w-10 text-center py-2 font-bold bg-gray-200 border-none focus:outline-none"
                  style={hideNumberInputArrows}
                  min="1"
                  max="20"
                />
                <button className="px-3 py-2 text-lg hover:bg-gray-300 transition-colors" onClick={() => handleLevelChange(level - 1)}>▼</button>
              </div>
              <span className="text-xl">+</span>
              <div className="bg-gray-200 text-gray-800 rounded-md flex items-center overflow-hidden">
                <button className="px-3 py-2 text-lg hover:bg-gray-300 transition-colors" onClick={() => handlePlusLevelChange(plusLevel + 1)}>▲</button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={plusLevel}
                  onChange={(e) => handlePlusLevelChange(e.target.value)}
                  className="w-10 text-center py-2 font-bold bg-gray-200 border-none focus:outline-none"
                  style={hideNumberInputArrows}
                  min="0"
                  max="90"
                />
                <button className="px-3 py-2 text-lg hover:bg-gray-300 transition-colors" onClick={() => handlePlusLevelChange(plusLevel - 1)}>▼</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <div className="w-1/2 flex flex-col">
            <div className="flex mb-4">
              <div className="mr-4">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={200}
                  height={200}
                  className="object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-start pt-5">
                <h3 className="text-2xl font-bold mb-1">{character.name}</h3>
                <p className="text-sm text-gray-600">획득처: {character.obtainedFrom}</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 shadow-md flex-grow flex flex-col justify-between bg-gradient-to-br from-white to-gray-100">
              <div className="space-y-2">
                <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded shadow-sm">특성 1</div>
                <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded shadow-sm">특성 2</div>
                <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded shadow-sm">특성 3</div>
              </div>
            </div>
          </div>
          
          <div className="w-1/2 flex flex-col space-y-4">
            <div className="border rounded-lg p-4 shadow-md bg-gradient-to-br from-white to-gray-100 flex-grow">
              <h4 className="font-bold mb-2">기본 스탯</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>체력</span>
                  <span>{stats.hp}</span>
                </div>
                <div className="flex justify-between">
                  <span>공격력</span>
                  <span>{stats.attack}</span>
                </div>
                <div className="flex justify-between">
                  <span>DPS</span>
                  <span>{stats.dps}</span>
                </div>
                <hr className="my-2 border-gray-300" />
                <div className="flex justify-between">
                  <span>이동속도</span>
                  <span>{stats.movementSpeed}</span>
                </div>
                <div className="flex justify-between">
                  <span>사거리</span>
                  <span>{stats.range}</span>
                </div>
                <div className="flex justify-between">
                  <span>히트백</span>
                  <span>{stats.hitBack}번</span>
                </div>
                <div className="flex justify-between">
                  <span>코스트</span>
                  <span>{stats.cost}원</span>
                </div>
                <div className="flex justify-between">
                  <span>쿨타임</span>
                  <span>{character.baseStats.cooldown ? character.baseStats.cooldown.toFixed(2) : '-'}초</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 shadow-md bg-gradient-to-br from-white to-gray-100">
              <h4 className="font-bold mb-2">공격속도 관련 스탯</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>공격간격</span>
                  <span>{stats.attackSpeed.toFixed(2)}초</span>
                </div>
                <div className="flex justify-between">
                  <span>선딜</span>
                  <span>{stats.initialDelay.toFixed(2)}초</span>
                </div>
                <div className="flex justify-between">
                  <span>후딜</span>
                  <span>{character.baseStats.afterDelay ? character.baseStats.afterDelay.toFixed(2) : '-'}초</span>
                </div>
                <div className="flex justify-between">
                  <span>마무리</span>
                  <span>{stats.finishTime.toFixed(2)}초</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CharacterStatsModal