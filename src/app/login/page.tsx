'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Separator } from "@/app/components/ui/separator"
import { Cat, ArrowLeft, Github, Twitter, Mail } from 'lucide-react'

// Google 아이콘 컴포넌트 추가
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 로그인 로직을 구현합니다
    console.log('Login attempt with:', email, password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl flex rounded-lg shadow-lg overflow-hidden"
      >
        <div className="w-1/2 bg-purple-600 p-12 hidden lg:flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">냥코 대전쟁 데이터베이스에 오신 것을 환영합니다!</h2>
            <p className="text-purple-200 text-lg">로그인하여 게임 정보를 관리하고 더 많은 기능을 사용해보세요.</p>
          </div>
          <Image 
            src="/placeholder.svg?height=300&width=400&text=냥코+캐릭터+이미지" 
            width={400} 
            height={300} 
            alt="냥코 캐릭터" 
            className="rounded-lg"
          />
        </div>
        <Card className="w-full lg:w-1/2 max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                <ArrowLeft size={24} />
              </Link>
              <div className="flex items-center space-x-2">
                <Cat className="w-6 h-6 text-purple-600" />
                <CardTitle className="text-2xl font-bold">냥코 로그인</CardTitle>
              </div>
            </div>
            <CardDescription>
              계정에 로그인하여 게임 정보를 관리하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                로그인
              </Button>
            </form>
            <div className="mt-6">
              <Separator className="my-4">
                <span className="px-2 text-sm text-gray-500">또는</span>
              </Separator>
              <div className="space-y-2">
                <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => console.log('Google login')}>
                  <GoogleIcon className="mr-2 h-5 w-5" />
                  Google로 로그인
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => console.log('Github login')}>
                  <Github className="mr-2 h-4 w-4" />
                  Github로 로그인
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => console.log('Twitter login')}>
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter로 로그인
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link href="/forgot-password" className="text-sm text-purple-600 hover:underline">
              비밀번호를 잊으셨나요?
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              계정이 없으신가요? 
              <Link href="/signup" className="ml-1 text-purple-600 hover:underline">
                회원가입
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}