import Link from 'next/link'
import { Github, Twitter, Mail, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ingilink
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              İngilizce öğrenme kaynaklarını paylaş, keşfet ve topluluğa katıl. 
              Birlikte öğrenmenin gücünü keşfet.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Kaynaklar
                </Link>
              </li>
              <li>
                <Link href="/discover" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Keşfet
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Kaynak Yükle
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Topluluk
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategoriler */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Kategoriler</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources?category=grammar" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Grammar
                </Link>
              </li>
              <li>
                <Link href="/resources?category=vocabulary" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Vocabulary
                </Link>
              </li>
              <li>
                <Link href="/resources?category=listening" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Listening
                </Link>
              </li>
              <li>
                <Link href="/resources?category=speaking" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Speaking
                </Link>
              </li>
            </ul>
          </div>

          {/* Destek */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Destek</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Yardım Merkezi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Kullanım Şartları
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2025 ingilink. Tüm hakları saklıdır.
          </p>
          <p className="text-gray-600 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for English learners
          </p>
        </div>
      </div>
    </footer>
  )
}