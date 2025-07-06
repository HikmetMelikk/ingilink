'use client'

import Link from 'next/link'
import { Search, User, Upload, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from auth context

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            ingilink
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/resources" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Kaynaklar
            </Link>
            <Link href="/discover" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Keşfet
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Hakkımızda
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Topluluk
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Kaynak ara..."
                className="pl-10 w-64 focus:w-80 transition-all duration-300"
              />
            </div>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/upload">
                    <Upload className="w-4 h-4 mr-2" />
                    Yükle
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">
                    <User className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Giriş</Link>
                </Button>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/register">Kayıt Ol</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Kaynak ara..."
                  className="pl-10 w-full"
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <Link href="/resources" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                  Kaynaklar
                </Link>
                <Link href="/discover" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                  Keşfet
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                  Hakkımızda
                </Link>
                <Link href="/community" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                  Topluluk
                </Link>
              </nav>

              {/* Mobile Auth Buttons */}
              {isLoggedIn ? (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
                    <Link href="/upload">
                      <Upload className="w-4 h-4 mr-2" />
                      Kaynak Yükle
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/dashboard">
                      <User className="w-4 h-4 mr-2" />
                      Profilim
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login">Giriş Yap</Link>
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
                    <Link href="/register">Kayıt Ol</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}